# Static Deployment Instructions for cPanel

## Problem Solved
This fix resolves the 404 errors that occur when clicking on news articles after deploying the static export to cPanel hosting.

## What Was Fixed
1. **Apache URL Rewriting**: Updated `.htaccess` rules to properly handle Next.js static export structure
2. **Route Mapping**: Fixed routing from `/news/article-slug` to `/news/article-slug/index.html`
3. **Asset Handling**: Ensured static assets are served correctly without rewriting interference

## Deployment Steps

### 1. Build the Static Export
```bash
npm run build:static
```

### 2. Upload to cPanel
1. Upload the entire contents of the `out/` folder to your cPanel public_html directory
2. The `.htaccess` file will be automatically included and configured correctly
3. Ensure all files and folders maintain their structure

### 3. Verify Deployment
After uploading, test these URLs on your live site:
- `https://yourdomain.com/news/` (should show news listing)
- `https://yourdomain.com/news/tdc-ghana-ltd-launches-24-hour-call-center-and-premium-services` (should show article)
- `https://yourdomain.com/news/news1` (should show sample article)

## How It Works

### Before (Broken)
- User visits: `/news/article-slug`
- Old `.htaccess` redirected to: `/news/view/index.html?slug=article-slug`
- Result: 404 error (file doesn't exist)

### After (Fixed)
- User visits: `/news/article-slug`
- New `.htaccess` redirects to: `/news/article-slug/` (adds trailing slash)
- Then serves: `/news/article-slug/index.html`
- Result: Article displays correctly

## Key Changes Made

### 1. Updated `public/.htaccess`
- Removed the problematic redirect to `news/view/index.html`
- Added proper handling for Next.js static export directory structure
- Fixed multiple `RewriteEngine On` declarations
- Improved rule ordering for better performance

### 2. Maintained Existing Features
- HTTPS redirection still works
- Asset serving (images, CSS, JS) still works
- Other pages (housing, projects, etc.) still work
- 404 error handling still works

## Troubleshooting

### If Articles Still Show 404
1. Check that the `out/news/` directory contains subdirectories for each article
2. Verify that each article subdirectory contains an `index.html` file
3. Ensure the `.htaccess` file was uploaded to the root of your domain

### If Images Don't Load
1. Check that the `out/_next/` directory was uploaded completely
2. Verify that image paths in the HTML point to the correct locations
3. Check browser developer tools for specific 404 errors on assets

### If Other Pages Break
1. The new `.htaccess` maintains compatibility with existing pages
2. If issues occur, you can restore the backup from `.htaccess.backup`

## Files Modified
- `public/.htaccess` - Updated Apache rewrite rules
- `.htaccess` - Root configuration (for reference)
- `.htaccess.backup` - Backup of original configuration

## Next Steps
Your static deployment should now work correctly on cPanel. The news articles will load properly when users click on them from the news listing page.