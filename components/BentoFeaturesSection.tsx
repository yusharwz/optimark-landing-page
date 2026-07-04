"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { FEATURE_ICONS, FEATURE_IDS, FEATURE_META, FEATURE_ROUTES, type FeatureId } from "@/config/features";
import { BentoFeatureCard } from "@/components/BentoFeatureCard";
import { AiContentIllustration, SeoAnalyzerIllustration, ContentPlannerIllustration } from "@/components/BentoCardIllustrations";
import { gsap, useGSAP } from "@/lib/gsap";
import { cx } from "@/utils/cx";

// The hero/large tile of the bento grid (spans both rows on the left).
const FEATURED_ID: FeatureId = "ai";

export function BentoFeaturesSection() {
  const t = useTranslations("features");
  const containerRef = useRef<HTMLDivElement>(null);

  // Featured tile first so the grid places it in the tall left column.
  const orderedIds = [
    FEATURED_ID,
    ...FEATURE_IDS.filter((id) => id !== FEATURED_ID),
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mm = gsap.matchMedia();

      // Desktop animations
      mm.add("(min-width: 640px)", () => {
        // Header Reveal
        gsap.fromTo(
          ".bento-header > *",
          { opacity: 0, y: 30, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".bento-header",
              start: "top 90%",
              once: true,
            },
          }
        );

        // 3D Grid Reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 85%",
            once: true,
          },
        });

        tl.fromTo(
          ".bento-card-ai",
          { opacity: 0, x: -80, rotateY: 15, scale: 0.95 },
          { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1.0, ease: "power4.out" }
        )
          .fromTo(
            ".bento-card-perencana",
            { opacity: 0, x: 80, rotateY: -15, scale: 0.95 },
            { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1.0, ease: "power4.out" },
            "-=0.8"
          )
          .fromTo(
            ".bento-card-seo",
            { opacity: 0, y: 60, rotateX: 15, scale: 0.95 },
            { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.0, ease: "power4.out" },
            "-=0.8"
          );
      });

      // Mobile animations
      mm.add("(max-width: 639px)", () => {
        // Header Reveal
        gsap.fromTo(
          ".bento-header > *",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".bento-header",
              start: "top 90%",
              once: true,
            },
          }
        );

        // Grid Reveal
        gsap.fromTo(
          ".bento-grid > *",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".bento-grid",
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    // Transparent: the shared HeroFeaturesBackground (dot grid + soft gradient)
    // shows through so the hero-to-features transition keeps one continuous
    // canvas. The white cards float above it.
    <section ref={containerRef} className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="bento-header mb-14 text-center lg:mb-20">
          <h2 className="text-display text-4xl sm:text-5xl lg:text-[3.5rem]">
            {t("title")}
          </h2>
          <p className="text-lead mx-auto mt-5 max-w-xl text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div
          className="bento-grid grid grid-cols-1 gap-4 sm:auto-rows-fr sm:grid-cols-2 sm:grid-rows-2 lg:gap-6"
          style={{ perspective: "1200px" }}
        >
          {orderedIds.map((id) => {
            const meta = FEATURE_META[id];
            const badge = meta.hasBadge
              ? t("availableNow")
              : meta.comingSoon
                ? t("comingSoon")
                : undefined;

            let illustration: React.ReactNode = undefined;
            if (id === "ai") {
              illustration = <AiContentIllustration />;
            } else if (id === "seo") {
              illustration = <SeoAnalyzerIllustration />;
            } else if (id === "perencana") {
              illustration = <ContentPlannerIllustration />;
            }

            return (
              <BentoFeatureCard
                key={id}
                icon={FEATURE_ICONS[id]}
                title={t(`items.${id}.title`)}
                description={t(`items.${id}.description`)}
                badge={badge}
                coverImage={meta.coverImage}
                illustration={illustration}
                featured={id === FEATURED_ID}
                highlight={id === "ai"}
                href={`/features/${FEATURE_ROUTES[id]}`}
                className={cx(
                  id === FEATURED_ID ? "sm:row-span-2" : undefined,
                  `bento-card-${id}`
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
