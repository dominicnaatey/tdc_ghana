"use client";

import { useEffect } from "react";
import { refreshNewsCache, getNewsCacheStats } from "@/lib/news-cache";
import type { ListParams } from "@/lib/types/news";

// Lightweight, global background prefetcher for news content
// - Registers service worker
// - Prefetches news in idle time based on network conditions
// - Warms both Cache Storage (via SW) and localStorage (via news-cache)

const DEBUG = String(process.env.NEXT_PUBLIC_DEBUG_NEWS_PREFETCH || '').toLowerCase() === 'true';
const ENABLE_REWRITES = String(process.env.NEXT_PUBLIC_ENABLE_REWRITES || process.env.ENABLE_REWRITES || '').toLowerCase() === 'true';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

function getBase(): string {
  try {
    if (ENABLE_REWRITES && typeof window !== 'undefined' && window.location?.origin) {
      return window.location.origin;
    }
  } catch {}
  return API_BASE_URL;
}

function buildNewsUrl(params: ListParams = {}): string {
  const url = new URL('/api/posts', getBase());
  const { page = 1, per_page = 20, sort = 'published_at', order = 'desc', search } = params;
  url.searchParams.set('page', String(page));
  url.searchParams.set('per_page', String(per_page));
  url.searchParams.set('sort', String(sort));
  url.searchParams.set('order', String(order));
  if (search) url.searchParams.set('search', String(search));
  return url.toString();
}

function shouldPrefetch(): boolean {
  if (typeof navigator !== 'undefined') {
    // Respect Data Saver
    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const saveData = Boolean(conn?.saveData);
    if (saveData) return false;
    const type = String(conn?.effectiveType || '').toLowerCase();
    if (type === 'slow-2g' || type === '2g') return false;
  }
  if (typeof document !== 'undefined') {
    if (document.visibilityState === 'hidden') {
      // Still okay to prefetch in background, but we can delay
    }
  }
  if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
    if (!navigator.onLine) return false;
  }
  return true;
}

function log(...args: any[]) { if (DEBUG) console.log('[prefetch-news]', ...args); }

export default function PrefetchNews() {
  useEffect(() => {
    // Register service worker for caching API responses
    const registerSW = async () => {
      try {
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.register('/sw.js');
          log('service worker registered', reg?.scope);
        }
      } catch (err) {
        log('service worker registration failed', err);
      }
    };
    registerSW();

    // Schedule background prefetch when idle
    const schedulePrefetch = () => {
      const run = async () => {
        if (!shouldPrefetch()) { log('skipping prefetch due to network/user settings'); return; }
        const start = performance.now();
        try {
          // Warm localStorage cache via conditional refresh
          await refreshNewsCache({ page: 1, per_page: 20, sort: 'published_at', order: 'desc' });
        } catch (err) {
          log('refreshNewsCache error', err);
        }
        try {
          // Warm Cache Storage via service worker
          const url = buildNewsUrl({ page: 1, per_page: 20, sort: 'published_at', order: 'desc' });
          const sw = await navigator.serviceWorker?.ready;
          sw?.active?.postMessage({ type: 'prefetch-news', urls: [url] });
        } catch (err) {
          log('sw prefetch message error', err);
        }
        const dur = performance.now() - start;
        const stats = getNewsCacheStats();
        (window as any).__newsPrefetchStats = {
          lastDurationMs: dur,
          cacheHits: stats.hits,
          cacheMisses: stats.misses,
          refreshes: stats.refreshes,
          invalidations: stats.invalidations,
        };
        log('prefetch complete', (window as any).__newsPrefetchStats);
      };
      const idle = (window as any).requestIdleCallback;
      if (typeof idle === 'function') idle(run, { timeout: 5000 });
      else setTimeout(run, 2000);
    };
    schedulePrefetch();

    // Intelligent prefetch: hover/focus on links to /news
    let triggered = false;
    const maybeTrigger = () => {
      if (triggered) return;
      triggered = true;
      schedulePrefetch();
    };
    const handler = (e: Event) => {
      const t = e.target as HTMLElement | null;
      const anchor = t?.closest ? t.closest('a') : (t as any);
      const href = (anchor && (anchor as HTMLAnchorElement).href) || '';
      if (!href) return;
      try {
        const u = new URL(href, window.location.origin);
        if (u.pathname === '/news' || u.pathname.startsWith('/news/')) maybeTrigger();
      } catch {}
    };
    document.addEventListener('pointerover', handler, { passive: true });
    document.addEventListener('focusin', handler, { passive: true });

    return () => {
      document.removeEventListener('pointerover', handler);
      document.removeEventListener('focusin', handler);
    };
  }, []);

  return null;
}