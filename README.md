# TDC Ghana — Static Export Setup

This project is configured for Next.js static export (`output: 'export'`). This mode generates a fully static site in `out/` during `npm run build` and is ideal for hosting on static providers (e.g., Netlify, Vercel Static, GitHub Pages, S3/CloudFront).

## Key Environment Flags

- `ENABLE_MIDDLEWARE`: When `true`, enables Supabase session middleware for `/admin` and `/auth` routes. Defaults to disabled for static export builds.
- `ENABLE_REWRITES`: When `true`, enables Next.js `rewrites()` to proxy API and storage paths through the app origin. Disabled for static export builds.
- `API_BASE_URL`: Server-side base URL used for REST calls (e.g., `https://admin.eurochamghana.eu`).
- `NEXT_PUBLIC_API_BASE_URL`: Client-side base URL used for REST calls.

Example `.env`:

```
API_BASE_URL=https://admin.eurochamghana.eu
NEXT_PUBLIC_API_BASE_URL=https://admin.eurochamghana.eu
ENABLE_MIDDLEWARE=false
ENABLE_REWRITES=false
```

## Static Export Notes

- Middleware is not compatible with `output: 'export'`. This repo gates middleware behind `ENABLE_MIDDLEWARE` and narrows its matcher to `/admin` and `/auth` only.
- Next.js `rewrites()` do not run on a static host. API code in `lib/api/news.ts` defaults to absolute URLs unless `ENABLE_REWRITES=true`.
- Dynamic routes are pre-rendered via `generateStaticParams` and `export const dynamic = 'force-static'`.
- Image optimization is disabled (`images.unoptimized: true`) which is required for static export.

## Build & Verify

1. Install deps: `npm install`
2. Build static site: `npm run build`
3. Inspect output: `ls -R out` (or your OS equivalent)

## CORS

If the static site fetches from a separate backend domain, ensure the backend allows your static site origin via CORS (e.g., `Access-Control-Allow-Origin: https://your-static-host`).

## Development vs Production

- For local development with middleware/rewrites, set `ENABLE_MIDDLEWARE=true` and `ENABLE_REWRITES=true`, then run `npm run dev`.
- For production static hosting, keep both flags `false` and deploy the `out/` directory.

## Security: HTTP Strict Transport Security (HSTS)

HSTS enforces HTTPS by instructing browsers to only connect over TLS for a period of time. This project includes configuration options for common hosts.

- Why: Prevents SSL stripping and accidental HTTP access; protects subdomains when enabled.
- Header: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`

### Apache (cPanel) setup

- Place the `.htaccess` file in your cPanel `public_html/` (or the site’s document root). This repository includes a ready-to-use `.htaccess` with:
  - 301 redirect from HTTP → HTTPS, handling `X-Forwarded-Proto` for proxies/CDNs
  - HSTS header sent only on HTTPS responses

Snippet (already in `.htaccess`):

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} !=on [OR]
  RewriteCond %{HTTP:X-Forwarded-Proto} !https
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" env=HTTPS
</IfModule>
```

Notes for cPanel:
- Ensure a valid certificate (AutoSSL or Let’s Encrypt) is installed for your domain and subdomains.
- If using a proxy (e.g., Cloudflare), confirm it passes HTTPS correctly and the origin is also HTTPS.

### Nginx setup

Use `docs/nginx-hsts.conf` as a template. It:
- Redirects HTTP → HTTPS
- Adds HSTS on all HTTPS responses

Key lines:

```
server { listen 80; return 301 https://$host$request_uri; }
server {
  listen 443 ssl http2;
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
}
```

### Vercel

For Vercel deployments, HSTS is enabled via `vercel.json` headers:

```
{
  "headers": [{
    "source": "/(.*)",
    "headers": [{
      "key": "Strict-Transport-Security",
      "value": "max-age=31536000; includeSubDomains; preload"
    }]
  }]
}
```

### Testing & Verification

- Browser devtools: Open any HTTPS page → Network tab → select the request → check `Strict-Transport-Security` in Response Headers.
- Terminal: `curl -I https://yourdomain.example` and confirm the header appears.
- Online checkers: Use `securityheaders.com` or `hstspreload.org` to validate configuration.
- Mixed content: Fix any `http://` resources (images, scripts, CSS). HSTS does not convert mixed content; update URLs to `https://`.

### Rollout Guidance

- Start with a short `max-age` (e.g., `300`) to verify behavior.
- After confirming no mixed content or HTTP-only subdomains, raise to `31536000` (1 year).
- Only include `preload` if you intend to submit your domain to the HSTS preload list and all subdomains are permanently on HTTPS.
- Monitor logs and reports for any blocked HTTP resources.

