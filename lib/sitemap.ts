import { localizedUrl } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/config/site";

export function getRequestOrigin(request: Request): string {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto =
    request.headers.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");
  if (host) {
    return `${proto}://${host}`;
  }
  return getSiteUrl();
}

export function formatSitemapDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) {
    return new Date().toISOString();
  }
  return d.toISOString();
}

export function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export interface SitemapIndexEntry {
  loc: string;
  lastmod?: Date | string;
}

export function renderSitemapIndexXml(entries: SitemapIndexEntry[]): string {
  const xslUrl = "/sitemap.xsl";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<?xml-stylesheet type="text/xsl" href="${xslUrl}"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const entry of entries) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${escapeXml(entry.loc)}</loc>\n`;
    if (entry.lastmod) {
      xml += `    <lastmod>${formatSitemapDate(entry.lastmod)}</lastmod>\n`;
    }
    xml += `  </sitemap>\n`;
  }

  xml += `</sitemapindex>\n`;
  return xml;
}

export interface UrlsetEntry {
  loc: string;
  lastmod?: Date | string;
  alternates?: Record<string, string>;
}

export function renderUrlsetXml(entries: UrlsetEntry[]): string {
  const xslUrl = "/sitemap.xsl";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<?xml-stylesheet type="text/xsl" href="${xslUrl}"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const entry of entries) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(entry.loc)}</loc>\n`;
    if (entry.lastmod) {
      xml += `    <lastmod>${formatSitemapDate(entry.lastmod)}</lastmod>\n`;
    }
    if (entry.alternates) {
      for (const [lang, href] of Object.entries(entry.alternates)) {
        xml += `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />\n`;
      }
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

export const STATIC_PAGE_ROUTES = [
  "",
  "/ai-content-maker",
  "/perencana-konten", // localizedUrl maps to /en/content-planner for EN
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

/**
 * Helper to generate a single localized entry with complete hreflang alternates.
 */
export function createLocalizedEntry(
  path: string,
  targetLocale: "id" | "en",
  lastmod: Date | string,
  origin: string = getSiteUrl(),
): UrlsetEntry {
  const normalizedPath = path || "/";
  const languages: Record<string, string> = {
    id: localizedUrl("id", normalizedPath, origin),
    en: localizedUrl("en", normalizedPath, origin),
    "x-default": localizedUrl("id", normalizedPath, origin),
  };

  return {
    loc: localizedUrl(targetLocale, normalizedPath, origin),
    lastmod,
    alternates: languages,
  };
}

/**
 * Helper to expand a canonical route into bilingual (ID & EN) sitemap entries with alternates.
 */
export function expandBilingualEntries(
  path: string,
  lastmod: Date | string,
  origin: string = getSiteUrl(),
): UrlsetEntry[] {
  const normalizedPath = path || "/";
  const languages: Record<string, string> = {
    id: localizedUrl("id", normalizedPath, origin),
    en: localizedUrl("en", normalizedPath, origin),
    "x-default": localizedUrl("id", normalizedPath, origin),
  };

  return routing.locales.map((locale) => ({
    loc: localizedUrl(locale, normalizedPath, origin),
    lastmod,
    alternates: languages,
  }));
}
