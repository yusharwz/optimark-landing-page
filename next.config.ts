import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Optimize for production
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Improve build performance
  swcMinify: true,
};

export default nextConfig;
