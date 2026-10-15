import { NextRequest, NextResponse } from "next/server";
import { getRequestOrigin, renderSitemapIndexXml, type SitemapIndexEntry } from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const now = new Date();

  const entries: SitemapIndexEntry[] = [
    {
      loc: `${origin}/id-page-sitemap.xml`,
      lastmod: now,
    },
    {
      loc: `${origin}/en-page-sitemap.xml`,
      lastmod: now,
    },
  ];

  const xml = renderSitemapIndexXml(entries);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
