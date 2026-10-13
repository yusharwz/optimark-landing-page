import { NextRequest, NextResponse } from "next/server";
import {
  expandBilingualEntries,
  getRequestOrigin,
  renderUrlsetXml,
  type UrlsetEntry,
} from "@/lib/sitemap";

export const dynamic = "force-dynamic";

const STATIC_ROUTES = [
  "",
  "/ai-content-maker",
  "/perencana-konten", // localizedUrl automatically maps to /en/content-planner for EN
  "/seo-analyzer",
  "/ai-image",
  "/ai-video",
  "/pricing",
  "/blog",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
] as const;

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const now = new Date();
  const entries: UrlsetEntry[] = [];

  for (const route of STATIC_ROUTES) {
    entries.push(...expandBilingualEntries(route, now, origin));
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
