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

// Pre-generate static paths for export mode
export async function generateStaticParams() {
  // Allow explicit overrides via env for static export
  const envList = String(
    process.env.STATIC_NEWS_SLUGS ||
      process.env.NEXT_PUBLIC_STATIC_NEWS_SLUGS ||
      ""
  )
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const slugs = new Set<string>();

  // Try remote list at build-time: collect across all pages for completeness
  try {
    const first = await listNews({
      page: 1,
      per_page: 50,
      sort: "published_at",
      order: "desc",
    });
    const lastPage = Math.max(1, Number(first.meta?.last_page || 1));
    const addFrom = (payload: any) => {
      for (const n of payload?.data || []) {
        const raw = (n as any)?.slug;
        if (typeof raw === "string" && raw.trim().length > 0) {
          slugs.add(decodeURIComponent(raw.trim().toLowerCase()));
        }
      }
    };
    addFrom(first);
    for (let p = 2; p <= lastPage; p++) {
      try {
        const pagePayload = await listNews({
          page: p,
          per_page: 50,
          sort: "published_at",
          order: "desc",
        });
        addFrom(pagePayload);
      } catch {
        // Continue on partial failures
      }
    }
  } catch {
    // Ignore network errors; rely on local data and env overrides
  }

  // Always include local sample slugs for resilience
  for (const n of sampleNews) {
    const raw = (n as any)?.slug;
    if (typeof raw === "string" && raw.trim().length > 0)
      slugs.add(decodeURIComponent(raw.trim().toLowerCase()));
  }

  // Include any env-provided overrides (e.g., critical slugs to export)
  for (const s of envList)
    slugs.add(decodeURIComponent(s.trim().toLowerCase()));

  return Array.from(slugs).map((slug) => ({ slug }));
}

export const dynamicParams = false;
export const dynamic = "force-static";

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug).trim().toLowerCase();
  const DEBUG =
    String(
      process.env.NEXT_PUBLIC_DEBUG_NEWS || process.env.DEBUG_NEWS || "false"
    ).toLowerCase() === "true";
  if (DEBUG) console.debug("[news][slug] incoming params", params);
  let article: any = null;
  try {
    article = await findNewsBySlug(slug);
    if (DEBUG)
      console.debug("[news][slug] fetched article by slug", { slug, article });
  } catch (e) {
    // swallow network error and fallback to local sample data
    if (DEBUG) console.warn("[news][slug] fetch error", e);
  }

  if (!article) {
    article = getNewsBySlug(slug) as any;
    if (DEBUG)
      console.debug("[news][slug] fallback local sample article", {
        slug,
        article,
      });
  }

  if (!article) {
    if (DEBUG)
      console.warn("[news][slug] not found; invoking notFound()", { slug });
    notFound();
  }

  let relatedNews: any[] = [];
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
      console.debug("[news][slug] related response meta", relatedPayload?.meta);
  } catch (e) {
    // fallback to local sample data for related items
    relatedNews = sampleNews
      .filter((n) => n.slug !== (article as any).slug)
      .slice(0, 2) as any[];
    if (DEBUG)
      console.warn("[news][slug] related fetch error; using sample", e);
  }

  const author = (article as any).author ?? "TDC Ghana Editorial";
  const categoryLabel = (article as any).category ?? "General";
  const image =
    (article as any).featured_image ??
    (article as any).featured_image_path ??
    null;

  // Server-safe image URL normalizer (keeps same-origin to leverage Next rewrites)
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
  if (DEBUG)
    console.debug("[news][slug] pre-render data", {
      slug,
      article,
      relatedCount: relatedNews.length,
      imageSrc,
      hasContent: Boolean((article as any).content),
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
            <Link href="/news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Link>
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
              <button className="text-gray-600 hover:text-black transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
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
            <h3 className="font-semibold text-yellow-700 mb-2">Debug Data</h3>
            <pre className="text-xs text-yellow-900 overflow-auto">
              {JSON.stringify({ slug, article, relatedNews }, null, 2)}
            </pre>
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
              <button className="text-gray-600 hover:text-black transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
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
          </div>
        </footer>
      </article>

      {/* Related Articles - Always show for debugging */}
      <section className="border-t border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-black mb-4">More from TDC</h2>

          {relatedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedNews.slice(0, 4).map((related) => (
                <Link
                  key={related.id}
                  href={`/news/${String(related.slug ?? "")
                    .trim()
                    .toLowerCase()}`}
                  className="group"
                >
                  <article className="space-y-4">
                    {((related as any).featured_image ??
                      (related as any).featured_image_path) && (
                      <div className="aspect-[2/1] overflow-hidden rounded-md">
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
                          <Bookmark className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
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
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                No related articles found in the same category.
              </p>
              <p className="text-sm text-gray-500">This might be because:</p>
              <ul className="text-sm text-gray-500 mt-2">
                <li>
                  • No other articles exist in the "{categoryLabel}" category
                </li>
                <li>• All articles in this category are drafts</li>
                <li>
                  • The current article is the only published article in this
                  category
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
