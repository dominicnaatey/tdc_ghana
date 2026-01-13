import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Clock,
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { findNewsBySlug, listNews } from "@/lib/api/news";
import { getNewsBySlug, sampleNews } from "@/lib/data/sample-news";

// Pre-generate static paths for export mode with enhanced error handling and pagination
export async function generateStaticParams() {
  const DEBUG = String(process.env.NEXT_PUBLIC_DEBUG_NEWS || process.env.DEBUG_NEWS || "false").toLowerCase() === "true";
  
  if (DEBUG) {
    console.debug("[generateStaticParams] Starting static path generation");
  }

  // Allow explicit overrides via env for static export
  const envList = String(
    process.env.STATIC_NEWS_SLUGS ||
      process.env.NEXT_PUBLIC_STATIC_NEWS_SLUGS ||
      ""
  )
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (DEBUG && envList.length > 0) {
    console.debug("[generateStaticParams] Environment slugs:", envList);
  }

  const slugs = new Set<string>();
  let apiSuccessful = false;
  let totalApiArticles = 0;

  // Enhanced API data fetching with comprehensive error handling and pagination
  try {
    if (DEBUG) {
      console.debug("[generateStaticParams] Attempting to fetch remote news data");
    }

    // Fetch first page to determine pagination
    const first = await listNews({
      page: 1,
      per_page: 50,
      sort: "published_at",
      order: "desc",
    });

    const lastPage = Math.max(1, Number(first.meta?.last_page || 1));
    const totalItems = Number(first.meta?.total || 0);
    
    if (DEBUG) {
      console.debug("[generateStaticParams] API pagination info:", {
        currentPage: first.meta?.page,
        lastPage,
        perPage: first.meta?.per_page,
        total: totalItems
      });
    }

    // Helper function to safely extract slugs from API response
    const addSlugsFromPayload = (payload: any, pageNum: number) => {
      const articles = payload?.data || [];
      let pageArticleCount = 0;
      
      for (const article of articles) {
        const raw = article?.slug;
        if (typeof raw === "string" && raw.trim().length > 0) {
          const normalizedSlug = decodeURIComponent(raw.trim().toLowerCase());
          // Only include published articles for static generation
          if (article?.status === 'published' || !article?.status) {
            slugs.add(normalizedSlug);
            pageArticleCount++;
            totalApiArticles++;
          }
        }
      }
      
      if (DEBUG) {
        console.debug(`[generateStaticParams] Page ${pageNum}: added ${pageArticleCount} published articles`);
      }
    };

    // Process first page
    addSlugsFromPayload(first, 1);

    // Handle pagination for large datasets
    if (lastPage > 1) {
      if (DEBUG) {
        console.debug(`[generateStaticParams] Processing ${lastPage - 1} additional pages`);
      }

      const pagePromises = [];
      
      // Fetch remaining pages with controlled concurrency
      for (let page = 2; page <= lastPage; page++) {
        const pagePromise = listNews({
          page,
          per_page: 50,
          sort: "published_at",
          order: "desc",
        })
        .then(pagePayload => {
          addSlugsFromPayload(pagePayload, page);
          return { page, success: true };
        })
        .catch(error => {
          if (DEBUG) {
            console.warn(`[generateStaticParams] Failed to fetch page ${page}:`, error.message);
          }
          return { page, success: false, error: error.message };
        });
        
        pagePromises.push(pagePromise);
      }

      // Wait for all page requests to complete (allowing partial failures)
      const pageResults = await Promise.allSettled(pagePromises);
      
      if (DEBUG) {
        const successful = pageResults.filter(r => r.status === 'fulfilled' && r.value.success).length;
        const failed = pageResults.length - successful;
        console.debug(`[generateStaticParams] Pagination results: ${successful} successful, ${failed} failed`);
      }
    }

    apiSuccessful = true;
    
    if (DEBUG) {
      console.debug(`[generateStaticParams] API fetch completed successfully. Total articles: ${totalApiArticles}`);
    }

  } catch (error) {
    // Comprehensive error handling for API failures during build
    if (DEBUG) {
      console.warn("[generateStaticParams] API fetch failed:", error);
    }
    
    // Log specific error types for debugging
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED') || error.message.includes('ETIMEDOUT')) {
        if (DEBUG) {
          console.warn("[generateStaticParams] Network connectivity issue detected");
        }
      } else if (error.message.includes('fetch failed') || error.message.includes('Request timeout')) {
        if (DEBUG) {
          console.warn("[generateStaticParams] Request timeout or fetch failure detected");
        }
      } else {
        if (DEBUG) {
          console.warn("[generateStaticParams] Unexpected API error:", error.message);
        }
      }
    }
  }

  // Always include local sample data for resilience (Requirements 2.3, 2.5)
  let localArticleCount = 0;
  for (const article of sampleNews) {
    const raw = article?.slug;
    if (typeof raw === "string" && raw.trim().length > 0 && article.status === 'published') {
      const normalizedSlug = decodeURIComponent(raw.trim().toLowerCase());
      slugs.add(normalizedSlug);
      localArticleCount++;
    }
  }

  if (DEBUG) {
    console.debug(`[generateStaticParams] Added ${localArticleCount} local sample articles`);
  }

  // Include environment variable overrides for additional slugs (Requirements 2.4, 2.5)
  let envArticleCount = 0;
  for (const envSlug of envList) {
    if (envSlug && envSlug.trim().length > 0) {
      const normalizedSlug = decodeURIComponent(envSlug.trim().toLowerCase());
      slugs.add(normalizedSlug);
      envArticleCount++;
    }
  }

  if (DEBUG && envArticleCount > 0) {
    console.debug(`[generateStaticParams] Added ${envArticleCount} environment variable slugs`);
  }

  // Generate fallback pages for common routing scenarios (Requirements 2.4)
  const commonFallbacks = [
    'latest-news',
    'breaking-news', 
    'featured-story',
    'announcement'
  ];
  
  let fallbackCount = 0;
  for (const fallback of commonFallbacks) {
    if (!slugs.has(fallback)) {
      slugs.add(fallback);
      fallbackCount++;
    }
  }

  if (DEBUG && fallbackCount > 0) {
    console.debug(`[generateStaticParams] Added ${fallbackCount} fallback routing pages`);
  }

  const finalSlugs = Array.from(slugs).map((slug) => ({ slug }));

  if (DEBUG) {
    console.debug("[generateStaticParams] Final summary:", {
      totalSlugs: finalSlugs.length,
      apiSuccessful,
      apiArticles: totalApiArticles,
      localArticles: localArticleCount,
      envArticles: envArticleCount,
      fallbackPages: fallbackCount,
      slugs: finalSlugs.map(s => s.slug).slice(0, 10) // Show first 10 for debugging
    });
  }

  // Validate all generated slugs are properly formatted
  const validatedSlugs = finalSlugs.filter(({ slug }) => {
    const isValid = /^[a-z0-9-]+$/.test(slug) && slug.length > 0 && slug.length < 200;
    if (!isValid && DEBUG) {
      console.warn(`[generateStaticParams] Invalid slug filtered out: "${slug}"`);
    }
    return isValid;
  });

  if (DEBUG && validatedSlugs.length !== finalSlugs.length) {
    console.warn(`[generateStaticParams] Filtered out ${finalSlugs.length - validatedSlugs.length} invalid slugs`);
  }

  return validatedSlugs;
}

