import { NextRequest, NextResponse } from "next/server";
import { getRequestOrigin, renderUrlsetXml, type UrlsetEntry } from "@/lib/sitemap";
import { blogCategoryHref } from "@/config/blog";
import { getCategoriesForSitemap } from "@/lib/cms";
import { localizedUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const now = new Date();
  const entries: UrlsetEntry[] = [];

  const dbCategories = await getCategoriesForSitemap();
  for (const cat of dbCategories) {
    const idSlug = typeof cat === "string" ? cat : cat.slugId || cat.slug;
    const enSlug = typeof cat === "string" ? cat : cat.slugEn || cat.slug;
    const idUrl = localizedUrl("id", blogCategoryHref(idSlug, "id"), origin);
    const enUrl = localizedUrl("en", blogCategoryHref(enSlug, "en"), origin);

    entries.push({
      loc: enUrl,
      lastmod: now,
      alternates: {
        id: idUrl,
        en: enUrl,
        "x-default": idUrl,
      },
    });
  }

  const xml = renderUrlsetXml(entries);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
