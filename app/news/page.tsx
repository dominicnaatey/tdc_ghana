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
import { getPublishedNews } from "@/lib/data/sample-news";

function getNews() {
  return getPublishedNews();
}

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
        <div className="w-48 h-32 flex-shrink-0">
          <Skeleton className="w-full h-full rounded" />
        </div>
      </div>
    </article>
  );
}

function MobileNewsCardSkeleton() {
  return (
    <article className="space-y-4 md:hidden mb-8">
      <div className="aspect-[2/1] overflow-hidden rounded-md">
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

function NewsCard({ article }: { article: any }) {
  return (
    <>
      {/* Desktop Layout */}
      <article
        className="py-8 border-b border-gray-100 last:border-b-0 hidden md:block"
        style={{ fontFamily: "Segoe UI, system-ui, sans-serif" }}
      >
        <div className="flex gap-6">
          <Link href={`/news/${article.slug}`} className="block flex-1">
            <div className="flex-1 cursor-pointer">
              <h2
                className="font-bold text-black mb-2 line-clamp-2 leading-tight hover:text-black"
                style={{ fontSize: "24px" }}
              >
                {article.title}
              </h2>
              <p className="text-gray-600 line-clamp-2 text-base leading-relaxed mb-4">
                {article.excerpt}
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
                  <span>{article.read_time} min read</span>
                </div>
              </div>
            </div>
          </Link>

          {article.featured_image && (
            <Link href={`/news/${article.slug}`} className="block">
              <div className="w-48 h-32 flex-shrink-0 cursor-pointer">
                <img
                  src={article.featured_image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover opacity-90 transition-opacity"
                  style={{ borderRadius: "1px" }}
                />
              </div>
            </Link>
          )}
        </div>
      </article>

      {/* Mobile Layout */}
      <Link
        href={`/news/${article.slug}`}
        className="group md:hidden block mb-8"
      >
        <article className="space-y-4">
          {article.featured_image && (
            <div className="aspect-[2/1] overflow-hidden rounded-md">
              <img
                src={article.featured_image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="space-y-3">
            <h3 className="font-bold text-lg text-black group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
              {article.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {article.excerpt}
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
      </Link>
    </>
  );
}

function NewsList() {
  const allNews = getNews();
  const [displayedNews, setDisplayedNews] = useState(allNews.slice(0, 5));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(allNews.length > 5);
  const desktopObserverRef = useRef<HTMLDivElement>(null);
  const mobileObserverRef = useRef<HTMLDivElement>(null);

  const loadMoreNews = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      const currentLength = displayedNews.length;
      const nextBatch = allNews.slice(currentLength, currentLength + 5);

      if (nextBatch.length > 0) {
        setDisplayedNews((prev) => [...prev, ...nextBatch]);
        setHasMore(currentLength + nextBatch.length < allNews.length);
      } else {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 800);
  }, [allNews, displayedNews.length, isLoading, hasMore]);

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

  if (allNews.length === 0) {
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
      {/* Desktop Layout */}
      <div className="max-w-4xl mx-auto hidden md:block">
        {displayedNews.map((article) => (
          <NewsCard key={article.id} article={article} />
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
        {!hasMore && displayedNews.length > 5 && (
          <div className="text-center py-8 text-gray-500">
            <p>You've reached the end of our stories</p>
          </div>
        )}
      </div>

      {/* Mobile Layout - Single Column */}
      <div className="max-w-2xl mx-auto md:hidden">
        {displayedNews.map((article) => (
          <NewsCard key={article.id} article={article} />
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
        {!hasMore && displayedNews.length > 5 && (
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
