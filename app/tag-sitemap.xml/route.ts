import { NextRequest, NextResponse } from "next/server";
import { getRequestOrigin, renderUrlsetXml, type UrlsetEntry } from "@/lib/sitemap";
import { BLOG_TAG_IDS, blogTagHref } from "@/config/blog";
import { getPublishedPostsForSitemap } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const now = new Date();
  const tagSet = new Set<string>(BLOG_TAG_IDS as readonly string[]);

  // Collect dynamic tags from published CMS posts
  try {
    const dbPosts = await getPublishedPostsForSitemap();
    for (const post of dbPosts) {
      if (Array.isArray(post.tags)) {
        for (const tag of post.tags) {
          if (typeof tag === "string" && tag.trim()) {
            tagSet.add(tag.trim().toLowerCase());
          }
        }
      }
    }
  } catch {
    // fallback to static tags
  }

  const entries: UrlsetEntry[] = Array.from(tagSet).map((tagId) => ({
    loc: `${origin}${blogTagHref(tagId)}`,
    lastmod: now,
  }));

  const xml = renderUrlsetXml(entries);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
