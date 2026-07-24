"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link2, Sparkles, CalendarRange, Check, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMediaQuery } from "@/hooks/use-media-query";

type Translations = ReturnType<typeof useTranslations>;

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation only on mobile/tablet (desktop uses scroll pinning instead),
  // and only until the user interacts with the steps manually.
  const isDesktop = useMediaQuery("(min-width: 1024px)", true);
  const [autoplayStopped, setAutoplayStopped] = useState(false);
  const isAutoplay = !isDesktop && !autoplayStopped;

  useEffect(() => {
    if (!isAutoplay) return;

    autoplayTimerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 6000);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isAutoplay]);

  const handleStepSelect = (index: number) => {
    setActiveStep(index);
    setAutoplayStopped(true); // Stop autoplay once user interacts manually
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Pin section and update activeStep on scroll progress
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            // Pin exactly at the viewport top so the pinned section is exactly
            // one screen tall — keeps the bottom scroll indicator on-screen.
            start: "top top",
            // Scroll length while pinned, scaled to viewport height so the
            // lock feels consistent across screen sizes (~1.8 screens).
            end: () => "+=" + window.innerHeight * 1.8,
            pin: true,
            // 0.6s of catch-up smoothing instead of a hard 1:1 lock, so
            // entering/leaving the pin no longer snaps abruptly.
            scrub: 0.3,
            // anticipatePin was yanking the viewport on fast scroll; a small
            // value keeps just enough pre-pin to avoid a flash without the tug.
            anticipatePin: 0,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              // Quantize progress into 3 buckets: 0-33%, 33-66%, 66-100%
              if (progress < 0.33) {
                setActiveStep(0);
              } else if (progress < 0.66) {
                setActiveStep(1);
              } else {
                setActiveStep(2);
              }
            },
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const steps = [
    {
      id: 0,
      icon: Link2,
      title: t("step1Title"),
      desc: t("step1Description"),
    },
    {
      id: 1,
      icon: Sparkles,
      title: t("step2Title"),
      desc: t("step2Description"),
    },
    {
      id: 2,
      icon: CalendarRange,
      title: t("step3Title"),
      desc: t("step3Description"),
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      // Transparent: the shared fixed dot canvas (HeroFeaturesBackground) shows
      // through so this section blends seamlessly with its neighbors. No local
      // decorative blurs — they would get clipped at the section edges.
      className="relative overflow-hidden px-6 pt-5 pb-8 sm:px-12 lg:px-24 lg:pt-40 lg:pb-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-start"
    >
      <div className="mx-auto w-full max-w-7xl relative z-10">
        {/* Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <h2 className="mt-3 text-display text-4xl sm:text-5xl lg:text-[3.5rem] leading-tight">
            {t("title")}
          </h2>
          <p className="mt-3 lg:mt-2 xl:mt-4 text-lead text-base sm:text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </Reveal>

        {/* Split screen layout: Left steps controls, Right interactive mockups */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Steps Controls */}
          <div className="how-it-works-steps relative flex flex-col gap-5 lg:gap-3 xl:gap-5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepSelect(idx)}
                  className={`how-it-works-step-btn group text-left relative flex flex-col sm:flex-row gap-5 p-6 rounded-3xl border transition-all duration-500 ${
                    isActive
                      ? "border-[#94C748] bg-white shadow-xl shadow-[#94C748]/5 opacity-100 z-10"
                      : "border-transparent bg-transparent opacity-40 z-0 hover:opacity-70"
                  }`}
                >
                  {/* Step Icon badge wrapper containing the icon + connecting line */}
                  <div className="how-it-works-step-icon-wrapper relative shrink-0 flex items-center justify-center w-12 h-12">
                    {/* Step Icon badge - pops with green color when active */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-500 ${
                        isActive
                          ? "bg-[#94C748] text-white border-[#94C748] shadow-md shadow-[#94C748]/20 scale-105"
                          : "bg-white text-slate-500 border-slate-100 shadow-xs group-hover:scale-105"
                      }`}
                    >
                      <Icon className="how-it-works-step-icon h-6 w-6" />
                    </div>

                    {/* Connecting Line - Inside Card Segment (Hidden when card is active/white to avoid overlapping) */}
                    {idx < 2 && !isActive && (
                      <div className="how-it-works-line-inside absolute top-12 left-1/2 -translate-x-1/2 bottom-0 w-0.5 bg-slate-100 hidden sm:block -z-20 pointer-events-none">
                        <motion.div
                          className="w-full bg-[#94C748] origin-top h-full"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: activeStep > idx ? 1 : 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                      </div>
                    )}

                    {/* Connecting Line - Gap & Next Card Segment (Always rendered to bridge the gap) */}
                    {idx < 2 && (
                      <div className="how-it-works-line-gap absolute top-full left-1/2 -translate-x-1/2 h-[44px] lg:h-[36px] xl:h-[44px] w-0.5 bg-slate-100 hidden sm:block -z-20 pointer-events-none">
                        <motion.div
                          className="w-full bg-[#94C748] origin-top h-full"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: activeStep > idx ? 1 : 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Step details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`how-it-works-step-title text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                          isActive ? "text-[#1E280E]" : "text-slate-700"
                        }`}
                      >
                        {step.title}
                      </h3>
                      {/* Interactive progress bar inside card on mobile/tablet autoplay */}
                      {isActive && isAutoplay && (
                        <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 6, ease: "linear" }}
                            key={activeStep}
                            className="h-full bg-[#94C748]"
                          />
                        </div>
                      )}
                    </div>
                    <p
                      className={`how-it-works-step-desc text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
                        isActive ? "text-[#535862]" : "text-slate-400"
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Mockup container */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[30rem] w-full rounded-3xl border border-slate-200/80 bg-white/70 backdrop-blur-md shadow-2xl overflow-hidden flex items-center justify-center p-6 sm:p-10 select-none">
            <AnimatePresence mode="wait">
              {activeStep === 0 && <StepOneVisual key="step1" t={t} />}
              {activeStep === 1 && <StepTwoVisual key="step2" t={t} />}
              {activeStep === 2 && <StepThreeVisual key="step3" t={t} />}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator Helper (Desktop Pinned Mode only) */}
      <div className="how-it-works-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2.5 z-30 pointer-events-none">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#717680]">
          {activeStep < 2 ? t("illustrations.scrollExplore") : t("illustrations.scrollNext")}
        </span>
        <div className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center p-1 bg-white/80 shadow-xs">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-1 h-2 bg-[#94C748] rounded-full"
          />
        </div>
      </div>
    </section>
  );
}

