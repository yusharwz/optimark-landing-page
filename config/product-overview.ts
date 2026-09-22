import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  CalendarClock,
  ClipboardList,
  Megaphone,
  PenLine,
  SearchCheck,
  Store,
  Users,
} from "lucide-react";

/**
 * Structural data for the product overview at `/blog`.
 *
 * The route keeps the `blog` name and nav label; only its contents are a
 * product overview. Copy lives in the `blog` namespace in
 * `messages/{id,en}.json`, keyed by the ids below.
 */

/** The four beats of a normal working cycle in Optimark. */
export const WORKFLOW_STEP_IDS = ["plan", "create", "audit", "publish"] as const;

export type WorkflowStepId = (typeof WORKFLOW_STEP_IDS)[number];

export const WORKFLOW_STEP_ICONS: Record<WorkflowStepId, LucideIcon> = {
  plan: ClipboardList,
  create: PenLine,
  audit: SearchCheck,
  publish: CalendarClock,
};

/** Who the platform is built for, in order of team size. */
export const AUDIENCE_IDS = ["owner", "team", "agency"] as const;

export type AudienceId = (typeof AUDIENCE_IDS)[number];

export const AUDIENCE_ICONS: Record<AudienceId, LucideIcon> = {
  owner: Store,
  team: Users,
  agency: Briefcase,
};

/** Icon for the pricing/transparency band. */
export const TRANSPARENCY_ICON: LucideIcon = Megaphone;
