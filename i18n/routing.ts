import { defineRouting } from "next-intl/routing";

/**
 * URL scheme:
 *   optimark.ai/      → Indonesian (default locale, no prefix)
 *   optimark.ai/id/…  → redirected to the unprefixed path (see next.config.ts)
 *   optimark.ai/en/…  → English
 *
 * `localeDetection` is off so the URL alone decides the language. With it on,
 * next-intl would read the Accept-Language header and the NEXT_LOCALE cookie
 * and redirect `/` to `/en` for English-language browsers — breaking the rule
 * that the bare domain is always Indonesian.
 */
export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  localePrefix: "as-needed",
  localeDetection: false,
});
