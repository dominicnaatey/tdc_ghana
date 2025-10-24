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
    ];
  },
}

export default nextConfig
