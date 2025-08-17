import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { createServerClient } from "@/lib/supabase/server"
import { formatDistanceToNow } from "date-fns"

async function getNews() {
  const supabase = createServerClient()

  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(20)

  if (error) {
    console.error("Error fetching news:", error)
    return []
  }

  return news || []
}

function NewsCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video">
        <Skeleton className="w-full h-full" />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
    </Card>
  )
}

async function NewsList() {
  const news = await getNews()

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No news articles found</h3>
        <p className="text-gray-600">Check back later for updates and announcements.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {news.map((article) => (
        <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          {article.featured_image && (
            <div className="aspect-video overflow-hidden">
              <img
                src={article.featured_image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                {article.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarDays className="w-4 h-4 mr-1" />
                {formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
              </div>
            </div>
            <CardTitle className="line-clamp-2 hover:text-cyan-700 transition-colors">
              <Link href={`/news/${article.slug}`}>{article.title}</Link>
            </CardTitle>
            <p className="text-gray-600 line-clamp-3 text-sm">{article.excerpt}</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {article.read_time} min read
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/news/${article.slug}`}>
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-cyan-800 to-cyan-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">News & Updates</h1>
            <p className="text-xl text-cyan-100">
              Stay informed with the latest developments, announcements, and insights from TDC Ghana Ltd.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Suspense
          fallback={
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
