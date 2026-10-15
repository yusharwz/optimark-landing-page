export const SITE = {
  contactEmail: "admin@usahakreatif.co.id",
  brandName: "Optimark",
  companyName: "PT Usaha Kreatif Indonesia",
} as const;

export const SCROLL_UP_THRESHOLD = 0.85;

/**
 * Official Optimark accounts. Facebook and TikTok URLs are still pending; an
 * empty `href` is not rendered anywhere and is left out of the Organization schema.
 */
const SOCIAL_ACCOUNTS: { name: string; href: string; icon: string }[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/optimark.ai",
    icon: "/images/connect/instagram.svg",
  },
  { name: "Facebook", href: "", icon: "/images/connect/facebook.svg" },
  { name: "TikTok", href: "", icon: "/images/connect/tiktok.svg" },
];

export const SOCIAL_LINKS = SOCIAL_ACCOUNTS.filter((account) => account.href);

export const CONNECT_PLATFORMS = [
  { name: "Instagram", icon: "/images/connect/instagram.svg" },
  { name: "Facebook", icon: "/images/connect/facebook.svg" },
  { name: "TikTok", icon: "/images/connect/tiktok.svg" },
  { name: "Threads", icon: "/images/connect/threads.svg" },
] as const;

/**
 * Client area (app) entry point. Every "Get Started" CTA — header, hero, and the
 * Free plan on pricing — funnels through the same register/login flow.
 */
export const CLIENT_AREA_URL = "https://app.optimark.ai";
export const GET_STARTED_URL = `${CLIENT_AREA_URL}/login`;

/**
 * Pre-sales WhatsApp contact, used by the hero's "ask first" CTA.
 *
 * PLACEHOLDER — 6288888888888 is not a real number. Swap it for the live
 * business line before this ships; the slide that requested this CTA marked
 * the number itself as pending.
 */
export const WHATSAPP_URL = "https://wa.me/6288888888888";

/**
 * Analytics / search-console identifiers.
 *
 * Hardcoded on purpose rather than read from the environment: both are public
 * values that ship in the HTML of every page anyway, and keeping them here
 * means a deploy does not depend on anyone setting a CI variable first.
 *
 * The trade-off is that they are baked in for every environment. UAT-81 asks
 * for a UAT container id separate from production; with a static id, UAT and
 * production report into the *same* GTM container. Move these back to build
 * args if that separation becomes a requirement.
 *
 * An empty string disables the corresponding tag entirely — see
 * app/[locale]/layout.tsx — so nothing renders a broken `undefined`.
 */
export const GTM_ID = "GTM-WQSGHBQ2";
export const GSC_VERIFICATION = "3h7lh6UwIhSr3y5NEqiclzIsqbbsuNWR7ysPwr3ab_Y";

/**
 * GA4 measurement id for the "Optimark AI" web stream.
 *
 * Loaded directly via gtag.js rather than as a tag inside the GTM container.
 *
 * IMPORTANT: these two must not both send GA4. If a Google Tag for
 * G-YNXD0DYDQ0 is ever added to container GTM-WQSGHBQ2, every pageview will be
 * counted twice — once from here and once from GTM. Whoever adds it there must
 * blank this constant in the same change.
 */
export const GA_MEASUREMENT_ID = "G-YNXD0DYDQ0";

/**
 * Canonical origin, used for metadataBase, OG image URLs, the sitemap, and
 * robots.txt. No trailing slash.
 *
 * Static for the same reason as the ids above: every page is prerendered, so
 * this has to be correct at build time, and a build arg that nobody remembers
 * to set produces a silently wrong site rather than a failure.
 */
export function getSiteUrl(): string {
  if (typeof process !== "undefined") {
    const envUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
    if (envUrl && envUrl.trim()) {
      return envUrl.trim().replace(/\/$/, "");
    }
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "https://optimark.ai";
}

export const SITE_URL = {
  toString: () => getSiteUrl(),
  valueOf: () => getSiteUrl(),
  replace: (pattern: string | RegExp, replacement: string) => getSiteUrl().replace(pattern, replacement),
  startsWith: (searchString: string) => getSiteUrl().startsWith(searchString),
  endsWith: (searchString: string) => getSiteUrl().endsWith(searchString),
  includes: (searchString: string) => getSiteUrl().includes(searchString),
} as unknown as string;
