import { NextRequest, NextResponse } from "next/server";
import {
  expandBilingualEntries,
  getRequestOrigin,
  renderUrlsetXml,
  type UrlsetEntry,
} from "@/lib/sitemap";
import {
  BLOG_AUTHOR_IDS,
  BLOG_CATEGORY_IDS,
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
} from "@/server/blog/queries";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const now = new Date();
  const entries: UrlsetEntry[] = [];

  // 1. Dynamic Blog Posts
  const dbPosts = await getPublishedPostsForSitemap();
  const postMap = new Map<string, Date>();

  if (dbPosts.length === 0) {
    for (const post of BLOG_POSTS) {
      const date = post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt);
      postMap.set(post.slug, isNaN(date.getTime()) ? now : date);
    }
  } else {
    for (const post of dbPosts) {
      postMap.set(post.slug, post.contentUpdatedAt ?? post.updatedAt ?? post.publishedAt ?? now);
    }
  }

  for (const [slug, lastmod] of postMap.entries()) {
    entries.push(...expandBilingualEntries(blogHref(slug), lastmod, origin));
  }

  // 2. Dynamic Categories
  const dbCategories = await getCategoriesForSitemap();
  const categories =
    dbCategories.length > 0 ? dbCategories : (BLOG_CATEGORY_IDS as readonly string[]);
  for (const catSlug of categories) {
    entries.push(...expandBilingualEntries(blogCategoryHref(catSlug), now, origin));
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
