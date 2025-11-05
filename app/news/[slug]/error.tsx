"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    // Log the error to console for diagnostics
    console.error('[news][slug] error boundary', error);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Something went wrong while loading this article.</h2>
      <p className="text-gray-700 mb-6">Please try again, or return to the news list.</p>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded bg-red-600 text-white" onClick={() => reset()}>Try Again</button>
        <Link href="/news" className="px-4 py-2 rounded bg-gray-200 text-gray-800">Back to News</Link>
      </div>
    </div>
  );
}