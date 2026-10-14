import {
  BLOG_AUTHOR_IDS,
  BLOG_CATEGORY_IDS,
  BLOG_POSTS,
  BLOG_REVIEWER_IDS,
  type BlogCategoryId,
  type BlogPost,
} from "@/config/blog";

export function getCmsBaseUrl(): string {
  let url =
    process.env.CMS_API_URL?.replace(/\/+$/, "") ||
    process.env.NEXT_PUBLIC_CMS_API_URL?.replace(/\/+$/, "") ||
    "http://localhost:3001";
  if (!url.endsWith("/api")) {
    url += "/api";
  }
  return url;
}

export interface CmsArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  readMinutes?: number;
  featured?: boolean;
  tags?: string[];
  publishedAt: string;
  contentUpdatedAt?: string | null;
  updatedAt?: string | null;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  author?: {
    id: string;
    name: string;
    slug: string;
    role?: string | null;
    avatarUrl?: string | null;
  } | null;
}

export interface CmsArticleDetail extends CmsArticleSummary {
  content?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  tableOfContents?: Array<{ id: string; text: string; level: number }>;
  reviewer?: {
    id: string;
    name: string;
    slug: string;
    role?: string | null;
    avatarUrl?: string | null;
  } | null;
}

export function cmsArticleToBlogPost(item: CmsArticleSummary | CmsArticleDetail): BlogPost {
  const authorSlug = item.author?.slug || "rafi-rizky";
  const reviewerSlug = ("reviewer" in item && item.reviewer?.slug) || "jonathan-anderson";
  const categorySlug = (item.category?.slug as BlogCategoryId) || "seo";
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt || undefined,
    content: ("content" in item && item.content) || undefined,
    category: categorySlug,
    publishedAt: item.publishedAt,
    updatedAt: item.contentUpdatedAt || item.updatedAt || undefined,
    readMinutes: item.readMinutes || 5,
    cover: item.coverImageUrl || undefined,
    coverAlt: item.coverImageAlt || item.title,
    tags: (item.tags as string[]) || [],
    author: authorSlug,
    authorName: item.author?.name || undefined,
    authorRole: item.author?.role || undefined,
    authorAvatar: item.author?.avatarUrl || undefined,
    reviewer: reviewerSlug,
    reviewerName: ("reviewer" in item && item.reviewer?.name) || undefined,
    reviewerRole: ("reviewer" in item && item.reviewer?.role) || undefined,
    reviewerAvatar: ("reviewer" in item && item.reviewer?.avatarUrl) || undefined,
    tableOfContents: ("tableOfContents" in item && item.tableOfContents) || undefined,
  };
}

export interface CmsPostsResponse {
  data: CmsArticleSummary[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Fetch published articles list from Headless CMS API with timeout & fallback.
 */
export async function fetchCmsPosts(params?: {
  categorySlug?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<CmsPostsResponse> {
  const baseUrl = getCmsBaseUrl();
  const query = new URLSearchParams();
  if (params?.categorySlug) {
    query.set("category", params.categorySlug);
    query.set("categorySlug", params.categorySlug);
  }
  if (params?.tag) query.set("tag", params.tag);
  if (params?.search) query.set("search", params.search);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));

  const url = `${baseUrl}/public/posts${query.toString() ? `?${query.toString()}` : ""}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok) {
      return (await res.json()) as CmsPostsResponse;
    }
  } catch {
    // Graceful fallback to static posts if CMS is offline
  }

  // Fallback to local static BLOG_POSTS
  let filtered = [...BLOG_POSTS];
  if (params?.categorySlug) {
    filtered = filtered.filter((p) => p.category === params.categorySlug);
  }
  if (params?.tag) {
    filtered = filtered.filter((p) => (p.tags as readonly string[]).includes(params.tag!));
  }
  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter((p) => p.slug.toLowerCase().includes(q));
  }

  const page = params?.page || 1;
  const limit = params?.limit || 12;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return {
    data: items.map((p) => ({
      id: p.slug,
      title: p.slug,
      slug: p.slug,
      excerpt: null,
      coverImageUrl: p.cover,
      coverImageAlt: p.slug,
      readMinutes: p.readMinutes,
      featured: false,
      tags: p.tags,
      publishedAt: p.publishedAt,
      contentUpdatedAt: p.updatedAt,
      updatedAt: p.updatedAt,
      category: { id: p.category, name: p.category, slug: p.category },
      author: { id: p.author, name: p.author, slug: p.author },
    })),
    meta: {
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    },
  };
}

/**
 * Fetch a single post by slug from Headless CMS API.
 */
export async function fetchCmsPostBySlug(
  slug: string,
): Promise<{ post: CmsArticleDetail; relatedPosts: CmsArticleSummary[] } | null> {
  const baseUrl = getCmsBaseUrl();
  const url = `${baseUrl}/public/posts/${encodeURIComponent(slug)}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60, tags: [`cms-post-${slug}`] },
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback below
  }

