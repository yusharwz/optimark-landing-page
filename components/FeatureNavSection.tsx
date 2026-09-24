"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import {
  ALL_FEATURE_ICONS,
  ALL_FEATURE_IDS,
  FEATURE_PREVIEWS,
  FEATURE_PREVIEW_TINTS,
  featureHref,
  type AnyFeatureId,
} from "@/config/features";
import { cx } from "@/utils/cx";

/**
 * "Explore other features" strip placed at the bottom of every feature page,
 * so each page links to the rest (internal linking, per the feature-page
 * review). Styled after Canva's app cards: a tinted preview with the feature
 * icon pinned to its corner, then an eyebrow label, title, and a short line.
 *
 * Cards scroll horizontally with snap; the arrow buttons page through them on
 * wider screens, touch users swipe.
 */
export function FeatureNavSection({ current }: { current: AnyFeatureId }) {
  const t = useTranslations("featureNav");
  const tf = useTranslations("features");
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const others = ALL_FEATURE_IDS.filter((id) => id !== current);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // 1px tolerance: fractional scroll positions at some zoom levels never
    // land exactly on the end.
    setCanPrev(track.scrollLeft > 1);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const arrowClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 bg-white text-[#1E280E] shadow-sm transition-colors duration-200 hover:border-[#94C748] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-2";

  return (
    <section className="relative border-t border-gray-200/80 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal y={30} duration={0.7}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-detail text-xs font-semibold uppercase tracking-[0.12em]">
                {t("badge")}
              </span>
              <h2 className="text-display mt-3 text-2xl sm:text-3xl">{t("title")}</h2>
              <p className="text-lead mt-3 text-base">{t("description")}</p>
            </div>

            <div className="hidden shrink-0 gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canPrev}
                aria-label={t("prev")}
                className={arrowClass}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canNext}
                aria-label={t("next")}
                className={arrowClass}
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="scrollbar-hide -mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
        >
          {others.map((id) => (
            <FeatureCard key={id} id={id} category={t(`categories.${id}`)} tf={tf} />
          ))}
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  id: AnyFeatureId;
  category: string;
  tf: ReturnType<typeof useTranslations<"features">>;
};

function FeatureCard({ id, category, tf }: FeatureCardProps) {
  const Icon = ALL_FEATURE_ICONS[id];
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Link
      data-card
      href={featureHref(id)}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => videoRef.current?.pause()}
      className="group w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#94C748] focus-visible:ring-offset-4 rounded-2xl"
    >
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200/80"
        style={{ background: FEATURE_PREVIEW_TINTS[id] }}
      >
        <Preview id={id} videoRef={videoRef} />

        <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 bg-white shadow-sm">
          <Icon className="h-5 w-5 text-[#94C748]" strokeWidth={1.75} aria-hidden />
        </span>
      </div>

      <p className="text-detail mt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.1em]">
        {category}
      </p>
      <h3 className="text-display mt-1.5 text-base transition-colors group-hover:text-[#94C748]">
        {tf(`items.${id}.title`)}
      </h3>
      <p className="text-lead mt-1.5 line-clamp-2 text-sm">{tf(`items.${id}.description`)}</p>
    </Link>
  );
}

function Preview({
  id,
  videoRef,
}: {
  id: AnyFeatureId;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const preview = FEATURE_PREVIEWS[id];

  if (preview.type === "image") {
    // Photography fills the frame; product-UI illustrations sit inset so their
    // edges stay visible, like a screenshot on a coloured backdrop.
    const isPhoto = preview.src.endsWith(".webp") || preview.src.endsWith(".jpg");
    return (
      <Image
        src={preview.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 80vw"
        className={cx(
          "transition-transform duration-500 group-hover:scale-[1.04]",
          isPhoto ? "object-cover" : "object-contain p-6",
        )}
      />
    );
  }

  if (preview.type === "video") {
    return (
      // `#t=0.5` makes browsers paint a real frame instead of black before
      // playback; the clip only plays while the card is hovered.
      <video
        ref={videoRef}
        src={`${preview.src}#t=0.5`}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }

  return <SeoMockup />;
}

/** Stand-in artwork for SEO Analyzer: an audit score over a few check rows. */
function SeoMockup() {
  return (
    <div
      aria-hidden
      className="absolute inset-6 flex flex-col gap-2 rounded-xl border border-white/80 bg-white/90 p-4 shadow-sm transition-transform duration-500 group-hover:scale-[1.03]"
    >
      <div className="flex items-center justify-between">
        <span className="h-2 w-20 rounded-full bg-gray-200" />
        <span className="rounded-full border border-[#94C748]/30 bg-[#94C748]/10 px-2 py-0.5 text-[10px] font-bold text-[#5E8A1F]">
          92/100
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div className="h-full w-[92%] rounded-full bg-[#94C748]" />
      </div>
      {[70, 85, 55].map((width, index) => (
        <div
          key={width}
          className={cx(
            "mt-1 flex items-center gap-2 rounded-lg border px-2 py-1.5",
            index === 2 ? "border-amber-100 bg-amber-50/60" : "border-emerald-100 bg-emerald-50/60",
          )}
        >
          <span
            className={cx(
              "h-2 w-2 shrink-0 rounded-full",
              index === 2 ? "bg-amber-400" : "bg-emerald-400",
            )}
          />
          <span className="h-1.5 rounded-full bg-gray-200" style={{ width: `${width}%` }} />
        </div>
      ))}
    </div>
  );
}
