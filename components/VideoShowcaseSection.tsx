"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/base/buttons/button";
import { GET_STARTED_URL } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { cx } from "@/utils/cx";

// The card takes each clip's own aspect ratio so a 9:16 social cut isn't cropped
// into a 16:9 frame. `ratio` is only the first-paint guess — the real value is
// read off the video's metadata at runtime, so swapping a file for a differently
// shaped one needs no code change here.
const CARDS = [
  { id: "productReveal", src: "/videos/01-product-reveal.mp4", ratio: 16 / 9 },
  { id: "ugcDemo", src: "/videos/02-ugc-beauty-product-demo.mp4", ratio: 9 / 16 },
  { id: "founderStory", src: "/videos/03-founder-brand-story.mp4", ratio: 9 / 16 },
  {
    id: "foodBeverageAd",
    src: "/videos/04-food-beverage-social-ad.mp4",
    ratio: 16 / 9,
  },
  {
    id: "promoMotion",
    src: "/videos/05-promotional-product-motion.mp4",
    ratio: 9 / 16,
  },
] as const;

// One formula for any ratio: height-driven, but capped so a wide clip can't
// overflow the viewport (mobile) or the container (desktop). The ratio arrives
// as the `--ar` custom property, set per card below.
//
// Note the `_-_` in the desktop calc: CSS requires whitespace around `-` inside
// calc(), and Tailwind turns `_` into a space. Written as `calc(100vh-240px)`
// the expression is invalid, which silently kills the whole `min()` and leaves
// the card sized by its aspect-ratio alone — that's why it rendered tiny.
//
// Desktop reads as: at least 420px tall, ideally the viewport minus the header
// and dots, never past 900px or whatever height would make it wider than the
// 1200px container.
const CARD_SIZE =
  "w-auto h-[min(62vh,calc(88vw/var(--ar)))] lg:h-[clamp(420px,calc(100vh_-_240px),min(900px,calc(1200px/var(--ar))))]";

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
  const goToSlide = (i: number) => setSlideState(([s]) => [i, i > s ? 1 : -1]);

  // Real ratios read off the loaded videos, keyed by card id. Until a clip
  // reports in, its hardcoded `ratio` stands in.
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const reportRatio = (id: string, ratio: number) =>
    setRatios((prev) => (prev[id] === ratio ? prev : { ...prev, [id]: ratio }));

  const card = CARDS[slide];
  const ratio = ratios[card.id] ?? card.ratio;

  return (
    <section
      id="showcase"
      // Full-viewport section: header + carousel centered so the whole showcase
      // reads as one screen. Transparent so the shared fixed canvas shows through.
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-12 sm:px-12 lg:px-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl xl:max-w-7xl">
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
              href={GET_STARTED_URL}
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
                style={{ "--ar": ratio, aspectRatio: "var(--ar)" } as CSSProperties}
                className={cx(
                  "shrink-0 cursor-grab touch-pan-y select-none active:cursor-grabbing",
                  CARD_SIZE,
                )}
              >
                <VideoCard
                  key={card.id}
                  src={card.src}
                  title={t(`items.${card.id}.title`)}
                  description={t(`items.${card.id}.description`)}
                  onRatio={(r) => reportRatio(card.id, r)}
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
                i === slide ? "w-6 bg-[#1e280e]" : "w-2 bg-gray-300 hover:bg-gray-400",
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
  onRatio: (ratio: number) => void;
};

function VideoCard({ src, title, description, onRatio }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Report the clip's real shape so the card can size itself to the source
  // instead of a hardcoded guess. Metadata may already be there on a cached
  // file, in which case `loadedmetadata` never fires — so read it up front too.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const read = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        onRatio(video.videoWidth / video.videoHeight);
      }
    };

    read();
    video.addEventListener("loadedmetadata", read);
    return () => video.removeEventListener("loadedmetadata", read);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

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
      { threshold: 0.25 },
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

      {/* Cards can be narrow (9:16), so the copy wraps instead of truncating. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="text-base font-bold tracking-tight text-white sm:text-lg lg:text-xl">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-snug text-white/80 sm:text-sm">{description}</p>
      </div>
    </div>
  );
}
