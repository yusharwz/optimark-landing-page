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
import {
  getCategoriesForSitemap,
  getPeopleForSitemap,
  getPublishedPostsForSitemap,
} from "@/server/blog/queries";

/**
 * Revalidate interval: 60 seconds (ISR).
 * Googlebot gets fast cached responses, while newly published CMS articles
 * and editorial updates automatically flow into the sitemap within 60 seconds
 * without requiring any rebuild or code changes.
 *
 * For instant on-demand cache invalidation directly from the CMS:
 *   POST /api/revalidate with { "path": "/sitemap.xml" }
 */
export const revalidate = 60;

interface SitemapItemConfig {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  lastModified?: Date;
}

/**
 * Core indexable static routes (without a locale prefix).
 * Note: /faq is 404 (temporarily disabled) and excluded from the sitemap.
 */
const STATIC_PAGE_CONFIGS: SitemapItemConfig[] = [
  // Homepage
  { path: "", changeFrequency: "daily", priority: 1.0 },
  // 5 Features (direct root routes; /perencana-konten maps to /en/content-planner via localizedUrl)
  { path: "/ai-content-maker", changeFrequency: "weekly", priority: 0.9 },
  { path: "/perencana-konten", changeFrequency: "weekly", priority: 0.9 },
  { path: "/seo-analyzer", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ai-image", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ai-video", changeFrequency: "weekly", priority: 0.9 },
  // High-value marketing pages
  { path: "/pricing", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  // Info & company pages
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  // Legal
  { path: "/privacy-policy", changeFrequency: "monthly", priority: 0.3 },
  { path: "/terms-of-service", changeFrequency: "monthly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const items: SitemapItemConfig[] = [...STATIC_PAGE_CONFIGS];

  // 1. Dynamic Blog Posts: query PostgreSQL published posts with fallback to config
  const dbPosts = await getPublishedPostsForSitemap();
  const postMap = new Map<string, { lastmod: Date }>();

  if (dbPosts.length === 0) {
    // Fallback to static posts when DB is not yet populated
    for (const post of BLOG_POSTS) {
      postMap.set(post.slug, { lastmod: now });
    }
  } else {
    for (const post of dbPosts) {
      postMap.set(post.slug, {
        lastmod: post.contentUpdatedAt ?? post.updatedAt ?? post.publishedAt,
      });
    }
  }

  for (const [slug, { lastmod }] of postMap.entries()) {
    items.push({
      path: blogHref(slug),
      changeFrequency: "weekly",
      priority: 0.7,
      lastModified: lastmod,
    });
  }

  // 2. Dynamic Categories: DB with fallback to config
  const dbCategories = await getCategoriesForSitemap();
  const categorySlugs =
    dbCategories.length > 0 ? dbCategories : (BLOG_CATEGORY_IDS as readonly string[]);
  for (const catSlug of categorySlugs) {
    items.push({
      path: blogCategoryHref(catSlug),
      changeFrequency: "weekly",
      priority: 0.5,
      lastModified: now,
    });
  }

  // 3. Dynamic Authors & Reviewers: DB with fallback to config
  const dbPeople = await getPeopleForSitemap();
  const authorSlugs =
    dbPeople.authors.length > 0 ? dbPeople.authors : (BLOG_AUTHOR_IDS as readonly string[]);
  for (const authorSlug of authorSlugs) {
    items.push({
      path: authorHref(authorSlug),
      changeFrequency: "monthly",
      priority: 0.5,
      lastModified: now,
    });
  }

  const reviewerSlugs =
    dbPeople.reviewers.length > 0 ? dbPeople.reviewers : (BLOG_REVIEWER_IDS as readonly string[]);
  for (const reviewerSlug of reviewerSlugs) {
    items.push({
      path: reviewerHref(reviewerSlug),
      changeFrequency: "monthly",
      priority: 0.5,
      lastModified: now,
    });
  }

  // 4. Tags
  for (const tagId of BLOG_TAG_IDS) {
    items.push({
      path: blogTagHref(tagId),
      changeFrequency: "weekly",
      priority: 0.4,
      lastModified: now,
    });
  }

  // 5. Expand each route into bilingual entries (ID & EN) with alternate hreflang
  return items.flatMap(({ path, changeFrequency, priority, lastModified }) => {
    const normalizedPath = path || "/";
    const date = lastModified ?? now;
    const languages = {
      id: localizedUrl("id", normalizedPath),
      en: localizedUrl("en", normalizedPath),
      "x-default": localizedUrl("id", normalizedPath),
    };

    return routing.locales.map((locale) => ({
      url: localizedUrl(locale, normalizedPath),
      lastModified: date,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
