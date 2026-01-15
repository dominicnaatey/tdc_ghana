import type { News, NewsResponse, ListParams, CreateNewsPayload, UpdateNewsPayload } from "../types/news";
import { invalidateNewsCache } from "../news-cache";

const serverBase = process.env.API_BASE_URL;
const publicBase = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = serverBase ?? publicBase ?? "https://admin.eurochamghana.eu";
const ENABLE_REWRITES = String(process.env.ENABLE_REWRITES || "").toLowerCase() === "true";
const IS_STATIC_EXPORT = String(process.env.OUTPUT_EXPORT || "").toLowerCase() === "true";

function getBase(): string {
  if (IS_STATIC_EXPORT) {
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

async function request<T>(path: string, init?: RequestInit): Promise<T> {
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
    console.debug('[api][request]', { path, init: { ...init, headers: Object.fromEntries(masked.entries()) } });
  }

  const res = await fetch(path, {
    headers: hdr,
    cache: 'no-store',
    ...init,
  });

  let bodyText: string | null = null;
  try { bodyText = await res.text(); } catch {}

  if (DEBUG) {
    console.debug('[api][response]', { path, status: res.status, ok: res.ok, length: bodyText?.length ?? 0 });
  }
  if (!res.ok) {
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
}

export async function listNews(params: ListParams = {}, options?: RequestInit): Promise<NewsResponse> {
  const url = withSearchParams('/api/posts', params);
  return request<NewsResponse>(url, options);
}

export async function getNews(id: number, options?: RequestInit): Promise<News> {
  const url = new URL(`/api/posts/${id}`, getBase()).toString();
  return request<News>(url, options);
}

export async function findNewsBySlug(slug: string, options?: RequestInit): Promise<News | null> {
  const norm = decodeURIComponent(slug).trim().toLowerCase();
  const payload = await listNews({ search: norm, per_page: 200 }, options);
  const match = payload.data.find((n) => String(n.slug || '').trim().toLowerCase() === norm);
  return match ?? null;
}

export async function createNews(payload: CreateNewsPayload, token?: string): Promise<News> {
  const url = new URL('/api/posts', getBase()).toString();
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
  const url = new URL(`/api/posts/${id}`, getBase()).toString();
  await request<void>(url, {
    method: 'DELETE',
    headers: { ...getAuthHeaders(token) },
  });
  try { invalidateNewsCache(); } catch {}
  return { success: true };
}
