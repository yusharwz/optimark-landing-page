"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/base/buttons/button";
import { Reveal } from "@/components/motion/Reveal";
import { cx } from "@/utils/cx";

// Order preserved from the original bento layout (2.mp4 is the 4K source).
const CARDS = [
  { id: "card1", src: "/videos/1.mp4" },
  { id: "card2", src: "/videos/3.mp4" },
  { id: "card3", src: "/videos/2.mp4" },
] as const;

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

// Slide comes in from the side it's heading toward and leaves the opposite way.
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export function VideoShowcaseSection() {
  const t = useTranslations("videoShowcase");
  // [current slide, last direction] — direction drives the enter/exit side.
  const [[slide, direction], setSlideState] = useState<[number, number]>([0, 0]);

  const paginate = (dir: number) =>
    setSlideState(([s]) => [(s + dir + CARDS.length) % CARDS.length, dir]);
  const next = () => paginate(1);
  const prev = () => paginate(-1);
  const goToSlide = (i: number) =>
    setSlideState(([s]) => [i, i > s ? 1 : -1]);

  const card = CARDS[slide];

  return (
    <section
      id="showcase"
      // Full-viewport section: header + carousel centered so the whole showcase
      // reads as one screen. Transparent so the shared fixed canvas shows through.
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-12 sm:px-12 lg:px-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Header: title + subtitle left, CTA right (per reference design) */}
        <Reveal className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 lg:flex-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a8a2c]">
              {t("eyebrow")}
            </span>
            <h2 className="text-display mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="text-lead mt-3 max-w-xl text-base">{t("subtitle")}</p>
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

        <Reveal className="relative">
          <div className="relative flex justify-center overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              <motion.div
                key={slide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: SPRING, opacity: { duration: 0.2 } }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  // Small drag OR light flick advances one card; wraps at ends.
                  const swipe = info.offset.x;
                  const velocity = info.velocity.x;
                  if (swipe < -50 || velocity < -300) next();
                  else if (swipe > 50 || velocity > 300) prev();
                }}
                // Big cinematic card. Mobile: width-driven at 16:9. Desktop:
                // height-driven off the viewport so it fills the screen.
                className="aspect-video w-[90%] shrink-0 cursor-grab touch-pan-y select-none active:cursor-grabbing sm:w-[78%] lg:aspect-auto lg:h-[clamp(420px,60vh,600px)] lg:w-[calc(clamp(420px,60vh,600px)*16/9)]"
              >
                <VideoCard
                  key={card.id}
                  src={card.src}
                  title={t(`items.${card.id}.title`)}
                  description={t(`items.${card.id}.description`)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / next arrows (never disabled — the carousel loops) */}
          <button
            type="button"
            aria-label="Previous video"
            onClick={prev}
            className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2.5 text-gray-800 shadow-lg backdrop-blur transition hover:bg-white sm:flex lg:left-4"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next video"
            onClick={next}
            className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2.5 text-gray-800 shadow-lg backdrop-blur transition hover:bg-white sm:flex lg:right-4"
          >
            <ChevronRight className="size-5" />
          </button>
        </Reveal>

        {/* Dot indicators */}
        <div className="mt-5 flex justify-center gap-2">
          {CARDS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              aria-label={`Go to video ${i + 1}`}
              aria-current={i === slide}
              onClick={() => goToSlide(i)}
              className={cx(
                "h-2 rounded-full transition-all duration-300",
                i === slide
                  ? "w-6 bg-[#1e280e]"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type VideoCardProps = {
  src: string;
  title: string;
  description: string;
};

function VideoCard({ src, title, description }: VideoCardProps) {
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
    <div className="group relative h-full w-full overflow-hidden rounded-3xl border border-gray-200 shadow-md">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Bottom gradient so the overlay text stays readable on any frame */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8">
        <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl lg:text-2xl">
          {title}
        </h3>
        <p className="mt-1.5 max-w-3xl truncate text-sm leading-relaxed text-white/80 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
