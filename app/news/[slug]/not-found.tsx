import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";

/**
 * Custom not-found page for news articles
 * Provides enhanced navigation and user-friendly error messaging
 * Requirements: 3.1, 3.4
 */
export default function NewsNotFound() {
  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center"
      style={{ fontFamily: "Source Serif Pro, serif" }}
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Article Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          The news article you're looking for doesn't exist or may have been moved.
        </p>

        {/* Possible Reasons */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-800 mb-3">This might be because:</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• The article URL was typed incorrectly</li>
            <li>• The article has been removed or archived</li>
            <li>• The article is still in draft status</li>
            <li>• The link you followed is outdated</li>
            <li>• There was a temporary issue loading the content</li>
          </ul>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/news" className="flex items-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Browse All News
            </Link>
          </Button>
          
          <Button variant="outline" asChild size="lg">
            <Link href="/" className="flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            If you believe this is an error, please{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact us
            </Link>{" "}
            and let us know about the broken link.
          </p>
        </div>
      </div>
    </div>
  );
}