/*
 * Service Worker: Prefetch and cache news API responses with stale-while-revalidate.
 * Scope: controls the app and intercepts fetches to the news API.
 */

const CACHE_NAME = 'tdc-news-v1';
const DEBUG = false;

self.addEventListener('install', (event) => {
  // Activate immediately so we can start intercepting without reload
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Take control of uncontrolled clients
  event.waitUntil(self.clients.claim());
});

function log(...args) { if (DEBUG) console.log('[sw]', ...args); }

async function cachePut(request, response) {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response);
  } catch (err) { log('cachePut error', err); }
}

async function cacheMatch(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match(request);
  } catch (err) { log('cacheMatch error', err); return undefined; }
}

// Background prefetch utility
async function prefetchUrls(urls = []) {
  const start = Date.now();
  let count = 0;
  for (const url of urls) {
    try {
      const req = new Request(url, { method: 'GET', headers: { Accept: 'application/json' }, cache: 'no-store' });
      const res = await fetch(req);
      if (res && res.ok) {
        await cachePut(req, res.clone());
        count += 1;
      }
    } catch (err) {
      log('prefetch error', url, err);
    }
  }
  log('prefetch complete', { count, durationMs: Date.now() - start });
}

self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'prefetch-news') {
    const urls = Array.isArray(data.urls) ? data.urls : (data.url ? [data.url] : []);
    event.waitUntil(prefetchUrls(urls));
  }
});

// Intercept fetches to news API and serve cache-first, then update in background
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  const isNewsApi = /\/api\/v1\/posts(\/|$|\?)/.test(url.pathname);
  const isGet = req.method === 'GET';

  if (isGet && isNewsApi) {
    event.respondWith((async () => {
      // Try cached response first for instant display
      const cached = await cacheMatch(req);
      if (cached) {
        // Revalidate in background
        event.waitUntil((async () => {
          try {
            const res = await fetch(req);
            if (res && res.ok) await cachePut(req, res.clone());
          } catch (err) { log('revalidate error', err); }
        })());
        return cached;
      }
      // If not cached, fetch network and cache it
      try {
        const res = await fetch(req);
        if (res && res.ok) await cachePut(req, res.clone());
        return res;
      } catch (err) {
        // Fallback: return a minimal JSON response to avoid breaking UI
        log('network error, returning fallback', err);
        return new Response(JSON.stringify({ data: [], meta: { error: 'offline' } }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    })());
  }
});