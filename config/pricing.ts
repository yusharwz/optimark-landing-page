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
  tokensPerMonth: number;
  isPopular?: boolean;
  featureKeys: Array<{ key: PricingFeatureKey; included: boolean }>;
}

/** Hardcoded pricing tiers (TBD: fetch from Back Office API) */
export const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    price: 0,
    tokensPerMonth: 1000,
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
    tokensPerMonth: 10000,
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
    price: 249000,
    tokensPerMonth: 50000,
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
    price: 499000,
    tokensPerMonth: 150000,
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
