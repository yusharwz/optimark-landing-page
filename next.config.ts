import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Optimize for production
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
