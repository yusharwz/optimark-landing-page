import { NextRequest, NextResponse } from "next/server";
import {
  STATIC_PAGE_ROUTES,
  createLocalizedEntry,
  getRequestOrigin,
  renderUrlsetXml,
  type UrlsetEntry,
} from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const now = new Date();
  const entries: UrlsetEntry[] = [];

  for (const route of STATIC_PAGE_ROUTES) {
    entries.push(createLocalizedEntry(route, "id", now, origin));
  }

  const xml = renderUrlsetXml(entries);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
