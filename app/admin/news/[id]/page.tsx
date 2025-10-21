"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getNews, updateNews, deleteNews } from "@/lib/api/news";
import type { UpdateNewsPayload, News } from "@/lib/types/news";

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [loaded, setLoaded] = useState<News | null>(null);
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
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const item = await getNews(id);
      setLoaded(item);
      setTitle(item.title);
      setSlug(item.slug);
      setExcerpt(item.excerpt ?? "");
      setContent(item.content ?? "");
      setIsPublished(Boolean(item.is_published));
      setPublishedAt(item.published_at ? item.published_at.substring(0, 10) : "");
      setCategoryId(item.category_id != null ? String(item.category_id) : "");
      setFeaturedImagePath(item.featured_image_path ?? "");
      setReadTime(item.read_time != null ? String(item.read_time) : "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load news");
    }
  }, [id]);

  useEffect(() => {
    if (!Number.isFinite(id)) {
      setError("Invalid news id");
      return;
    }
    load();
  }, [id, load]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setIsSubmitting(true);
      const payload: UpdateNewsPayload = {
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
      const updated: News = await updateNews(id, payload, token);
      setMessage("Saved successfully");
      setTimeout(() => setMessage(null), 3000);
      // Refresh state from saved
      setTitle(updated.title);
      setSlug(updated.slug);
      setExcerpt(updated.excerpt ?? "");
      setContent(updated.content ?? "");
      setIsPublished(Boolean(updated.is_published));
      setPublishedAt(updated.published_at ? updated.published_at.substring(0, 10) : "");
      setCategoryId(updated.category_id != null ? String(updated.category_id) : "");
      setFeaturedImagePath(updated.featured_image_path ?? "");
      setReadTime(updated.read_time != null ? String(updated.read_time) : "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update news");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = async () => {
    const confirmed = window.confirm("Delete this news item?");
    if (!confirmed) return;
    try {
      const token = process.env.NEXT_PUBLIC_API_TOKEN;
      await deleteNews(id, token);
      router.push("/admin/news");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit News</h1>
        <div className="flex gap-2">
          <Button variant="destructive" onClick={onDelete}>Delete</Button>
          <Button variant="outline" onClick={() => router.push("/admin/news")}>Back</Button>
        </div>
      </div>
      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</div>
      )}
      {message && (
        <div className="rounded border border-green-200 bg-green-50 p-3 text-green-700">{message}</div>
      )}
      {!loaded ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
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
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/news")}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
}