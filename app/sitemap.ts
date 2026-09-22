import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/og";
import { BLOG_POSTS, blogHref } from "@/config/blog";

/**
 * Every indexable route, without a locale prefix.
 *
 * This list is maintained by hand — Next does not discover routes for the
 * sitemap. Add an entry here whenever a page is added under `app/[locale]/`,
 * and drop one when a page is removed.
 */
const ROUTES = [
  "",
  "/pricing",
  "/faq",
  "/blog",
  "/privacy-policy",
  "/terms-of-service",
  "/features/ai-content-maker",
  "/features/perencana-konten",
  "/features/seo-analyzer",
  "/features/ai-image",
  "/features/ai-video",
  // Post URLs come from config/blog.ts, so a new post lands in the sitemap
  // without a second edit here.
  ...BLOG_POSTS.map((post) => blogHref(post.slug)),
] as const;

/**
 * Routing uses `localePrefix: "as-needed"` with `defaultLocale: "en"`, so the
 * English pages live at the bare path and only Indonesian carries a `/id`
 * prefix. The canonical `url` is therefore the English one, with both locales
 * declared as `alternates` so Google pairs them instead of treating them as
 * duplicates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const lastModified = new Date();

  return ROUTES.map((route) => {
    const en = `${base}${route || "/"}`;

    return {
      url: en,
      lastModified,
      alternates: {
        languages: {
          en,
          id: `${base}/id${route}`,
        },
      },
    };
  });
}
