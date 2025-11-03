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
