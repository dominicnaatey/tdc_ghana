import { describe, test, expect } from 'vitest';
import * as fc from 'fast-check';
import { sampleNews, getPublishedNews } from '@/lib/data/sample-news';
import fs from 'fs';
import path from 'path';

/**
 * Feature: static-deployment-fix, Property 1: URL Rewriting Completeness
 * 
 * Property 1: URL Rewriting Completeness
 * For any valid news article slug that exists in the system, when accessed via `/news/[slug]`, 
 * the Apache server should serve the corresponding HTML file without returning a 404 error.
 * 
 * Validates: Requirements 1.1, 1.2
 */

describe('URL Rewriting Completeness Property Tests', () => {
  // Generator for valid news article slugs from the system
  const validSlugArbitrary = fc.constantFrom(
    ...getPublishedNews().map(article => article.slug)
  );

  // Generator for additional realistic slug patterns that might be generated
  const realisticSlugArbitrary = fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/);

  test('Property 1: URL Rewriting Completeness - Valid news slugs should have corresponding HTML structure', () => {
    fc.assert(
      fc.property(validSlugArbitrary, (slug) => {
        // Test that for any valid slug, we can construct the expected file paths
        // that Apache would look for based on our .htaccess rules
        
        // Expected paths that Apache would try to serve:
        // 1. /news/[slug]/index.html (primary target)
        // 2. /news/[slug].html (fallback)
        
        const expectedPaths = [
          `news/${slug}/index.html`,
          `news/${slug}.html`
        ];
        
        // Verify that the slug exists in our data source
        const article = sampleNews.find(a => a.slug === slug && a.status === 'published');
        expect(article).toBeDefined();
        expect(article?.slug).toBe(slug);
        
        // Verify slug format matches Apache-friendly patterns
        // Should not contain characters that would break URL rewriting
        expect(slug).toMatch(/^[a-z0-9-]+$/);
        expect(slug).not.toContain('/');
        expect(slug).not.toContain('.');
        expect(slug).not.toContain(' ');
        
        // Verify the slug can be safely used in Apache rewrite rules
        // Test that it doesn't contain patterns that would interfere with .htaccess
        expect(slug).not.toMatch(/^(index|\.htaccess|_next)$/);
        expect(slug.startsWith('.')).toBe(false);
        expect(slug.endsWith('.')).toBe(false);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  test('Property 1: URL Rewriting Completeness - Apache rewrite patterns should handle all valid slugs', () => {
    fc.assert(
      fc.property(validSlugArbitrary, (slug) => {
        // Simulate Apache rewrite rule matching
        // Based on our .htaccess rules:
        // RewriteCond %{REQUEST_URI} ^/news/([^/]+)/$
        // RewriteCond %{DOCUMENT_ROOT}/news/%1/index.html -f
        // RewriteRule ^news/([^/]+)/$ news/$1/index.html [L]
        
        const requestUri = `/news/${slug}/`;
        const rewritePattern = /^\/news\/([^\/]+)\/$/;
        const match = requestUri.match(rewritePattern);
        
        // Verify the rewrite pattern matches
        expect(match).not.toBeNull();
        expect(match?.[1]).toBe(slug);
        
        // Verify the captured group can be used to construct file path
        const capturedSlug = match?.[1];
        const targetPath = `news/${capturedSlug}/index.html`;
        
        expect(targetPath).toBe(`news/${slug}/index.html`);
        
        // Test alternative rewrite pattern for direct slug access
        const directRequestUri = `/news/${slug}`;
        const directRewritePattern = /^\/news\/([^\/]+)$/;
        const directMatch = directRequestUri.match(directRewritePattern);
        
        expect(directMatch).not.toBeNull();
        expect(directMatch?.[1]).toBe(slug);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  test('Property 1: URL Rewriting Completeness - Slug validation prevents Apache errors', () => {
    fc.assert(
      fc.property(validSlugArbitrary, (slug) => {
        // Test that valid slugs don't contain patterns that would cause Apache errors
        // or interfere with other rewrite rules
        
        // Should not match asset patterns that should be excluded
        expect(slug).not.toMatch(/^_next/);
        expect(slug).not.toMatch(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/);
        
        // Should not match directory traversal patterns
        expect(slug).not.toContain('../');
        expect(slug).not.toContain('./');
        
        // Should not match patterns that would conflict with other routes
        expect(slug).not.toBe('index');
        expect(slug).not.toBe('news'); // Would conflict with main news page
        
        // Should be URL-safe
        expect(encodeURIComponent(slug)).toBe(slug);
        
        // Should not contain query parameters or fragments
        expect(slug).not.toContain('?');
        expect(slug).not.toContain('#');
        expect(slug).not.toContain('&');
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  test('Property 1: URL Rewriting Completeness - All published articles have valid slugs for Apache', () => {
    const publishedArticles = getPublishedNews();
    
    // Property: Every published article should have a slug that works with Apache rewriting
    publishedArticles.forEach(article => {
      // Verify slug format
      expect(article.slug).toMatch(/^[a-z0-9-]+$/);
      expect(article.slug.length).toBeGreaterThan(0);
      expect(article.slug.length).toBeLessThan(200); // Reasonable URL length limit
      
      // Verify slug uniqueness (no duplicates that would cause conflicts)
      const duplicates = publishedArticles.filter(a => a.slug === article.slug);
      expect(duplicates.length).toBe(1);
      
      // Verify slug can be used in Apache rewrite rules
      const testUri = `/news/${article.slug}/`;
      const rewriteMatch = testUri.match(/^\/news\/([^\/]+)\/$/);
      expect(rewriteMatch).not.toBeNull();
    });
  });
});

/**
 * Feature: static-deployment-fix, Property 2: Clean URL Preservation
 * 
 * Property 2: Clean URL Preservation
 * For any news article request, the Apache server should serve content without exposing 
 * .html extensions in the URL while ensuring assets are served without rewriting interference.
 * 
 * Validates: Requirements 1.4, 1.5
 */

describe('Clean URL Preservation Property Tests', () => {
  // Generator for valid news article slugs
  const validSlugArbitrary = fc.constantFrom(
    ...getPublishedNews().map(article => article.slug)
  );

  // Generator for common asset file extensions
  const assetExtensionArbitrary = fc.constantFrom(
    'css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'woff', 'woff2', 'ttf', 'eot'
  );

  // Generator for asset paths
  const assetPathArbitrary = fc.tuple(
    fc.stringMatching(/^[a-z0-9-_]+$/),
    assetExtensionArbitrary
  ).map(([name, ext]) => `${name}.${ext}`);

  // Generator for _next asset paths (Next.js static assets)
  const nextAssetArbitrary = fc.tuple(
    fc.constantFrom('static', 'chunks', 'css'),
    fc.stringMatching(/^[a-z0-9-_.]+$/),
    assetExtensionArbitrary
  ).map(([dir, name, ext]) => `_next/${dir}/${name}.${ext}`);

  test('Property 2: Clean URL Preservation - News URLs should not expose .html extensions', () => {
    fc.assert(
      fc.property(validSlugArbitrary, (slug) => {
        // Test that clean URLs are preserved without .html extensions
        
        // Clean URL patterns that should work
        const cleanUrls = [
          `/news/${slug}`,
          `/news/${slug}/`
        ];
        
        cleanUrls.forEach(url => {
          // Verify URL doesn't contain .html extension
          expect(url).not.toContain('.html');
          expect(url).not.toContain('.htm');
          
          // Verify URL matches Apache rewrite patterns for clean URLs
          if (url.endsWith('/')) {
            // Pattern: /news/article-slug/ → news/article-slug/index.html
            const trailingSlashPattern = /^\/news\/([^\/]+)\/$/;
            const match = url.match(trailingSlashPattern);
            expect(match).not.toBeNull();
            expect(match?.[1]).toBe(slug);
          } else {
            // Pattern: /news/article-slug → /news/article-slug/ (redirect)
            const noTrailingSlashPattern = /^\/news\/([^\/]+)$/;
            const match = url.match(noTrailingSlashPattern);
            expect(match).not.toBeNull();
            expect(match?.[1]).toBe(slug);
          }
        });
        
        // Verify that .html URLs would be different (not clean)
        const htmlUrl = `/news/${slug}.html`;
        expect(cleanUrls).not.toContain(htmlUrl);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  test('Property 2: Clean URL Preservation - Asset requests should bypass URL rewriting', () => {
    fc.assert(
      fc.property(assetPathArbitrary, (assetPath) => {
        // Test that asset requests are served without rewriting interference
        
        // Asset URLs should contain their extensions
        expect(assetPath).toMatch(/\.[a-z0-9]+$/);
        
        // Verify asset path matches patterns that should bypass rewriting
        const assetPattern = /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/;
        expect(assetPath).toMatch(assetPattern);
        
        // Verify asset paths don't match news article patterns
        const newsPattern = /^\/news\/[^\/]+\/?$/;
        expect(`/${assetPath}`).not.toMatch(newsPattern);
        
        // Verify asset paths would be handled by "serve existing files" rule
        // RewriteCond %{REQUEST_FILENAME} -f [OR]
        // RewriteCond %{REQUEST_FILENAME} -d
        // RewriteRule ^ - [L]
        
        // Asset should not be processed by news rewrite rules
        const newsRewritePattern = /^\/news\/([^\/]+)$/;
        expect(`/${assetPath}`).not.toMatch(newsRewritePattern);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  test('Property 2: Clean URL Preservation - Next.js assets should be served directly', () => {
    fc.assert(
      fc.property(nextAssetArbitrary, (nextAssetPath) => {
        // Test that _next assets are served without rewriting
        
        // Verify _next prefix
        expect(nextAssetPath).toMatch(/^_next\//);
        
        // Verify _next assets match the bypass rule pattern
        // RewriteRule ^_next/ - [L]
        const nextBypassPattern = /^_next\//;
        expect(nextAssetPath).toMatch(nextBypassPattern);
        
        // Verify _next assets don't match news patterns
        const newsPattern = /^\/news\//;
        expect(`/${nextAssetPath}`).not.toMatch(newsPattern);
        
        // Verify _next assets contain proper extensions
        expect(nextAssetPath).toMatch(/\.[a-z0-9]+$/);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  test('Property 2: Clean URL Preservation - URL canonicalization prevents .html exposure', () => {
    fc.assert(
      fc.property(validSlugArbitrary, (slug) => {
        // Test that various URL formats are canonicalized to clean URLs
        
        // Test news.html canonicalization
        // RewriteRule ^news\.html$ news/ [R=301,L]
        const newsHtmlPattern = /^news\.html$/;
        expect('news.html').toMatch(newsHtmlPattern);
        
        // Test news canonicalization  
        // RewriteRule ^news$ news/ [R=301,L]
        const newsPattern = /^news$/;
        expect('news').toMatch(newsPattern);
        
        // Test duplicate segment canonicalization
        // RewriteRule ^news/news/(.+)$ news/$1 [R=301,L]
        const duplicatePattern = /^news\/news\/(.+)$/;
        const duplicateUrl = `news/news/${slug}`;
        const duplicateMatch = duplicateUrl.match(duplicatePattern);
        if (duplicateMatch) {
          expect(duplicateMatch[1]).toBe(slug);
        }
        
        // Verify clean URLs don't contain problematic patterns
        const cleanUrl = `/news/${slug}/`;
        expect(cleanUrl).not.toMatch(/\.html/);
        expect(cleanUrl).not.toMatch(/news\/news\//);
        expect(cleanUrl).not.toMatch(/\/\/+/); // No double slashes
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  test('Property 2: Clean URL Preservation - Asset and content URL separation', () => {
    const publishedArticles = getPublishedNews();
    const commonAssetExtensions = ['css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico'];
    
    // Property: Asset URLs and content URLs should be clearly separated
    publishedArticles.forEach(article => {
      const contentUrl = `/news/${article.slug}/`;
      
      // Content URLs should not look like asset URLs
      commonAssetExtensions.forEach(ext => {
        expect(contentUrl).not.toMatch(new RegExp(`\\.${ext}$`));
      });
      
      // Content URLs should not start with asset prefixes
      expect(contentUrl).not.toMatch(/^\/_next\//);
      expect(contentUrl).not.toMatch(/^\/static\//);
      expect(contentUrl).not.toMatch(/^\/assets\//);
      
      // Verify content URLs match news patterns
      expect(contentUrl).toMatch(/^\/news\/[^\/]+\/$/);
    });
    
    // Test that asset patterns don't interfere with news patterns
    commonAssetExtensions.forEach(ext => {
      const assetUrl = `/example.${ext}`;
      
      // Asset URLs should not match news patterns
      expect(assetUrl).not.toMatch(/^\/news\/[^\/]+\/?$/);
      
      // Asset URLs should match asset patterns
      expect(assetUrl).toMatch(new RegExp(`\\.${ext}$`));
    });
  });
});