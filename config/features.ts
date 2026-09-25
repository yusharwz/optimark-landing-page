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
 * Secondary features. They are kept out of `FEATURE_IDS` because that list
 * drives the tall-featured-tile bento layout (one featured tile + two side
 * tiles); these two render as a plain two-up row underneath it. Each one has
 * its own detail page under `/features/<route>`.
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

/** Every feature that has a detail page, in menu order. */
export const ALL_FEATURE_IDS = ["ai", "perencana", "seo", ...EXTRA_FEATURE_IDS] as const;

export type AnyFeatureId = (typeof ALL_FEATURE_IDS)[number];

export const ALL_FEATURE_ROUTES: Record<AnyFeatureId, string> = {
  ...FEATURE_ROUTES,
  ...EXTRA_FEATURE_ROUTES,
};

export const ALL_FEATURE_ICONS: Record<AnyFeatureId, LucideIcon> = {
  ...FEATURE_ICONS,
  ...EXTRA_FEATURE_ICONS,
};

/** Locale-aware href for a feature's detail page. */
export function featureHref(id: AnyFeatureId): string {
  return `/features/${ALL_FEATURE_ROUTES[id]}`;
}

/**
 * Preview shown on each feature's card in the "explore other features" strip
 * at the bottom of every feature page (components/FeatureNavSection.tsx).
 *
 * SEO Analyzer has no product artwork yet, so it renders a small CSS mockup of
 * its audit score instead of an image.
 */
export type FeaturePreview =
  | { type: "image"; src: string }
  | { type: "video"; src: string }
  | { type: "seoMockup" };

export const FEATURE_PREVIEWS: Record<AnyFeatureId, FeaturePreview> = {
  ai: { type: "image", src: "/images/ai-content-maker/ai-caption-modal.svg" },
  perencana: { type: "image", src: "/images/features-perencanaan-konten.svg" },
  seo: { type: "seoMockup" },
  aiImage: { type: "image", src: "/images/image-bento/01-product-photoshoot-skincare.webp" },
  aiVideo: { type: "video", src: "/videos/01-product-reveal.mp4" },
};

/** Soft background wash behind each preview, one tint per feature. */
export const FEATURE_PREVIEW_TINTS: Record<AnyFeatureId, string> = {
  ai: "linear-gradient(135deg, #F1FBE4 0%, #E3F5C9 100%)",
  perencana: "linear-gradient(135deg, #FEF6E7 0%, #FCE9C3 100%)",
  seo: "linear-gradient(135deg, #EFF6FF 0%, #DBE9FE 100%)",
  aiImage: "linear-gradient(135deg, #FDF2F8 0%, #FBE1EF 100%)",
  aiVideo: "linear-gradient(135deg, #EEF2FF 0%, #DFE4FD 100%)",
};
