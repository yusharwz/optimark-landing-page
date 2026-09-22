import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Coins,
  Headphones,
  Languages,
  LayoutGrid,
  Lock,
  MonitorCheck,
  ScrollText,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

/**
 * Structural data for the alternative About page at `/about/v2`.
 *
 * Built fresh against the javafx.co.id/about structure — hero, who we are,
 * vision & mission, a product highlight, a six-card "why choose us", legal
 * identity, and data security — rather than reusing the first About page.
 *
 * Copy lives in the `aboutV2` namespace in `messages/{id,en}.json`.
 */

/** The six "why choose us" cards. */
export const ABOUT_V2_REASON_IDS = [
  "allInOne",
  "payPerUse",
  "noGimmick",
  "localFirst",
  "support",
  "ownership",
] as const;

export type AboutV2ReasonId = (typeof ABOUT_V2_REASON_IDS)[number];

export const ABOUT_V2_REASON_ICONS: Record<AboutV2ReasonId, LucideIcon> = {
  allInOne: LayoutGrid,
  payPerUse: Coins,
  noGimmick: BadgeCheck,
  localFirst: Languages,
  support: Headphones,
  ownership: UserRoundCheck,
};

/**
 * Data-security measures. Each one is taken from what the privacy policy
 * already commits to (§8.2) — nothing here claims a certification we do not
 * hold, which is why there is no ISO badge in the way the reference site has.
 */
export const ABOUT_V2_SECURITY_IDS = ["encryption", "access", "monitoring", "training"] as const;

export type AboutV2SecurityId = (typeof ABOUT_V2_SECURITY_IDS)[number];

export const ABOUT_V2_SECURITY_ICONS: Record<AboutV2SecurityId, LucideIcon> = {
  encryption: Lock,
  access: ShieldCheck,
  monitoring: MonitorCheck,
  training: ScrollText,
};
