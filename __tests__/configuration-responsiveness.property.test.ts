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

  // Generator for environment variable configurations
  const envConfigArbitrary = fc.record({
    staticSlugs: fc.array(fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/), { minLength: 0, maxLength: 3 }),
    debugNews: fc.boolean(),
    outputExport: fc.boolean(),
    nodeEnv: fc.constantFrom('development', 'production', 'test'),
    enableRewrites: fc.boolean(),
    apiBaseUrl: fc.constantFrom('https://api.example.com', 'https://admin.eurochamghana.eu', '')
  });

  test('Property 9: Configuration Responsiveness - Static slug environment variables should be respected', async () => {
    await fc.assert(
      fc.asyncProperty(
        envConfigArbitrary,
        fc.constantFrom('STATIC_NEWS_SLUGS', 'NEXT_PUBLIC_STATIC_NEWS_SLUGS'),
        async (config, envVarName) => {
          // Setup environment variables
          process.env[envVarName] = config.staticSlugs.join(',');
          process.env.OUTPUT_EXPORT = config.outputExport.toString();
          process.env.NODE_ENV = config.nodeEnv;
          process.env.NEXT_PUBLIC_DEBUG_NEWS = config.debugNews.toString();
          process.env.DEBUG_NEWS = config.debugNews.toString();

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

          // Verify all environment variable slugs are included
          const generatedSlugs = new Set(staticParams.map(param => param.slug));
          
          config.staticSlugs.forEach(envSlug => {
            const normalizedSlug = decodeURIComponent(envSlug.trim().toLowerCase());
            expect(generatedSlugs.has(normalizedSlug)).toBe(true);
          });

          // Verify basic structure
          expect(Array.isArray(staticParams)).toBe(true);
          expect(staticParams.length).toBeGreaterThan(0);

          // Verify all generated slugs are valid
          staticParams.forEach(param => {
            expect(param.slug).toMatch(/^[a-z0-9-]+$/);
            expect(param.slug.length).toBeGreaterThan(0);
            expect(param.slug.length).toBeLessThan(200);
          });

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 9: Configuration Responsiveness - Debug configuration should affect logging behavior', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.boolean(),
        fc.constantFrom('NEXT_PUBLIC_DEBUG_NEWS', 'DEBUG_NEWS'),
        async (debugEnabled, envVarName) => {
          // Setup environment variables
          process.env[envVarName] = debugEnabled.toString();
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

            // Import and execute generateStaticParams
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

          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 9: Configuration Responsiveness - Multiple environment variable sources should work', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/), { minLength: 1, maxLength: 2 }),
        fc.array(fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/), { minLength: 1, maxLength: 2 }),
        async (staticSlugs, publicStaticSlugs) => {
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

          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 9: Configuration Responsiveness - Environment variable changes should be immediately effective', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/), { minLength: 1, maxLength: 2 }),
        fc.array(fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/), { minLength: 1, maxLength: 2 }),
        async (firstSlugs, secondSlugs) => {
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

          // Verify that unique slugs from first config are not in second if they weren't specified
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

          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 9: Configuration Responsiveness - Empty environment variables should not break functionality', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('', '   ', ',,,', ' , , '),
        fc.constantFrom('STATIC_NEWS_SLUGS', 'NEXT_PUBLIC_STATIC_NEWS_SLUGS'),
        async (emptyValue, envVarName) => {
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

          // Import and execute generateStaticParams
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

          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 9: Configuration Responsiveness - Node environment should affect behavior appropriately', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('development', 'production', 'test'),
        fc.boolean(),
        async (nodeEnv, outputExport) => {
          // Setup environment
          process.env.NODE_ENV = nodeEnv;
          process.env.OUTPUT_EXPORT = outputExport.toString();
          process.env.STATIC_NEWS_SLUGS = 'test-env-slug';

          // Mock API response
          const { listNews } = await import('@/lib/api/news');
          const mockListNews = listNews as any;
          mockListNews.mockResolvedValue({
            data: [
              { id: 'api-1', slug: 'api-test-article', status: 'published', title: 'API Test Article' }
            ],
            meta: { current_page: 1, last_page: 1, per_page: 50, total: 1 }
          });

          // Import and execute generateStaticParams
          const { generateStaticParams } = await import('@/app/news/[slug]/page');
          const staticParams = await generateStaticParams();

          // Basic functionality should work regardless of environment
          expect(Array.isArray(staticParams)).toBe(true);
          expect(staticParams.length).toBeGreaterThan(0);

          const generatedSlugs = new Set(staticParams.map(param => param.slug));

          // Environment variable slug should be included
          expect(generatedSlugs.has('test-env-slug')).toBe(true);

          // API data should be included
          expect(generatedSlugs.has('api-test-article')).toBe(true);

          // Local sample data should be included
          const localSlugs = getPublishedNews().map(article => 
            decodeURIComponent(article.slug.trim().toLowerCase())
          );
          localSlugs.forEach(localSlug => {
            expect(generatedSlugs.has(localSlug)).toBe(true);
          });

          // All slugs should be valid
          staticParams.forEach(param => {
            expect(param.slug).toMatch(/^[a-z0-9-]+$/);
            expect(param.slug.length).toBeGreaterThan(0);
            expect(param.slug.length).toBeLessThan(200);
          });

          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

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
  });
});