import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Clock, ArrowLeft, Share2, Heart, MessageCircle, Bookmark, Twitter, Facebook, Linkedin } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { findNewsBySlug, listNews } from "@/lib/api/news"
import { getNewsBySlug, sampleNews } from "@/lib/data/sample-news"

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  let article: any = null;
  try {
    article = await findNewsBySlug(slug);
  } catch (e) {
    // swallow network error and fallback to local sample data
  }
  
  if (!article) {
    article = getNewsBySlug(slug) as any;
  }
  
  if (!article) {
    notFound();
  }
  
  let relatedNews: any[] = [];
  try {
    const relatedPayload = await listNews({ page: 1, per_page: 4, sort: 'published_at', order: 'desc' });
    relatedNews = relatedPayload.data.filter((n) => n.id !== (article as any).id).slice(0, 2);
  } catch (e) {
    // fallback to local sample data for related items
    relatedNews = sampleNews.filter((n) => n.slug !== (article as any).slug).slice(0, 2) as any[];
  }
  
  const author = (article as any).author ?? 'TDC Ghana Editorial';
  const categoryLabel = (article as any).category ?? 'General';
  const image = (article as any).featured_image ?? (article as any).featured_image_path ?? null;

  // Server-safe image URL normalizer (keeps same-origin to leverage Next rewrites)
  const resolveImageSrc = (a: any) => {
    let raw = (a?.featured_image_path ?? a?.featured_image ?? "").trim();
    if (!raw) return "/placeholder.svg";

    // If absolute URL, convert known admin.eurochamghana.eu storage paths to relative
    if (/^https?:\/\//i.test(raw)) {
      try {
        const u = new URL(raw);
        if (/admin\.eurochamghana\.eu$/i.test(u.hostname)) {
          const m = u.pathname.match(/\/(storage\/.*)$/);
          if (m) return '/' + m[1].replace(/^\/+/, '');
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

    return path; // relative path for same-origin rewrites
  };

  // Normalize rich HTML content image sources similarly
  const normalizeContent = (html: string): string => {
    if (!html) return '';
    let out = html;
    // admin host absolute storage -> relative
    out = out.replace(/src=["']\s*https?:\/\/[^"']*admin\.eurochamghana\.eu\/(storage\/[^"]+)["']/gi, 'src="/$1"');
    // news/posts -> posts
    out = out.replace(/src=["']\s*news\/posts\/([^"']+)["']/gi, 'src="/posts/$1"');
    out = out.replace(/src=["']\s*\/news\/posts\/([^"']+)["']/gi, 'src="/posts/$1"');
    // map posts -> storage/posts
    out = out.replace(/src=["']\s*posts\/([^"']+)["']/gi, 'src="/storage/posts/$1"');
    out = out.replace(/src=["']\s*\/posts\/([^"']+)["']/gi, 'src="/storage/posts/$1"');
    // drop leading 'news/'
    out = out.replace(/src=["']\s*news\/([^"']+)["']/gi, 'src="/$1"');
    out = out.replace(/src=["']\s*\/news\/([^"']+)["']/gi, 'src="/$1"');
    // ensure storage has leading slash
    out = out.replace(/src=["']\s*storage\/([^"']+)["']/gi, 'src="/storage/$1"');
    // collapse double slashes
    out = out.replace(/src=["']\s*(\/{2,})([^"']+)["']/gi, 'src="/$2"');
    return out;
  };

  const imageSrc = resolveImageSrc(article);
  const normalizedContent = normalizeContent(String((article as any).content ?? ''));

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Source Serif Pro, serif" }}>
      {/* Header Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="text-gray-600 hover:text-black">
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
          <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Sohne, sans-serif' }}>
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed" style={{ fontFamily: 'Sohne, sans-serif' }}>
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
                  <span>{format(new Date(article.published_at), "MMM d, yyyy")}</span>
                  <span>•</span>
                  <span>{(article.read_time ?? 5)} min read</span>
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
            className="text-gray-800 leading-relaxed"
            style={{ 
              fontSize: "20px", 
              lineHeight: "1.6",
              fontFamily: "Source Serif Pro, serif"
            }}
          />
        </div>

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
                <h3 className="font-semibold text-lg text-black mb-2">{author}</h3>
                <p className="text-gray-600 mb-3">
                  Senior journalist and content writer at TDC Ghana, specializing in technology, business, and development stories.
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
                <Link key={related.id} href={`/news/${related.slug}`} className="group">
                  <article className="space-y-4">
                    { ( (related as any).featured_image ?? (related as any).featured_image_path ) && (
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
                          <span>{format(new Date(related.published_at), "MMM d")}</span>
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
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No related articles found in the same category.</p>
              <p className="text-sm text-gray-500">This might be because:</p>
              <ul className="text-sm text-gray-500 mt-2">
                <li>• No other articles exist in the "{categoryLabel}" category</li>
                <li>• All articles in this category are drafts</li>
                <li>• The current article is the only published article in this category</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
