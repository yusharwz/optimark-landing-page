"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, Search, TrendingUp, Check, FileText, Calendar, Clock } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Premium landscape illustration for the featured card (AI Content Maker).
 * Renders a desktop web editor interface with a prompt box, editor typing area,
 * and a live social post preview.
 */
export function AiContentIllustration() {
  const t = useTranslations("features");
  const containerRef = useRef<HTMLDivElement>(null);

  const responseText = t("illustrations.ai.aiResponse");
  const words = responseText.split(" ");

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      // Initial state
      gsap.set(".ai-prompt-box", { opacity: 0, y: 10 });
      gsap.set(".ai-word", { opacity: 0, y: 5 });
      gsap.set(".ai-preview-card", { opacity: 0, scale: 0.96, y: 25 });
      gsap.set(".ai-tone-badge", { opacity: 0, scale: 0 });

      // Timeline sequence
      tl.to(".ai-prompt-box", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
        .to(
          ".ai-word",
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "none" },
          "-=0.1"
        )
        .to(
          ".ai-preview-card",
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" },
          "-=0.2"
        )
        .to(
          ".ai-tone-badge",
          { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" },
          "-=0.1"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[440px] h-[190px] sm:h-[295px] bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden flex flex-col select-none pointer-events-none mt-2"
    >
      {/* OS Header Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center justify-between">
        {/* Windows Dots */}
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-200" />
          <div className="w-2 h-2 rounded-full bg-slate-200" />
          <div className="w-2 h-2 rounded-full bg-slate-200" />
        </div>
        {/* Editor Tab */}
        <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-md text-[8px] font-mono text-slate-550 border border-slate-200 shadow-sm">
          <FileText className="h-2.5 w-2.5 text-brand-500" />
          social_promo.txt
        </div>
        {/* Status Indicator */}
        <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[7px] text-emerald-700 font-bold tracking-wide uppercase">AI Active</span>
        </div>
      </div>

      {/* Workspace Panel */}
      <div className="flex-1 grid grid-cols-[1.3fr_1fr] gap-2 p-2 bg-slate-50 text-[9px]">
        {/* Left Side: Document Editor */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 flex flex-col gap-2 overflow-hidden shadow-sm">
          {/* Prompt input field */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[7px] text-slate-400 uppercase font-bold tracking-wider">AI Prompt</span>
            <div className="ai-prompt-box bg-slate-50 border border-slate-200/60 rounded px-2 py-1 text-slate-500 text-[8px] italic truncate">
              {t("illustrations.ai.userPrompt")}
            </div>
          </div>

          {/* Text generation display */}
          <div className="flex-1 flex flex-col gap-1.5">
            <span className="text-[7px] text-slate-400 uppercase font-bold tracking-wider">Editor Output</span>
            <div className="font-mono text-slate-700 leading-normal text-[8px] overflow-hidden">
              <span className="text-brand-600 font-semibold">#optimark </span>
              {words.map((word, i) => (
                <span key={i} className="ai-word inline-block mr-0.5">
                  {word}
                </span>
              ))}
              <span className="inline-block w-1.5 h-3 bg-brand-500 animate-pulse ml-0.5 align-middle" />
            </div>
          </div>
        </div>

        {/* Right Side: Social Media Card Preview */}
        <div className="ai-preview-card bg-white text-slate-800 rounded-xl border border-slate-200 p-2 shadow-md flex flex-col gap-1.5 overflow-hidden">
          {/* Preview Header */}
          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1">
            <div className="w-3.5 h-3.5 rounded-full bg-slate-100 flex items-center justify-center text-[7px] font-bold text-slate-500 border border-slate-200">
              O
            </div>
            <span className="text-[7px] font-bold text-slate-700">optimark.app</span>
          </div>

          {/* Preview Image Visual */}
          <div className="h-[45px] sm:h-[110px] bg-gradient-to-tr from-brand-300 via-emerald-50 to-indigo-100 rounded-md flex items-center justify-center relative overflow-hidden border border-slate-100">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
            <Sparkles className="h-5 w-5 text-brand-600 relative z-10 animate-bounce" />
          </div>

          {/* Description mock */}
          <div className="flex flex-col gap-0.5">
            <div className="w-1/2 h-1 bg-slate-200 rounded" />
            <div className="w-full h-1 bg-slate-100 rounded" />
          </div>

          {/* Copy Button Action */}
          <div className="mt-auto bg-brand-50 hover:bg-brand-100 text-brand-700 py-1 text-center font-bold rounded text-[7px] flex items-center justify-center gap-1 transition-colors border border-brand-100">
            <Check className="h-2 w-2" />
            Copy Draft
          </div>
        </div>
      </div>

      {/* Floating Meta Tag */}
      <div className="ai-tone-badge absolute bottom-2.5 right-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 backdrop-blur-sm rounded-full px-2 py-0.5 text-[7px] font-bold shadow-md flex items-center gap-1 animate-pulse">
        <Sparkles className="h-2 w-2 text-emerald-500" />
        Tone: Engaging
      </div>
    </div>
  );
}

/**
 * Premium dashboard widget illustration for the SEO Analyzer card.
 * Fits into the standard 1x1 bento card height, with soft gray borders.
 */
export function SeoAnalyzerIllustration() {
  const t = useTranslations("features");
  const containerRef = useRef<HTMLDivElement>(null);

  // SVG parameters for circular score ring
  const radius = 22;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const scoreValue = 92;
  const strokeDashoffset = circumference - (scoreValue / 100) * circumference;

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "bottom 35%",
          scrub: 1,
        },
      });

      // Initial state
      gsap.set(".seo-circle", { strokeDashoffset: circumference });
      gsap.set(".seo-keyword-item", { opacity: 0, y: 8 });

      // Animate stroke circle path and counter together
      const counter = { val: 0 };
      tl.to(".seo-circle", {
        strokeDashoffset: strokeDashoffset,
        duration: 1.2,
        ease: "power2.out",
      })
        .to(
          counter,
          {
            val: scoreValue,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              const el = containerRef.current?.querySelector(".seo-score-text");
              if (el) el.textContent = `${Math.round(counter.val)}%`;
            },
          },
          "<"
        )
        .to(
          ".seo-keyword-item",
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: "power2.out" },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-[160px] sm:w-[180px] bg-white border border-slate-200 rounded-2xl p-3 shadow-md flex flex-col gap-2.5 bg-gradient-to-br from-white to-slate-50/50 select-none pointer-events-none"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
        <span className="font-semibold text-slate-700 text-[10px] flex items-center gap-1">
          <Search className="h-3 w-3 text-brand-600" />
          SEO Audit
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Main Panel Content */}
      <div className="flex flex-col gap-2">
        {/* Score Ring Section */}
        <div className="flex items-center gap-2">
          {/* Circular progress indicator */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-slate-100"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Foreground circle with animation */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-brand-500 seo-circle"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
              />
            </svg>
            <span className="absolute font-bold text-slate-800 text-[11px] seo-score-text">0%</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[8px] font-medium text-slate-400">{t("illustrations.seo.score")}</span>
            <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="h-2 w-2" />
              +5%
            </span>
          </div>
        </div>

        {/* Keyword list */}
        <div className="flex flex-col gap-1">
          <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">
            {t("illustrations.seo.keywords")}
          </span>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[8px] text-slate-700 seo-keyword-item">
              <span className="truncate max-w-[65%] font-medium">optimark</span>
              <span className="bg-emerald-50 text-emerald-700 px-1 rounded text-[7px] font-semibold">
                +24%
              </span>
            </div>
            <div className="flex items-center justify-between text-[8px] text-slate-700 seo-keyword-item">
              <span className="truncate max-w-[65%] font-medium">marketing tools</span>
              <span className="bg-emerald-50 text-emerald-700 px-1 rounded text-[7px] font-semibold">
                +12%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Premium dashboard widget illustration for the Content Planner card.
 * Integrates scheduling paths and floating calendar elements.
 */
export function ContentPlannerIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "bottom 35%",
          scrub: 1,
        },
      });

      // SVG path length auto-calculation
      const path = containerRef.current.querySelector(".planner-path") as SVGPathElement;
      let pathLength = 0;
      if (path) {
        pathLength = path.getTotalLength();
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      }

      // Initial state of moving card (positioned outside or offset)
      gsap.set(".moving-post", { x: -35, y: -25, opacity: 0, scale: 0.9 });
      gsap.set(".schedule-badge", { scale: 0, opacity: 0 });

      // Animate path drawing
      if (path) {
        tl.to(path, { strokeDashoffset: 0, duration: 0.6, ease: "none" });
      }

      // Slide and slot moving post
      tl.to(
        ".moving-post",
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.2"
      )
        // Pop scheduled check indicator
        .to(
          ".schedule-badge",
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
          "-=0.1"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-[160px] sm:w-[180px] bg-white border border-slate-200 rounded-2xl p-3 shadow-md flex flex-col gap-2.5 bg-gradient-to-br from-white to-slate-50/50 select-none pointer-events-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
        <span className="font-semibold text-slate-700 text-[10px] flex items-center gap-1">
          <Calendar className="h-3 w-3 text-brand-600" />
          Scheduler
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
      </div>

      {/* Calendar Grid columns */}
      <div className="relative grid grid-cols-3 gap-1.5 text-[8px] h-[95px] sm:h-[110px]">
        {/* SVG Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <path
            d="M 15,20 C 35,5 50,45 62,45"
            className="stroke-brand-350 fill-transparent planner-path"
            strokeWidth="1.5"
            strokeDasharray="3,3"
          />
        </svg>

        {/* Monday Column */}
        <div className="flex flex-col gap-1 border-r border-slate-100 pr-1 z-10">
          <span className="text-[7px] font-bold text-slate-400 text-center block mb-0.5">MON</span>
          <div className="bg-blue-50 border border-blue-100 rounded p-1 text-[7px] text-blue-700 flex flex-col gap-0.5 shadow-sm">
            <span className="font-bold leading-none truncate">Promo Reel</span>
            <span className="text-[6px] text-blue-400 leading-none">09:00 AM</span>
          </div>
        </div>

        {/* Tuesday Column */}
        <div className="flex flex-col gap-1 border-r border-slate-100 px-1 z-10">
          <span className="text-[7px] font-bold text-slate-400 text-center block mb-0.5">TUE</span>
          <div className="bg-emerald-50 border border-emerald-100 rounded p-1 text-[7px] text-emerald-700 flex flex-col gap-0.5 shadow-sm">
            <span className="font-bold leading-none truncate">Tips Post</span>
            <span className="text-[6px] text-emerald-400 leading-none">02:30 PM</span>
          </div>
        </div>

        {/* Wednesday Column (Destination) */}
        <div className="flex flex-col gap-1 pl-1 z-10 relative">
          <span className="text-[7px] font-bold text-slate-400 text-center block mb-0.5">WED</span>
          {/* Moving post starts offset and lands exactly here inside the Wednesday cell */}
          <div className="relative min-h-[35px] sm:min-h-[45px] w-full">
            <div className="moving-post absolute inset-0 bg-brand-50 border border-brand-200 rounded p-1 text-[7px] text-brand-700 flex flex-col gap-0.5 shadow-md">
              <span className="font-bold leading-none truncate">AI Launch</span>
              <div className="flex items-center gap-0.5 text-[6px] text-brand-500 mt-0.5">
                <Clock className="h-1.5 w-1.5" />
                <span>10:00 AM</span>
              </div>

              {/* Floating Success Badge when scheduled */}
              <div className="schedule-badge absolute -top-1.5 -right-1.5 bg-emerald-500 text-white w-3 h-3 rounded-full flex items-center justify-center shadow border border-white">
                <Check className="h-2 w-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
