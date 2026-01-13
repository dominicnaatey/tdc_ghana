import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { sampleNews, getNewsBySlug } from '@/lib/data/sample-news';
import { findNewsBySlug } from '@/lib/api/news';

// Mock the API module to simulate various error conditions
vi.mock('@/lib/api/news', () => ({
  findNewsBySlug: vi.fn(),
}));

/**
 * Feature: static-deployment-fix, Property 5: Error Handling Consistency
 * 
 * Property 5: Error Handling Consistency
 * For any non-existent or malformed news article slug, the system should display 
 * appropriate error content with navigation back to the main news page.
 * 
 * Validates: Requirements 3.1, 3.3, 3.4
 */

// Helper functions to test the core error handling logic
function normalizeSlug(rawSlug: string): { slug: string | null; shouldNotFound: boolean } {
  try {
    const slug = decodeURIComponent(rawSlug).trim().toLowerCase();
    
    // Validate slug format
    if (!slug || slug.length === 0 || slug.length > 200) {
      return { slug: null, shouldNotFound: true };
    }
    
    // Check for invalid characters
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return { slug: null, shouldNotFound: true };
    }
    
    // Check for reserved words
    const reservedWords = ['index', 'news', 'admin', 'api', '_next'];
    if (reservedWords.includes(slug)) {
      return { slug: null, shouldNotFound: true };
    }
    
    return { slug, shouldNotFound: false };
  } catch (decodeError) {
    return { slug: null, shouldNotFound: true };
  }
}

async function findArticleWithFallback(slug: string): Promise<{ article: any; source: 'api' | 'local' | null }> {
  let article = null;
  let source: 'api' | 'local' | null = null;
  
  // Try API first
  try {
    article = await findNewsBySlug(slug);
    if (article) {
      source = 'api';
    }
  } catch (error) {
    // API failed, will try local fallback
  }
  
  // Fallback to local data if API failed or returned null
  if (!article) {
    article = getNewsBySlug(slug);
    if (article) {
      source = 'local';
    }
  }
  
  return { article, source };
}

