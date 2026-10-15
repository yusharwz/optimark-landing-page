import { NextRequest, NextResponse } from "next/server";
import {
  expandBilingualEntries,
  getRequestOrigin,
  renderUrlsetXml,
  type UrlsetEntry,
} from "@/lib/sitemap";
import {
  BLOG_AUTHOR_IDS,
  BLOG_TAG_IDS,
  BLOG_POSTS,
  BLOG_REVIEWER_IDS,
  authorHref,
  blogCategoryHref,
  blogHref,
  blogTagHref,
  reviewerHref,
} from "@/config/blog";
import {
  getCategoriesForSitemap,
  getPeopleForSitemap,
  getPublishedPostsForSitemap,
} from "@/lib/cms";
import { localizedUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const now = new Date();
  const entries: UrlsetEntry[] = [];

  // 1. Dynamic Multilingual Blog Posts
  const dbPosts = await getPublishedPostsForSitemap();
  const postMap = new Map<string, { idSlug: string; enSlug: string; lastmod: Date }>();

  if (dbPosts.length === 0) {
    for (const post of BLOG_POSTS) {
      const date = post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt);
      const idSlug = post.slugId || post.slug;
      const enSlug = post.slugEn || post.slug;
      postMap.set(idSlug, { idSlug, enSlug, lastmod: isNaN(date.getTime()) ? now : date });
    }
  } else {
    for (const post of dbPosts) {
      const idSlug = post.slugId || post.slug;
      const enSlug = post.slugEn || post.slug;
      postMap.set(idSlug, {
        idSlug,
        enSlug,
        lastmod: post.contentUpdatedAt ?? post.updatedAt ?? post.publishedAt ?? now,
      });
    }
  }

  for (const { idSlug, enSlug, lastmod } of postMap.values()) {
    const idUrl = localizedUrl("id", blogHref(idSlug), origin);
    const enUrl = localizedUrl("en", blogHref(enSlug), origin);
    const alternates = {
      id: idUrl,
      en: enUrl,
      "x-default": idUrl,
    };

    // Indonesian entry
    entries.push({
      loc: idUrl,
      lastmod,
      alternates,
    });

    // English entry
    entries.push({
      loc: enUrl,
      lastmod,
      alternates,
    });
  }

  // 2. Dynamic Multilingual Categories
  const dbCategories = await getCategoriesForSitemap();
  for (const cat of dbCategories) {
    const idSlug = typeof cat === "string" ? cat : cat.slugId || cat.slug;
    const enSlug = typeof cat === "string" ? cat : cat.slugEn || cat.slug;
    const idUrl = localizedUrl("id", blogCategoryHref(idSlug, "id"), origin);
    const enUrl = localizedUrl("en", blogCategoryHref(enSlug, "en"), origin);
    const alternates = {
      id: idUrl,
      en: enUrl,
      "x-default": idUrl,
    };

    entries.push({
      loc: idUrl,
      lastmod: now,
      alternates,
    });

    entries.push({
      loc: enUrl,
      lastmod: now,
      alternates,
    });
  }

  // 3. Dynamic Authors & Reviewers
  const dbPeople = await getPeopleForSitemap();
  const authors =
    dbPeople.authors.length > 0 ? dbPeople.authors : (BLOG_AUTHOR_IDS as readonly string[]);
  for (const authorSlug of authors) {
    entries.push(...expandBilingualEntries(authorHref(authorSlug), now, origin));
  }

  const reviewers =
    dbPeople.reviewers.length > 0 ? dbPeople.reviewers : (BLOG_REVIEWER_IDS as readonly string[]);
  for (const reviewerSlug of reviewers) {
    entries.push(...expandBilingualEntries(reviewerHref(reviewerSlug), now, origin));
  }

  // 4. Tags
  for (const tagId of BLOG_TAG_IDS) {
    entries.push(...expandBilingualEntries(blogTagHref(tagId), now, origin));
  }

  const xml = renderUrlsetXml(entries);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
