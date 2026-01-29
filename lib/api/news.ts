import type { News, NewsResponse, ListParams, CreateNewsPayload, UpdateNewsPayload } from "../types/news";
import { invalidateNewsCache } from "../news-cache";
import { getNewsIdFromMap } from "../news-map-utils";

const serverBase = process.env.API_BASE_URL;
const publicBase = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = serverBase ?? publicBase ?? "https://admin.eurochamghana.eu";
const ENABLE_REWRITES = String(process.env.ENABLE_REWRITES || "").toLowerCase() === "true";
const IS_STATIC_EXPORT = String(process.env.OUTPUT_EXPORT || "").toLowerCase() === "true";

function getBase(): string {
  if (IS_STATIC_EXPORT || typeof window === "undefined") {
    return API_BASE_URL;
  }
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
    if (v !== undefined && v !== null && String(v).length > 0) {
      url.searchParams.set(k, String(v));
    }
  });
  return url.toString();
}

function getAuthHeaders(token?: string): Record<string, string> {
  const envToken = process.env.API_TOKEN ?? process.env.NEXT_PUBLIC_API_TOKEN;
  const bearer = token ?? envToken;
  return bearer ? { Authorization: `Bearer ${bearer}` } : {};
}

async function request<T>(path: string, init?: RequestInit, retries = 3): Promise<T> {
  const DEBUG = String(process.env.NEXT_PUBLIC_DEBUG_NEWS || process.env.DEBUG_NEWS || '').toLowerCase() === 'true';
  // Build headers safely using the Headers interface to satisfy HeadersInit
  const envToken = process.env.API_TOKEN ?? process.env.NEXT_PUBLIC_API_TOKEN;
  const hdr = new Headers(init?.headers ?? {});
  hdr.set('Accept', 'application/json');
  hdr.set('Content-Type', 'application/json');
  if (envToken) hdr.set('Authorization', `Bearer ${envToken}`);

  if (DEBUG) {
    const masked = new Headers(hdr);
    if (masked.has('Authorization')) masked.set('Authorization', 'Bearer ***');
    console.debug('[api][request]', { path, init: { ...init, headers: Object.fromEntries(masked.entries()) }, retries });
  }

  try {
    const res = await fetch(path, {
      headers: hdr,
      cache: init?.cache ?? 'no-store',
      ...init,
    });

    let bodyText: string | null = null;
    try { bodyText = await res.text(); } catch {}

    if (DEBUG) {
      console.debug('[api][response]', { path, status: res.status, ok: res.ok, length: bodyText?.length ?? 0 });
    }

    if (!res.ok) {
      // Retry on transient errors or rate limits
      if (retries > 0 && [429, 500, 502, 503, 504].includes(res.status)) {
        const delay = 1000 * (4 - retries); // 1s, 2s, 3s
        if (DEBUG) console.warn(`[api][retry] Retrying request due to ${res.status} in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
        return request<T>(path, init, retries - 1);
      }

      let parsed: any = null;
      try { parsed = bodyText ? JSON.parse(bodyText) : null; } catch {}
      const message = parsed?.message ?? parsed?.error ?? (bodyText || `HTTP ${res.status}`);
      const err = new Error(message);
      if (DEBUG) console.warn('[api][error]', { path, status: res.status, message });
      throw err;
    }

    try {
      return bodyText ? JSON.parse(bodyText) as T : ({} as T);
    } catch (err) {
      if (DEBUG) console.warn('[api][parse-error]', { path, bodyText });
      throw new Error('Failed to parse response JSON');
    }
  } catch (err) {
    // Retry on network errors
    if (retries > 0) {
      const delay = 1000 * (4 - retries);
      if (DEBUG) console.warn(`[api][retry] Retrying request due to network error in ${delay}ms...`, err);
      await new Promise(r => setTimeout(r, delay));
      return request<T>(path, init, retries - 1);
    }
    throw err;
  }
}

export async function listNews(params: ListParams = {}, options?: RequestInit): Promise<NewsResponse> {
  const url = withSearchParams('/api/v1/posts', params);
  const raw = await request<any>(url, options);

  // Normalize flat API response to match NewsResponse interface
  if (Array.isArray(raw.data) && !raw.meta) {
    return {
      data: raw.data,
      meta: {
        page: raw.current_page || 1,
        per_page: Number(raw.per_page) || 10,
        total: raw.total || raw.data.length,
        last_page: raw.last_page || 1,
        sort: params.sort || 'published_at',
        order: params.order || 'desc',
      }
    };
  }

  return raw as NewsResponse;
}

export async function getNews(id: number, options?: RequestInit): Promise<News> {
  const url = new URL(`/api/v1/posts/${id}`, getBase()).toString();
  return request<News>(url, options);
}

export async function findNewsBySlug(slug: string, options?: RequestInit): Promise<News | null> {
  const norm = decodeURIComponent(slug).trim(); // Keep original case for API if needed, but usually slugs are lowercase
  
  // Strategy 1: Direct fetch by slug (Most reliable for this API)
  try {
    const url = new URL(`/api/v1/posts/${encodeURIComponent(norm)}`, getBase()).toString();
    const res = await request<{ data: News }>(url, options);
    if (res?.data) {
       return res.data;
    }
  } catch (e) {
    if (String(process.env.DEBUG_NEWS).toLowerCase() === 'true') {
      console.warn(`[findNewsBySlug] Direct slug fetch failed for "${norm}"`, e);
    }
  }

  const normLower = norm.toLowerCase();

  // Strategy 2: Search by slug/title using the API's search parameter
  try {
    const payload = await listNews({ search: normLower, per_page: 100 }, options);
    const match = payload.data.find((n) => String(n.slug || '').trim().toLowerCase() === normLower);
    if (match) return match;
  } catch (e) {
    if (String(process.env.DEBUG_NEWS).toLowerCase() === 'true') {
      console.warn('[findNewsBySlug] Search strategy failed', e);
    }
  }

  // Strategy 3: Fallback to fetching the latest news list (in case search is fuzzy or broken)
  // This is often more reliable if the article is recent
  try {
    const payload = await listNews({ per_page: 100, sort: 'published_at', order: 'desc' }, options);
    const match = payload.data.find((n) => String(n.slug || '').trim().toLowerCase() === normLower);
    if (match) return match;
  } catch (e) {
    if (String(process.env.DEBUG_NEWS).toLowerCase() === 'true') {
      console.warn('[findNewsBySlug] List fallback strategy failed', e);
    }
  }

  // Strategy 4: Check static map for ID (useful for static export or when API search is limited)
  try {
    const mappedId = await getNewsIdFromMap(normLower);
    if (mappedId) {
      if (String(process.env.DEBUG_NEWS).toLowerCase() === 'true') {
        console.debug(`[findNewsBySlug] Found ID ${mappedId} in static map for slug "${normLower}"`);
      }
      // Note: We can't fetch by ID directly due to API limitations, but we can try the slug again
      // or if we had an ID-based endpoint, we'd use it here.
      // Since Strategy 1 already tried the slug, this is mostly redundant unless the map helps us find a different slug?
      // Keeping it as a placeholder for now.
    }
  } catch (e) {
    if (String(process.env.DEBUG_NEWS).toLowerCase() === 'true') {
      console.warn('[findNewsBySlug] Static map strategy failed', e);
    }
  }

  return null;
}

export async function createNews(payload: CreateNewsPayload, token?: string): Promise<News> {
  const url = new URL('/api/v1/posts', getBase()).toString();
  const created = await request<News>(url, {
    method: 'POST',
    headers: { ...getAuthHeaders(token) },
    body: JSON.stringify(payload),
  });
  try { invalidateNewsCache(); } catch {}
  return created;
}

export async function updateNews(id: number, payload: UpdateNewsPayload, token?: string): Promise<News> {
  const url = new URL(`/api/posts/${id}`, getBase()).toString();
  const updated = await request<News>(url, {
    method: 'PUT',
    headers: { ...getAuthHeaders(token) },
    body: JSON.stringify(payload),
  });
  try { invalidateNewsCache(); } catch {}
  return updated;
}

export async function deleteNews(id: number, token?: string): Promise<{ success: boolean }> {
  const url = new URL(`/api/v1/posts/${id}`, getBase()).toString();
  await request<void>(url, {
    method: 'DELETE',
    headers: { ...getAuthHeaders(token) },
  });
  try { invalidateNewsCache(); } catch {}
  return { success: true };
}
