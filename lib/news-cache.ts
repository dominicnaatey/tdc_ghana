// Robust client-side cache for news with TTL, ETag support, stampede protection, metrics, and eviction
import type { NewsResponse, ListParams } from "./types/news";

const BASE_KEY = "news_cache";
const VERSION = "v1";
const KEY_PREFIX = `${BASE_KEY}:${VERSION}`;
const INDEX_KEY = `${KEY_PREFIX}:index`;
const DEFAULT_TTL_MS = Number(process.env.NEXT_PUBLIC_NEWS_CACHE_TTL_MS || 3600_000); // 1 hour
const MAX_ENTRIES = Number(process.env.NEXT_PUBLIC_NEWS_CACHE_MAX_ENTRIES || 50);
const DISABLE = String(process.env.NEXT_PUBLIC_DISABLE_NEWS_CACHE || process.env.DISABLE_NEWS_CACHE || '').toLowerCase() === 'true';
const DEBUG = String(process.env.NEXT_PUBLIC_DEBUG_NEWS_CACHE || process.env.DEBUG_NEWS_CACHE || '').toLowerCase() === 'true';
const FORCE_REFRESH = String(process.env.NEXT_PUBLIC_FORCE_NEWS_REFRESH || process.env.FORCE_NEWS_REFRESH || '').toLowerCase() === 'true';

type CacheEntry = {
  ts: number;            // stored timestamp
  lu: number;            // last used
  params: Record<string, any>;
  data: NewsResponse;
  etag?: string | null;
  lastModified?: string | null;
};

type Metrics = {
  hits: number;
  misses: number;
  refreshes: number;
  invalidations: number;
};

const metrics: Metrics = { hits: 0, misses: 0, refreshes: 0, invalidations: 0 };
const inFlight: Map<string, Promise<NewsResponse>> = new Map();

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function normalizeParams(params: ListParams = {}): Record<string, any> {
  const { page = 1, per_page = 10, sort = 'published_at', order = 'desc', search } = params;
  return { page, per_page, sort, order, ...(search ? { search } : {}) };
}

function makeKey(params: ListParams = {}): string {
  const norm = normalizeParams(params);
  try {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(norm))));
    return `${KEY_PREFIX}:${encoded}`;
  } catch {
    return `${KEY_PREFIX}:${norm.page || 1}:${norm.per_page || 10}:${norm.sort || 'published_at'}:${norm.order || 'desc'}`;
  }
}

function readIndex(): Array<{ key: string; lu: number }> {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function writeIndex(index: Array<{ key: string; lu: number }>) {
  if (!isBrowser()) return;
  try { localStorage.setItem(INDEX_KEY, JSON.stringify(index)); } catch {}
}

function bumpIndex(key: string, lu: number) {
  const index = readIndex().filter((i) => i.key !== key);
  index.push({ key, lu });
  // evict oldest if exceeding max
  if (index.length > MAX_ENTRIES) {
    const sorted = index.sort((a, b) => a.lu - b.lu);
    const evict = sorted.slice(0, index.length - MAX_ENTRIES);
    for (const e of evict) {
      try { localStorage.removeItem(e.key); } catch {}
    }
    const kept = sorted.slice(index.length - MAX_ENTRIES);
    writeIndex(kept);
  } else {
    writeIndex(index);
  }
}

function readCache(key: string, ttlMs: number = DEFAULT_TTL_MS): CacheEntry | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    const expired = Date.now() - (entry?.ts || 0) > ttlMs;
    if (!expired) {
      entry.lu = Date.now();
      bumpIndex(key, entry.lu);
    }
    if (DEBUG) console.log('[news-cache][read]', { key, expired, ts: entry?.ts, ttlMs });
    return expired ? null : entry;
  } catch (err) {
    if (DEBUG) console.warn('[news-cache][read-error]', err);
    return null;
  }
}

function writeCache(key: string, entry: CacheEntry): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(entry));
    bumpIndex(key, entry.lu);
    if (DEBUG) console.log('[news-cache][write]', { key, ts: entry.ts, params: entry.params, count: entry.data?.data?.length || 0, etag: entry.etag, lastModified: entry.lastModified });
  } catch (err) {
    if (DEBUG) console.warn('[news-cache][write-error]', err);
  }
}

function getBase(): string {
  const serverBase = process.env.API_BASE_URL;
  const publicBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  // Default to remote admin host in production static exports to avoid localhost fallbacks
  const API_BASE_URL = serverBase ?? publicBase ?? 'https://admin.eurochamghana.eu';
  const ENABLE_REWRITES = String(process.env.NEXT_PUBLIC_ENABLE_REWRITES || process.env.ENABLE_REWRITES || "").toLowerCase() === "true";
  try {
    if (ENABLE_REWRITES && typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin;
    }
  } catch {}
  return API_BASE_URL;
}

function withSearchParams(path: string, params: Record<string, any> = {}): string {
  const url = new URL(path, getBase());
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).length > 0) url.searchParams.set(k, String(v));
  });
  return url.toString();
}

