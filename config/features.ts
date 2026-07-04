import type { LucideIcon } from "lucide-react";
import { BarChart3, Calendar, Sparkles } from "lucide-react";

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
  seo: { comingSoon: true },
  ai: { comingSoon: true },
};
