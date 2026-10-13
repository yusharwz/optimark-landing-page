import { NextResponse } from "next/server";
import { SITEMAP_XSL } from "@/lib/sitemap-xsl";

export const dynamic = "force-static";

export async function GET() {
  return new NextResponse(SITEMAP_XSL, {
    status: 200,
    headers: {
      "Content-Type": "text/xsl; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
