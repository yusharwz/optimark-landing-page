import { NextRequest, NextResponse } from "next/server";
import {
  createLocalizedEntry,
  getRequestOrigin,
  renderUrlsetXml,
  type UrlsetEntry,
} from "@/lib/sitemap";
import {
  BLOG_AUTHOR_IDS,
  BLOG_POSTS,
  BLOG_REVIEWER_IDS,
  authorHref,
  blogHref,
  reviewerHref,
} from "@/config/blog";
import { getPeopleForSitemap, getPublishedPostsForSitemap } from "@/lib/cms";
import { localizedUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const now = new Date();
  const entries: UrlsetEntry[] = [];

  // 1. Articles (ID)
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
    entries.push({
      loc: idUrl,
      lastmod,
      alternates: {
        id: idUrl,
        en: enUrl,
        "x-default": idUrl,
      },
    });
  }

  // 2. Authors & Reviewers (ID)
  const dbPeople = await getPeopleForSitemap();
  const authors =
    dbPeople.authors.length > 0 ? dbPeople.authors : (BLOG_AUTHOR_IDS as readonly string[]);
  for (const authorSlug of authors) {
    entries.push(createLocalizedEntry(authorHref(authorSlug), "id", now, origin));
  }

  const reviewers =
    dbPeople.reviewers.length > 0 ? dbPeople.reviewers : (BLOG_REVIEWER_IDS as readonly string[]);
  for (const reviewerSlug of reviewers) {
    entries.push(createLocalizedEntry(reviewerHref(reviewerSlug), "id", now, origin));
  }

  const xml = renderUrlsetXml(entries, {
    parent: "/article-sitemap.xml",
    parentTitle: "Article Sitemap Index",
    breadcrumbParent: "Article Sitemaps",
    breadcrumbCurrent: "Indonesian Article Sitemap",
  });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
