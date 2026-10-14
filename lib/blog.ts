import type { AppLocale } from "@/lib/locale";
import type { BlogBlock, BlogTocItem } from "@/types/blog";

/**
 * Publish dates are stored as plain ISO dates in `config/blog.ts` and formatted
 * here so the same post reads correctly in both locales without duplicating
 * the string in messages.
 *
 * Note the explicit UTC time zone: the dates carry no time component, so
 * parsing them in a timezone behind UTC would otherwise render the previous
 * day. Every page is prerendered, so this has to be deterministic at build time.
 */
export function formatBlogDate(
  isoDate: string,
  locale: AppLocale,
  month: "short" | "long" = "short",
): string {
  if (!isoDate) return "";
  let date: Date;
  if (isoDate.includes("T")) {
    date = new Date(isoDate);
  } else {
    date = new Date(`${isoDate}T00:00:00Z`);
  }
  if (isNaN(date.getTime())) {
    date = new Date();
  }
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month,
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildBlogToc(blocks: BlogBlock[]): BlogTocItem[] {
  const seen = new Map<string, number>();
  const toc: BlogTocItem[] = [];
  for (const block of blocks) {
    if (block.type !== "h2" && block.type !== "h3") continue;
    const base = slugifyHeading(block.text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    toc.push({
      id: count === 0 ? base : `${base}-${count + 1}`,
      text: block.text,
      level: block.type === "h2" ? 2 : 3,
    });
  }
  return toc;
}
