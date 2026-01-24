/** @type {import('next').NextConfig} */
const useStaticExport = String(process.env.OUTPUT_EXPORT || '').toLowerCase() === 'true'
const nextConfig = {
  reactStrictMode: false,
  // Allow opting into static export explicitly via OUTPUT_EXPORT=true
  ...(useStaticExport ? { output: 'export', trailingSlash: true } : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    qualities: [75, 80, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    const ENABLE_REWRITES = String(process.env.ENABLE_REWRITES || "").toLowerCase() === "true";
    if (!ENABLE_REWRITES) return [];
    return [
      { source: "/api/v1/posts", destination: "https://admin.eurochamghana.eu/api/v1/posts" },
      { source: "/api/v1/posts/:path*", destination: "https://admin.eurochamghana.eu/api/v1/posts/:path*" },
      // Legacy support: map old /api/posts to new v1 endpoint
      { source: "/api/posts", destination: "https://admin.eurochamghana.eu/api/v1/posts" },
      { source: "/api/posts/:path*", destination: "https://admin.eurochamghana.eu/api/v1/posts/:path*" },
      // Proxy remote storage assets to keep image requests same-origin
      { source: "/storage/:path*", destination: "https://admin.eurochamghana.eu/storage/:path*" },
      { source: "/posts/:path*", destination: "https://admin.eurochamghana.eu/posts/:path*" },
    ];
  },
}

export default nextConfig