### cPanel-specific considerations

- The `.htaccess` must reside in the serving document root (typically `public_html/`). Files inside application subfolders won’t affect the top-level vhost.
- Some hosts run LiteSpeed; the provided `.htaccess` works the same under LiteSpeed.
- If behind a proxy/CDN, the redirect rule includes `X-Forwarded-Proto` to avoid redirect loops.

## Client Cache: News Data

To reduce unnecessary network requests, the News page uses a localStorage-based cache that persists across reloads and sessions.

- Storage key: `news_cache:v1:<params>` with index and LRU eviction
- TTL: 1 hour (override with `NEXT_PUBLIC_NEWS_CACHE_TTL_MS` in milliseconds)
- Max entries: default 50 (override with `NEXT_PUBLIC_NEWS_CACHE_MAX_ENTRIES`)
- Disable cache: set `NEXT_PUBLIC_DISABLE_NEWS_CACHE=true`
- Module: `lib/news-cache.ts`
- API hooks:
  - `listNewsCached(params)`: returns cached payload if present; otherwise fetches and stores (stampede-protected)
  - `invalidateNewsCache()`: clears all cached entries
  - `refreshNewsCache(params)`: performs a conditional request using ETag/Last-Modified; on 304 updates timestamp, otherwise replaces cache
  - `getNewsCacheStats()`: returns hit/miss/refresh/invalidations counters
- Invalidation:
  - Automatically triggered after `createNews`, `updateNews`, or `deleteNews`
  - Conditional GETs via ETag/Last-Modified handle server-driven updates (304 Not Modified)
  - User-initiated via the Refresh button on `/news`
- Logging: Enable with `NEXT_PUBLIC_DEBUG_NEWS_CACHE=true` to see cache read/write/invalidate and 304 logs

Verification steps:
- Load `/news` and observe fewer repeat API calls; subsequent reloads should serve from cache until TTL expiry.
- Use DevTools → Application → Local Storage to inspect `news_cache:*` keys.
- Click Refresh on `/news` to invalidate and refetch.
- For ETag/Last-Modified, inspect Network response headers; verify 304 responses result in cache reuse and timestamp refresh.

## Background Preloading: News

To ensure instant display when navigating to `/news`, the app preloads news data in the background while users browse other sections.

- Components:
  - `public/sw.js`: Service Worker that caches `GET /api/posts` responses using a cache-first, stale-while-revalidate strategy. It also supports explicit prefetch via `postMessage`.
  - `components/prefetch-news.tsx`: Client component registered globally in `app/layout.tsx` that:
    - Registers the service worker and sends prefetch messages.
    - Uses `refreshNewsCache()` to warm localStorage with conditional requests (ETag/Last-Modified).
    - Schedules prefetch during idle time and triggers prefetch on hover/focus of links to `/news`.

- Network-aware behavior:
  - Respects `navigator.connection.saveData` and skips prefetch when enabled.
  - Avoids prefetch on slow connections (`effectiveType` of `slow-2g` or `2g`).
  - Skips when offline.

- Cache freshness & invalidation:
  - Service worker revalidates in the background and updates its cached response on subsequent requests.
  - `lib/news-cache.ts` performs conditional refresh with `If-None-Match`/`If-Modified-Since` and updates timestamps on 304.
  - Mutations (`createNews`, `updateNews`, `deleteNews`) call `invalidateNewsCache()` to maintain consistency.

- Error handling & fallbacks:
  - If service worker prefetch fails, the component still warms localStorage; if that fails, normal fetch paths are used on `/news`.
  - Service worker returns a minimal JSON fallback when the network fails to avoid breaking UI.

- Metrics:
  - `lib/news-cache.ts` exposes `getNewsCacheStats()` counters (hits, misses, refreshes, invalidations).
  - `components/prefetch-news.tsx` records `window.__newsPrefetchStats` with last prefetch duration and cache counters.

- Configuration:
  - `NEXT_PUBLIC_ENABLE_REWRITES`: When `true`, prefetches relative to the app origin (for same-origin proxy setups).
  - `NEXT_PUBLIC_API_BASE_URL`: Base URL for API when rewrites are disabled.
  - `NEXT_PUBLIC_DEBUG_NEWS_PREFETCH=true`: Enables prefetch logs.

Verification:
- Open any non-news page and wait a few seconds; check DevTools → Application → Cache Storage (`tdc-news-v1`) and Local Storage (`news_cache:v1:*`) for preloaded entries.
- Hover or focus a link to `/news` and verify prefetch triggers.
- Navigate to `/news`; content should render instantly from cache, with a background revalidation in Network.
