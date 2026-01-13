import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { sampleNews, getNewsBySlug, getPublishedNews } from '@/lib/data/sample-news';

// Mock the API module to simulate various failure scenarios
vi.mock('@/lib/api/news', () => ({
  listNews: vi.fn(),
  findNewsBySlug: vi.fn(),
}));

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NOT_FOUND');
  }),
}));

/**
 * Feature: static-deployment-fix, Property 6: Fallback Data Reliability
 * 
 * Property 6: Fallback Data Reliability
 * For any API unavailability scenario, the system should serve content using 
 * local sample data without user-visible errors.
 * 
 * Validates: Requirements 3.2
 */

describe('Fallback Data Reliability Property Tests', () => {
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Clear module cache to ensure fresh imports
    vi.resetModules();
  });

  // Generator for existing slugs in sample data
  const existingSlugArbitrary = fc.constantFrom(
    ...getPublishedNews().map(article => article.slug)
  );

  // Generator for different API failure types
  const apiFailureArbitrary = fc.oneof(
    fc.constant({ type: 'network', error: new Error('ECONNREFUSED') }),
    fc.constant({ type: 'timeout', error: new Error('Request timeout') }),
    fc.constant({ type: 'server_error', error: new Error('API Error: 500 Internal Server Error') }),
    fc.constant({ type: 'parse_error', error: new Error('JSON parse error') }),
    fc.constant({ type: 'dns_error', error: new Error('ENOTFOUND') }),
    fc.constant({ type: 'connection_reset', error: new Error('ECONNRESET') }),
  );

  test('Property 6: Fallback Data Reliability - API failures should fallback to local data seamlessly', async () => {
    await fc.assert(
      fc.asyncProperty(
        existingSlugArbitrary,
        apiFailureArbitrary,
        async (existingSlug, failureScenario) => {
          // Mock API to fail with the specified error type
          const { findNewsBySlug } = await import('@/lib/api/news');
          const mockFindNewsBySlug = vi.mocked(findNewsBySlug);
          mockFindNewsBySlug.mockRejectedValue(failureScenario.error);

          // Import the page component
          const pageModule = await import('@/app/news/[slug]/page');
          const NewsArticlePage = pageModule.default;

          // Test that API failure falls back to local data
          const params = Promise.resolve({ slug: existingSlug });

          try {
            const result = await NewsArticlePage({ params });
            
            // Should successfully render using local data
            expect(result).toBeDefined();
            
            // Verify API was called first (proper fallback sequence)
            expect(mockFindNewsBySlug).toHaveBeenCalledWith(existingSlug.toLowerCase().trim());
            
            // Verify local data exists for this slug
            const localArticle = getNewsBySlug(existingSlug);
            expect(localArticle).toBeDefined();
            expect(localArticle?.slug).toBe(existingSlug);
            
          } catch (error: any) {
            // If notFound is called, it means local fallback failed
            // This should not happen for existing slugs in sample data
            if (error.message === 'NOT_FOUND') {
              expect.fail(`Local fallback failed for existing slug: ${existingSlug}. Error type: ${failureScenario.type}`);
            } else {
              // Re-throw unexpected errors for debugging
              throw new Error(`Unexpected error for slug ${existingSlug} with ${failureScenario.type}: ${error.message}`);
            }
          }

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 6: Fallback Data Reliability - Local data should always be available', async () => {
    await fc.assert(
      fc.asyncProperty(
        existingSlugArbitrary,
        async (existingSlug) => {
          // Verify local data is consistently available
          const localArticle = getNewsBySlug(existingSlug);
          
          // Local data should exist for all published articles
          expect(localArticle).toBeDefined();
          expect(localArticle?.slug).toBe(existingSlug);
          expect(localArticle?.status).toBe('published');
          
          // Local data should have required fields
          expect(localArticle?.title).toBeTruthy();
          expect(localArticle?.content).toBeTruthy();
          expect(localArticle?.excerpt).toBeTruthy();
          expect(localArticle?.published_at).toBeTruthy();
          
          // Slug should be properly formatted
          expect(localArticle?.slug).toMatch(/^[a-z0-9-]+$/);
          expect(localArticle?.slug.length).toBeGreaterThan(0);
          expect(localArticle?.slug.length).toBeLessThan(200);

          return true;
        }
      ),
      { numRuns: 15 }
    );
  });

  test('Property 6: Fallback Data Reliability - Fallback should work across different error types', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...getPublishedNews().slice(0, 2).map(a => a.slug)), // Test with first 2 articles for speed
        fc.array(apiFailureArbitrary, { minLength: 1, maxLength: 2 }),
        async (testSlug, failureTypes) => {
          // Test multiple failure types in sequence
          for (const failureScenario of failureTypes) {
            // Mock API to fail with this specific error type
            const { findNewsBySlug } = await import('@/lib/api/news');
            const mockFindNewsBySlug = vi.mocked(findNewsBySlug);
            mockFindNewsBySlug.mockRejectedValue(failureScenario.error);

            // Import the page component
            const pageModule = await import('@/app/news/[slug]/page');
            const NewsArticlePage = pageModule.default;

            const params = Promise.resolve({ slug: testSlug });

            try {
              const result = await NewsArticlePage({ params });
              
              // Should successfully render using local data regardless of error type
              expect(result).toBeDefined();
              
              // Verify API was called
              expect(mockFindNewsBySlug).toHaveBeenCalledWith(testSlug.toLowerCase().trim());
              
            } catch (error: any) {
              if (error.message === 'NOT_FOUND') {
                expect.fail(`Fallback failed for ${testSlug} with error type ${failureScenario.type}`);
              } else {
                throw error;
              }
            }

            // Reset mock for next iteration
            vi.clearAllMocks();
          }

          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 6: Fallback Data Reliability - Related news should also fallback gracefully', async () => {
    await fc.assert(
      fc.asyncProperty(
        existingSlugArbitrary,
        apiFailureArbitrary,
        async (existingSlug, failureScenario) => {
          // Mock both findNewsBySlug and listNews to fail
          const { findNewsBySlug, listNews } = await import('@/lib/api/news');
          const mockFindNewsBySlug = vi.mocked(findNewsBySlug);
          const mockListNews = vi.mocked(listNews);
          
          mockFindNewsBySlug.mockRejectedValue(failureScenario.error);
          mockListNews.mockRejectedValue(failureScenario.error);

          // Import the page component
          const pageModule = await import('@/app/news/[slug]/page');
          const NewsArticlePage = pageModule.default;

          const params = Promise.resolve({ slug: existingSlug });

          try {
            const result = await NewsArticlePage({ params });
            
            // Should successfully render using local data
            expect(result).toBeDefined();
            
            // Verify both API calls were attempted
            expect(mockFindNewsBySlug).toHaveBeenCalledWith(existingSlug.toLowerCase().trim());
            expect(mockListNews).toHaveBeenCalled();
            
            // Verify local data is available for related articles fallback
            const publishedArticles = getPublishedNews();
            expect(publishedArticles.length).toBeGreaterThan(0);
            
          } catch (error: any) {
            if (error.message === 'NOT_FOUND') {
              expect.fail(`Complete fallback failed for ${existingSlug} with error type ${failureScenario.type}`);
            } else {
              throw error;
            }
          }

          return true;
        }
      ),
      { numRuns: 8 }
    );
  });

  test('Property 6: Fallback Data Reliability - Fallback data should be consistent', async () => {
    await fc.assert(
      fc.asyncProperty(
        existingSlugArbitrary,
        async (existingSlug) => {
          // Test that fallback data is consistent across multiple calls
          const results = [];
          
          for (let i = 0; i < 3; i++) {
            const localArticle = getNewsBySlug(existingSlug);
            results.push(localArticle);
          }
          
          // All results should be identical
          results.forEach((result, index) => {
            expect(result).toBeDefined();
            expect(result?.slug).toBe(existingSlug);
            
            // Compare with first result
            if (index > 0) {
              expect(result?.id).toBe(results[0]?.id);
              expect(result?.title).toBe(results[0]?.title);
              expect(result?.content).toBe(results[0]?.content);
              expect(result?.published_at).toBe(results[0]?.published_at);
            }
          });

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 6: Fallback Data Reliability - Fallback should handle concurrent requests', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(existingSlugArbitrary, { minLength: 2, maxLength: 3 }),
        apiFailureArbitrary,
        async (testSlugs, failureScenario) => {
          // Mock API to fail
          const { findNewsBySlug } = await import('@/lib/api/news');
          const mockFindNewsBySlug = vi.mocked(findNewsBySlug);
          mockFindNewsBySlug.mockRejectedValue(failureScenario.error);

          // Import the page component
          const pageModule = await import('@/app/news/[slug]/page');
          const NewsArticlePage = pageModule.default;

          // Test concurrent requests
          const promises = testSlugs.map(slug => {
            const params = Promise.resolve({ slug });
            return NewsArticlePage({ params }).catch(error => {
              if (error.message === 'NOT_FOUND') {
                throw new Error(`Concurrent fallback failed for ${slug}`);
              }
              throw error;
            });
          });

          try {
            const results = await Promise.all(promises);
            
            // All requests should succeed using fallback data
            expect(results.length).toBe(testSlugs.length);
            results.forEach(result => {
              expect(result).toBeDefined();
            });
            
          } catch (error: any) {
            expect.fail(`Concurrent fallback test failed: ${error.message}`);
          }

          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 6: Fallback Data Reliability - Sample data integrity', async () => {
    // Test that sample data is properly structured and complete
    const publishedArticles = getPublishedNews();
    
    // Should have published articles available
    expect(publishedArticles.length).toBeGreaterThan(0);
    
    // Each article should have required fields
    publishedArticles.forEach(article => {
      expect(article.id).toBeDefined();
      expect(article.slug).toBeTruthy();
      expect(article.title).toBeTruthy();
      expect(article.content).toBeTruthy();
      expect(article.excerpt).toBeTruthy();
      expect(article.published_at).toBeTruthy();
      expect(article.status).toBe('published');
      
      // Slug should be properly formatted
      expect(article.slug).toMatch(/^[a-z0-9-]+$/);
      expect(article.slug.length).toBeGreaterThan(0);
      expect(article.slug.length).toBeLessThan(200);
    });
    
    // Slugs should be unique
    const slugs = publishedArticles.map(a => a.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  test('Property 6: Fallback Data Reliability - Fallback performance should be acceptable', async () => {
    await fc.assert(
      fc.asyncProperty(
        existingSlugArbitrary,
        async (existingSlug) => {
          // Test that fallback data access is fast
          const startTime = Date.now();
          
          const localArticle = getNewsBySlug(existingSlug);
          
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          // Fallback should be very fast (under 10ms)
          expect(duration).toBeLessThan(10);
          expect(localArticle).toBeDefined();

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });
});