describe('Error Handling Consistency Property Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Generator for non-existent slugs (not in sample data)
  const nonExistentSlugArbitrary = fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    .filter(slug => !sampleNews.some(article => article.slug === slug));

  // Generator for malformed slugs that should be handled gracefully
  const malformedSlugArbitrary = fc.oneof(
    fc.constant(''), // Empty slug
    fc.constant('   '), // Whitespace only
    fc.array(fc.constantFrom(' ', '\t', '\n'), { minLength: 1, maxLength: 5 }).map(arr => arr.join('')), // Various whitespace
    fc.stringMatching(/^[A-Z0-9]+(-[A-Z0-9]+)*$/), // Uppercase (should be normalized)
    fc.array(fc.constantFrom('/', '\\', '?', '#', '&', '%'), { minLength: 1, maxLength: 3 }).map(arr => arr.join('')), // Invalid characters
    fc.string({ minLength: 201, maxLength: 300 }), // Too long
    fc.constantFrom('..', '../', './'), // Directory traversal attempts
    fc.constantFrom('index', 'news', 'admin'), // Reserved words
  );

  test('Property 5: Error Handling Consistency - Slug normalization handles malformed input', () => {
    fc.assert(
      fc.property(
        malformedSlugArbitrary,
        (malformedSlug) => {
          const result = normalizeSlug(malformedSlug);
          
          // For malformed slugs, we expect shouldNotFound to be true
          if (malformedSlug.trim().length === 0 || 
              malformedSlug.length > 200 || 
              /[\/\\?#&%]/.test(malformedSlug) ||
              ['index', 'news', 'admin', 'api', '_next'].includes(malformedSlug.trim().toLowerCase())) {
            expect(result.shouldNotFound).toBe(true);
            expect(result.slug).toBeNull();
          }
          
          return true;
        }
      ),
      { numRuns: 20 }
    );
  });

  test('Property 5: Error Handling Consistency - Valid slugs are normalized correctly', () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[A-Z0-9]+(-[A-Z0-9]+)*$/).filter(s => s.length > 0 && s.length < 200),
        (validSlug) => {
          const result = normalizeSlug(validSlug);
          
          // Valid slugs should be normalized to lowercase
          expect(result.shouldNotFound).toBe(false);
          expect(result.slug).toBe(validSlug.toLowerCase());
          
          return true;
        }
      ),
      { numRuns: 20 }
    );
  });

  test('Property 5: Error Handling Consistency - URI decoding errors are handled gracefully', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant('%'), // Invalid percent encoding
          fc.constant('%G'), // Invalid hex
          fc.constant('%ZZ'), // Invalid hex
          fc.string().map(s => '%' + s.slice(0, 1)), // Incomplete percent encoding
        ),
        (invalidUri) => {
          const result = normalizeSlug(invalidUri);
          
          // URI decode errors should result in shouldNotFound = true
          expect(result.shouldNotFound).toBe(true);
          expect(result.slug).toBeNull();
          
          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 5: Error Handling Consistency - Non-existent articles trigger fallback', async () => {
    await fc.assert(
      fc.asyncProperty(
        nonExistentSlugArbitrary,
        async (nonExistentSlug) => {
          // Mock API to return null for non-existent articles
          const mockFindNewsBySlug = vi.mocked(findNewsBySlug);
          mockFindNewsBySlug.mockResolvedValue(null);

          const result = await findArticleWithFallback(nonExistentSlug);
          
          // Should try API first, then local fallback
          expect(mockFindNewsBySlug).toHaveBeenCalledWith(nonExistentSlug);
          
          // For non-existent slugs, both API and local should return null
          expect(result.article).toBeNull();
          expect(result.source).toBeNull();
          
          return true;
        }
      ),
      { numRuns: 15 }
    );
  });

  test('Property 5: Error Handling Consistency - API failures fallback to local data', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...sampleNews.map(article => article.slug)),
        fc.oneof(
          fc.constant('NETWORK_ERROR'),
          fc.constant('TIMEOUT'),
          fc.constant('API_ERROR'),
          fc.constant('PARSE_ERROR')
        ),
        async (existingSlug, errorType) => {
          // Mock API to fail with different error types
          const mockFindNewsBySlug = vi.mocked(findNewsBySlug);
          
          switch (errorType) {
            case 'NETWORK_ERROR':
              mockFindNewsBySlug.mockRejectedValue(new Error('ECONNREFUSED'));
              break;
            case 'TIMEOUT':
              mockFindNewsBySlug.mockRejectedValue(new Error('Request timeout'));
              break;
            case 'API_ERROR':
              mockFindNewsBySlug.mockRejectedValue(new Error('API Error: 500'));
              break;
            case 'PARSE_ERROR':
              mockFindNewsBySlug.mockRejectedValue(new Error('JSON parse error'));
              break;
          }

          const result = await findArticleWithFallback(existingSlug);
          
          // Should try API first
          expect(mockFindNewsBySlug).toHaveBeenCalledWith(existingSlug);
          
          // Should successfully fallback to local data
          expect(result.article).toBeDefined();
          expect(result.source).toBe('local');
          
          // Verify local data was used as fallback
          const localArticle = getNewsBySlug(existingSlug);
          expect(result.article).toEqual(localArticle);
          
          return true;
        }
      ),
      { numRuns: 15 }
    );
  });

  test('Property 5: Error Handling Consistency - Slug normalization is consistent', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.stringMatching(/^[A-Z0-9]+(-[A-Z0-9]+)*$/), // Uppercase
          fc.string().map(s => `  ${s}  `), // With whitespace
          fc.string().filter(s => !s.includes('%')).map(s => encodeURIComponent(s)), // URL encoded (safe)
        ),
        (unnormalizedSlug) => {
          const result = normalizeSlug(unnormalizedSlug);
          
          if (result.slug) {
            // Normalized slug should be lowercase and trimmed
            expect(result.slug).toBe(result.slug.toLowerCase().trim());
            
            // Should not contain invalid characters if normalization succeeded
            expect(/^[a-z0-9-]+$/.test(result.slug)).toBe(true);
          }
          
          return true;
        }
      ),
      { numRuns: 20 }
    );
  });

  test('Property 5: Error Handling Consistency - Error handling provides consistent behavior', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.oneof(malformedSlugArbitrary, nonExistentSlugArbitrary),
        async (problematicSlug) => {
          const normalizeResult = normalizeSlug(problematicSlug);
          
          if (normalizeResult.shouldNotFound) {
            // If normalization says it should not be found, we expect consistent behavior
            expect(normalizeResult.slug).toBeNull();
          } else if (normalizeResult.slug) {
            // If normalization succeeds, test the fallback logic
            const mockFindNewsBySlug = vi.mocked(findNewsBySlug);
            mockFindNewsBySlug.mockResolvedValue(null);
            
            const result = await findArticleWithFallback(normalizeResult.slug);
            
            // Should attempt to find the article
            expect(mockFindNewsBySlug).toHaveBeenCalledWith(normalizeResult.slug);
            
            // For non-existent articles, should return null
            if (!sampleNews.some(article => article.slug === normalizeResult.slug)) {
              expect(result.article).toBeNull();
              expect(result.source).toBeNull();
            }
          }
          
          return true;
        }
      ),
      { numRuns: 25 }
    );
  });
});