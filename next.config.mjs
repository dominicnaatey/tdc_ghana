/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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
