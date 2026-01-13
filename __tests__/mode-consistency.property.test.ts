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

  // Generator for mode configurations
  const modeConfigArbitrary = fc.record({
    outputExport: fc.boolean(),
    nodeEnv: fc.constantFrom('development', 'production', 'test'),
    debugNews: fc.boolean(),
    staticSlugs: fc.array(fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/), { minLength: 0, maxLength: 3 })
  });

  test('Property 8: Mode Consistency - Static path generation should be consistent across modes', async () => {
    await fc.assert(
      fc.asyncProperty(
        modeConfigArbitrary,
        fc.array(fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/), { minLength: 0, maxLength: 3 }), // API slugs
        async (modeConfig, apiSlugs) => {
          // Setup environment variables for the mode
          process.env.OUTPUT_EXPORT = modeConfig.outputExport.toString();
          process.env.NODE_ENV = modeConfig.nodeEnv;
          process.env.NEXT_PUBLIC_DEBUG_NEWS = modeConfig.debugNews.toString();
          process.env.DEBUG_NEWS = modeConfig.debugNews.toString();
          
          if (modeConfig.staticSlugs.length > 0) {
            process.env.STATIC_NEWS_SLUGS = modeConfig.staticSlugs.join(',');
          }

          // Mock API response consistently
          const { listNews } = await import('@/lib/api/news');
          const mockListNews = vi.mocked(listNews);
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

          // Import and execute generateStaticParams
          const { generateStaticParams } = await import('@/app/news/[slug]/page');
          const staticParams = await generateStaticParams();

          // Verify basic structure is consistent regardless of mode
          expect(Array.isArray(staticParams)).toBe(true);
          expect(staticParams.length).toBeGreaterThan(0);

          // Verify all generated slugs are valid regardless of mode
          staticParams.forEach(param => {
            expect(param.slug).toMatch(/^[a-z0-9-]+$/);
            expect(param.slug.length).toBeGreaterThan(0);
            expect(param.slug.length).toBeLessThan(200);
          });

          // Verify local sample data is always included regardless of mode
          const generatedSlugs = new Set(staticParams.map(param => param.slug));
          const localSlugs = getPublishedNews().map(article => 
            decodeURIComponent(article.slug.trim().toLowerCase())
          );

          localSlugs.forEach(localSlug => {
            expect(generatedSlugs.has(localSlug)).toBe(true);
          });

          // Verify environment variable slugs are included regardless of mode
          modeConfig.staticSlugs.forEach(envSlug => {
            const normalizedSlug = decodeURIComponent(envSlug.trim().toLowerCase());
            expect(generatedSlugs.has(normalizedSlug)).toBe(true);
          });

          // Verify API slugs are included regardless of mode
          apiSlugs.forEach(apiSlug => {
            const normalizedSlug = decodeURIComponent(apiSlug.trim().toLowerCase());
            expect(generatedSlugs.has(normalizedSlug)).toBe(true);
          });

          // Verify fallback pages are always included regardless of mode
          const expectedFallbacks = ['latest-news', 'breaking-news', 'featured-story', 'announcement'];
          expectedFallbacks.forEach(fallback => {
            expect(generatedSlugs.has(fallback)).toBe(true);
          });

          return true;
        }
      ),
      { numRuns: 20 }
    );
  });

  test('Property 8: Mode Consistency - Error handling should be consistent across modes', async () => {
    await fc.assert(
      fc.asyncProperty(
        modeConfigArbitrary,
        fc.constantFrom('network_failure', 'timeout', 'api_error'),
        async (modeConfig, errorType) => {
          // Setup environment variables for the mode
          process.env.OUTPUT_EXPORT = modeConfig.outputExport.toString();
          process.env.NODE_ENV = modeConfig.nodeEnv;
          process.env.NEXT_PUBLIC_DEBUG_NEWS = modeConfig.debugNews.toString();
          process.env.DEBUG_NEWS = modeConfig.debugNews.toString();
          
          if (modeConfig.staticSlugs.length > 0) {
            process.env.STATIC_NEWS_SLUGS = modeConfig.staticSlugs.join(',');
          }

          // Mock API failure based on error type
          const { listNews } = await import('@/lib/api/news');
          const mockListNews = vi.mocked(listNews);

          switch (errorType) {
            case 'network_failure':
              mockListNews.mockRejectedValue(new Error('ECONNREFUSED'));
              break;
            case 'timeout':
              mockListNews.mockRejectedValue(new Error('Request timeout'));
              break;
            case 'api_error':
              mockListNews.mockRejectedValue(new Error('API Error: 500 Internal Server Error'));
              break;
          }

          // Import and execute generateStaticParams
          const { generateStaticParams } = await import('@/app/news/[slug]/page');
          const staticParams = await generateStaticParams();

          // Verify error handling is consistent regardless of mode
          expect(Array.isArray(staticParams)).toBe(true);
          expect(staticParams.length).toBeGreaterThan(0);

          // Verify fallback to local data works consistently across modes
          const generatedSlugs = new Set(staticParams.map(param => param.slug));
          const localSlugs = getPublishedNews().map(article => 
            decodeURIComponent(article.slug.trim().toLowerCase())
          );

          localSlugs.forEach(localSlug => {
            expect(generatedSlugs.has(localSlug)).toBe(true);
          });

          // Verify environment variable slugs are handled consistently
          modeConfig.staticSlugs.forEach(envSlug => {
            const normalizedSlug = decodeURIComponent(envSlug.trim().toLowerCase());
            expect(generatedSlugs.has(normalizedSlug)).toBe(true);
          });

          // Verify fallback pages are included consistently
          const expectedFallbacks = ['latest-news', 'breaking-news', 'featured-story', 'announcement'];
          expectedFallbacks.forEach(fallback => {
            expect(generatedSlugs.has(fallback)).toBe(true);
          });

          return true;
        }
      ),
      { numRuns: 20 }
    );
  });

  test('Property 8: Mode Consistency - Slug normalization should be identical across modes', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.oneof(
            fc.stringMatching(/^[A-Z0-9]+(-[A-Z0-9]+)*$/), // Uppercase
            fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/), // Lowercase
            fc.stringMatching(/^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/), // Mixed case
          ),
          { minLength: 1, maxLength: 3 }
        ),
        async (testSlugs) => {
          // Test with different mode configurations
          const modeConfigs = [
            { outputExport: 'true', nodeEnv: 'production', debug: 'false' },
            { outputExport: 'false', nodeEnv: 'development', debug: 'true' },
            { outputExport: 'true', nodeEnv: 'development', debug: 'false' },
            { outputExport: 'false', nodeEnv: 'production', debug: 'true' }
          ];

          const results = [];

          for (const config of modeConfigs) {
            // Setup environment for this mode
            process.env.OUTPUT_EXPORT = config.outputExport;
            process.env.NODE_ENV = config.nodeEnv;
            process.env.NEXT_PUBLIC_DEBUG_NEWS = config.debug;
            process.env.DEBUG_NEWS = config.debug;
            process.env.STATIC_NEWS_SLUGS = testSlugs.join(',');

            // Mock API to return empty response
            const { listNews } = await import('@/lib/api/news');
            const mockListNews = vi.mocked(listNews);
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
          results.slice(1).forEach((result, index) => {
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

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 8: Mode Consistency - Debug information should not affect core functionality', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/), { minLength: 0, maxLength: 3 }),
        async (apiSlugs) => {
          // Test with debug enabled and disabled
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
            const mockListNews = vi.mocked(listNews);
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

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 8: Mode Consistency - Build configuration should not affect user experience', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/), { minLength: 1, maxLength: 3 }),
        async (testSlugs) => {
          // Test different build configurations
          const buildConfigs = [
            { outputExport: 'true', nodeEnv: 'production' },
            { outputExport: 'false', nodeEnv: 'development' },
            { outputExport: 'true', nodeEnv: 'development' },
            { outputExport: 'false', nodeEnv: 'production' }
          ];

          const results = [];

          for (const config of buildConfigs) {
            // Setup environment
            process.env.OUTPUT_EXPORT = config.outputExport;
            process.env.NODE_ENV = config.nodeEnv;
            process.env.STATIC_NEWS_SLUGS = testSlugs.join(',');

            // Mock API to return consistent data
            const { listNews } = await import('@/lib/api/news');
            const mockListNews = vi.mocked(listNews);
            mockListNews.mockResolvedValue({
              data: [
                { id: 'test-1', slug: 'test-article-1', status: 'published', title: 'Test Article 1' },
                { id: 'test-2', slug: 'test-article-2', status: 'published', title: 'Test Article 2' }
              ],
              meta: { current_page: 1, last_page: 1, per_page: 50, total: 2 }
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
            testSlugs.forEach(testSlug => {
              const normalizedSlug = decodeURIComponent(testSlug.trim().toLowerCase());
              expect(firstResult.slugs.has(normalizedSlug)).toBe(true);
              expect(result.slugs.has(normalizedSlug)).toBe(true);
            });

            // All should include API data
            expect(firstResult.slugs.has('test-article-1')).toBe(true);
            expect(firstResult.slugs.has('test-article-2')).toBe(true);
            expect(result.slugs.has('test-article-1')).toBe(true);
            expect(result.slugs.has('test-article-2')).toBe(true);
          });

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });
});