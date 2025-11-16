import "./globals.css";
import "@/css/satoshi.css";

// Remove admin imports - these should only be in admin layout
// import { Sidebar } from "@/Layouts/sidebar";
// import { Header } from "@/Layouts/header";

// Import the regular site header instead
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import Providers from "./providers";
import PrefetchNews from "@/components/prefetch-news";

export const metadata: Metadata = {
  title: {
    template: "%s | TDC Ghana Ltd",
    default: "TDC Ghana Ltd - Building Ghana's Future Together",
  },
  description:
    "Tema Development Corporation leads Ghana's transformation through innovative housing projects, strategic land development, and essential infrastructure that creates thriving communities.",
  icons: {
    icon: "/tdc_logo.ico",
    shortcut: "/tdc_logo.ico",
    apple: "/tdc_logo.ico",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        {process.env.NODE_ENV === "production" ? (
          <script src="https://cdn.jsdelivr.net/npm/@mux/mux-player" defer></script>
        ) : null}
      </head>
      <body suppressHydrationWarning className="bg-white text-gray-900">
        <Providers>
          <NextTopLoader color="#164e63" showSpinner={false} />
          
          {/* Regular site layout - no admin sidebar */}
          <div className="min-h-screen bg-white">
            <Header />
            <main className="w-full">
              {children}
            </main>
            <Footer />
          </div>
          {/* Background prefetcher for news content */}
          <PrefetchNews />
        </Providers>
      </body>
    </html>
  );
}
