import type { AppLocale } from "@/lib/locale";

/**
 * Publish dates are stored as plain ISO dates in `config/blog.ts` and formatted
 * here so the same post reads correctly in both locales without duplicating
 * the string in messages.
 *
 * Note the explicit UTC time zone: the dates carry no time component, so
 * parsing them in a timezone behind UTC would otherwise render the previous
 * day. Every page is prerendered, so this has to be deterministic at build time.
 */
export function formatBlogDate(isoDate: string, locale: AppLocale): string {
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    // Short month ("15 Sep 2026"), matching Mekari's article header — two
    // dates side by side stay on one line on phones.
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
