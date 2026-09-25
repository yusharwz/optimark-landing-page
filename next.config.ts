import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

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
      { source: "/id/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
