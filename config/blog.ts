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

/**
 * People behind the posts. Each id is both the URL slug of their profile page
 * (`/blog/author/<id>`, `/blog/reviewer/<id>`) and the key of their copy under
 * `blogPeople.authors.*` / `blogPeople.reviewers.*` in the messages.
 *
 * SAMPLE DATA, like the posts: these are placeholder profiles so the author
 * and reviewer pages can be reviewed. Replace them with the real editorial
 * team — names, bios, credentials — before the blog goes live. Avatars are
 * initials on purpose; no stand-in photos of people who do not exist.
 */
export const BLOG_AUTHOR_IDS = ["rina-pratiwi", "dimas-saputra"] as const;

export type BlogAuthorId = (typeof BLOG_AUTHOR_IDS)[number];

export const BLOG_REVIEWER_IDS = ["andi-wijaya"] as const;

export type BlogReviewerId = (typeof BLOG_REVIEWER_IDS)[number];

export type BlogPost = {
  slug: BlogSlug;
  category: BlogCategoryId;
  /** ISO date, formatted per locale at render time. */
  publishedAt: string;
  /**
   * ISO date of the last substantive edit. Omit it for a post that has not
   * changed since publishing — the "Updated" line only renders when it is set.
   */
  updatedAt?: string;
  readMinutes: number;
  author: BlogAuthorId;
  /** Subject-matter expert who checked the post before publishing. */
  reviewer: BlogReviewerId;
  /** Exactly one post should carry this — it drives the wide hero card. */
  featured?: boolean;
};

/** Newest first. Order here is the order the index renders. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "memulai-kalender-konten",
    category: "konten",
    publishedAt: "2026-09-15",
    updatedAt: "2026-09-22",
    readMinutes: 5,
    author: "rina-pratiwi",
    reviewer: "andi-wijaya",
    featured: true,
  },
  {
    slug: "audit-seo-dasar",
    category: "seo",
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-10",
    readMinutes: 4,
    author: "dimas-saputra",
    reviewer: "andi-wijaya",
  },
  {
    slug: "menghitung-biaya-konten",
    category: "bisnis",
    publishedAt: "2026-08-18",
    readMinutes: 4,
    author: "rina-pratiwi",
    reviewer: "andi-wijaya",
  },
];

export function blogHref(slug: BlogSlug): string {
  return `/blog/${slug}`;
}

export function authorHref(id: BlogAuthorId): string {
  return `/blog/author/${id}`;
}

export function reviewerHref(id: BlogReviewerId): string {
  return `/blog/reviewer/${id}`;
}

export function isBlogAuthorId(value: string): value is BlogAuthorId {
  return (BLOG_AUTHOR_IDS as readonly string[]).includes(value);
}

export function isBlogReviewerId(value: string): value is BlogReviewerId {
  return (BLOG_REVIEWER_IDS as readonly string[]).includes(value);
}

export function getPostsByAuthor(id: BlogAuthorId): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.author === id);
}

export function getPostsByReviewer(id: BlogReviewerId): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.reviewer === id);
}

/** Two-letter initials for the avatar, from the display name. */
export function initialsOf(name: string): string {
  const words = name
    .replace(/,.*$/, "") // drop trailing academic titles ("…, S.E., M.M.")
    .trim()
    .split(/\s+/);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
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
