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
      { source: "/api/posts", destination: "http://127.0.0.1:8000/api/posts" },
      { source: "/api/posts/:path*", destination: "http://127.0.0.1:8000/api/posts/:path*" },
    ];
  },
}

export default nextConfig
