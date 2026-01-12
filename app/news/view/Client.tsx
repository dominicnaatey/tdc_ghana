"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Heart, MessageCircle, Bookmark, ArrowLeft } from "lucide-react";
import { listNews, findNewsBySlug } from "@/lib/api/news";
import { sampleNews } from "@/lib/data/sample-news";

function resolveImageSrc(a: any): string {
  let raw = (a?.featured_image_path ?? a?.featured_image ?? "").trim();
  if (!raw) return "/placeholder.svg";
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

  if (/^https?:\/\//i.test(raw)) {
    try {
      const u = new URL(raw);
      if (/admin\.eurochamghana\.eu$/i.test(u.hostname)) {
        const m = u.pathname.match(/\/(storage\/.*)$/);
        if (m) return `${apiBase}/${m[1].replace(/^\/+/, "")}`;
      }
    } catch {}
    return raw;
  }

  let path = raw.replace(/\\/g, "/");
  path = path.replace(/^news\//, "");
  path = path.replace(/^\/news\//, "/");
  path = path.replace(/^news\/posts\//, "posts/");
  path = path.replace(/^\/news\/posts\//, "/posts/");
  if (!path.startsWith("/")) path = "/" + path;
  path = path.replace(/\/{2,}/g, "/");
  if (path.startsWith("/posts/")) path = "/storage" + path;
  if (path.startsWith("/storage")) return `${apiBase}${path}`;
  return path;
}

function normalizeContent(html: string): string {
  if (!html) return "";
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
  const toStorageUrl = (p: string) => {
    const path = p.replace(/^\/+/, "");
    const storagePath = path.startsWith("storage/") ? `/${path}` : `/storage/${path}`;
    return `${apiBase}${storagePath}`;
  };

  let out = html;
  out = out.replace(/src=["']\s*https?:\/\/[^"']*admin\.eurochamghana\.eu\/(storage\/[^"']+)["']/gi, (_m, p1) => `src="${toStorageUrl(p1)}"`);
  out = out.replace(/src=["']\s*(?:\.\.\/)+storage\/([^"']+)["']/gi, (_m, p1) => `src="${toStorageUrl(`storage/${p1}`)}"`);
  out = out.replace(/src=["']\s*\/?storage\/([^"']+)["']/gi, (_m, p1) => `src="${toStorageUrl(`storage/${p1}`)}"`);
  out = out.replace(/src=["']\s*news\/posts\/([^"']+)["']/gi, (_m, p1) => `src="${toStorageUrl(`posts/${p1}`)}"`);
  out = out.replace(/src=["']\s*\/news\/posts\/([^"']+)["']/gi, (_m, p1) => `src="${toStorageUrl(`posts/${p1}`)}"`);
  out = out.replace(/src=["']\s*\/?posts\/([^"']+)["']/gi, (_m, p1) => `src="${toStorageUrl(`posts/${p1}`)}"`);
  out = out.replace(/src=["']\s*\/?news\/([^"']+)\.(png|jpg|jpeg|gif)["']/gi, (_m, p1, ext) => `src="/${p1}.${ext}"`);
  out = out.replace(/src=["']\s*\/{2,}([^"']+)["']/gi, 'src="/$1"');
  return out;
}

export default function NewsViewerClient() {
  const [slug, setSlug] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const [article, setArticle] = useState<any | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Compute slug after mount to avoid SSR/CSR mismatch
  useEffect(() => {
    setMounted(true);
    const s = decodeURIComponent(new URLSearchParams(window.location.search).get("slug") || "").trim().toLowerCase();
    setSlug(s);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!slug) {
        setError("Missing slug");
        return;
      }
      try {
        const found = await findNewsBySlug(slug);
        let data = found;
        if (!data) {
          data = sampleNews.find((n) => String(n.slug || "").trim().toLowerCase() === slug) as any;
        }
        if (cancelled) return;
        setArticle(data || null);
        try {
          const payload = await listNews({ page: 1, per_page: 4, sort: "published_at", order: "desc" });
          const rel = (payload?.data || []).filter((n) => n.id !== (data as any)?.id).slice(0, 2);
          if (!cancelled) setRelated(rel as any[]);
        } catch {}
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load article");
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  // Optional: keep slug in sync if query string changes via browser navigation
  useEffect(() => {
    const syncSlug = () => {
      const s = decodeURIComponent(new URLSearchParams(window.location.search).get("slug") || "").trim().toLowerCase();
      setSlug(s);
    };
    window.addEventListener("popstate", syncSlug);
    return () => window.removeEventListener("popstate", syncSlug);
  }, []);

  // Render a stable skeleton on both server and client before mount
  if (!mounted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-64 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  if (!slug) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-4">Article Viewer</h1>
        <p className="text-gray-600">No slug provided. Try navigating from the News list.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-4">Unable to load article</h1>
        <p className="text-gray-600">{error}</p>
        <div className="mt-6">
          <a href="/news" className="text-blue-600">Back to News</a>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <p className="text-gray-600">The requested article could not be found.</p>
        <div className="mt-6">
          <a href="/news" className="text-blue-600">Back to News</a>
        </div>
      </div>
    );
  }

  const imageSrc = resolveImageSrc(article);
  const normalizedContent = normalizeContent(String((article as any).content ?? ""));
  const author = (article as any).author ?? "TDC Ghana Editorial";

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Source Serif Pro, serif" }}>
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <a href="/news" className="text-gray-600 hover:text-black inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </a>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">{article.title}</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{article.excerpt}</p>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-600">{author.charAt(0)}</span>
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
        </header>

        <div className="mb-12">
          <img src={imageSrc} alt={article.title} className="w-full h-auto rounded-lg" style={{ maxHeight: "500px", objectFit: "cover" }} />
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: normalizedContent }} className="text-gray-800 leading-[1.6] text-lg md:text-xl font-serif" />
        </div>

        <footer className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                <Heart className="w-5 h-5" />
                <span className="text-sm">24</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">8</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-black">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </footer>
      </article>

      {related.length > 0 && (
        <section className="border-t border-gray-200 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-black mb-4">More from TDC</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.slice(0, 2).map((rel) => (
                <a key={rel.id} href={`/news/${String(rel.slug || "").trim().toLowerCase()}`} className="group">
                  <article className="space-y-4">
                    {(rel as any).featured_image || (rel as any).featured_image_path ? (
                      <div className="aspect-[2/1] overflow-hidden rounded-md">
                        <img src={resolveImageSrc(rel)} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                    ) : null}
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-black group-hover:text-gray-700 line-clamp-2 leading-tight">{rel.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{rel.excerpt}</p>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
