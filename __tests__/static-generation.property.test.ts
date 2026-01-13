import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { sampleNews, getPublishedNews } from '@/lib/data/sample-news';

// Mock the API module to prevent real network calls during testing
vi.mock('@/lib/api/news', () => ({
  listNews: vi.fn(),
  findNewsBySlug: vi.fn(),
}));

describe('Static Generation Completeness Property Tests', () => {
  beforeEach(() => {
    // Reset environment variables
    delete process.env.STATIC_NEWS_SLUGS;
    delete process.env.NEXT_PUBLIC_STATIC_NEWS_SLUGS;
    
    // Reset all mocks
    vi.clearAllMocks();
  });

  // Generator for valid slug patterns
  const validSlugArbitrary = fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/);

  // Generator for environment variable slugs
  const envSlugArbitrary = fc.array(validSlugArbitrary, { minLength: 0, maxLength: 5 });

  test('Property 3: Static Generation Completeness - Local sample data should always be included', async () => {
    // Mock API to return some test data quickly
    const { listNews } = await import('@/lib/api/news');
    const mockListNews = listNews as any;
    
    await fc.assert(
      fc.asyncProperty(
        envSlugArbitrary,
        fc.array(validSlugArbitrary, { minLength: 0, maxLength: 3 }), // Mock API slugs
        async (envSlugs, apiSlugs) => {
          // Setup environment variables if provided
          if (envSlugs.length > 0) {
            process.env.STATIC_NEWS_SLUGS = envSlugs.join(',');
          }

          // Mock API response with generated test data
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

          // Import the function after mocking
          const { generateStaticParams } = await import('@/app/news/[slug]/page');
          
          // Execute the function - should now be fast with mocked API
          const staticParams = await generateStaticParams();

          // Verify basic structure
          expect(Array.isArray(staticParams)).toBe(true);
          expect(staticParams.length).toBeGreaterThan(0);

          // Verify all local sample data slugs are included
          const generatedSlugs = new Set(staticParams.map(param => param.slug));
          const localSlugs = getPublishedNews().map(article => 
            decodeURIComponent(article.slug.trim().toLowerCase())
          );

          localSlugs.forEach(localSlug => {
            expect(generatedSlugs.has(localSlug)).toBe(true);
          });

          // Verify environment variable slugs are included
          envSlugs.forEach(envSlug => {
            const normalizedSlug = decodeURIComponent(envSlug.trim().toLowerCase());
            expect(generatedSlugs.has(normalizedSlug)).toBe(true);
          });

          // Verify API slugs are included
          apiSlugs.forEach(apiSlug => {
            const normalizedSlug = decodeURIComponent(apiSlug.trim().toLowerCase());
            expect(generatedSlugs.has(normalizedSlug)).toBe(true);
          });

          // Verify all generated slugs are valid
          staticParams.forEach(param => {
            expect(param.slug).toMatch(/^[a-z0-9-]+$/);
            expect(param.slug.length).toBeGreaterThan(0);
            expect(param.slug.length).toBeLessThan(200);
          });

          // Clean up
          if (envSlugs.length > 0) {
            delete process.env.STATIC_NEWS_SLUGS;
          }

          return true;
        }
      ),
      { numRuns: 5 } // Reduced for faster execution
    );
  });

  test('Property 3: Static Generation Completeness - Environment variable slugs should be included', async () => {
    const { listNews } = await import('@/lib/api/news');
    const mockListNews = listNews as any;
    
    await fc.assert(
      fc.asyncProperty(
        fc.array(validSlugArbitrary, { minLength: 1, maxLength: 3 }),
        fc.constantFrom('STATIC_NEWS_SLUGS', 'NEXT_PUBLIC_STATIC_NEWS_SLUGS'),
        async (envSlugs, envVarName) => {
          // Setup environment variable
          process.env[envVarName] = envSlugs.join(',');

          // Mock API to return empty response quickly
          mockListNews.mockResolvedValue({
            data: [],
            meta: {
              current_page: 1,
              last_page: 1,
              per_page: 50,
              total: 0
            }
          });

          // Import and execute generateStaticParams
          const { generateStaticParams } = await import('@/app/news/[slug]/page');
          const staticParams = await generateStaticParams();

          // Verify all environment slugs are included
          const generatedSlugs = new Set(staticParams.map(param => param.slug));
          
          envSlugs.forEach(envSlug => {
            const normalizedSlug = decodeURIComponent(envSlug.trim().toLowerCase());
            expect(generatedSlugs.has(normalizedSlug)).toBe(true);
          });

          // Clean up environment variable
          delete process.env[envVarName];

          return true;
        }
      ),
      { numRuns: 5 } // Reduced for faster execution
    );
  });

  test('Property 3: Static Generation Completeness - Slug normalization should be consistent', async () => {
    const { listNews } = await import('@/lib/api/news');
    const mockListNews = listNews as any;
    
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.oneof(
            fc.stringMatching(/^[A-Z0-9]+(-[A-Z0-9]+)*$/), // Uppercase
            fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/), // Lowercase
          ),
          { minLength: 1, maxLength: 3 }
        ),
        async (testSlugs) => {
          // Setup environment variable with mixed case slugs
          process.env.STATIC_NEWS_SLUGS = testSlugs.join(',');

          // Mock API to return empty response quickly
          mockListNews.mockResolvedValue({
            data: [],
            meta: {
              current_page: 1,
              last_page: 1,
              per_page: 50,
              total: 0
            }
          });

          // Import and execute generateStaticParams
          const { generateStaticParams } = await import('@/app/news/[slug]/page');
          const staticParams = await generateStaticParams();

          // Verify all slugs are normalized consistently
          staticParams.forEach(param => {
            // Should be lowercase
            expect(param.slug).toBe(param.slug.toLowerCase());
            
            // Should be URL decoded
            expect(param.slug).toBe(decodeURIComponent(param.slug));
            
            // Should not have leading/trailing whitespace
            expect(param.slug).toBe(param.slug.trim());
            
            // Should match valid slug pattern
            expect(param.slug).toMatch(/^[a-z0-9-]+$/);
          });

          // Clean up
          delete process.env.STATIC_NEWS_SLUGS;

          return true;
        }
      ),
      { numRuns: 5 } // Reduced for faster execution
    );
  });

  test('Property 3: Static Generation Completeness - All published articles have valid slugs', async () => {
    const publishedArticles = getPublishedNews();
    
    // Property: Every published article should have a slug that works with static generation
    publishedArticles.forEach(article => {
      // Verify slug format
      expect(article.slug).toMatch(/^[a-z0-9-]+$/);
      expect(article.slug.length).toBeGreaterThan(0);
      expect(article.slug.length).toBeLessThan(200);
      
      // Verify slug uniqueness (no duplicates that would cause conflicts)
      const duplicates = publishedArticles.filter(a => a.slug === article.slug);
      expect(duplicates.length).toBe(1);
    });
  });

  test('Property 3: Static Generation Completeness - Fallback pages are included', async () => {
    const { listNews } = await import('@/lib/api/news');
    const mockListNews = listNews as any;
    
    // Mock API to return empty response
    mockListNews.mockResolvedValue({
      data: [],
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: 50,
        total: 0
      }
    });

    // Import and execute generateStaticParams
    const { generateStaticParams } = await import('@/app/news/[slug]/page');
    const staticParams = await generateStaticParams();

    const generatedSlugs = new Set(staticParams.map(param => param.slug));
    
    // Verify fallback pages are included
    const expectedFallbacks = ['latest-news', 'breaking-news', 'featured-story', 'announcement'];
    expectedFallbacks.forEach(fallback => {
      expect(generatedSlugs.has(fallback)).toBe(true);
    });
  });
});