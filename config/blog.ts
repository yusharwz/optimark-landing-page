import type { LucideIcon } from "lucide-react";
import { BarChart3, ImageIcon, PenLine, Share2 } from "lucide-react";

/**
 * Structural blog data. Copy lives in `messages/{locale}/blog-posts.json`,
 * keyed by the slugs below — nothing user-facing belongs in this file.
 *
 * SAMPLE DATA, mirroring the Figma blog design. Replace when real articles arrive.
 */

export const BLOG_CATEGORY_IDS = [
  "seo",
  "content-marketing",
  "social-media",
  "visual-content",
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORY_IDS)[number];

export const BLOG_SECTION_ORDER: readonly BlogCategoryId[] = [
  "seo",
  "social-media",
  "content-marketing",
  "visual-content",
];

export const BLOG_BANNER = {
  /** PLACEHOLDER image until the final banner design lands; keep it 820x200. */
  image: "/images/blog/banner.png",
  width: 820,
  height: 200,
  href: "/features/seo-analyzer",
} as const;

export const BLOG_CATEGORY_ICONS: Record<BlogCategoryId, LucideIcon> = {
  seo: BarChart3,
  "content-marketing": PenLine,
  "social-media": Share2,
  "visual-content": ImageIcon,
};

/**
 * Fallback cover for posts without a photo: a gradient wash plus the category
 * icon. `accent` is the icon colour, `cover` the wash.
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
 * SAMPLE DATA: roles and bios are placeholders.
 */
export const BLOG_AUTHOR_IDS = ["thia-rahmani", "rafi-rizky"] as const;

export type BlogAuthorId = (typeof BLOG_AUTHOR_IDS)[number];

export const BLOG_REVIEWER_IDS = ["jonathan-anderson"] as const;

export type BlogReviewerId = (typeof BLOG_REVIEWER_IDS)[number];

/**
 * LinkedIn profiles, used for the profile-page link and the Person schema
 * `sameAs`. Empty entries are not rendered.
 */
export const BLOG_PERSON_LINKEDIN: Record<BlogAuthorId | BlogReviewerId, string> = {
  "thia-rahmani": "https://www.linkedin.com/in/thiarahmani",
  "rafi-rizky": "https://www.linkedin.com/in/rafirizky",
  "jonathan-anderson": "https://www.linkedin.com/in/jonathan-anderson-tjitrabudi",
};

export const BLOG_PERSON_PHOTOS: Partial<Record<BlogAuthorId | BlogReviewerId, string>> = {
  "thia-rahmani": "/images/blog/people/thia-rahmani.jpg",
  "rafi-rizky": "/images/blog/people/rafi-rizky.jpg",
  "jonathan-anderson": "/images/blog/people/jonathan-anderson.jpg",
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
  cover?: string;
  author: BlogAuthorId;
  /** Subject-matter expert who checked the post before publishing. */
  reviewer: BlogReviewerId;
  related?: BlogSlug[];
};

/** Newest first. Order here is the order the index renders. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "riset-keyword-bisnis-lokal",
    category: "seo",
    publishedAt: "2026-10-01",
    updatedAt: "2026-10-02",
    readMinutes: 6,
    cover: "/images/blog/riset-keyword-bisnis-lokal.jpg",
    author: "rafi-rizky",
    reviewer: "jonathan-anderson",
    related: ["website-belum-muncul-di-google", "strategi-content-pillar", "target-audiens"],
  },
  {
    slug: "jadwal-posting-instagram-umkm-kuliner",
    category: "social-media",
    publishedAt: "2026-09-29",
    readMinutes: 4,
    cover: "/images/blog/jadwal-posting-instagram-umkm-kuliner.jpg",
    author: "thia-rahmani",
    reviewer: "jonathan-anderson",
  },
  {
    slug: "foto-produk-ai-smartphone",
    category: "visual-content",
    publishedAt: "2026-09-26",
    readMinutes: 5,
    cover: "/images/blog/foto-produk-ai-smartphone.jpg",
    author: "thia-rahmani",
    reviewer: "jonathan-anderson",
  },
  {
    slug: "strategi-content-pillar",
    category: "content-marketing",
    publishedAt: "2026-09-23",
    readMinutes: 7,
    cover: "/images/blog/strategi-content-pillar.jpg",
    author: "rafi-rizky",
    reviewer: "jonathan-anderson",
  },
  {
    slug: "website-belum-muncul-di-google",
    category: "seo",
    publishedAt: "2026-09-19",
    readMinutes: 8,
    cover: "/images/blog/website-belum-muncul-di-google.jpg",
    author: "rafi-rizky",
    reviewer: "jonathan-anderson",
  },
  {
    slug: "warna-feed-instagram",
    category: "visual-content",
    publishedAt: "2026-09-16",
    readMinutes: 4,
    cover: "/images/blog/warna-feed-instagram.jpg",
    author: "thia-rahmani",
    reviewer: "jonathan-anderson",
  },
  {
    slug: "caption-tiktok",
    category: "social-media",
    publishedAt: "2026-09-12",
    readMinutes: 3,
    cover: "/images/blog/caption-tiktok.jpg",
    author: "thia-rahmani",
    reviewer: "jonathan-anderson",
  },
  {
    slug: "artikel-jadi-konten-media-sosial",
    category: "content-marketing",
    publishedAt: "2026-09-09",
    readMinutes: 7,
    cover: "/images/blog/artikel-jadi-konten-media-sosial.jpg",
    author: "rafi-rizky",
    reviewer: "jonathan-anderson",
  },
  {
    slug: "video-promosi-singkat",
    category: "visual-content",
    publishedAt: "2026-09-02",
    readMinutes: 5,
    cover: "/images/blog/video-promosi-singkat.jpg",
    author: "thia-rahmani",
    reviewer: "jonathan-anderson",
  },
  {
    slug: "target-audiens",
    category: "content-marketing",
    publishedAt: "2026-08-28",
    readMinutes: 4,
    cover: "/images/blog/target-audiens.jpg",
    author: "rafi-rizky",
    reviewer: "jonathan-anderson",
  },
  {
    slug: "insight-instagram",
    category: "social-media",
    publishedAt: "2026-08-25",
    readMinutes: 6,
    cover: "/images/blog/insight-instagram.jpg",
    author: "thia-rahmani",
    reviewer: "jonathan-anderson",
  },
];

/** Posts shown on the /blog overview: the latest six, then three per topic. */
export function getBlogOverviewPosts(): BlogPost[] {
  const shown = [
    ...BLOG_POSTS.slice(0, 6),
    ...BLOG_SECTION_ORDER.flatMap((id) =>
      BLOG_POSTS.filter((post) => post.category === id).slice(0, 3),
    ),
  ];
  return shown.filter((post, index) => shown.indexOf(post) === index);
}

export function blogCategoryHref(id: BlogCategoryId): string {
  return `/blog/kategori/${id}`;
}

export function isBlogCategoryId(value: string): value is BlogCategoryId {
  return (BLOG_CATEGORY_IDS as readonly string[]).includes(value);
}

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

  if (current.related?.length) {
    return current.related
      .map((item) => getBlogPost(item))
      .filter((post): post is BlogPost => Boolean(post))
      .slice(0, limit);
  }

  const others = BLOG_POSTS.filter((post) => post.slug !== slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}
