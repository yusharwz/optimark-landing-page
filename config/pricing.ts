export type PricingTierId = "free" | "starter" | "pro" | "enterprise";

export type PricingFeatureKey =
  | "contentPlanner"
  | "socialAccounts1"
  | "socialAccounts5"
  | "socialAccounts15"
  | "socialAccountsUnlimited"
  | "basicScheduling"
  | "advancedScheduling"
  | "seoAnalyzer"
  | "adsManager"
  | "aiContentMaker"
  | "analyticsDashboard"
  | "prioritySupport";

export interface PricingTier {
  id: PricingTierId;
  price: number;
  /** Token allowance. Monthly unless `tokensOneTime` is set. */
  tokens: number;
  /** Free tokens are granted once at signup and never refresh. */
  tokensOneTime?: boolean;
  /** Purchasable today. Tiers without it render a greyed-out CTA. */
  isAvailable?: boolean;
  isPopular?: boolean;
  featureKeys: Array<{ key: PricingFeatureKey; included: boolean }>;
}

/** Hardcoded pricing tiers (TBD: fetch from Back Office API) */
export const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    price: 0,
    tokens: 1000,
    tokensOneTime: true,
    isAvailable: true,
    featureKeys: [
      { key: "contentPlanner", included: true },
      { key: "socialAccounts1", included: true },
      { key: "basicScheduling", included: true },
      { key: "seoAnalyzer", included: false },
      { key: "adsManager", included: false },
      { key: "aiContentMaker", included: false },
      { key: "analyticsDashboard", included: false },
      { key: "prioritySupport", included: false },
    ],
  },
  {
    id: "starter",
    price: 99000,
    tokens: 1000,
    isPopular: true,
    featureKeys: [
      { key: "contentPlanner", included: true },
      { key: "socialAccounts5", included: true },
      { key: "advancedScheduling", included: true },
      { key: "seoAnalyzer", included: true },
      { key: "adsManager", included: true },
      { key: "aiContentMaker", included: true },
      { key: "analyticsDashboard", included: true },
      { key: "prioritySupport", included: false },
    ],
  },
  {
    id: "pro",
    price: 199000,
    tokens: 2250,
    featureKeys: [
      { key: "contentPlanner", included: true },
      { key: "socialAccounts15", included: true },
      { key: "advancedScheduling", included: true },
      { key: "seoAnalyzer", included: true },
      { key: "adsManager", included: true },
      { key: "aiContentMaker", included: true },
      { key: "analyticsDashboard", included: true },
      { key: "prioritySupport", included: true },
    ],
  },
  {
    id: "enterprise",
    price: 599000,
    tokens: 8500,
    featureKeys: [
      { key: "contentPlanner", included: true },
      { key: "socialAccountsUnlimited", included: true },
      { key: "advancedScheduling", included: true },
      { key: "seoAnalyzer", included: true },
      { key: "adsManager", included: true },
      { key: "aiContentMaker", included: true },
      { key: "analyticsDashboard", included: true },
      { key: "prioritySupport", included: true },
    ],
  },
];
