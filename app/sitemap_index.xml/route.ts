import { NextRequest } from "next/server";
import { GET as getSitemapIndex } from "@/app/sitemap.xml/route";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return getSitemapIndex(request);
}
