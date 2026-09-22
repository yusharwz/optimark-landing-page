import type { LucideIcon } from "lucide-react";
import { Calculator, Compass, Eye, Gauge, MapPin, ShieldCheck, Wallet } from "lucide-react";

/**
 * Structural data for the About page. Every string the reader sees lives in the
 * `about` namespace in `messages/{id,en}.json`, keyed by the ids below.
 *
 * The three principles are the brand persona from DESIGN.md §1 — kept in the
 * same order so the page and the design doc do not drift apart.
 */
export const ABOUT_PRINCIPLE_IDS = ["transparent", "efficient", "local"] as const;

export type AboutPrincipleId = (typeof ABOUT_PRINCIPLE_IDS)[number];

export const ABOUT_PRINCIPLE_ICONS: Record<AboutPrincipleId, LucideIcon> = {
  transparent: Eye,
  efficient: Gauge,
  local: MapPin,
};

/**
 * The four promises the pricing model actually makes. These are claims we have
 * to keep, so each one maps to something verifiable on the pricing page rather
 * than to a marketing sentiment.
 */
export const ABOUT_COMMITMENT_IDS = [
  "neverExpires",
  "noSubscription",
  "countable",
  "honest",
] as const;

export type AboutCommitmentId = (typeof ABOUT_COMMITMENT_IDS)[number];

export const ABOUT_COMMITMENT_ICONS: Record<AboutCommitmentId, LucideIcon> = {
  neverExpires: ShieldCheck,
  noSubscription: Wallet,
  countable: Calculator,
  honest: Compass,
};

/**
 * The three beats of the origin story, rendered as a numbered sequence beside
 * the narrative. Follows the Masalah → Aksi → Hasil formula from DESIGN.md §3.2.
 */
export const ABOUT_STORY_STEP_IDS = ["problem", "action", "result"] as const;

export type AboutStoryStepId = (typeof ABOUT_STORY_STEP_IDS)[number];