async function fetchListWithCondition(params: ListParams = {}, etag?: string | null, lastModified?: string | null): Promise<{ status: number; data: NewsResponse | null; etag?: string | null; lastModified?: string | null }> {
  const url = withSearchParams('/api/posts', params as any);
  const headers: Record<string, string> = { Accept: 'application/json', 'Content-Type': 'application/json' };
  // Include Authorization when a token is provided via env (supports public or server-only tokens)
  const envToken = (process.env.NEXT_PUBLIC_API_TOKEN || process.env.API_TOKEN || '').trim();
  if (envToken) headers['Authorization'] = `Bearer ${envToken}`;
  if (etag) headers['If-None-Match'] = etag;
  if (lastModified) headers['If-Modified-Since'] = lastModified;
  const res = await fetch(url, { headers, cache: 'no-store' });
  if (res.status === 304) {
    if (DEBUG) console.log('[news-cache][304]', { url });
    return { status: 304, data: null, etag, lastModified };
  }
  const bodyText = await res.text();
  if (!res.ok) throw new Error(bodyText || `HTTP ${res.status}`);
  const data = bodyText ? JSON.parse(bodyText) as NewsResponse : ({ data: [], meta: {} } as any);
  const nextEtag = res.headers.get('ETag');
  const nextLastMod = res.headers.get('Last-Modified');
  return { status: res.status, data, etag: nextEtag, lastModified: nextLastMod };
}

export function getNewsCacheStats(): Metrics { return { ...metrics }; }

export function getNewsCacheContent(): Array<{ key: string; size: number; ts: number; lu: number }> {
  if (!isBrowser()) return [];
  const items: Array<{ key: string; size: number; ts: number; lu: number }> = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || '';
      if (k.startsWith(KEY_PREFIX)) {
        const raw = localStorage.getItem(k) || '';
        let meta = { ts: 0, lu: 0 };
        try {
          const parsed = JSON.parse(raw);
          meta = { ts: parsed.ts, lu: parsed.lu };
        } catch {}
        items.push({ key: k, size: raw.length, ...meta });
      }
    }
  } catch (err) {
    if (DEBUG) console.warn('[news-cache][inspect-error]', err);
  }
  return items;
}

export function invalidateNewsCache(): void {
  if (!isBrowser()) return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || '';
      if (k.startsWith(KEY_PREFIX)) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
    writeIndex([]);
    metrics.invalidations += 1;
    if (DEBUG) console.log('[news-cache][invalidate]', { removed: keys.length });
    
    // Reset internal state if needed (metrics are kept for session tracking)
    // But we might want to reset metrics too if requested? 
    // The prompt says "Resets the cache timestamp" which is implicit by clearing.
  } catch (err) {
    if (DEBUG) console.warn('[news-cache][invalidate-error]', err);
  }
}

// Expose debug tools to window for console access
if (isBrowser()) {
  (window as any).__TDC_NEWS_CACHE__ = {
    stats: getNewsCacheStats,
    content: getNewsCacheContent,
    clear: invalidateNewsCache,
    base: BASE_KEY,
    version: VERSION
  };
}

export async function listNewsCached(params: ListParams = {}, _options?: RequestInit): Promise<NewsResponse> {
  if (DISABLE) {
    // fall back to direct fetch without caching
    const res = await fetchListWithCondition(params);
    return res.data as NewsResponse;
  }
  const key = makeKey(params);
  const isFirstPage = Number((params?.page ?? 1)) === 1;

  // Always revalidate the first page against the server to ensure new posts appear instantly.
  // Uses conditional headers (ETag/Last-Modified) and falls back to cache when up-to-date.
  if (isFirstPage) {
    // Optional hard refresh toggle via env: bypass conditional and cache for page one
    if (FORCE_REFRESH) {
      const hardKey = key + ':hard';
      if (inFlight.has(hardKey)) return inFlight.get(hardKey)!;
      const p = (async () => {
        const res = await fetchListWithCondition(params);
        const entry: CacheEntry = {
          ts: Date.now(),
          lu: Date.now(),
          params: normalizeParams(params),
          data: (res.data as NewsResponse),
          etag: res.etag ?? null,
          lastModified: res.lastModified ?? null,
        };
        writeCache(key, entry);
        return entry.data;
      })();
      inFlight.set(hardKey, p);
      try { return await p; } finally { inFlight.delete(hardKey); }
    }

    const refreshKey = key + ':refresh';
    if (inFlight.has(refreshKey)) return inFlight.get(refreshKey)!;
    const p = (async () => {
      const refreshed = await refreshNewsCache(params);
      return refreshed;
    })();
    inFlight.set(refreshKey, p);
    try { return await p; } finally { inFlight.delete(refreshKey); }
  }

  // For subsequent pages, use cached data with stampede protection
  const existing = readCache(key);
  if (existing?.data) {
    metrics.hits += 1;
    return existing.data;
  }
  metrics.misses += 1;
  if (inFlight.has(key)) return inFlight.get(key)!;
  const p = (async () => {
    const res = await fetchListWithCondition(params);
    const entry: CacheEntry = {
      ts: Date.now(),
      lu: Date.now(),
      params: normalizeParams(params),
      data: (res.data as NewsResponse),
      etag: res.etag ?? null,
      lastModified: res.lastModified ?? null,
    };
    writeCache(key, entry);
    return entry.data;
  })();
  inFlight.set(key, p);
  try { return await p; } finally { inFlight.delete(key); }
}

export async function refreshNewsCache(params: ListParams = {}, _options?: RequestInit): Promise<NewsResponse> {
  const key = makeKey(params);
  // use conditional headers to check for 304
  const prev = readCache(key, Number.MAX_SAFE_INTEGER /* ignore ttl for conditional */);
  const res = await fetchListWithCondition(params, prev?.etag ?? null, prev?.lastModified ?? null);
  metrics.refreshes += 1;
  if (res.status === 304 && prev?.data) {
    const updated: CacheEntry = { ...prev, ts: Date.now(), lu: Date.now() };
    writeCache(key, updated);
    return prev.data;
  }
  const entry: CacheEntry = {
    ts: Date.now(),
    lu: Date.now(),
    params: normalizeParams(params),
    data: (res.data as NewsResponse),
    etag: res.etag ?? null,
    lastModified: res.lastModified ?? null,
  };
  writeCache(key, entry);
  return entry.data;
}