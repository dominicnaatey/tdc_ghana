"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { listNews, deleteNews } from "@/lib/api/news";
import type { News } from "@/lib/types/news";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function AdminNewsPage() {
  const [items, setItems] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      const payload = await listNews({ page: 1, per_page: 20, sort: "published_at", order: "desc" });
      setItems(payload.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load news");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this news item?");
    if (!confirmed) return;
    try {
      setIsLoading(true);
      const token = process.env.NEXT_PUBLIC_API_TOKEN;
      await deleteNews(id, token);
      setMessage("Deleted successfully");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage News</h1>
          <p className="text-sm text-gray-600">Create, edit, and delete news items</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/news/new">New News</Link>
          </Button>
          <Button variant="outline" onClick={load} disabled={isLoading}>Refresh</Button>
        </div>
      </div>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</div>
      )}
      {message && (
        <div className="rounded border border-green-200 bg-green-50 p-3 text-green-700">{message}</div>
      )}

      <div className="bg-white rounded shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Published</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Published At</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && items.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>Loading...</td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">/{item.slug}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={item.is_published ? "text-green-600" : "text-gray-500"}>
                    {item.is_published ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {item.published_at ? format(new Date(item.published_at), "MMM d, yyyy") : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/admin/news/${item.id}`}>Edit</Link>
                    </Button>
                    <Button variant="destructive" onClick={() => onDelete(item.id)} disabled={isLoading}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
            {!isLoading && items.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>No news yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}