import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { sampleNews, getPublishedNews } from '@/lib/data/sample-news';

// Mock the API module to prevent real network calls during testing
vi.mock('@/lib/api/news', () => ({
  listNews: vi.fn(),
  findNewsBySlug: vi.fn(),
}));

/**
 * Feature: static-deployment-fix, Property 8: Mode Consistency
 * 
 * Property 8: Mode Consistency
 * For any user interaction, the system should provide the same experience 
 * whether running in development or production mode.
 * 
 * Validates: Requirements 5.1, 5.2, 5.4
 */

describe('Mode Consistency Property Tests', () => {
  beforeEach(() => {
    // Reset environment variables
    delete process.env.OUTPUT_EXPORT;
    delete process.env.NODE_ENV;
    delete process.env.NEXT_PUBLIC_DEBUG_NEWS;
    delete process.env.DEBUG_NEWS;
    delete process.env.STATIC_NEWS_SLUGS;
    delete process.env.NEXT_PUBLIC_STATIC_NEWS_SLUGS;
    
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
  });

  test('Property 8: Mode Consistency - Static path generation should be consistent across modes', async () => {
    // Test with different mode configurations
    const modeConfigs = [
      { outputExport: 'true', nodeEnv: 'production', debug: 'false' },
      { outputExport: 'false', nodeEnv: 'development', debug: 'true' },
      { outputExport: 'true', nodeEnv: 'development', debug: 'false' }
    ];

    const testSlug = 'test-consistency-slug';
    const results = [];

    for (const config of modeConfigs) {
      // Setup environment for this mode
      process.env.OUTPUT_EXPORT = config.outputExport;
      process.env.NODE_ENV = config.nodeEnv;
      process.env.NEXT_PUBLIC_DEBUG_NEWS = config.debug;
      process.env.DEBUG_NEWS = config.debug;
      process.env.STATIC_NEWS_SLUGS = testSlug;

      // Mock API to return consistent data
      const { listNews } = await import('@/lib/api/news');
      const mockListNews = listNews as any;
      mockListNews.mockResolvedValue({
        data: [
          { id: 'test-1', slug: 'api-test-article', status: 'published', title: 'API Test Article' }
        ],
        meta: { current_page: 1, last_page: 1, per_page: 50, total: 1 }
      });

      // Clear module cache and import fresh
      vi.resetModules();
      const { generateStaticParams } = await import('@/app/news/[slug]/page');
      const staticParams = await generateStaticParams();

      results.push({
        config,
        slugs: new Set(staticParams.map(param => param.slug))
      });
    }

    // Verify all configurations include the same core content
    const firstResult = results[0];
    results.slice(1).forEach(result => {
      // All should include local sample data
      const localSlugs = getPublishedNews().map(article => 
        decodeURIComponent(article.slug.trim().toLowerCase())
      );
      
      localSlugs.forEach(localSlug => {
        expect(firstResult.slugs.has(localSlug)).toBe(true);
        expect(result.slugs.has(localSlug)).toBe(true);
      });

      // All should include environment variable slugs
      expect(firstResult.slugs.has(testSlug)).toBe(true);
      expect(result.slugs.has(testSlug)).toBe(true);

      // All should include API data
      expect(firstResult.slugs.has('api-test-article')).toBe(true);
      expect(result.slugs.has('api-test-article')).toBe(true);
    });
  }, 15000);

  test('Property 8: Mode Consistency - Error handling should be consistent across modes', async () => {
    const modeConfigs = [
      { outputExport: 'true', nodeEnv: 'production' },
      { outputExport: 'false', nodeEnv: 'development' }
    ];

    const testSlug = 'error-test-slug';
    const results = [];

    for (const config of modeConfigs) {
      // Setup environment
      process.env.OUTPUT_EXPORT = config.outputExport;
      process.env.NODE_ENV = config.nodeEnv;
      process.env.STATIC_NEWS_SLUGS = testSlug;

      // Mock API failure
      const { listNews } = await import('@/lib/api/news');
      const mockListNews = listNews as any;
      mockListNews.mockRejectedValue(new Error('ECONNREFUSED'));

      // Clear module cache and import fresh
      vi.resetModules();
      const { generateStaticParams } = await import('@/app/news/[slug]/page');
      const staticParams = await generateStaticParams();

      results.push({
        config,
        slugs: new Set(staticParams.map(param => param.slug))
      });
    }

    // Verify error handling is consistent across modes
    results.forEach(result => {
      // Should still work with fallback data
      expect(result.slugs.size).toBeGreaterThan(0);

      // Should include local sample data
      const localSlugs = getPublishedNews().map(article => 
        decodeURIComponent(article.slug.trim().toLowerCase())
      );
      localSlugs.forEach(localSlug => {
        expect(result.slugs.has(localSlug)).toBe(true);
      });

      // Should include environment variable slugs
      expect(result.slugs.has(testSlug)).toBe(true);
    });
  }, 10000);

  test('Property 8: Mode Consistency - Slug normalization should be identical across modes', async () => {
    const testSlugs = ['TEST-SLUG', 'Mixed-Case-Slug'];
    const modeConfigs = [
      { outputExport: 'true', nodeEnv: 'production' },
      { outputExport: 'false', nodeEnv: 'development' }
    ];

    const results = [];

    for (const config of modeConfigs) {
      // Setup environment
      process.env.OUTPUT_EXPORT = config.outputExport;
      process.env.NODE_ENV = config.nodeEnv;
      process.env.STATIC_NEWS_SLUGS = testSlugs.join(',');

      // Mock API to return empty response
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

      results.push({
        config,
        slugs: staticParams.map(param => param.slug).sort()
      });
    }

    // Verify all modes produce identical slug normalization
    const firstResult = results[0];
    results.slice(1).forEach(result => {
      // Environment variable slugs should be normalized identically
      testSlugs.forEach(testSlug => {
        const normalizedSlug = decodeURIComponent(testSlug.trim().toLowerCase());
        const firstHasSlug = firstResult.slugs.includes(normalizedSlug);
        const currentHasSlug = result.slugs.includes(normalizedSlug);
        
        expect(currentHasSlug).toBe(firstHasSlug);
      });

      // All slugs should follow the same normalization pattern
      result.slugs.forEach(slug => {
        expect(slug).toBe(slug.toLowerCase());
        expect(slug).toBe(decodeURIComponent(slug));
        expect(slug).toBe(slug.trim());
        expect(slug).toMatch(/^[a-z0-9-]+$/);
      });
    });
  }, 10000);

  test('Property 8: Mode Consistency - Debug information should not affect core functionality', async () => {
    const apiSlugs = ['test-debug-slug'];
    const debugConfigs = [true, false];
    const results = [];

    for (const debugEnabled of debugConfigs) {
      // Setup environment
      process.env.NEXT_PUBLIC_DEBUG_NEWS = debugEnabled.toString();
      process.env.DEBUG_NEWS = debugEnabled.toString();
      process.env.NODE_ENV = 'production';
      process.env.OUTPUT_EXPORT = 'true';

      // Mock API response
      const { listNews } = await import('@/lib/api/news');
      const mockListNews = listNews as any;
      mockListNews.mockResolvedValue({
        data: apiSlugs.map((slug, index) => ({
          id: `api-${index}`,
          slug: slug,
          status: 'published',
          title: `API Article ${index}`,
          published_at: new Date().toISOString()
        })),
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: 50,
          total: apiSlugs.length
        }
      });

      // Clear module cache and import fresh
      vi.resetModules();
      const { generateStaticParams } = await import('@/app/news/[slug]/page');
      const staticParams = await generateStaticParams();

      results.push({
        debugEnabled,
        slugs: staticParams.map(param => param.slug).sort()
      });
    }

    // Verify debug mode doesn't affect core functionality
    const [debugResult, noDebugResult] = results;
    
    // Should generate the same slugs regardless of debug mode
    expect(debugResult.slugs).toEqual(noDebugResult.slugs);
    
    // Should have the same number of slugs
    expect(debugResult.slugs.length).toBe(noDebugResult.slugs.length);
  }, 10000);
});