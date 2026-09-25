import type { LucideIcon } from "lucide-react";
import { BarChart3, PenLine, Wallet } from "lucide-react";

/**
 * Structural blog data. Copy lives in `messages/{locale}/blog-posts.json`,
 * keyed by the slugs below — nothing user-facing belongs in this file.
 *
 * SAMPLE DATA. There is no real editorial content or CMS yet; the three posts
 * below exist so the index and the article template can be reviewed with
 * something in them. Replace the entries here and the matching keys in both
 * `blog-posts.json` files when the real articles arrive.
 */

export const BLOG_CATEGORY_IDS = ["seo", "konten", "bisnis"] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORY_IDS)[number];

export const BLOG_CATEGORY_ICONS: Record<BlogCategoryId, LucideIcon> = {
  seo: BarChart3,
  konten: PenLine,
  bisnis: Wallet,
};

/**
 * Per-category cover treatment. Posts have no photography yet, so each card
 * paints a gradient wash plus its category icon instead of an <Image> that
 * would 404. `accent` is the chip/icon colour, `cover` the card wash.
 */
export const BLOG_CATEGORY_STYLES: Record<
  BlogCategoryId,
  { accent: string; accentSoft: string; cover: string }
> = {
  seo: {
    accent: "#3B82F6",
    accentSoft: "rgba(59, 130, 246, 0.1)",
    cover: "linear-gradient(135deg, #EFF6FF 0%, #F8FDF1 100%)",
  },
  konten: {
    accent: "#94C748",
    accentSoft: "rgba(148, 199, 72, 0.12)",
    cover: "linear-gradient(135deg, #F1FBE4 0%, #FFFFFF 100%)",
  },
  bisnis: {
    accent: "#B45309",
    accentSoft: "rgba(180, 83, 9, 0.1)",
    cover: "linear-gradient(135deg, #FEF6E7 0%, #F8FDF1 100%)",
  },
};

/**
 * Slugs are a literal union, not `string`, on purpose: they double as the key
 * into the `blogPosts` message namespace (see types/blog.ts). A widened
 * `string` here turns that namespace into an index signature, which next-intl
 * cannot derive message keys from.
 */
export const BLOG_SLUGS = [
  "memulai-kalender-konten",
  "audit-seo-dasar",
  "menghitung-biaya-konten",
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

/** Resolved against `blog.authors.*` in the messages. */
export const BLOG_AUTHOR_IDS = ["tim"] as const;

export type BlogAuthorId = (typeof BLOG_AUTHOR_IDS)[number];

export type BlogPost = {
  slug: BlogSlug;
  category: BlogCategoryId;
  /** ISO date, formatted per locale at render time. */
  publishedAt: string;
  readMinutes: number;
  author: BlogAuthorId;
  /** Exactly one post should carry this — it drives the wide hero card. */
  featured?: boolean;
};

/** Newest first. Order here is the order the index renders. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "memulai-kalender-konten",
    category: "konten",
    publishedAt: "2026-09-15",
    readMinutes: 5,
    author: "tim",
    featured: true,
  },
  {
    slug: "audit-seo-dasar",
    category: "seo",
    publishedAt: "2026-09-01",
    readMinutes: 4,
    author: "tim",
  },
  {
    slug: "menghitung-biaya-konten",
    category: "bisnis",
    publishedAt: "2026-08-18",
    readMinutes: 4,
    author: "tim",
  },
];

export function blogHref(slug: BlogSlug): string {
  return `/blog/${slug}`;
}

/** Accepts a raw route param, so the caller does the narrowing. */
export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Up to `limit` other posts, same category first, then the newest remainder. */
export function getRelatedPosts(slug: BlogSlug, limit = 3): BlogPost[] {
  const current = getBlogPost(slug);
  if (!current) return BLOG_POSTS.slice(0, limit);

  const others = BLOG_POSTS.filter((post) => post.slug !== slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}
