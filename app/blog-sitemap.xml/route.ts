import { NextRequest, NextResponse } from "next/server";
import { getRequestOrigin, renderSitemapIndexXml, type SitemapIndexEntry } from "@/lib/sitemap";
import { getPublishedPostsForSitemap } from "@/lib/cms";
import { BLOG_POSTS } from "@/config/blog";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const now = new Date();

  // Find latest blog modified date dynamically
  const dbPosts = await getPublishedPostsForSitemap();
  let latestBlogDate: Date = now;

  if (dbPosts.length > 0) {
    const dates = dbPosts.map((p) =>
      (p.contentUpdatedAt ?? p.updatedAt ?? p.publishedAt ?? now).getTime(),
    );
    latestBlogDate = new Date(Math.max(...dates));
  } else if (BLOG_POSTS.length > 0) {
    const dates = BLOG_POSTS.map((p) =>
      p.updatedAt ? new Date(p.updatedAt).getTime() : new Date(p.publishedAt).getTime(),
    );
    latestBlogDate = new Date(Math.max(...dates));
  }

  const entries: SitemapIndexEntry[] = [
    {
      loc: `${origin}/id-article-sitemap.xml`,
      lastmod: latestBlogDate,
    },
    {
      loc: `${origin}/en-article-sitemap.xml`,
      lastmod: latestBlogDate,
    },
  ];

  const xml = renderSitemapIndexXml(entries);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