  const local = BLOG_POSTS.find((p) => p.slug === slug);
  if (!local) return null;

  return {
    post: {
      id: local.slug,
      title: local.slug,
      slug: local.slug,
      excerpt: null,
      content: null,
      coverImageUrl: local.cover,
      coverImageAlt: local.slug,
      readMinutes: local.readMinutes,
      featured: false,
      tags: local.tags,
      publishedAt: local.publishedAt,
      contentUpdatedAt: local.updatedAt,
      updatedAt: local.updatedAt,
      category: { id: local.category, name: local.category, slug: local.category },
      author: { id: local.author, name: local.author, slug: local.author },
    },
    relatedPosts: BLOG_POSTS.filter((p) => p.slug !== slug && p.category === local.category)
      .slice(0, 3)
      .map((p) => ({
        id: p.slug,
        title: p.slug,
        slug: p.slug,
        excerpt: null,
        coverImageUrl: p.cover,
        coverImageAlt: p.slug,
        readMinutes: p.readMinutes,
        featured: false,
        tags: p.tags,
        publishedAt: p.publishedAt,
        contentUpdatedAt: p.updatedAt,
        updatedAt: p.updatedAt,
      })),
  };
}

/**
 * Get published posts metadata for XML sitemaps.
 * Fetches from CMS if available, falling back to static dataset.
 */
export async function getPublishedPostsForSitemap(): Promise<
  Array<{
    slug: string;
    publishedAt: Date;
    updatedAt?: Date | null;
    contentUpdatedAt?: Date | null;
  }>
> {
  const baseUrl = getCmsBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/public/posts?limit=1000`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    });

    if (res.ok) {
      const json: CmsPostsResponse = await res.json();
      const map = new Map<
        string,
        {
          slug: string;
          publishedAt: Date;
          updatedAt?: Date | null;
          contentUpdatedAt?: Date | null;
        }
      >();

      // 1. Static items
      for (const p of BLOG_POSTS) {
        map.set(p.slug, {
          slug: p.slug,
          publishedAt: new Date(p.publishedAt),
          updatedAt: p.updatedAt ? new Date(p.updatedAt) : null,
          contentUpdatedAt: null,
        });
      }

      // 2. Dynamic CMS items take precedence and add all newly created articles
      if (Array.isArray(json.data)) {
        for (const item of json.data) {
          map.set(item.slug, {
            slug: item.slug,
            publishedAt: new Date(item.publishedAt),
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
            contentUpdatedAt: item.contentUpdatedAt ? new Date(item.contentUpdatedAt) : null,
          });
        }
      }

      return Array.from(map.values());
    }
  } catch {
    // CMS unreachable — use static fallback
  }

  return BLOG_POSTS.map((p) => ({
    slug: p.slug,
    publishedAt: new Date(p.publishedAt),
    updatedAt: p.updatedAt ? new Date(p.updatedAt) : null,
    contentUpdatedAt: p.updatedAt ? new Date(p.updatedAt) : null,
  }));
}

/**
 * Get categories for sitemap.
 */
export async function getCategoriesForSitemap(): Promise<string[]> {
  return BLOG_CATEGORY_IDS as readonly string[] as string[];
}

/**
 * Get people (authors & reviewers) for sitemap.
 */
export async function getPeopleForSitemap(): Promise<{
  authors: string[];
  reviewers: string[];
}> {
  return {
    authors: [...BLOG_AUTHOR_IDS],
    reviewers: [...BLOG_REVIEWER_IDS],
  };
}