export const dynamicParams = true;

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Enhanced mode detection for consistent behavior across environments
  const DEBUG =
    String(
      process.env.NEXT_PUBLIC_DEBUG_NEWS || process.env.DEBUG_NEWS || "false"
    ).toLowerCase() === "true";
  
  const IS_STATIC_EXPORT = String(process.env.OUTPUT_EXPORT || "false").toLowerCase() === "true";
  const NODE_ENV = process.env.NODE_ENV || "development";
  const IS_PRODUCTION = NODE_ENV === "production";
  
  // Mode-appropriate debug information
  const SHOW_DEBUG_INFO = DEBUG && (IS_STATIC_EXPORT || !IS_PRODUCTION);
    
  const { slug: rawSlug } = await params;
  
  // Enhanced slug normalization and validation (Requirements 3.3)
  let slug: string;
  try {
    slug = decodeURIComponent(rawSlug).trim().toLowerCase();
    
    // Validate slug format to prevent malformed slugs from causing issues
    if (!slug || slug.length === 0 || slug.length > 200) {
      if (DEBUG) console.warn("[news][slug] invalid slug length", { rawSlug, slug, mode: { IS_STATIC_EXPORT, NODE_ENV } });
      notFound();
    }
    
    // Check for invalid characters that could cause issues
    if (!/^[a-z0-9-]+$/.test(slug)) {
      if (DEBUG) console.warn("[news][slug] invalid slug format", { rawSlug, slug, mode: { IS_STATIC_EXPORT, NODE_ENV } });
      notFound();
    }
    
    // Check for reserved words that could conflict with routes
    const reservedWords = ['index', 'news', 'admin', 'api', '_next'];
    if (reservedWords.includes(slug)) {
      if (DEBUG) console.warn("[news][slug] reserved word slug", { rawSlug, slug, mode: { IS_STATIC_EXPORT, NODE_ENV } });
      notFound();
    }
    
  } catch (decodeError) {
    // Handle URI malformed errors gracefully (Requirements 3.3)
    if (DEBUG) console.warn("[news][slug] decode error", { rawSlug, error: decodeError, mode: { IS_STATIC_EXPORT, NODE_ENV } });
    notFound();
  }
  
  if (DEBUG) console.debug("[news][slug] incoming params", { params, mode: { IS_STATIC_EXPORT, NODE_ENV, IS_PRODUCTION } });
  
  let article: any = null;
  let apiError: Error | null = null;
  
  // Enhanced API error handling with specific error types (Requirements 3.2)
  try {
    article = await findNewsBySlug(slug);
    if (DEBUG)
      console.debug("[news][slug] fetched article by slug", { slug, article, mode: { IS_STATIC_EXPORT, NODE_ENV } });
  } catch (e) {
    apiError = e as Error;
    
    // Enhanced error logging for different failure types (Requirements 3.5)
    if (DEBUG) {
      const errorType = e instanceof Error ? e.message : 'Unknown error';
      const errorContext = { slug, error: errorType, mode: { IS_STATIC_EXPORT, NODE_ENV, IS_PRODUCTION } };
      
      if (errorType.includes('ECONNREFUSED') || errorType.includes('ETIMEDOUT')) {
        console.warn("[news][slug] network connectivity issue", errorContext);
      } else if (errorType.includes('fetch failed') || errorType.includes('timeout')) {
        console.warn("[news][slug] request timeout or fetch failure", errorContext);
      } else if (errorType.includes('JSON') || errorType.includes('parse')) {
        console.warn("[news][slug] data parsing error", errorContext);
      } else {
        console.warn("[news][slug] unexpected API error", errorContext);
      }
    }
  }

  // Enhanced fallback to local sample data (Requirements 3.2)
  if (!article) {
    article = getNewsBySlug(slug) as any;
    if (DEBUG) {
      const fallbackStatus = article ? 'found' : 'not found';
      console.debug("[news][slug] fallback local sample article", {
        slug,
        article: article ? { id: article.id, title: article.title } : null,
        fallbackStatus,
        hadApiError: !!apiError,
        mode: { IS_STATIC_EXPORT, NODE_ENV, IS_PRODUCTION }
      });
    }
  }

  // Enhanced not found handling with debug information (Requirements 3.1, 3.4, 3.5)
  if (!article) {
    if (DEBUG) {
      console.warn("[news][slug] article not found in any source", { 
        slug, 
        rawSlug,
        apiError: apiError?.message,
        availableSlugs: sampleNews.filter(a => a.status === 'published').map(a => a.slug).slice(0, 5),
        mode: { IS_STATIC_EXPORT, NODE_ENV, IS_PRODUCTION }
      });
    }
    notFound();
  }

  let relatedNews: any[] = [];
  let relatedApiError: Error | null = null;
  
  // Enhanced related news fetching with better error handling (Requirements 3.2)
  try {
    const relatedPayload = await listNews({
      page: 1,
      per_page: 4,
      sort: "published_at",
      order: "desc",
    });
    relatedNews = relatedPayload.data
      .filter((n) => n.id !== (article as any).id)
      .slice(0, 2);
    if (DEBUG)
      console.debug("[news][slug] related response meta", { 
        meta: relatedPayload?.meta, 
        mode: { IS_STATIC_EXPORT, NODE_ENV } 
      });
  } catch (e) {
    relatedApiError = e as Error;
    
    // Enhanced fallback to local sample data for related items (Requirements 3.2)
    relatedNews = sampleNews
      .filter((n) => n.slug !== (article as any).slug && n.status === 'published')
      .slice(0, 2) as any[];
    
    if (DEBUG) {
      const errorType = e instanceof Error ? e.message : 'Unknown error';
      console.warn("[news][slug] related fetch error; using local fallback", { 
        slug, 
        error: errorType,
        fallbackCount: relatedNews.length,
        mode: { IS_STATIC_EXPORT, NODE_ENV, IS_PRODUCTION }
      });
    }
  }

  const author = (article as any).author ?? "TDC Ghana Editorial";
  const categoryLabel = (article as any).category ?? "General";
  const image =
    (article as any).featured_image ??
    (article as any).featured_image_path ??
    null;

  // Server-safe image URL normalizer (keeps same-origin to leverage Next rewrites)
  // Enhanced for mode consistency (Requirements 5.1, 5.2)
  const resolveImageSrc = (a: any) => {
    let raw = (a?.featured_image_path ?? a?.featured_image ?? "").trim();
    if (!raw) return "/placeholder.svg";
    
    const rewritesEnabled =
      String(
        process.env.NEXT_PUBLIC_ENABLE_REWRITES || "false"
      ).toLowerCase() !== "false";
    const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
      /\/$/,
      ""
    );

    // If absolute URL, convert known admin.eurochamghana.eu storage paths to relative
    if (/^https?:\/\//i.test(raw)) {
      try {
        const u = new URL(raw);
        if (/admin\.eurochamghana\.eu$/i.test(u.hostname)) {
          const m = u.pathname.match(/\/(storage\/.*)$/);
          if (m) {
            const storagePath = "/" + m[1].replace(/^\/+/, "");
            // Always return absolute remote URL for storage assets to avoid same-origin 404s on export
            return `${apiBase}${storagePath}`;
          }
        }
      } catch {}
      return raw; // keep other absolute URLs as-is
    }

    let path = raw.replace(/\\/g, "/");

    // drop route prefix like 'news/'
    path = path.replace(/^news\//, "");
    path = path.replace(/^\/news\//, "/");

    // fix 'news/posts/...'
    path = path.replace(/^news\/posts\//, "posts/");
    path = path.replace(/^\/news\/posts\//, "/posts/");

    // ensure leading slash and collapse duplicates
    if (!path.startsWith("/")) path = "/" + path;
    path = path.replace(/\/{2,}/g, "/");

    // map '/posts/*' to '/storage/posts/*' (actual public path on remote)
    if (path.startsWith("/posts/")) {
      path = "/storage" + path;
    }

    if (path.startsWith("/storage")) {
      // Force absolute remote URL for all storage paths
      return `${apiBase}${path}`;
    }

    return path; // relative path for same-origin rewrites
  };

  // Normalize rich HTML content image sources similarly, environment-aware
  // Enhanced for mode consistency (Requirements 5.1, 5.2)
  const normalizeContent = (html: string): string => {
    if (!html) return "";
    
    const rewritesEnabled =
      String(
        process.env.NEXT_PUBLIC_ENABLE_REWRITES || "false"
      ).toLowerCase() !== "false";
    const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
      /\/$/,
      ""
    );

    const toStorageUrl = (p: string) => {
      const path = p.replace(/^\/+/, "");
      const storagePath = path.startsWith("storage/")
        ? `/${path}`
        : `/storage/${path}`;
      // Always use absolute remote URL for storage assets
      return `${apiBase}${storagePath}`;
    };

    let out = html;
    // admin absolute storage -> env-aware
    out = out.replace(
      /src=["']\s*https?:\/\/[^"']*admin\.eurochamghana\.eu\/(storage\/[^"']+)["']/gi,
      (_m, p1) => `src="${toStorageUrl(p1)}"`
    );
    // relative ../../storage paths -> env-aware
    out = out.replace(
      /src=["']\s*(?:\.\.\/)+storage\/([^"']+)["']/gi,
      (_m, p1) => `src="${toStorageUrl(`storage/${p1}`)}"`
    );
    // storage/* (with or without leading slash) -> env-aware
    out = out.replace(
      /src=["']\s*\/?storage\/([^"']+)["']/gi,
      (_m, p1) => `src="${toStorageUrl(`storage/${p1}`)}"`
    );
    // news/posts -> storage/posts
    out = out.replace(
      /src=["']\s*news\/posts\/([^"']+)["']/gi,
      (_m, p1) => `src="${toStorageUrl(`posts/${p1}`)}"`
    );
    out = out.replace(
      /src=["']\s*\/news\/posts\/([^"']+)["']/gi,
      (_m, p1) => `src="${toStorageUrl(`posts/${p1}`)}"`
    );
    // posts -> storage/posts
    out = out.replace(
      /src=["']\s*\/?posts\/([^"']+)["']/gi,
      (_m, p1) => `src="${toStorageUrl(`posts/${p1}`)}"`
    );
    // drop leading 'news/' for local assets
    out = out.replace(/src=["']\s*\/?news\/([^"']+)["']/gi, 'src="/$1"');
    // collapse stray double slashes
    out = out.replace(/src=["']\s*\/{2,}([^"']+)["']/gi, 'src="/$1"');
    return out;
  };

  const imageSrc = resolveImageSrc(article);
  const normalizedContent = normalizeContent(
    String((article as any).content ?? "")
  );
  const siteUrl = String(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003").replace(/\/$/, "");
  const canonicalUrl = new URL(`/news/${slug}`, siteUrl).toString();
  const twitterHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(article.title || '')}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;
  if (DEBUG)
    console.debug("[news][slug] pre-render data", {
      slug,
      article,
      relatedCount: relatedNews.length,
      imageSrc,
      hasContent: Boolean((article as any).content),
      mode: { IS_STATIC_EXPORT, NODE_ENV, IS_PRODUCTION, SHOW_DEBUG_INFO }
    });

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Source Serif Pro, serif" }}
    >
      {/* Header Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            asChild
            className="text-gray-600 hover:text-black"
          >
            <a href="/news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </a>
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <h1
            className="text-xl md:text-4xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "Sohne, sans-serif" }}
          >
            {article.title}
          </h1>

          <p
            className="text-xl text-gray-600 mb-8 leading-relaxed"
            style={{ fontFamily: "Sohne, sans-serif" }}
          >
            {article.excerpt}
          </p>

          {/* Author and Meta Info */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-600">
                  {author.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium text-black">{author}</div>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>
                    {format(new Date(article.published_at), "MMM d, yyyy")}
                  </span>
                  <span>•</span>
                  <span>{article.read_time ?? 5} min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Actions */}
          <div className="flex items-center justify-between border-y border-gray-200 py-4 mb-8">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm">24</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">8</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <a href={twitterHref} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors" aria-label="Share on X">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={facebookHref} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-colors" aria-label="Share on Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors" aria-label="Share on LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img
            src={imageSrc}
            alt={article.title}
            className="w-full h-auto rounded-lg"
            style={{ maxHeight: "500px", objectFit: "cover" }}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div
            dangerouslySetInnerHTML={{ __html: normalizedContent }}
            className="text-gray-800 leading-[1.6] text-base md:text-xl font-serif"
          />
        </div>

        {DEBUG && (
          <div className="max-w-4xl mx-auto px-4 py-6 bg-yellow-50 border border-yellow-200 rounded-md">
            <h3 className="font-semibold text-yellow-700 mb-2">Debug Information</h3>
            <div className="text-xs text-yellow-900 space-y-2">
              <div><strong>Slug Processing:</strong></div>
              <div>• Raw slug: {JSON.stringify((await params).slug)}</div>
              <div>• Normalized slug: {JSON.stringify(slug)}</div>
              <div>• Article source: {apiError ? 'Local fallback' : 'API'}</div>
              {apiError && (
                <div>• API error: {apiError.message}</div>
              )}
              
              <div className="mt-3"><strong>Related News:</strong></div>
              <div>• Count: {relatedNews.length}</div>
              <div>• Source: {relatedApiError ? 'Local fallback' : 'API'}</div>
              {relatedApiError && (
                <div>• Related API error: {relatedApiError.message}</div>
              )}
              
              <div className="mt-3"><strong>Article Data:</strong></div>
              <pre className="overflow-auto max-h-40 bg-yellow-100 p-2 rounded text-xs">
                {JSON.stringify({ 
                  id: article.id,
                  slug: article.slug, 
                  title: article.title,
                  category: article.category,
                  author: article.author,
                  published_at: article.published_at,
                  hasContent: !!article.content,
                  contentLength: article.content?.length || 0
                }, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Article Footer */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm">24</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">8</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <a href={twitterHref} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors" aria-label="Share on X">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={facebookHref} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-colors" aria-label="Share on Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors" aria-label="Share on LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Author Bio */}
          {/* <div className="bg-gray-50 rounded-lg p-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-semibold text-gray-600">
                  {author.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-black mb-2">
                  {author}
                </h3>
                <p className="text-gray-600 mb-3">
                  Senior journalist and content writer at TDC Ghana,
                  specializing in technology, business, and development stories.
                </p>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
            </div>
          </div> */}
        </footer>
      </article>

      {/* Related Articles - Always show for debugging */}
      <section className="border-t border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-black mb-4">More from TDC</h2>

          {relatedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedNews.slice(0, 4).map((related) => (
                <a
                  key={related.id}
                  href={`/news/${String(related.slug ?? "")
                    .trim()
                    .toLowerCase()}`}
                  className="group"
                >
                  <article className="space-y-4">
                    {((related as any).featured_image ??
                      (related as any).featured_image_path) && (
                      <div className="aspect-2/1 overflow-hidden rounded-md">
                        <img
                          src={resolveImageSrc(related)}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}

                    {/* Author Info */}

                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-black group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
                        {related.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {related.excerpt}
                      </p>

                      {/* Engagement and Date */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>
                            {format(new Date(related.published_at), "MMM d")}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{Math.floor(Math.random() * 100) + 10}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{Math.floor(Math.random() * 20) + 1}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {/* <Bookmark className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" /> */}
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                No related articles found in the same category.
              </p>
              <div className="text-sm text-gray-500 mb-6">
                <p className="mb-2">This might be because:</p>
                <ul className="text-left inline-block">
                  <li>• No other articles exist in the "{categoryLabel}" category</li>
                  <li>• All articles in this category are drafts</li>
                  <li>• The current article is the only published article in this category</li>
                  {relatedApiError && (
                    <li>• API service is temporarily unavailable</li>
                  )}
                </ul>
              </div>
              
              {/* Enhanced navigation links (Requirements 3.4) */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" asChild>
                  <a href="/news" className="flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Browse All News
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/" className="flex items-center">
                    Home Page
                  </a>
                </Button>
              </div>
              
              {DEBUG && relatedApiError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  <strong>Debug:</strong> Related articles API error: {relatedApiError.message}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
