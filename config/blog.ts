import type { LucideIcon } from "lucide-react";
import { BarChart3, ImageIcon, PenLine, Share2 } from "lucide-react";

/**
 * Structural blog data. Copy lives in `messages/{locale}/blog-posts.json`,
 * keyed by the slugs below — nothing user-facing belongs in this file.
 *
 * SAMPLE DATA. There is no real editorial content or CMS yet. Titles, dates,
 * authors and covers mirror the Figma blog design; the article bodies are
 * placeholders. Replace the entries here and the matching keys in both
 * `blog-posts.json` files when the real articles arrive.
 */

/** Order here is the order of the sidebar tabs. */
export const BLOG_CATEGORY_IDS = [
  "seo",
  "content-marketing",
  "social-media",
  "visual-content",
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORY_IDS)[number];

/** Order of the per-topic blocks on the index overview (differs from the tabs, per the design). */
export const BLOG_SECTION_ORDER: readonly BlogCategoryId[] = [
  "seo",
  "social-media",
  "content-marketing",
  "visual-content",
];

/**
 * Wide banner between "latest" and the per-topic blocks on the index.
 * PLACEHOLDER: the design only has a transparency-grid stand-in here. Swap
 * `image` for the real banner (820×200) and set `href` if it should link.
 */
export const BLOG_BANNER: { image: string; href?: string } = {
  image: "/images/blog/banner.png",
};

export const BLOG_CATEGORY_ICONS: Record<BlogCategoryId, LucideIcon> = {
  seo: BarChart3,
  "content-marketing": PenLine,
  "social-media": Share2,
  "visual-content": ImageIcon,
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
  "content-marketing": {
    accent: "#94C748",
    accentSoft: "rgba(148, 199, 72, 0.12)",
    cover: "linear-gradient(135deg, #F1FBE4 0%, #FFFFFF 100%)",
  },
  "social-media": {
    accent: "#DB2777",
    accentSoft: "rgba(219, 39, 119, 0.1)",
    cover: "linear-gradient(135deg, #FDF2F8 0%, #F8FDF1 100%)",
  },
  "visual-content": {
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
  "riset-keyword-bisnis-lokal",
  "jadwal-posting-instagram-umkm-kuliner",
  "foto-produk-ai-smartphone",
  "strategi-content-pillar",
  "website-belum-muncul-di-google",
  "warna-feed-instagram",
  "caption-tiktok",
  "artikel-jadi-konten-media-sosial",
  "video-promosi-singkat",
  "target-audiens",
  "insight-instagram",
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

/**
 * People behind the posts. Each id is both the URL slug of their profile page
 * (`/blog/author/<id>`, `/blog/reviewer/<id>`) and the key of their copy under
 * `blogPeople.authors.*` / `blogPeople.reviewers.*` in the messages.
 *
 * SAMPLE DATA, like the posts: names and photos come from the Figma design;
 * roles and bios are placeholders. Confirm them with the editorial team
 * before the blog goes live.
 */
export const BLOG_AUTHOR_IDS = ["thia-rahmani", "rafi-rizky"] as const;

export type BlogAuthorId = (typeof BLOG_AUTHOR_IDS)[number];

export const BLOG_REVIEWER_IDS = ["andi-wijaya"] as const;

export type BlogReviewerId = (typeof BLOG_REVIEWER_IDS)[number];

/** Headshots under `public/`. People without one fall back to initials. */
export const BLOG_PERSON_PHOTOS: Partial<Record<BlogAuthorId | BlogReviewerId, string>> = {
  "thia-rahmani": "/images/blog/people/thia-rahmani.jpg",
  "rafi-rizky": "/images/blog/people/rafi-rizky.jpg",
};

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
  /**
   * Cover photo under `public/`, e.g. "/images/blog/caption-tiktok.jpg".
   * Optional: without one the card paints the category wash instead.
   */
  cover?: string;
  author: BlogAuthorId;
  /** Subject-matter expert who checked the post before publishing. */
  reviewer: BlogReviewerId;
};

/** Newest first. Order here is the order the index renders. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "riset-keyword-bisnis-lokal",
    category: "seo",
    publishedAt: "2026-10-01",
    readMinutes: 6,
    cover: "/images/blog/riset-keyword-bisnis-lokal.jpg",
    author: "thia-rahmani",
    reviewer: "andi-wijaya",
  },
  {
    slug: "jadwal-posting-instagram-umkm-kuliner",
    category: "social-media",
    publishedAt: "2026-09-29",
    readMinutes: 4,
    cover: "/images/blog/jadwal-posting-instagram-umkm-kuliner.jpg",
    author: "rafi-rizky",
    reviewer: "andi-wijaya",
  },
  {
    slug: "foto-produk-ai-smartphone",
    category: "visual-content",
    publishedAt: "2026-09-26",
    readMinutes: 5,
    cover: "/images/blog/foto-produk-ai-smartphone.jpg",
    author: "rafi-rizky",
    reviewer: "andi-wijaya",
  },
  {
    slug: "strategi-content-pillar",
    category: "content-marketing",
    publishedAt: "2026-09-23",
    readMinutes: 7,
    cover: "/images/blog/strategi-content-pillar.jpg",
    author: "thia-rahmani",
    reviewer: "andi-wijaya",
  },
  {
    slug: "website-belum-muncul-di-google",
    category: "seo",
    publishedAt: "2026-09-19",
    readMinutes: 8,
    cover: "/images/blog/website-belum-muncul-di-google.jpg",
    author: "thia-rahmani",
    reviewer: "andi-wijaya",
  },
  {
    slug: "warna-feed-instagram",
    category: "visual-content",
    publishedAt: "2026-09-16",
    readMinutes: 4,
    cover: "/images/blog/warna-feed-instagram.jpg",
    author: "rafi-rizky",
    reviewer: "andi-wijaya",
  },
  {
    slug: "caption-tiktok",
    category: "social-media",
    publishedAt: "2026-09-12",
    readMinutes: 3,
    cover: "/images/blog/caption-tiktok.jpg",
    author: "thia-rahmani",
    reviewer: "andi-wijaya",
  },
  {
    slug: "artikel-jadi-konten-media-sosial",
    category: "content-marketing",
    publishedAt: "2026-09-09",
    readMinutes: 7,
    cover: "/images/blog/artikel-jadi-konten-media-sosial.jpg",
    author: "rafi-rizky",
    reviewer: "andi-wijaya",
  },
  {
    slug: "video-promosi-singkat",
    category: "visual-content",
    publishedAt: "2026-09-02",
    readMinutes: 5,
    cover: "/images/blog/video-promosi-singkat.jpg",
    author: "thia-rahmani",
    reviewer: "andi-wijaya",
  },
  {
    slug: "target-audiens",
    category: "content-marketing",
    publishedAt: "2026-08-28",
    readMinutes: 4,
    cover: "/images/blog/target-audiens.jpg",
    author: "rafi-rizky",
    reviewer: "andi-wijaya",
  },
  {
    slug: "insight-instagram",
    category: "social-media",
    publishedAt: "2026-08-25",
    readMinutes: 6,
    cover: "/images/blog/insight-instagram.jpg",
    author: "thia-rahmani",
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
