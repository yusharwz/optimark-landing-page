import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/og";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The OG image endpoint is for crawlers fetching a shared link, not for
      // indexing — it renders no page content of its own.
      disallow: "/api/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
