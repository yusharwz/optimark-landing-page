import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-Demand Revalidation Endpoint for CMS/Back-Office integrations.
 *
 * CMS usage:
 *   POST /api/revalidate
 *   Headers:
 *     Content-Type: application/json
 *     x-revalidate-secret: <REVALIDATE_SECRET>
 *   Body:
 *     {
 *       "path": "/sitemap.xml", // or "/blog", "/blog/post-slug", etc.
 *       "type": "page" // optional
 *     }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const secret =
      request.headers.get("x-revalidate-secret") ||
      request.nextUrl.searchParams.get("secret") ||
      body.secret;

    const expectedSecret = process.env.REVALIDATE_SECRET || process.env.CMS_WEBHOOK_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
    }

    const path = body.path || request.nextUrl.searchParams.get("path") || "/sitemap.xml";

    if (path === "/sitemap.xml" || path === "/sitemap_index.xml") {
      revalidatePath("/sitemap.xml");
      revalidatePath("/sitemap_index.xml");
      revalidatePath("/page-sitemap.xml");
      revalidatePath("/blog-sitemap.xml");
    } else if (path) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 },
    );
  }
}
