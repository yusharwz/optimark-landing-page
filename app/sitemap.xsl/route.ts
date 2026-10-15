import { NextResponse } from "next/server";
import { SITEMAP_XSL } from "@/lib/sitemap-xsl";

export const dynamic = "force-dynamic";

export async function GET() {
  return new NextResponse(SITEMAP_XSL, {
    status: 200,
    headers: {
      "Content-Type": "text/xsl; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=120",
    },
  });
}
