import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { createServerClient } from "@/lib/supabase/server"
import { format } from "date-fns"

async function getNewsArticle(slug: string) {
  const supabase = createServerClient()

  const { data: article, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error || !article) {
    return null
  }

  return article
}

async function getRelatedNews(currentId: number, category: string) {
  const supabase = createServerClient()

  const { data: related, error } = await supabase
    .from("news")
    .select("id, title, slug, excerpt, featured_image, published_at, category")
    .eq("status", "published")
    .eq("category", category)
    .neq("id", currentId)
    .order("published_at", { ascending: false })
    .limit(3)

  if (error) {
    console.error("Error fetching related news:", error)
    return []
  }

  return related || []
}

export default async function NewsArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = await getNewsArticle(params.slug)

  if (!article) {
    notFound()
  }

  const relatedNews = await getRelatedNews(article.id, article.category)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <article className="lg:col-span-3">
            <Card className="overflow-hidden">
              {article.featured_image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.featured_image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <CardHeader className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                    {article.category}
                  </Badge>
                  <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    {format(new Date(article.published_at), "MMMM d, yyyy")}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.read_time} min read
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 leading-tight">{article.title}</h1>

                <p className="text-xl text-gray-600 leading-relaxed">{article.excerpt}</p>

                <div className="flex items-center justify-between pt-4">
                  <div className="text-sm text-gray-500">By {article.author || "TDC Ghana Communications"}</div>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardHeader>

              <Separator />

              <CardContent className="prose prose-lg max-w-none pt-8">
                <div dangerouslySetInnerHTML={{ __html: article.content }} className="text-gray-700 leading-relaxed" />
              </CardContent>
            </Card>
          </article>

          <aside className="space-y-6">
            {relatedNews.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Related Articles</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedNews.map((related) => (
                    <div key={related.id} className="group">
                      <Link href={`/news/${related.slug}`} className="block">
                        {related.featured_image && (
                          <div className="aspect-video overflow-hidden rounded-md mb-2">
                            <img
                              src={related.featured_image || "/placeholder.svg"}
                              alt={related.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-cyan-700 transition-colors">
                          {related.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{related.excerpt}</p>
                        <div className="text-xs text-gray-400 mt-2">
                          {format(new Date(related.published_at), "MMM d, yyyy")}
                        </div>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Stay Updated</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest news and updates from TDC Ghana directly in your inbox.
                </p>
                <Button className="w-full">Subscribe to Newsletter</Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
