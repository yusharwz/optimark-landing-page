import { cache } from "react";
import {
  BLOG_AUTHOR_IDS,
  BLOG_CATEGORY_IDS,
  BLOG_POSTS,
  BLOG_REVIEWER_IDS,
  type BlogCategoryId,
  type BlogPost,
  type BlogSlug,
} from "@/config/blog";

export function getCmsBaseUrl(): string {
  if (process.env.INTERNAL_CMS_API_URL) {
    let internal = process.env.INTERNAL_CMS_API_URL.replace(/\/+$/, "");
    if (!internal.endsWith("/api")) internal += "/api";
    return internal;
  }
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
  slugId?: string;
  slugEn?: string;
  alternateSlugs?: {
    id: string;
    en: string;
  };
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
    slugId?: string;
    slugEn?: string;
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
    slug: item.slug as unknown as BlogSlug,
    slugId: item.slugId,
    slugEn: item.slugEn,
    alternateSlugs: item.alternateSlugs,
    title: item.title,
    metaDescription: ("metaDescription" in item && item.metaDescription) || undefined,
    excerpt: item.excerpt || undefined,
    content: ("content" in item && item.content) || undefined,
    category: categorySlug,
    categoryName: item.category?.name || undefined,
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
  locale?: string;
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
  if (params?.locale) query.set("locale", params.locale);

  const url = `${baseUrl}/public/posts${query.toString() ? `?${query.toString()}` : ""}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60, tags: ["cms-posts"] },
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
      title: "",
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
 * Fetch a single post by slug from Headless CMS API (cached per-request).
 */
export const fetchCmsPostBySlug = cache(
  async (
    slug: string,
    locale?: string,
  ): Promise<{ post: CmsArticleDetail; relatedPosts: CmsArticleSummary[]; redirect?: { targetPath: string; statusCode: number } } | null> => {
    const baseUrl = getCmsBaseUrl();
    const query = locale ? `?locale=${encodeURIComponent(locale)}` : "";
    const url = `${baseUrl}/public/posts/${encodeURIComponent(slug)}${query}`;

    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        next: { revalidate: 60, tags: ["cms-posts", `cms-post-${slug}`] },
        signal: AbortSignal.timeout(3000),
      });

      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback below
    }

    const local = BLOG_POSTS.find((p) => p.slug === slug || p.slugId === slug || p.slugEn === slug);
    if (!local) return null;

    return {
      post: {
        id: local.slug,
        title: "",
        slug: local.slug,
        slugId: local.slugId,
        slugEn: local.slugEn,
        alternateSlugs: local.alternateSlugs,
        excerpt: null,
        content: null,
        coverImageUrl: local.cover,
        coverImageAlt: local.slug,
        readMinutes: local.readMinutes,
        featured: false,
        tags: local.tags as string[],
        publishedAt: local.publishedAt,
        contentUpdatedAt: local.updatedAt,
        updatedAt: local.updatedAt,
        category: { id: local.category, name: local.category, slug: local.category },
        author: { id: typeof local.author === "string" ? local.author : "rafi-rizky", name: typeof local.author === "string" ? local.author : "Rafi Rizky", slug: typeof local.author === "string" ? local.author : "rafi-rizky" },
      },
      relatedPosts: BLOG_POSTS.filter((p) => p.slug !== slug && p.category === local.category)
        .slice(0, 3)
        .map((p) => ({
          id: p.slug,
          title: "",
          slug: p.slug,
          slugId: p.slugId,
          slugEn: p.slugEn,
          alternateSlugs: p.alternateSlugs,
          excerpt: null,
          coverImageUrl: p.cover,
          coverImageAlt: p.slug,
          readMinutes: p.readMinutes,
          featured: false,
          tags: p.tags as string[],
          publishedAt: p.publishedAt,
          contentUpdatedAt: p.updatedAt,
          updatedAt: p.updatedAt,
        })),
    };
  },
);

/**
 * Get published posts metadata for XML sitemaps.
 * Fetches from CMS if available, falling back to static dataset.
 */
export async function getPublishedPostsForSitemap(): Promise<
  Array<{
    slug: string;
    slugId?: string;
    slugEn?: string;
    publishedAt: Date;
    updatedAt?: Date | null;
    contentUpdatedAt?: Date | null;
    tags?: string[];
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
          slugId?: string;
          slugEn?: string;
          publishedAt: Date;
          updatedAt?: Date | null;
          contentUpdatedAt?: Date | null;
          tags?: string[];
        }
      >();

      // 1. Static items
      for (const p of BLOG_POSTS) {
        map.set(p.slug, {
          slug: p.slug,
          slugId: p.slugId || p.slug,
          slugEn: p.slugEn || p.slug,
          publishedAt: new Date(p.publishedAt),
          updatedAt: p.updatedAt ? new Date(p.updatedAt) : null,
          contentUpdatedAt: null,
          tags: [...p.tags],
        });
      }

      // 2. Dynamic CMS items take precedence and add all newly created articles
      if (Array.isArray(json.data)) {
        for (const item of json.data) {
          const idSlug = item.slugId || item.slug;
          const enSlug = item.slugEn || item.slug;
          map.set(idSlug, {
            slug: item.slug,
            slugId: idSlug,
            slugEn: enSlug,
            publishedAt: new Date(item.publishedAt),
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
            contentUpdatedAt: item.contentUpdatedAt ? new Date(item.contentUpdatedAt) : null,
            tags: Array.isArray(item.tags) ? item.tags : [],
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
    slugId: p.slugId || p.slug,
    slugEn: p.slugEn || p.slug,
    publishedAt: new Date(p.publishedAt),
    updatedAt: p.updatedAt ? new Date(p.updatedAt) : null,
    contentUpdatedAt: null,
    tags: [...p.tags],
  }));
}

export interface CmsProfileItem {
  title: string;
  org: string;
  period: string;
  logo?: string;
}

export interface CmsPerson {
  id: string;
  name: string;
  slug: string;
  role: string;
  roleId?: string | null;
  roleEn?: string | null;
  positionId?: string | null;
  positionEn?: string | null;
  bio?: string | null;
  bioId?: string | null;
  bioEn?: string | null;
  expertiseId?: string[];
  expertiseEn?: string[];
  experienceId?: CmsProfileItem[] | null;
  experienceEn?: CmsProfileItem[] | null;
  educationId?: CmsProfileItem[] | null;
  educationEn?: CmsProfileItem[] | null;
  avatarUrl?: string | null;
  linkedinUrl?: string | null;
  type: 'AUTHOR' | 'REVIEWER' | 'BOTH';
  authoredArticles?: unknown[];
  reviewedArticles?: unknown[];
}

export async function fetchCmsPeople(): Promise<CmsPerson[]> {
  try {
    const res = await fetch(`${getCmsBaseUrl()}/people`, {
      next: { revalidate: 300, tags: ['cms-people'] },
    });
    if (!res.ok) return [];
    return (await res.json()) as CmsPerson[];
  } catch {
    return [];
  }
}

export async function fetchCmsPersonBySlug(slug: string): Promise<CmsPerson | null> {
  try {
    const res = await fetch(`${getCmsBaseUrl()}/people/${slug}`, {
      next: { revalidate: 300, tags: ['cms-people'] },
    });
    if (!res.ok) return null;
    return (await res.json()) as CmsPerson;
  } catch {
    return null;
  }
}

export interface CmsCategory {
  id: string;
  name: string;
  nameId?: string | null;
  nameEn?: string | null;
  slug: string;
  slugId?: string | null;
  slugEn?: string | null;
  description?: string | null;
  descriptionId?: string | null;
  descriptionEn?: string | null;
  metaTitleId?: string | null;
  metaTitleEn?: string | null;
  metaDescriptionId?: string | null;
  metaDescriptionEn?: string | null;
  sortOrder: number;
  _count?: {
    articles: number;
  };
}

export const fetchCmsCategories = cache(async (locale?: string): Promise<CmsCategory[]> => {
  try {
    const query = locale ? `?locale=${encodeURIComponent(locale)}` : "";
    const res = await fetch(`${getCmsBaseUrl()}/public/categories${query}`, {
      next: { revalidate: 300, tags: ["cms-categories"] },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) return (await res.json()) as CmsCategory[];
  } catch {}
  return [];
});

export const fetchCmsCategoryBySlug = cache(async (slug: string, locale?: string): Promise<CmsCategory | null> => {
  try {
    const query = locale ? `?locale=${encodeURIComponent(locale)}` : "";
    const res = await fetch(`${getCmsBaseUrl()}/public/categories/${encodeURIComponent(slug)}${query}`, {
      next: { revalidate: 300, tags: ["cms-categories"] },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) return (await res.json()) as CmsCategory;
  } catch {}
  return null;
});

/**
 * Get categories for sitemap dynamically from CMS.
 */
export async function getCategoriesForSitemap(): Promise<
  Array<{
    slug: string;
    slugId?: string;
    slugEn?: string;
  }>
> {
  try {
    const cats = await fetchCmsCategories();
    if (cats && cats.length > 0) {
      return cats.map((c) => ({
        slug: c.slug,
        slugId: c.slugId || c.slug,
        slugEn: c.slugEn || c.slug,
      }));
    }
  } catch {}
  return BLOG_CATEGORY_IDS.map((id) => ({
    slug: id,
    slugId: id === "social-media" ? "media-sosial" : id === "visual-content" ? "konten-visual" : id,
    slugEn: id,
  }));
}

/**
 * Get people (authors & reviewers) for sitemap dynamically from CMS.
 */
export async function getPeopleForSitemap(): Promise<{
  authors: string[];
  reviewers: string[];
}> {
  try {
    const people = await fetchCmsPeople();
    const authors = new Set<string>([...BLOG_AUTHOR_IDS]);
    const reviewers = new Set<string>([...BLOG_REVIEWER_IDS]);
    for (const p of people) {
      if (!p.slug) continue;
      if (p.type === 'AUTHOR' || p.type === 'BOTH') {
        authors.add(p.slug);
      }
      if (p.type === 'REVIEWER' || p.type === 'BOTH') {
        reviewers.add(p.slug);
      }
    }
    return {
      authors: Array.from(authors),
      reviewers: Array.from(reviewers),
    };
  } catch {
    return {
      authors: [...BLOG_AUTHOR_IDS],
      reviewers: [...BLOG_REVIEWER_IDS],
    };
  }
}
