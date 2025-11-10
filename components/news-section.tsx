"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, Heart, MessageCircle, Bookmark } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { listNewsCached, refreshNewsCache } from "@/lib/news-cache"
import type { News } from "@/lib/types/news"

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<News[]>([])
  const DEBUG = String(process.env.NEXT_PUBLIC_DEBUG_NEWS_SECTION || '').toLowerCase() === 'true'

  useEffect(() => {
    let mounted = true
    const params = { page: 1, per_page: 3, sort: 'published_at' as const, order: 'desc' as const }
    const load = async () => {
      try {
        const cached = await listNewsCached(params)
        if (mounted) setNewsItems((cached?.data || []).filter(n => n.is_published))
      } catch (err) {
        if (DEBUG) console.warn('[news-section] cached load error', err)
      }
      // Background refresh to ensure latest
      try {
        const fresh = await refreshNewsCache(params)
        if (mounted) setNewsItems((fresh?.data || []).filter(n => n.is_published))
      } catch (err) {
        if (DEBUG) console.warn('[news-section] refresh error', err)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  // Normalize image URL like /news and /news/[slug] pages
  const resolveImage = (n: News) => {
    const raw = String((n as any).featured_image_path ?? (n as any).featured_image ?? '').trim()
    if (!raw) return "/placeholder.svg"

    // Absolute http(s) URLs: use as-is
    if (/^https?:\/\//i.test(raw)) return raw

    const rewritesEnabled = String(process.env.NEXT_PUBLIC_ENABLE_REWRITES || "false").toLowerCase() !== "false"
    const apiBase = String(process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '')

    // Normalize slashes and bad prefixes
    let path = raw.replace(/\\/g, "/")
    path = path.replace(/^news\//, "")
    path = path.replace(/^\/news\//, "/")
    path = path.replace(/^news\/posts\//, "posts/")
    path = path.replace(/^\/news\/posts\//, "/posts/")
    if (!path.startsWith("/")) path = "/" + path
    path = path.replace(/\/{2,}/g, "/")

    // Map '/posts/*' to '/storage/posts/*'
    if (path.startsWith("/posts/")) {
      path = "/storage" + path
    }

    // If pointing at remote storage and rewrites are disabled, prefix API base
    if (path.startsWith('/storage') && !rewritesEnabled) {
      return `${apiBase}${path}`
    }

    // Otherwise build against same-origin to leverage Next rewrites
    const origin = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_API_BASE_URL ?? '')
    try {
      return new URL(path, origin || 'http://localhost:3001').toString()
    } catch {
      return `${origin || ''}${path}`
    }
  }

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
                  {resolveImage(article) && (
                    <div className="aspect-[2/1] overflow-hidden rounded-md">
                      <img
                        src={resolveImage(article)}
                        alt={article.title || "News"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg text-black group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                      {article.excerpt || ''}
                    </p>
                    
                    {/* Engagement and Date */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        {article.published_at && <span>{format(new Date(article.published_at), "MMM d")}</span>}
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{article.id * 7 + 15}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{article.id * 3 + 2}</span>
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
            {newsItems.length === 0 && (
              <div className="md:col-span-3 text-center text-sm text-muted-foreground">
                No news available yet.
              </div>
            )}
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
