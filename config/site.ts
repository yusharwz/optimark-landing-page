export const SITE = {
  contactEmail: "admin@usahakreatif.co.id",
  brandName: "Optimark",
} as const;

export const SCROLL_UP_THRESHOLD = 0.85;

export const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://instagram.com", icon: "/images/connect/instagram.svg" },
  { name: "Facebook", href: "https://facebook.com", icon: "/images/connect/facebook.svg" },
  { name: "TikTok", href: "https://tiktok.com", icon: "/images/connect/tiktok.svg" },
] as const;

export const CONNECT_PLATFORMS = [
  { name: "Instagram", icon: "/images/connect/instagram.svg" },
  { name: "Facebook", icon: "/images/connect/facebook.svg" },
  { name: "TikTok", icon: "/images/connect/tiktok.svg" },
  { name: "Threads", icon: "/images/connect/threads.svg" },
] as const;

export const FOOTER_PRODUCT_KEYS = ["contentPlanner", "seoAnalyzer", "aiContentMaker"] as const;

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
