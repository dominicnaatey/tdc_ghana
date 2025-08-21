import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, Heart, MessageCircle, Bookmark } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { getPublishedNews } from "@/lib/data/sample-news"

export default function NewsSection() {
  const newsItems = getPublishedNews().slice(0, 3)

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-card-foreground font-serif mb-4">Latest News & Updates</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about our latest projects, community initiatives, and development progress across Ghana.
          </p>
        </div>

        {/* News Grid - 1 row, 3 columns */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {newsItems.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group">
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
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/news" className="flex items-center">
              View All News
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
