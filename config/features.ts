import type { LucideIcon } from "lucide-react";
import { BarChart3, Calendar, Image as ImageIcon, Sparkles, Video } from "lucide-react";

export const FEATURE_IDS = ["perencana", "seo", "ai"] as const;

export type FeatureId = (typeof FEATURE_IDS)[number];

export const FEATURE_ICONS: Record<FeatureId, LucideIcon> = {
  perencana: Calendar,
  seo: BarChart3,
  ai: Sparkles,
};

export const FEATURE_ROUTES: Record<FeatureId, string> = {
  ai: "ai-content-maker",
  perencana: "perencana-konten",
  seo: "seo-analyzer",
};

export const FEATURE_META: Record<
  FeatureId,
  { comingSoon?: boolean; coverImage?: string; hasBadge?: boolean }
> = {
  perencana: {
    coverImage: "/images/features-perencanaan-konten.svg",
    hasBadge: true,
  },
  seo: { hasBadge: true },
  ai: { hasBadge: true },
};

/**
 * Secondary features shown on the /features page below the bento grid. They are
 * kept out of `FEATURE_IDS` because that list drives the homepage bento layout
 * (one featured tile + two side tiles) and has no room for more cards.
 * Each one has its own detail page under `/features/<route>`.
 */
export const EXTRA_FEATURE_IDS = ["aiImage", "aiVideo"] as const;

export type ExtraFeatureId = (typeof EXTRA_FEATURE_IDS)[number];

export const EXTRA_FEATURE_ROUTES: Record<ExtraFeatureId, string> = {
  aiImage: "ai-image",
  aiVideo: "ai-video",
};

export const EXTRA_FEATURE_ICONS: Record<ExtraFeatureId, LucideIcon> = {
  aiImage: ImageIcon,
  aiVideo: Video,
};
