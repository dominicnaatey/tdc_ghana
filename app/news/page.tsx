import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarDays, Clock } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { getPublishedNews } from "@/lib/data/sample-news"

function getNews() {
  return getPublishedNews()
}

function NewsCardSkeleton() {
  return (
    <article className="py-8 border-b border-gray-100 last:border-b-0" style={{ fontFamily: 'Segoe UI, system-ui, sans-serif' }}>
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
  )
}

function NewsCard({ article }: { article: any }) {
  return (
    <article 
      className="py-8 border-b border-gray-100 last:border-b-0"
      style={{ fontFamily: 'Segoe UI, system-ui, sans-serif' }}
    >
      <div className="flex gap-6">
        <Link href={`/news/${article.slug}`} className="block flex-1">
          <div className="flex-1 cursor-pointer">
            <h2 className="font-bold text-black mb-2 line-clamp-2 leading-tight hover:text-black" style={{ fontSize: '24px' }}>
              {article.title}
            </h2>
            <p className="text-gray-600 line-clamp-2 text-base leading-relaxed mb-4">
              {article.excerpt}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>{formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}</span>
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
                style={{ borderRadius: '1px' }}
              />
            </div>
          </Link>
        )}
      </div>
    </article>
  )
}

function NewsList() {
  const news = getNews()

  if (news.length === 0) {
    return (
      <div className="text-center py-16" style={{ fontFamily: 'Segoe UI, system-ui, sans-serif' }}>
        <h3 className="text-xl font-semibold text-black mb-2">No stories published yet</h3>
        <p className="text-gray-600">Check back soon for the latest updates and insights.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {news.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Segoe UI, system-ui, sans-serif' }}>
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-black mb-4">
              Stories & Insights
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Discover the latest developments, innovations, and insights from TDC Ghana Ltd.
            </p>
          </div>
        </div>
      </div>

      {/* News Content */}
      <div className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="max-w-4xl mx-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <NewsList />
        </Suspense>
      </div>
    </div>
  )
}
