import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { sampleNews, getPublishedNews } from '@/lib/data/sample-news';

// Mock the API module to prevent real network calls during testing
vi.mock('@/lib/api/news', () => ({
  listNews: vi.fn(),
  findNewsBySlug: vi.fn(),
}));

/**
 * Feature: static-deployment-fix, Property 9: Configuration Responsiveness
 * 
 * Property 9: Configuration Responsiveness
 * For any environment variable change, the system should adapt its routing 
 * strategy accordingly.
 * 
 * Validates: Requirements 5.3
 */

describe('Configuration Responsiveness Property Tests', () => {
  beforeEach(() => {
    // Reset environment variables
    delete process.env.OUTPUT_EXPORT;
    delete process.env.NODE_ENV;
    delete process.env.NEXT_PUBLIC_DEBUG_NEWS;
    delete process.env.DEBUG_NEWS;
    delete process.env.STATIC_NEWS_SLUGS;
    delete process.env.NEXT_PUBLIC_STATIC_NEWS_SLUGS;
    delete process.env.NEXT_PUBLIC_ENABLE_REWRITES;
    delete process.env.ENABLE_REWRITES;
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
    delete process.env.API_BASE_URL;
    
    // Reset all mocks
    vi.clearAllMocks();
    
    // Clear module cache to ensure fresh imports
    vi.resetModules();
  });

  afterEach(() => {
    // Clean up environment variables
    delete process.env.OUTPUT_EXPORT;
    delete process.env.NODE_ENV;
    delete process.env.NEXT_PUBLIC_DEBUG_NEWS;
    delete process.env.DEBUG_NEWS;
    delete process.env.STATIC_NEWS_SLUGS;
    delete process.env.NEXT_PUBLIC_STATIC_NEWS_SLUGS;
    delete process.env.NEXT_PUBLIC_ENABLE_REWRITES;
    delete process.env.ENABLE_REWRITES;
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
    delete process.env.API_BASE_URL;
  });

  test('Property 9: Configuration Responsiveness - Static slug environment variables should be respected', async () => {
    const testSlugs = ['env-test-slug-1', 'env-test-slug-2'];
    const envVarNames = ['STATIC_NEWS_SLUGS', 'NEXT_PUBLIC_STATIC_NEWS_SLUGS'];

    for (const envVarName of envVarNames) {
      // Setup environment variable
      process.env[envVarName] = testSlugs.join(',');
      process.env.NODE_ENV = 'production';

      // Mock API response
      const { listNews } = await import('@/lib/api/news');
      const mockListNews = listNews as any;
      mockListNews.mockResolvedValue({
        data: [],
        meta: { current_page: 1, last_page: 1, per_page: 50, total: 0 }
      });

      // Clear module cache and import fresh
      vi.resetModules();
      const { generateStaticParams } = await import('@/app/news/[slug]/page');
      const staticParams = await generateStaticParams();

      // Verify all environment variable slugs are included
      const generatedSlugs = new Set(staticParams.map(param => param.slug));
      
      testSlugs.forEach(envSlug => {
        const normalizedSlug = decodeURIComponent(envSlug.trim().toLowerCase());
        expect(generatedSlugs.has(normalizedSlug)).toBe(true);
      });

      // Verify basic structure
      expect(Array.isArray(staticParams)).toBe(true);
      expect(staticParams.length).toBeGreaterThan(0);

      // Clean up
      delete process.env[envVarName];
    }
  }, 10000);

  test('Property 9: Configuration Responsiveness - Debug configuration should affect logging behavior', async () => {
    const debugConfigs = [true, false];
    
    for (const debugEnabled of debugConfigs) {
      // Setup environment variables
      process.env.NEXT_PUBLIC_DEBUG_NEWS = debugEnabled.toString();
      process.env.NODE_ENV = 'production';
      process.env.OUTPUT_EXPORT = 'true';

      // Mock console.debug to capture debug output
      const originalConsoleDebug = console.debug;
      const debugCalls: any[] = [];
      console.debug = (...args: any[]) => {
        debugCalls.push(args);
      };

      try {
        // Mock API response
        const { listNews } = await import('@/lib/api/news');
        const mockListNews = listNews as any;
        mockListNews.mockResolvedValue({
          data: [
            { id: 'test-1', slug: 'test-article', status: 'published', title: 'Test Article' }
          ],
          meta: { current_page: 1, last_page: 1, per_page: 50, total: 1 }
        });

        // Clear module cache and import fresh
        vi.resetModules();
        const { generateStaticParams } = await import('@/app/news/[slug]/page');
        await generateStaticParams();

        // Verify debug behavior matches configuration
        if (debugEnabled) {
          expect(debugCalls.length).toBeGreaterThan(0);
          // Should have debug messages about static path generation
          const hasStaticPathDebug = debugCalls.some(call => 
            call.some(arg => typeof arg === 'string' && arg.includes('generateStaticParams'))
          );
          expect(hasStaticPathDebug).toBe(true);
        } else {
          // When debug is disabled, there should be no debug calls
          expect(debugCalls.length).toBe(0);
        }

      } finally {
        // Restore original console.debug
        console.debug = originalConsoleDebug;
      }
    }
  }, 10000);

  test('Property 9: Configuration Responsiveness - Multiple environment variable sources should work', async () => {
    const staticSlugs = ['static-slug-1'];
    const publicStaticSlugs = ['public-slug-1'];
    
    // Setup both environment variables
    process.env.STATIC_NEWS_SLUGS = staticSlugs.join(',');
    process.env.NEXT_PUBLIC_STATIC_NEWS_SLUGS = publicStaticSlugs.join(',');
    process.env.NODE_ENV = 'production';

    // Mock API response
    const { listNews } = await import('@/lib/api/news');
    const mockListNews = listNews as any;
    mockListNews.mockResolvedValue({
      data: [],
      meta: { current_page: 1, last_page: 1, per_page: 50, total: 0 }
    });

    // Import and execute generateStaticParams
    const { generateStaticParams } = await import('@/app/news/[slug]/page');
    const staticParams = await generateStaticParams();

    const generatedSlugs = new Set(staticParams.map(param => param.slug));

    // Verify all slugs from both environment variables are included
    [...staticSlugs, ...publicStaticSlugs].forEach(envSlug => {
      const normalizedSlug = decodeURIComponent(envSlug.trim().toLowerCase());
      expect(generatedSlugs.has(normalizedSlug)).toBe(true);
    });
  }, 10000);

  test('Property 9: Configuration Responsiveness - Environment variable changes should be immediately effective', async () => {
    const firstSlugs = ['first-config-slug'];
    const secondSlugs = ['second-config-slug'];

    // Mock API response consistently
    const { listNews } = await import('@/lib/api/news');
    const mockListNews = listNews as any;
    mockListNews.mockResolvedValue({
      data: [],
      meta: { current_page: 1, last_page: 1, per_page: 50, total: 0 }
    });

    // First configuration
    process.env.STATIC_NEWS_SLUGS = firstSlugs.join(',');
    
    // Clear module cache and import fresh
    vi.resetModules();
    const { generateStaticParams: firstGenerate } = await import('@/app/news/[slug]/page');
    const firstParams = await firstGenerate();
    const firstGeneratedSlugs = new Set(firstParams.map(param => param.slug));

    // Second configuration
    process.env.STATIC_NEWS_SLUGS = secondSlugs.join(',');
    
    // Clear module cache and import fresh again
    vi.resetModules();
    const { generateStaticParams: secondGenerate } = await import('@/app/news/[slug]/page');
    const secondParams = await secondGenerate();
    const secondGeneratedSlugs = new Set(secondParams.map(param => param.slug));

    // Verify first configuration slugs are present in first result
    firstSlugs.forEach(slug => {
      const normalizedSlug = decodeURIComponent(slug.trim().toLowerCase());
      expect(firstGeneratedSlugs.has(normalizedSlug)).toBe(true);
    });

    // Verify second configuration slugs are present in second result
    secondSlugs.forEach(slug => {
      const normalizedSlug = decodeURIComponent(slug.trim().toLowerCase());
      expect(secondGeneratedSlugs.has(normalizedSlug)).toBe(true);
    });

    // Verify that unique slugs from first config are not in second
    const uniqueToFirst = firstSlugs.filter(slug => !secondSlugs.includes(slug));
    const uniqueToSecond = secondSlugs.filter(slug => !firstSlugs.includes(slug));

    uniqueToFirst.forEach(slug => {
      const normalizedSlug = decodeURIComponent(slug.trim().toLowerCase());
      expect(secondGeneratedSlugs.has(normalizedSlug)).toBe(false);
    });

    uniqueToSecond.forEach(slug => {
      const normalizedSlug = decodeURIComponent(slug.trim().toLowerCase());
      expect(firstGeneratedSlugs.has(normalizedSlug)).toBe(false);
    });
  }, 10000);

  test('Property 9: Configuration Responsiveness - Empty environment variables should not break functionality', async () => {
    const emptyValues = ['', '   ', ',,,', ' , , '];
    const envVarNames = ['STATIC_NEWS_SLUGS', 'NEXT_PUBLIC_STATIC_NEWS_SLUGS'];

    for (const emptyValue of emptyValues) {
      for (const envVarName of envVarNames) {
        // Setup empty/invalid environment variable
        process.env[envVarName] = emptyValue;
        process.env.NODE_ENV = 'production';

        // Mock API response
        const { listNews } = await import('@/lib/api/news');
        const mockListNews = listNews as any;
        mockListNews.mockResolvedValue({
          data: [],
          meta: { current_page: 1, last_page: 1, per_page: 50, total: 0 }
        });

        // Clear module cache and import fresh
        vi.resetModules();
        const { generateStaticParams } = await import('@/app/news/[slug]/page');
        const staticParams = await generateStaticParams();

        // Should still work and include local sample data
        expect(Array.isArray(staticParams)).toBe(true);
        expect(staticParams.length).toBeGreaterThan(0);

        // Verify local sample data is included
        const generatedSlugs = new Set(staticParams.map(param => param.slug));
        const localSlugs = getPublishedNews().map(article => 
          decodeURIComponent(article.slug.trim().toLowerCase())
        );

        localSlugs.forEach(localSlug => {
          expect(generatedSlugs.has(localSlug)).toBe(true);
        });

        // Verify fallback pages are included
        const expectedFallbacks = ['latest-news', 'breaking-news', 'featured-story', 'announcement'];
        expectedFallbacks.forEach(fallback => {
          expect(generatedSlugs.has(fallback)).toBe(true);
        });

        // Clean up
        delete process.env[envVarName];
      }
    }
  }, 15000);

  test('Property 9: Configuration Responsiveness - Configuration precedence should be consistent', async () => {
    // Test that environment variables take precedence over defaults
    const testSlug = 'priority-test-slug';
    
    // Setup environment variable
    process.env.STATIC_NEWS_SLUGS = testSlug;
    process.env.NODE_ENV = 'production';

    // Mock API to return empty response
    const { listNews } = await import('@/lib/api/news');
    const mockListNews = listNews as any;
    mockListNews.mockResolvedValue({
      data: [],
      meta: { current_page: 1, last_page: 1, per_page: 50, total: 0 }
    });

    // Import and execute generateStaticParams
    const { generateStaticParams } = await import('@/app/news/[slug]/page');
    const staticParams = await generateStaticParams();

    const generatedSlugs = new Set(staticParams.map(param => param.slug));

    // Environment variable slug should be included
    expect(generatedSlugs.has(testSlug)).toBe(true);

    // Local sample data should also be included (not overridden)
    const localSlugs = getPublishedNews().map(article => 
      decodeURIComponent(article.slug.trim().toLowerCase())
    );
    localSlugs.forEach(localSlug => {
      expect(generatedSlugs.has(localSlug)).toBe(true);
    });

    // Fallback pages should also be included
    const expectedFallbacks = ['latest-news', 'breaking-news', 'featured-story', 'announcement'];
    expectedFallbacks.forEach(fallback => {
      expect(generatedSlugs.has(fallback)).toBe(true);
    });
  }, 10000);
});