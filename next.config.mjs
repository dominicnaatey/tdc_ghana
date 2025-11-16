/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export to generate the `out` directory on build
  output: 'export',
  // Keep exported routes consistent with directory-based hosting (Apache)
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
      { source: "/api/posts", destination: "https://admin.eurochamghana.eu/api/posts" },
      { source: "/api/posts/:path*", destination: "https://admin.eurochamghana.eu/api/posts/:path*" },
      // Proxy remote storage assets to keep image requests same-origin
      { source: "/storage/:path*", destination: "https://admin.eurochamghana.eu/storage/:path*" },
      { source: "/posts/:path*", destination: "https://admin.eurochamghana.eu/posts/:path*" },
    ];
  },
}

export default nextConfig