// ==================== STEP 1 VISUAL ====================
function StepOneVisual({ t, inView }: { t: Translations; inView: boolean }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const platforms = [
    { name: "Instagram", color: "from-slate-700 to-slate-800", x: -110, y: -60 },
    { name: "Facebook", color: "from-slate-700 to-slate-800", x: 110, y: -60 },
    { name: "TikTok", color: "from-slate-800 to-slate-950", x: 0, y: 110 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="how-it-works-mockup-visual relative w-full max-w-[360px] h-[320px] flex items-center justify-center"
    >
      {/* Central Optimark Logo */}
      <div className="relative z-20 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl border border-slate-100 flex-col gap-1">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#94C748] to-[#94C748]/70 flex items-center justify-center text-white font-black text-xl shadow-md animate-pulse">
          O
        </div>
        <span className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">Optimark</span>
      </div>

      {/* Orbiting Platforms */}
      {platforms.map((plat) => (
        <div
          key={plat.name}
          className="absolute z-20 flex flex-col items-center gap-1.5"
          style={{ transform: `translate(${plat.x}px, ${plat.y}px)` }}
        >
          <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr ${plat.color} text-white shadow-lg border border-white/10`}>
            <span className="text-[10px] font-bold uppercase">{plat.name.substring(0, 4)}</span>
            {/* Status indicator on top corner */}
            <div className="absolute -top-1.5 -right-1.5">
              <AnimatePresence>
                {isConnected ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white border-2 border-white shadow-md"
                  >
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="h-3 w-3 rounded-full bg-amber-400 border-2 border-white shadow-md"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
          <span className="text-[9px] font-semibold text-slate-500 bg-white/80 border border-slate-150 rounded-full px-2 py-0.5 shadow-xs">
            {isConnected ? t("illustrations.connected") : t("illustrations.connecting")}
          </span>
        </div>
      ))}

      {/* Dashed Connecting Lines (Animated Particles) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {platforms.map((plat, idx) => {
          // Lines center is (180, 160)
          const startX = 180;
          const startY = 160;
          const endX = 180 + plat.x;
          const endY = 160 + plat.y;

          return (
            <g key={idx}>
              <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                className="stroke-slate-200 stroke-2 stroke-dasharray-[6]"
              />
              {!isConnected && (
                <motion.circle
                  r="4"
                  fill="#94C748"
                  animate={{
                    cx: [startX, endX],
                    cy: [startY, endY],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    delay: idx * 0.4,
                    ease: "linear",
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}

// ==================== STEP 2 VISUAL ====================
function StepTwoVisual({ t, inView }: { t: Translations; inView: boolean }) {
  const [typedPrompt, setTypedPrompt] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const promptFull = t("illustrations.prompt");

  // Typewriter effect for prompt
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedPrompt((prev) => prev + promptFull.charAt(index));
      index++;
      if (index >= promptFull.length) {
        clearInterval(interval);
        // Show AI output after a short delay
        setTimeout(() => setIsGenerated(true), 800);
      }
    }, 45); // Speed up typing slightly for snappier demo

    return () => clearInterval(interval);
  }, [promptFull]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="how-it-works-mockup-visual w-full max-w-[380px] bg-slate-50 border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col"
    >
      {/* Header bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        </div>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Optimark AI Studio</span>
        <div className="h-2 w-2 rounded-full bg-[#94C748] animate-ping" />
      </div>

      {/* Editor Content Area */}
      <div className="p-4 flex flex-col gap-4 flex-1">
        {/* User Prompt Input box */}
        <div className="flex flex-col gap-1">
          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Prompt</span>
          <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs min-h-[50px] text-[10px] text-slate-800 flex items-center">
            <span className="font-medium text-slate-700">{typedPrompt}</span>
            {!isGenerated && <span className="inline-block w-1.5 h-3 bg-[#94C748] animate-pulse ml-0.5" />}
          </div>
        </div>

        {/* AI Output preview */}
        <div className="flex flex-col gap-1">
          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">AI Draft Output</span>
          <AnimatePresence mode="wait">
            {!isGenerated ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50/30 border border-dashed border-[#94C748]/30 rounded-xl p-4 flex items-center justify-center gap-2.5 text-[9px] text-emerald-800 font-medium italic min-h-[90px]"
              >
                <Sparkles className="h-4 w-4 animate-spin text-[#94C748]" />
                {t("illustrations.generating")}
              </motion.div>
            ) : (
              <motion.div
                key="output"
                initial={{ opacity: 0, scale: 0.98, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white border border-[#94C748]/30 rounded-xl p-3.5 shadow-sm text-[10px] text-slate-800 flex flex-col gap-2 min-h-[90px]"
              >
                <div className="font-semibold text-emerald-800 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-[#94C748] animate-bounce" />
                  Optimark AI:
                </div>
                <p className="leading-relaxed font-mono">
                  ☕ Hari Senin butuh dorongan ekstra? Dapatkan promo Buy 1 Get 1 Free untuk semua kopi susu literan hari ini saja! 🚀✨
                </p>
                <div className="flex gap-1.5 flex-wrap mt-1">
                  <span className="bg-[#94C748]/10 text-emerald-800 font-bold rounded-sm px-1.5 py-0.5 text-[8px]">#KedaiKopi</span>
                  <span className="bg-[#94C748]/10 text-emerald-800 font-bold rounded-sm px-1.5 py-0.5 text-[8px]">#PromoKopi</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== STEP 3 VISUAL ====================
function StepThreeVisual({ t, inView }: { t: Translations; inView: boolean }) {
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChart(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="how-it-works-mockup-visual w-full max-w-[380px] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col p-4 gap-4"
    >
      {/* Top: Calendar schedule slot */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Auto Schedule</span>
        <div className="grid grid-cols-3 gap-2 text-[9px] font-semibold text-slate-600">
          <div className="border border-slate-200 rounded-xl p-2 text-center bg-slate-50 opacity-60">
            <div>MON 09:00</div>
            <div className="text-[8px] text-slate-400 font-normal mt-1">Sent </div>
          </div>
          {/* Active / Optimal Post slot */}
          <div className="relative border border-[#94C748]/40 bg-[#94C748]/5 rounded-xl p-2.5 text-center shadow-xs flex flex-col justify-between min-h-[70px]">
            <div>MON 18:00</div>
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="mt-1 bg-[#94C748] text-white rounded-md p-1 font-bold text-[7px] shadow-xs flex items-center justify-center gap-1 select-none"
            >
              Post Dropped
            </motion.div>
            {/* Optimal Tag */}
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-[#94C748] text-white text-[6px] font-black uppercase tracking-wider rounded-full px-1.5 shadow-xs border border-white whitespace-nowrap">
              PRIME TIME
            </span>
          </div>
          <div className="border border-slate-200 rounded-xl p-2 text-center bg-slate-50 opacity-60">
            <div>TUE 12:00</div>
            <div className="text-[8px] text-slate-400 font-normal mt-1">Queue</div>
          </div>
        </div>
      </div>

      {/* Bottom: Analytics growth display */}
      <div className="flex-1 border-t border-slate-100 pt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">{t("illustrations.growth")}</span>
          <AnimatePresence>
            {showChart && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2 py-0.5 text-[8px] font-bold shadow-xs flex items-center gap-0.5"
              >
                +158% Reach
                <ArrowUpRight className="h-2 w-2 text-emerald-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SVG Live Chart Illustration */}
        <div className="h-[90px] relative w-full bg-slate-50 border border-slate-150 rounded-xl overflow-hidden flex items-end">
          <svg className="w-full h-[70px] absolute bottom-0 left-0">
            <defs>
              <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94C748" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#94C748" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Filled background below line */}
            {showChart && (
              <motion.path
                initial={{ d: "M 0,60 Q 90,60 180,60 T 360,60 L 360,70 L 0,70 Z" }}
                animate={{ d: "M 0,60 Q 90,45 180,25 T 360,5 L 360,70 L 0,70 Z" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                fill="url(#chart-glow)"
              />
            )}

            {/* Active drawing line */}
            {showChart && (
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                d="M 0,60 Q 90,45 180,25 T 360,5"
                fill="none"
                className="stroke-[#94C748]"
                strokeWidth="2.5"
              />
            )}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {!showChart && (
              <span className="text-[8px] font-medium text-slate-400 italic">Simulating publication...</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
