import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  CalendarClock,
  CalendarDays,
  Clapperboard,
  Lightbulb,
  LineChart,
  PenLine,
  Send,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

/**
 * Structural data for the About page (/about). Copy lives in the `about`
 * namespace of messages/{id,en}.json, keyed by the ids below.
 *
 * Source: the approved "OPTIMARK About Us" handoff document. Its section order
 * (1–9) maps one-to-one onto the sections in components/AboutSections.tsx.
 * Per that handoff, the page carries no statistics, client counts, awards, or
 * certifications — do not add any without confirmed source data.
 */

/** "What We Do" — the six capability cards, in document order. */
export const ABOUT_CAPABILITY_IDS = [
  "contentGeneration",
  "imageVideo",
  "planning",
  "social",
  "seo",
  "analytics",
] as const;

export type AboutCapabilityId = (typeof ABOUT_CAPABILITY_IDS)[number];

export const ABOUT_CAPABILITY_ICONS: Record<AboutCapabilityId, LucideIcon> = {
  contentGeneration: Sparkles,
  imageVideo: Clapperboard,
  planning: CalendarClock,
  social: Share2,
  seo: BarChart3,
  analytics: LineChart,
};

/** "How OPTIMARK Helps Businesses" — the six workflow steps, in order. */
export const ABOUT_WORKFLOW_IDS = [
  "ideation",
  "creation",
  "planning",
  "publishing",
  "monitoring",
  "optimization",
] as const;

export type AboutWorkflowId = (typeof ABOUT_WORKFLOW_IDS)[number];

export const ABOUT_WORKFLOW_ICONS: Record<AboutWorkflowId, LucideIcon> = {
  ideation: Lightbulb,
  creation: PenLine,
  planning: CalendarDays,
  publishing: Send,
  monitoring: Activity,
  optimization: TrendingUp,
};
