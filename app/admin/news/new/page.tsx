"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createNews } from "@/lib/api/news";
import type { CreateNewsPayload, News } from "@/lib/types/news";

export default function NewNewsPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [publishedAt, setPublishedAt] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [featuredImagePath, setFeaturedImagePath] = useState("");
  const [readTime, setReadTime] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title || !slug) {
      setError("Title and slug are required");
      return;
    }
    try {
      setIsSubmitting(true);
      const payload: CreateNewsPayload = {
        title,
        slug,
        excerpt: excerpt || null,
        content: content || null,
        is_published: isPublished,
        published_at: publishedAt ? new Date(publishedAt + "T00:00:00").toISOString() : null,
        category_id: categoryId ? Number(categoryId) : null,
        featured_image_path: featuredImagePath || null,
        read_time: readTime ? Number(readTime) : null,
      };
      const token = process.env.NEXT_PUBLIC_API_TOKEN;
      const created: News = await createNews(payload, token);
      router.push(`/admin/news/${created.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create news");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Create News</h1>
      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug" />
        </div>
        <div>
          <label className="block text-sm font-medium">Excerpt</label>
          <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary" />
        </div>
        <div>
          <label className="block text-sm font-medium">Content (HTML or Markdown)</label>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full content" rows={8} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Published?</label>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
              <span className="text-sm text-gray-600">Mark as published</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Published At</label>
            <Input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Category ID</label>
            <Input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="e.g. 1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Featured Image Path</label>
            <Input value={featuredImagePath} onChange={(e) => setFeaturedImagePath(e.target.value)} placeholder="/storage/images/.." />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Read Time (minutes)</label>
            <Input type="number" value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="e.g. 5" />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create"}</Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/news")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}