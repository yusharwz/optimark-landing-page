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

export interface TokenPackage {
  id: string;
  tokens: number;
  price: number;
  pricePerToken: number;
  savings?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
}

export const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: "pack_100",
    tokens: 100,
    price: 100000,
    pricePerToken: 1000,
  },
  {
    id: "pack_300",
    tokens: 300,
    price: 270000,
    pricePerToken: 900,
    savings: "10%",
  },
  {
    id: "pack_500",
    tokens: 500,
    price: 425000,
    pricePerToken: 850,
    savings: "15%",
    isPopular: true,
  },
  {
    id: "pack_1000",
    tokens: 1000,
    price: 800000,
    pricePerToken: 800,
    savings: "20%",
  },
  {
    id: "pack_2500",
    tokens: 2500,
    price: 1875000,
    pricePerToken: 750,
    savings: "25%",
    isBestValue: true,
  },
];

/** Hardcoded pricing tiers (TBD: fetch from Back Office API) - Inactive for now */
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

