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
