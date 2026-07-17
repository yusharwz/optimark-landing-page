"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { Reveal } from "@/components/motion/Reveal";
import { cx } from "@/utils/cx";

// Bento layout: two cards side by side on top, one full-width card below.
// 2.mp4 is the 4K source, so it takes the wide bottom slot.
const CARDS = [
  { id: "card1", src: "/videos/1.mp4", wide: false },
  { id: "card2", src: "/videos/3.mp4", wide: false },
  { id: "card3", src: "/videos/2.mp4", wide: true },
] as const;

export function VideoShowcaseSection() {
  const t = useTranslations("videoShowcase");

  return (
    <section
      id="showcase"
      // Transparent: the shared fixed dot canvas (HeroFeaturesBackground) shows
      // through so this section blends seamlessly with its neighbors. No local
      // decorative blurs — they would get clipped at the section edges.
      className="relative overflow-hidden px-6 py-14 sm:px-12 lg:px-24 lg:py-16"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Header: title + subtitle left, CTA right (per reference design) */}
        <Reveal className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 lg:flex-1">
            <h2 className="text-display text-3xl leading-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="text-lead mt-3 max-w-xl text-base">
              {t("subtitle")}
            </p>
          </div>
          <div className="shrink-0">
            <Button
              href="/pricing"
              size="lg"
              className="text-white"
              iconTrailing={<ArrowRight className="size-5" />}
            >
              {t("cta")}
            </Button>
          </div>
        </Reveal>

        <Reveal stagger className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          {CARDS.map((card) => (
            <VideoCard
              key={card.id}
              src={card.src}
              title={t(`items.${card.id}.title`)}
              description={t(`items.${card.id}.description`)}
              wide={card.wide}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

type VideoCardProps = {
  src: string;
  title: string;
  description: string;
  /** Wide cards span both grid columns and use a cinematic aspect ratio. */
  wide?: boolean;
};

function VideoCard({ src, title, description, wide }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play only while on screen; leave the first frame static for
  // prefers-reduced-motion users.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cx(
        "group relative overflow-hidden rounded-3xl border border-gray-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        wide
          ? "aspect-[4/3] sm:aspect-[21/9] lg:col-span-2 lg:aspect-auto lg:h-[220px]"
          : "aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[260px]"
      )}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Bottom gradient so the overlay text stays readable on any frame */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
          {title}
        </h3>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/80">
          {description}
        </p>
      </div>
    </div>
  );
}
