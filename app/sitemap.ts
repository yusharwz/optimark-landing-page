import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";
import {
  BLOG_AUTHOR_IDS,
  BLOG_CATEGORY_IDS,
  BLOG_TAG_IDS,
  BLOG_POSTS,
  BLOG_REVIEWER_IDS,
  authorHref,
  blogCategoryHref,
  blogTagHref,
  blogHref,
  reviewerHref,
} from "@/config/blog";

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
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/features/ai-content-maker",
  "/features/perencana-konten",
  "/features/seo-analyzer",
  "/features/ai-image",
  "/features/ai-video",
  // Post URLs come from config/blog.ts, so a new post lands in the sitemap
  // without a second edit here.
  ...BLOG_CATEGORY_IDS.map(blogCategoryHref),
  ...BLOG_TAG_IDS.map(blogTagHref),
  ...BLOG_POSTS.map((post) => blogHref(post.slug)),
  ...BLOG_AUTHOR_IDS.map(authorHref),
  ...BLOG_REVIEWER_IDS.map(reviewerHref),
] as const;

/**
 * Routing uses `localePrefix: "as-needed"` with `defaultLocale: "id"`, so the
 * Indonesian pages live at the bare path and only English carries an `/en`
 * prefix. Each page is listed once per locale, and every entry declares both
 * locales plus `x-default` (Indonesian) as `alternates` so Google pairs them
 * instead of treating them as duplicates.
 *
 * `/id/…` URLs are never listed: they only 308 to the bare path (see
 * next.config.ts).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) => {
    const path = route || "/";
    const languages = {
      id: localizedUrl("id", path),
      en: localizedUrl("en", path),
      "x-default": localizedUrl("id", path),
    };
    return routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      alternates: { languages },
    }));
  });
}
