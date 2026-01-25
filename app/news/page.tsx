"use client";

import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  Clock,
  Heart,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow, format } from "date-fns";
import { listNewsCached, invalidateNewsCache, refreshNewsCache } from "@/lib/news-cache";

// Removed: now fetching from REST API inside NewsList

function NewsCardSkeleton() {
  return (
    <article
      className="py-8 border-b border-gray-100 last:border-b-0 md:block hidden"
      style={{ fontFamily: "Segoe UI, system-ui, sans-serif" }}
    >
      <div className="flex gap-6">
        <div className="flex-1">
          <Skeleton className="h-7 w-full mb-3" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-3/4 mb-4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="w-48 h-32 shrink-0">
          <Skeleton className="w-full h-full rounded" />
        </div>
      </div>
    </article>
  );
}

function MobileNewsCardSkeleton() {
  return (
    <article className="space-y-4 md:hidden mb-8">
      <div className="aspect-2/1 overflow-hidden rounded-md">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
      </div>
    </article>
  );
}

function NewsCard({ article, slugMap }: { article: any; slugMap: Record<string, any> | null }) {
  // Normalize image URL: prefer same-origin proxy; cleanup bad prefixes
  const resolveImageSrc = (a: any) => {
    let raw = (a?.featured_image_path ?? a?.featured_image ?? "").trim();
    if (!raw) return "/placeholder.svg";
    if (/^https?:\/\//i.test(raw)) return raw;

    const rewritesEnabled = String(process.env.NEXT_PUBLIC_ENABLE_REWRITES || "false").toLowerCase() !== "false";
    const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

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

    // Always use absolute remote URL for storage assets to avoid same-origin 404s on export
    if (path.startsWith('/storage')) {
      return `${apiBase}${path}`;
    }

    // Otherwise build against same-origin to leverage Next rewrites
    const origin = typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_API_BASE_URL ?? "");
    try {
      return new URL(path, origin || "http://localhost:3001").toString();
    } catch {
      return `${origin || ""}${path}`;
    }
  };

  // Fallback excerpt: use content text when excerpt missing
  const getExcerpt = (a: any) => {
    const raw = (a?.excerpt ?? "").trim();
    if (raw) return raw;
    const html = String(a?.content ?? "");
    const text = html
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&#x27;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
    const words = text.split(" ").slice(0, 24).join(" ");
    return words && words.length < text.length ? words + "…" : words;
  };

  // Determine URL: use static path if in map, otherwise fallback to dynamic viewer
  const getArticleUrl = (slug: string) => {
    const normalized = String(slug || '').trim().toLowerCase();
    // If slugMap is loaded and this slug exists, it's a static page
    // If slugMap is loaded and slug MISSING, it's a new article -> use dynamic viewer
    // If slugMap not yet loaded, default to static (optimistic) or handle gracefully
    if (slugMap && !slugMap[normalized]) {
        return `/news/view?slug=${encodeURIComponent(normalized)}`;
    }
    return `/news/${normalized}`;
  };

  return (
    <>
      {/* Desktop Layout */}
      <article
        className="py-8 border-b border-gray-100 last:border-b-0 hidden md:block"
        style={{ fontFamily: "Segoe UI, system-ui, sans-serif" }}
      >
        <div className="flex gap-6">
          <a href={getArticleUrl(article.slug)} className="block flex-1">
            <div className="flex-1 cursor-pointer">
              <h2
                className="font-bold text-black mb-2 line-clamp-2 leading-tight hover:text-black"
                style={{ fontSize: "24px" }}
              >
                {article.title}
              </h2>
              <p className="text-gray-600 line-clamp-2 text-base leading-relaxed mb-4">
                {getExcerpt(article)}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    {formatDistanceToNow(new Date(article.published_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <span className="text-gray-300">·</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{(article.read_time ?? 5)} min read</span>
                </div>
              </div>
            </div>
          </a>

          {/* Always render with fallback to placeholder */}
          <a href={getArticleUrl(article.slug)} className="block">
            <div className="w-48 h-32 shrink-0 cursor-pointer">
              <img
                src={resolveImageSrc(article)}
                alt={article.title}
                className="w-full h-full object-cover opacity-90 transition-opacity"
                style={{ borderRadius: "1px" }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </a>
        </div>
      </article>

      {/* Mobile Layout */}
      <a
        href={getArticleUrl(article.slug)}
        className="group md:hidden block mb-8"
      >
        <article className="space-y-4">
          {/* Always render with fallback to placeholder */}
          <div className="aspect-2/1 overflow-hidden rounded-md">
            <img
              src={resolveImageSrc(article)}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-lg text-black group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
              {article.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {getExcerpt(article)}
            </p>

            {/* Engagement and Date */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>{format(new Date(article.published_at), "MMM d")}</span>
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
      </a>
    </>
  );
}

function NewsList() {
  const [displayedNews, setDisplayedNews] = useState<any[]>([]);
  const [slugMap, setSlugMap] = useState<Record<string, any> | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const desktopObserverRef = useRef<HTMLDivElement>(null);
  const mobileObserverRef = useRef<HTMLDivElement>(null);

  // Fetch slug map on mount
  useEffect(() => {
    fetch('/news-slug-map.json')
      .then(res => res.ok ? res.json() : null)
      .then(map => {
        if (map) setSlugMap(map);
      })
      .catch(() => console.warn('[NewsList] Failed to load slug map'));
  }, []);

  const loadPage = useCallback(async (p: number) => {
    try {
      setIsLoading(true);
      const payload = await listNewsCached({ page: p, per_page: 10, sort: 'published_at', order: 'desc' });
      setDisplayedNews((prev) => (p === 1 ? payload.data : [...prev, ...payload.data]));
      setLastPage(payload.meta.last_page);
      setHasMore(p < payload.meta.last_page);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  const loadMoreNews = useCallback(() => {
    if (isLoading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    loadPage(next);
  }, [page, hasMore, isLoading, loadPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreNews();
        }
      },
      { threshold: 0.1 }
    );

    // Observe both desktop and mobile targets
    if (desktopObserverRef.current) {
      observer.observe(desktopObserverRef.current);
    }
    if (mobileObserverRef.current) {
      observer.observe(mobileObserverRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreNews, hasMore, isLoading]);

  if (displayedNews.length === 0 && !isLoading) {
    return (
      <div
        className="text-center py-16"
        style={{ fontFamily: "Segoe UI, system-ui, sans-serif" }}
      >
        <h3 className="text-xl font-semibold text-black mb-2">
          No stories published yet
        </h3>
        <p className="text-gray-600">
          Check back soon for the latest updates and insights.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Controls */}
      {/* <div className="max-w-4xl mx-auto px-4 mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black">Latest News</h2>
        <button
          className="text-sm text-gray-600 hover:text-black"
          onClick={async () => {
            try {
              invalidateNewsCache();
              setPage(1);
              await loadPage(1);
            } catch {}
          }}
        >
          Refresh
        </button>
      </div> */}
      {/* Desktop Layout */}
      <div className="max-w-4xl mx-auto hidden md:block">
        {displayedNews.map((article) => (
          <NewsCard key={article.id} article={article} slugMap={slugMap} />
        ))}

        {/* Loading skeletons for desktop */}
        {isLoading && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <NewsCardSkeleton key={`loading-${i}`} />
            ))}
          </>
        )}

        {/* Observer target for desktop */}
        {hasMore && <div ref={desktopObserverRef} className="h-10" />}

        {/* End message */}
        {!hasMore && displayedNews.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>You've reached the end of our stories</p>
          </div>
        )}
      </div>

      {/* Mobile Layout - Single Column */}
      <div className="max-w-2xl mx-auto md:hidden">
        {displayedNews.map((article) => (
          <NewsCard key={article.id} article={article} slugMap={slugMap} />
        ))}

        {/* Loading skeletons for mobile */}
        {isLoading && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <MobileNewsCardSkeleton key={`loading-mobile-${i}`} />
            ))}
          </>
        )}

        {/* Observer target for mobile */}
        {hasMore && <div ref={mobileObserverRef} className="h-10" />}

        {/* End message */}
        {!hasMore && displayedNews.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>You've reached the end of our stories</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function NewsPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Segoe UI, system-ui, sans-serif" }}
    >
      {/* Header Section */}
      <div className="bg-[#0D3562] border-b border-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-100 mb-4">
              Stories & Insights
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Discover the latest developments, innovations, and insights from
              TDC Ghana Ltd.
            </p>
          </div>
        </div>
      </div>

      {/* News Content */}
      <div className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <>
              {/* Desktop Skeleton */}
              <div className="max-w-4xl mx-auto hidden md:block">
                {Array.from({ length: 5 }).map((_, i) => (
                  <NewsCardSkeleton key={i} />
                ))}
              </div>

              {/* Mobile Skeleton */}
              <div className="max-w-2xl mx-auto md:hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MobileNewsCardSkeleton key={i} />
                ))}
              </div>
            </>
          }
        >
          <NewsList />
        </Suspense>
      </div>
    </div>
  );
}
