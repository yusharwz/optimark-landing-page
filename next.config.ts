import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.dritech.co.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.optimark.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.cloudflarestorage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "file.usahakreatif.co.id",
        pathname: "/**",
      },
    ],
  },

  /**
   * Indonesian is the default locale and lives at the bare path, so any
   * `/id`-prefixed URL goes to its unprefixed twin.
   *
   * The next-intl middleware already does this on its own, but with a 307
   * (temporary). Indonesian pages were indexed under `/id/…` while English was
   * the default, so a permanent 308 is issued here instead — it tells search
   * engines the move is final and carries the old URLs' ranking across.
   * Config redirects run before middleware, so this one always wins.
   */
  async redirects() {
    return [
      { source: "/id", destination: "/", permanent: true },
      // Content planner / perencana konten redirects
      {
        source: "/en/features/perencana-konten",
        destination: "/en/content-planner",
        permanent: true,
      },
      {
        source: "/en/features/content-planner",
        destination: "/en/content-planner",
        permanent: true,
      },
      {
        source: "/features/content-planner",
        destination: "/perencana-konten",
        permanent: true,
      },
      {
        source: "/features/perencana-konten",
        destination: "/perencana-konten",
        permanent: true,
      },
      {
        source: "/id/features/content-planner",
        destination: "/perencana-konten",
        permanent: true,
      },
      {
        source: "/id/features/perencana-konten",
        destination: "/perencana-konten",
        permanent: true,
      },
      {
        source: "/content-planner",
        destination: "/perencana-konten",
        permanent: true,
      },
      {
        source: "/id/content-planner",
        destination: "/perencana-konten",
        permanent: true,
      },
      {
        source: "/en/perencana-konten",
        destination: "/en/content-planner",
        permanent: true,
      },
      // Generic feature path strip
      { source: "/features", destination: "/#features", permanent: true },
      { source: "/en/features", destination: "/en#features", permanent: true },
      { source: "/features/:path*", destination: "/:path*", permanent: true },
      { source: "/en/features/:path*", destination: "/en/:path*", permanent: true },
      { source: "/id/features/:path*", destination: "/:path*", permanent: true },
      // Generic /id prefix strip
      { source: "/id/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
