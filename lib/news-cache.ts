// Client-side cache for news data using localStorage
import { listNews } from "./api/news";
import type { NewsResponse, ListParams } from "./types/news";

const BASE_KEY = "news_cache";
const VERSION = "v1";
const KEY_PREFIX = `${BASE_KEY}:${VERSION}`;
const DEFAULT_TTL_MS = Number(process.env.NEXT_PUBLIC_NEWS_CACHE_TTL_MS || 3600_000); // 1 hour
const DEBUG = String(process.env.NEXT_PUBLIC_DEBUG_NEWS_CACHE || process.env.DEBUG_NEWS_CACHE || '').toLowerCase() === 'true';

type CacheEntry = {
  ts: number;
  params: Record<string, any>;
  data: NewsResponse;
};

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

function readCache(key: string, ttlMs: number = DEFAULT_TTL_MS): CacheEntry | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    const expired = Date.now() - (entry?.ts || 0) > ttlMs;
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
    if (DEBUG) console.log('[news-cache][write]', { key, ts: entry.ts, params: entry.params, count: entry.data?.data?.length || 0 });
  } catch (err) {
    if (DEBUG) console.warn('[news-cache][write-error]', err);
  }
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
    if (DEBUG) console.log('[news-cache][invalidate]', { removed: keys.length });
  } catch (err) {
    if (DEBUG) console.warn('[news-cache][invalidate-error]', err);
  }
}

export async function listNewsCached(params: ListParams = {}, options?: RequestInit): Promise<NewsResponse> {
  const key = makeKey(params);
  const cached = readCache(key);
  if (cached?.data) return cached.data;
  const fresh = await listNews(params, options);
  writeCache(key, { ts: Date.now(), params: normalizeParams(params), data: fresh });
  return fresh;
}

export async function refreshNewsCache(params: ListParams = {}, options?: RequestInit): Promise<NewsResponse> {
  const key = makeKey(params);
  const fresh = await listNews(params, options);
  writeCache(key, { ts: Date.now(), params: normalizeParams(params), data: fresh });
  return fresh;
}