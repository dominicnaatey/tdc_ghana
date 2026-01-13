import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { sampleNews, getPublishedNews } from '@/lib/data/sample-news';

// Mock the API module to avoid real network calls during testing
vi.mock('@/lib/api/news', () => ({
  listNews: vi.fn(),
  findNewsBySlug: vi.fn(),
}));

/**
 * Feature: static-deployment-fix, Property 4: Build Resilience
 * 
 * Property 4: Build Resilience
 * For any network failure during API data fetching, the static export should 
 * complete successfully using fallback data sources.
 * 
 * Validates: Requirements 2.2
 */

describe('Build Resilience Property Tests', () => {
  beforeEach(() => {
    // Reset environment variables
    delete process.env.STATIC_NEWS_SLUGS;
    delete process.env.NEXT_PUBLIC_STATIC_NEWS_SLUGS;
    
    // Reset all mocks
    vi.clearAllMocks();
    
    // Clear module cache to ensure fresh imports
    vi.resetModules();
  });

  // Generator for environment variable slugs
  const envSlugArbitrary = fc.array(
    fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    { minLength: 0, maxLength: 5 }
  );

  test('Property 4: Build Resilience - API failures should not prevent static generation', async () => {
    await fc.assert(
      fc.asyncProperty(
        envSlugArbitrary,
        fc.oneof(
          fc.constant('network_failure'),
          fc.constant('timeout'),
          fc.constant('api_error'),
          fc.constant('success_with_data')
        ),
        async (envSlugs, failureType) => {
          // Setup environment variables if provided
          if (envSlugs.length > 0) {
            process.env.STATIC_NEWS_SLUGS = envSlugs.join(',');
          }

          // Mock API behavior based on failure type
          const { listNews } = await import('@/lib/api/news');
          const mockListNews = vi.mocked(listNews);

          switch (failureType) {
            case 'network_failure':
              mockListNews.mockRejectedValue(new Error('ECONNREFUSED'));
              break;
            case 'timeout':
              mockListNews.mockRejectedValue(new Error('Request timeout'));
              break;
            case 'api_error':
              mockListNews.mockRejectedValue(new Error('API Error: 500 Internal Server Error'));
              break;
            case 'success_with_data':
              // Mock successful API response with some test data
              mockListNews.mockResolvedValue({
                data: [
                  { slug: 'api-article-1', status: 'published', title: 'API Article 1' },
                  { slug: 'api-article-2', status: 'published', title: 'API Article 2' },
                ],
                meta: { current_page: 1, last_page: 1, per_page: 50, total: 2 }
              });
              break;
          }

          // Import and execute generateStaticParams - it should handle API failures gracefully
          const { generateStaticParams } = await import('@/app/news/[slug]/page');
          const staticParams = await generateStaticParams();

          // Verify that static params were generated successfully
          expect(Array.isArray(staticParams)).toBe(true);
          expect(staticParams.length).toBeGreaterThan(0);

          // Verify that local sample data is included as fallback
          const generatedSlugs = new Set(staticParams.map(param => param.slug));
          const localSlugs = getPublishedNews().map(article => 
            decodeURIComponent(article.slug.trim().toLowerCase())
          );

          // All local slugs should be present as fallback
          localSlugs.forEach(localSlug => {
            expect(generatedSlugs.has(localSlug)).toBe(true);
          });

          // Environment variable slugs should also be included
          envSlugs.forEach(envSlug => {
            const normalizedSlug = decodeURIComponent(envSlug.trim().toLowerCase());
            expect(generatedSlugs.has(normalizedSlug)).toBe(true);
          });

          // Verify fallback pages are always included
          const expectedFallbacks = ['latest-news', 'breaking-news', 'featured-story', 'announcement'];
          expectedFallbacks.forEach(fallback => {
            expect(generatedSlugs.has(fallback)).toBe(true);
          });

          // Verify all generated slugs are valid
          staticParams.forEach(param => {
            expect(param.slug).toMatch(/^[a-z0-9-]+$/);
            expect(param.slug.length).toBeGreaterThan(0);
            expect(param.slug.length).toBeLessThan(200);
          });

          // For successful API calls, verify API data is included
          if (failureType === 'success_with_data') {
            expect(generatedSlugs.has('api-article-1')).toBe(true);
            expect(generatedSlugs.has('api-article-2')).toBe(true);
          }

          // Clean up
          if (envSlugs.length > 0) {
            delete process.env.STATIC_NEWS_SLUGS;
          }

          return true;
        }
      ),
      { numRuns: 20 }
    );
  });

  test('Property 4: Build Resilience - Local data should always be available as fallback', async () => {
    await fc.assert(
      fc.asyncProperty(
        envSlugArbitrary,
        async (envSlugs) => {
          // Setup environment variables if provided
          if (envSlugs.length > 0) {
            process.env.STATIC_NEWS_SLUGS = envSlugs.join(',');
          }

          // Mock API failure to test fallback behavior
          const { listNews } = await import('@/lib/api/news');
          const mockListNews = vi.mocked(listNews);
          mockListNews.mockRejectedValue(new Error('Network failure'));

          // Import and execute generateStaticParams
          const { generateStaticParams } = await import('@/app/news/[slug]/page');
          const staticParams = await generateStaticParams();

          // Calculate expected minimum slugs (local + env + fallbacks)
          const expectedSlugs = new Set<string>();
          
          // Add local sample data slugs
          getPublishedNews().forEach(article => {
            expectedSlugs.add(decodeURIComponent(article.slug.trim().toLowerCase()));
          });
          
          // Add environment variable slugs
          envSlugs.forEach(slug => {
            expectedSlugs.add(decodeURIComponent(slug.trim().toLowerCase()));
          });

          // Add fallback pages that are always included
          const fallbacks = ['latest-news', 'breaking-news', 'featured-story', 'announcement'];
          fallbacks.forEach(fallback => {
            expectedSlugs.add(fallback);
          });

          const generatedSlugs = new Set(staticParams.map(param => param.slug));

          // Verify all expected slugs are present
          expectedSlugs.forEach(expectedSlug => {
            expect(generatedSlugs.has(expectedSlug)).toBe(true);
          });

          // Verify the count is at least what we expect
          expect(generatedSlugs.size).toBeGreaterThanOrEqual(expectedSlugs.size);

          // Clean up environment variable
          if (envSlugs.length > 0) {
            delete process.env.STATIC_NEWS_SLUGS;
          }

          return true;
        }
      ),
      { numRuns: 20 }
    );
  });

  test('Property 4: Build Resilience - Error handling should be consistent', async () => {
    // Mock API failure to test consistency
    const { listNews } = await import('@/lib/api/news');
    const mockListNews = vi.mocked(listNews);
    mockListNews.mockRejectedValue(new Error('Consistent network failure'));

    // Import and execute generateStaticParams multiple times
    const { generateStaticParams } = await import('@/app/news/[slug]/page');
    
    // Run multiple times to test consistency
    const results = [];
    for (let i = 0; i < 5; i++) {
      const staticParams = await generateStaticParams();
      results.push(staticParams);
    }

    // All results should be consistent
    results.forEach((result, index) => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      
      // All results should include local data
      const generatedSlugs = new Set(result.map(param => param.slug));
      const localSlugs = getPublishedNews().map(article => 
        decodeURIComponent(article.slug.trim().toLowerCase())
      );

      localSlugs.forEach(localSlug => {
        expect(generatedSlugs.has(localSlug)).toBe(true);
      });

      // All slugs should be valid
      result.forEach(param => {
        expect(param.slug).toMatch(/^[a-z0-9-]+$/);
        expect(param.slug.length).toBeGreaterThan(0);
      });
    });
  });

  test('Property 4: Build Resilience - Fallback pages are always included', async () => {
    // Mock API failure to test fallback behavior
    const { listNews } = await import('@/lib/api/news');
    const mockListNews = vi.mocked(listNews);
    mockListNews.mockRejectedValue(new Error('API unavailable'));

    // Import and execute generateStaticParams
    const { generateStaticParams } = await import('@/app/news/[slug]/page');
    const staticParams = await generateStaticParams();

    const generatedSlugs = new Set(staticParams.map(param => param.slug));
    
    // Verify fallback pages are always included
    const expectedFallbacks = ['latest-news', 'breaking-news', 'featured-story', 'announcement'];
    expectedFallbacks.forEach(fallback => {
      expect(generatedSlugs.has(fallback)).toBe(true);
    });
  });

  test('Property 4: Build Resilience - Environment variables work with different formats', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.oneof(
            fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/), // lowercase
            fc.stringMatching(/^[A-Z0-9]+(-[A-Z0-9]+)*$/), // uppercase
          ),
          { minLength: 1, maxLength: 3 }
        ),
        fc.constantFrom('STATIC_NEWS_SLUGS', 'NEXT_PUBLIC_STATIC_NEWS_SLUGS'),
        async (testSlugs, envVarName) => {
          // Setup environment variable
          process.env[envVarName] = testSlugs.join(',');

          // Mock API failure to test environment variable handling during failures
          const { listNews } = await import('@/lib/api/news');
          const mockListNews = vi.mocked(listNews);
          mockListNews.mockRejectedValue(new Error('API failure during env var test'));

          // Import and execute generateStaticParams
          const { generateStaticParams } = await import('@/app/news/[slug]/page');
          const staticParams = await generateStaticParams();

          // Verify all environment slugs are included (normalized to lowercase)
          const generatedSlugs = new Set(staticParams.map(param => param.slug));
          
          testSlugs.forEach(testSlug => {
            const normalizedSlug = decodeURIComponent(testSlug.trim().toLowerCase());
            expect(generatedSlugs.has(normalizedSlug)).toBe(true);
          });

          // Clean up environment variable
          delete process.env[envVarName];

          return true;
        }
      ),
      { numRuns: 20 }
    );
  });
});