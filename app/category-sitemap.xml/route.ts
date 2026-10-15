import { NextRequest, NextResponse } from "next/server";
import { getRequestOrigin, renderSitemapIndexXml, type SitemapIndexEntry } from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const now = new Date();

  const entries: SitemapIndexEntry[] = [
    {
      loc: `${origin}/id-category-sitemap.xml`,
      lastmod: now,
    },
    {
      loc: `${origin}/en-category-sitemap.xml`,
      lastmod: now,
    },
  ];

  const xml = renderSitemapIndexXml(entries, {
    parent: "/sitemap.xml",
    parentTitle: "Root Sitemap Index",
    breadcrumbCurrent: "Category Sitemaps",
  });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
