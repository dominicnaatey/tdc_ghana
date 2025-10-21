import type { News, NewsResponse, ListParams, CreateNewsPayload, UpdateNewsPayload } from "../types/news";

const serverBase = process.env.API_BASE_URL;
const publicBase = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = serverBase ?? publicBase ?? 'http://127.0.0.1:8000';

function getBase(): string {
  try {
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin; // same-origin for browser; allows Next rewrites
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
  const res = await fetch(path, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    cache: 'no-store',
    ...init,
  });

  let bodyText: string | null = null;
  try { bodyText = await res.text(); } catch {}

  if (!res.ok) {
    let parsed: any = null;
    try { parsed = bodyText ? JSON.parse(bodyText) : null; } catch {}
    const message = parsed?.message ?? parsed?.error ?? (bodyText || `HTTP ${res.status}`);
    throw new Error(message);
  }
  try {
    return bodyText ? JSON.parse(bodyText) as T : ({} as T);
  } catch (err) {
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
  const payload = await listNews({ search: slug, per_page: 10 }, options);
  const match = payload.data.find((n) => n.slug === slug);
  return match ?? null;
}

export async function createNews(payload: CreateNewsPayload, token?: string): Promise<News> {
  const url = new URL('/api/posts', getBase()).toString();
  return request<News>(url, {
    method: 'POST',
    headers: { ...getAuthHeaders(token) },
    body: JSON.stringify(payload),
  });
}

export async function updateNews(id: number, payload: UpdateNewsPayload, token?: string): Promise<News> {
  const url = new URL(`/api/posts/${id}`, getBase()).toString();
  return request<News>(url, {
    method: 'PUT',
    headers: { ...getAuthHeaders(token) },
    body: JSON.stringify(payload),
  });
}

export async function deleteNews(id: number, token?: string): Promise<{ success: boolean }> {
  const url = new URL(`/api/posts/${id}`, getBase()).toString();
  await request<void>(url, {
    method: 'DELETE',
    headers: { ...getAuthHeaders(token) },
  });
  return { success: true };
}