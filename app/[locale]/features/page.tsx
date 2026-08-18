"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BentoFeatureCard } from "@/components/BentoFeatureCard";
import {
  AiContentIllustration,
  SeoAnalyzerIllustration,
  ContentPlannerIllustration,
} from "@/components/BentoCardIllustrations";
import {
  Sparkles,
  Calendar,
  BarChart3,
  Zap,
  Check,
  Search,
  ArrowRight,
  Copy,
  Clock,
  CheckCircle2,
  XCircle,
  Cpu,
  Layers,
  Activity,
  Plus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ConnectSection } from "@/components/ConnectSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaSection } from "@/components/CtaSection";
import { ScrollUpButton } from "@/components/ScrollUpButton";
import { SCROLL_UP_THRESHOLD } from "@/config/site";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import {
  EXTRA_FEATURE_ICONS,
  EXTRA_FEATURE_IDS,
  EXTRA_FEATURE_ROUTES,
} from "@/config/features";

type FeatureItem = {
  id: "ai" | "perencana" | "seo";
  routeId: string;
  icon: LucideIcon;
  comingSoon?: boolean;
  featured?: boolean;
};

const features: FeatureItem[] = [
  {
    id: "ai",
    routeId: "ai-content-maker",
    icon: Sparkles,
    featured: true,
  },
  {
    id: "perencana",
    routeId: "perencana-konten",
    icon: Calendar,
  },
  {
    id: "seo",
    routeId: "seo-analyzer",
    icon: BarChart3,
  },
];

export default function FeaturesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("features");
  const tp = useTranslations("featuresPage");
  const [activeTab, setActiveTab] = useState<"ai" | "planner" | "seo">("ai");

  // AI Content Generator state
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [aiCopied, setAiCopied] = useState(false);

  // Smart Planner state
  const [plannerSlots, setPlannerSlots] = useState([
    { id: 1, day: "MON", time: "09:00 AM", title: "Promo Reel", scheduled: true },
    { id: 2, day: "MON", time: "06:00 PM", title: "Product Intro", scheduled: false },
    { id: 3, day: "TUE", time: "11:00 AM", title: "Review Video", scheduled: false },
    { id: 4, day: "WED", time: "10:00 AM", title: "AI Launch", scheduled: true },
    { id: 5, day: "WED", time: "03:30 PM", title: "Tips & Tricks", scheduled: false },
    { id: 6, day: "THU", time: "09:00 AM", title: "FAQ Post", scheduled: false },
    { id: 7, day: "FRI", time: "12:00 PM", title: "Weekend Promo", scheduled: false },
    { id: 8, day: "FRI", time: "07:00 PM", title: "Giveaway Reel", scheduled: true },
  ]);

  // SEO Analyzer state
  const [seoKeyword, setSeoKeyword] = useState("diet plan");
  const [seoContent, setSeoContent] = useState(
    "To build a successful diet plan, focus on healthy food, fresh vegetables, and regular training. A proper diet plan ensures sustained energy and long-term wellness."
  );

  // Math-based calculations for live SEO scoring
  const seoMetrics = useMemo(() => {
    const text = seoContent.trim();
    const wordCount = text === "" ? 0 : text.split(/\s+/).length;
    const kw = seoKeyword.toLowerCase().trim();

    let kwCount = 0;
    if (kw !== "" && text !== "") {
      const lowerText = text.toLowerCase();
      let pos = lowerText.indexOf(kw);
      while (pos !== -1) {
        kwCount++;
        pos = lowerText.indexOf(kw, pos + kw.length);
      }
    }

    const density = wordCount > 0 ? (kwCount / wordCount) * 100 : 0;
    const hasHeadings = text.includes("##") || text.includes("#");
    const firstSentenceHasKw = text.split(/[.!?]/)[0]?.toLowerCase().includes(kw) ?? false;

    // Build scoring logic
    let score = 0;
    if (wordCount >= 30) score += 25;
    if (kwCount > 0) score += 25;
    if (density >= 1 && density <= 3) score += 25;
    if (hasHeadings) score += 15;
    if (firstSentenceHasKw) score += 10;

    return {
      wordCount,
      kwCount,
      density,
      hasHeadings,
      firstSentenceHasKw,
      score,
    };
  }, [seoContent, seoKeyword]);

  // GSAP registers
  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
    gsap.registerPlugin(SplitText);
  }, []);

  // SplitText animation for Hero title/subtitle
  useGSAP(
    () => {
      SplitText.create(".hero-split-text", {
        type: "words,lines",
        linesClass: "line",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
          gsap.from(self.lines, {
            duration: 1.5,
            yPercent: 100,
            opacity: 0,
            stagger: 0.05,
            ease: "power4.out",
          });
        },
      });
    },
    { scope: sectionRef }
  );

  // Handle AI generation simulation
  const handleAiGenerate = () => {
    if (aiGenerating) return;
    setAiGenerating(true);
    setAiResult("");

    setTimeout(() => {
      const input = aiPrompt.toLowerCase();
      let outputText = tp("demo.ai.defaultDraft");
      
      if (input.includes("matcha") || input.includes("coffee") || input.includes("kopi") || input.includes("starbucks")) {
        outputText = "☕ Starting the day with a creamy Matcha Latte! 🍵 Buy 1 Get 1 free at our Nusantara outlet this morning. Tag your coffee buddy below! 👇✨ #CoffeePromo #MatchaLovers #StarbucksVibe";
      } else if (input.includes("sale") || input.includes("promo") || input.includes("diskon")) {
        outputText = "🛍️ WEEKEND SALE IS LIVE! Get 40% OFF all items. Free shipping on orders over $50. Limited stock — grab your favorites today! 🚚💨 #WeekendSale #ShopLocal #DiskonGede";
      } else if (input.includes("healthy") || input.includes("diet") || input.includes("sehat")) {
        outputText = "🌱 Small daily habits make the biggest difference. Focus on whole foods, clean ingredients, and daily movement. 🥗 Read our bio for our simple beginner guide! #HealthyLiving #DietPlan #SelfCare";
      }

      setAiGenerating(false);

      // Simple character typing effect
      let charIdx = 0;
      const timer = setInterval(() => {
        setAiResult((prev) => prev + outputText.charAt(charIdx));
        charIdx++;
        if (charIdx >= outputText.length) {
          clearInterval(timer);
        }
      }, 15);
    }, 1500);
  };

  const handleCopyAiResult = () => {
    if (!aiResult) return;
    navigator.clipboard.writeText(aiResult);
    setAiCopied(true);
    setTimeout(() => setAiCopied(false), 2000);
  };

  // Toggle scheduler slot
  const togglePlannerSlot = (id: number) => {
    setPlannerSlots((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, scheduled: !slot.scheduled } : slot
      )
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      <Header />

      {/* Modern Gradient Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(244, 249, 234, 0.4) 100%)",
        }}
      />

      {/* Fine-grained noise layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02] z-0"
        style={{
          backgroundImage: "url('/images/hero-swatch.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
        }}
      />

      <main ref={sectionRef} className="relative z-10 flex-1 pt-32 pb-24">
        {/* Hero Header */}
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 mb-20">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#1E280E] sm:text-5xl lg:text-[3.5rem] leading-tight">
              {tp("title")}
            </h1>
            <p className="hero-split-text mt-6 text-lg text-[#535862] leading-relaxed">
              {tp("subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Bento grid section */}
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 mb-32">
          <div className="grid grid-cols-1 gap-4 lg:auto-rows-fr lg:grid-cols-2 lg:grid-rows-2 lg:gap-6">
            {features.map((feat) => {
              let illustration: React.ReactNode = undefined;
              if (feat.id === "ai") {
                illustration = <AiContentIllustration />;
              } else if (feat.id === "seo") {
                illustration = <SeoAnalyzerIllustration />;
              } else if (feat.id === "perencana") {
                illustration = <ContentPlannerIllustration />;
              }

              const isFeatured = feat.featured;
              const badgeText = feat.comingSoon ? t("comingSoon") : t("availableNow");

              return (
                <BentoFeatureCard
                  key={feat.id}
                  href={`/features/${feat.routeId}`}
                  icon={feat.icon}
                  title={t(`items.${feat.id}.title`)}
                  description={t(`items.${feat.id}.description`)}
                  badge={badgeText}
                  illustration={illustration}
                  featured={isFeatured}
                  highlight={feat.id === "ai"}
                  className={isFeatured ? "lg:row-span-2" : undefined}
                />
              );
            })}
          </div>

          {/* Secondary modules, each with its own detail page. */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-6 lg:gap-6">
            {EXTRA_FEATURE_IDS.map((id) => (
              <BentoFeatureCard
                key={id}
                href={`/features/${EXTRA_FEATURE_ROUTES[id]}`}
                icon={EXTRA_FEATURE_ICONS[id]}
                title={t(`items.${id}.title`)}
                description={t(`items.${id}.description`)}
                badge={t("availableNow")}
              />
            ))}
          </div>
        </div>

        {/* Why Modern Brands Choose Optimark (Benefits) */}
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#1E280E] sm:text-4xl">
              {tp("benefits.title")}
            </h2>
            <p className="mt-4 text-base text-[#535862]">
              {tp("benefits.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="rounded-3xl border border-gray-200 bg-white/60 backdrop-blur-sm p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5">
              <div className="h-12 w-12 rounded-2xl bg-[#94C748]/10 text-[#94C748] flex items-center justify-center border border-[#94C748]/20">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E280E]">
                  {tp("benefits.items.0.title")}
                </h3>
                <p className="mt-2 text-sm text-[#535862] leading-relaxed">
                  {tp("benefits.items.0.description")}
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="rounded-3xl border border-gray-200 bg-white/60 backdrop-blur-sm p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5">
              <div className="h-12 w-12 rounded-2xl bg-[#94C748]/10 text-[#94C748] flex items-center justify-center border border-[#94C748]/20">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E280E]">
                  {tp("benefits.items.1.title")}
                </h3>
                <p className="mt-2 text-sm text-[#535862] leading-relaxed">
                  {tp("benefits.items.1.description")}
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="rounded-3xl border border-gray-200 bg-white/60 backdrop-blur-sm p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5">
              <div className="h-12 w-12 rounded-2xl bg-[#94C748]/10 text-[#94C748] flex items-center justify-center border border-[#94C748]/20">
                <Layers className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E280E]">
                  {tp("benefits.items.2.title")}
                </h3>
                <p className="mt-2 text-sm text-[#535862] leading-relaxed">
                  {tp("benefits.items.2.description")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Workspace Simulator */}
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 mb-32 relative">
          {/* Subtle decoration dots */}
          <div className="absolute left-10 -top-10 pointer-events-none opacity-20 hidden lg:block">
            <InteractiveDotGrid
              dotSize={1}
              dotGap={20}
              gridWidth={300}
              gridHeight={300}
            />
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D444F1]/10 px-3.5 py-1.5 text-[11px] font-bold text-[#D444F1] border border-[#D444F1]/20">
              {tp("demo.title")}
            </span>
            <h2 className="mt-4 text-3xl font-black text-[#1E280E] sm:text-4xl">
              Test-Drive the Optimark Engine
            </h2>
            <p className="mt-4 text-base text-[#535862]">
              {tp("demo.subtitle")}
            </p>
          </div>

          {/* Glassmorphic Workspace Simulator Container */}
          <div className="rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden flex flex-col">
            {/* Tabs Bar */}
            <div className="border-b border-gray-100 bg-gray-50/50 p-2.5 flex items-center justify-center sm:justify-start gap-1">
              {[
                { id: "ai", label: tp("demo.tabs.ai"), icon: Sparkles },
                { id: "planner", label: tp("demo.tabs.planner"), icon: Calendar },
                { id: "seo", label: tp("demo.tabs.seo"), icon: BarChart3 },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "ai" | "planner" | "seo")}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-white text-[#D444F1] shadow-sm border border-gray-100"
                        : "text-[#535862] hover:bg-gray-100/60"
                    }`}
                  >
                    <tab.icon className={`h-3.5 w-3.5 ${isActive ? "text-[#D444F1]" : "text-gray-400"}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content area */}
            <div className="p-6 sm:p-8 min-h-[420px] bg-white flex flex-col justify-stretch">
              <AnimatePresence mode="wait">
                {activeTab === "ai" && (
                  <motion.div
                    key="ai-tab"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
                  >
                    {/* Prompt input side */}
                    <div className="flex flex-col justify-between gap-6">
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          {tp("demo.ai.promptLabel")}
                        </label>
                        <textarea
                          rows={4}
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder={tp("demo.ai.placeholder")}
                          className="w-full rounded-2xl border border-gray-200 p-4 text-sm text-[#1E280E] focus:outline-none focus:ring-2 focus:ring-[#D444F1]/30 focus:border-[#D444F1] resize-none bg-gray-50/20"
                        />
                        <div className="flex gap-1.5 flex-wrap">
                          <button
                            onClick={() => setAiPrompt("Coffee shop discount morning matcha latte")}
                            className="text-[10px] bg-[#94C748]/10 text-[#535862] px-2.5 py-1 rounded-full font-medium border border-[#94C748]/20 hover:bg-[#94C748]/20 transition-colors"
                          >
                            💡 Coffee Promo
                          </button>
                          <button
                            onClick={() => setAiPrompt("Weekend sale clothing store 40% OFF")}
                            className="text-[10px] bg-[#94C748]/10 text-[#535862] px-2.5 py-1 rounded-full font-medium border border-[#94C748]/20 hover:bg-[#94C748]/20 transition-colors"
                          >
                            🛍️ Weekend Sale
                          </button>
                          <button
                            onClick={() => setAiPrompt("Tips for a healthy diet food habit")}
                            className="text-[10px] bg-[#94C748]/10 text-[#535862] px-2.5 py-1 rounded-full font-medium border border-[#94C748]/20 hover:bg-[#94C748]/20 transition-colors"
                          >
                            🥗 Healthy Lifestyle
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleAiGenerate}
                        disabled={aiGenerating || !aiPrompt.trim()}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#D444F1] hover:bg-[#b030c7] text-white py-4 font-bold text-sm shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Sparkles className="h-4 w-4" />
                        {aiGenerating ? tp("demo.ai.generating") : tp("demo.ai.button")}
                      </button>
                    </div>

                    {/* Preview phone mock side */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 flex flex-col gap-4 relative shadow-inner overflow-hidden min-h-[300px]">
                      <div className="flex items-center justify-between border-b border-gray-200/50 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-400" />
                          <div className="h-2 w-2 rounded-full bg-amber-400" />
                          <div className="h-2 w-2 rounded-full bg-green-400" />
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">instagram_feed_preview</span>
                      </div>

                      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col gap-3 flex-1 justify-between">
                        {/* Feed header */}
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-[#D444F1]/15 text-[#D444F1] flex items-center justify-center font-bold text-[10px]">
                            O
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-gray-700">optimark.brand</div>
                            <div className="text-[8px] text-gray-400">Sponsored</div>
                          </div>
                        </div>

                        {/* Simulated post image */}
                        <div className="h-24 bg-gradient-to-tr from-[#D444F1]/10 via-[#94C748]/10 to-indigo-50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-100 relative">
                          <Sparkles className="h-6 w-6 text-[#D444F1] animate-pulse" />
                        </div>

                        {/* Typed Caption Text Area */}
                        <div className="flex-1 flex flex-col gap-1 min-h-[60px]">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                            {tp("demo.ai.responseLabel")}
                          </span>
                          <div className="text-[11px] text-[#1E280E] font-medium leading-normal break-words whitespace-pre-line font-mono bg-gray-50/50 p-2.5 rounded border border-gray-100 flex-1 overflow-y-auto">
                            {aiResult ? (
                              <>
                                {aiResult}
                                <span className="inline-block w-1 h-3 bg-[#D444F1] animate-pulse ml-0.5" />
                              </>
                            ) : (
                              <span className="text-gray-400 italic">Generated caption will type out here...</span>
                            )}
                          </div>
                        </div>

                        {/* Copy draft button */}
                        {aiResult && (
                          <button
                            onClick={handleCopyAiResult}
                            className="bg-[#D444F1]/10 hover:bg-[#D444F1]/20 border border-[#D444F1]/20 text-[#D444F1] py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
                          >
                            <Copy className="h-3 w-3" />
                            {aiCopied ? tp("demo.ai.copied") : tp("demo.ai.copyButton")}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "planner" && (
                  <motion.div
                    key="planner-tab"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 items-stretch"
                  >
                    {/* Instructions side */}
                    <div className="flex flex-col justify-between gap-6">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-[#1E280E]">
                          {tp("demo.planner.title")}
                        </h3>
                        <p className="text-sm text-[#535862] leading-relaxed">
                          {tp("demo.planner.subtitle")}
                        </p>

                        <div className="rounded-xl border border-[#94C748]/20 bg-[#94C748]/5 p-4 flex gap-3 text-xs text-[#1E280E] font-medium items-center">
                          <CheckCircle2 className="h-5 w-5 text-[#94C748] shrink-0" />
                          <span>Interactive Demo: Click any slot to toggle the publish state on our simulated calendar queue.</span>
                        </div>
                      </div>

                      {/* Summary indicator */}
                      <div className="rounded-xl bg-gray-50 p-4 border border-gray-200 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-gray-400">Total Scheduled</div>
                          <div className="text-2xl font-black text-[#1E280E] mt-1">
                            {plannerSlots.filter((s) => s.scheduled).length} Posts
                          </div>
                        </div>
                        <div className="h-8 w-px bg-gray-200" />
                        <div>
                          <div className="text-[10px] uppercase font-bold text-gray-400">Draft Status</div>
                          <div className="text-2xl font-black text-gray-400 mt-1">
                            {plannerSlots.filter((s) => !s.scheduled).length} Drafts
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Calendar grid side */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 flex flex-col gap-3 min-h-[300px]">
                      <div className="flex justify-between items-center text-xs font-bold text-gray-400 border-b border-gray-200 pb-2 px-1">
                        <span className="w-16">{tp("demo.planner.time")}</span>
                        <span className="flex-1">{tp("demo.planner.post")}</span>
                        <span>{tp("demo.planner.status")}</span>
                      </div>

                      <div className="flex-1 flex flex-col gap-2 overflow-y-auto max-h-[300px]">
                        {plannerSlots.map((slot) => (
                          <div
                            key={slot.id}
                            onClick={() => togglePlannerSlot(slot.id)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs cursor-pointer select-none transition-all duration-200 active:scale-[0.99] ${
                              slot.scheduled
                                ? "bg-[#94C748]/10 border-[#94C748]/40 hover:bg-[#94C748]/20"
                                : "bg-white border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {/* Day and time column */}
                            <div className="w-16 flex flex-col gap-0.5">
                              <span className="font-extrabold text-[#1E280E]">{slot.day}</span>
                              <span className="text-[10px] text-gray-400 font-medium">{slot.time}</span>
                            </div>

                            {/* Title column */}
                            <div className="flex-1 font-bold text-[#1E280E] px-2 truncate">
                              {slot.title}
                            </div>

                            {/* Status label column */}
                            <div>
                              {slot.scheduled ? (
                                <span className="inline-flex items-center gap-1 bg-[#94C748] text-white px-2 py-0.5 rounded-full text-[9px] font-bold shadow-sm">
                                  <Check className="h-2 w-2" />
                                  {tp("demo.planner.scheduled")}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full text-[9px] font-bold border border-gray-200">
                                  <Clock className="h-2 w-2" />
                                  {tp("demo.planner.draft")}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "seo" && (
                  <motion.div
                    key="seo-tab"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
                  >
                    {/* Editing Form panel */}
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                          <Search className="h-3 w-3" />
                          {tp("demo.seo.keywordLabel")}
                        </label>
                        <input
                          type="text"
                          value={seoKeyword}
                          onChange={(e) => setSeoKeyword(e.target.value)}
                          placeholder={tp("demo.seo.keywordPlaceholder")}
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-[#1E280E] focus:outline-none focus:ring-2 focus:ring-[#D444F1]/30 focus:border-[#D444F1]"
                        />
                      </div>

                      <div className="flex-1 flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          {tp("demo.seo.contentLabel")}
                        </label>
                        <textarea
                          rows={6}
                          value={seoContent}
                          onChange={(e) => setSeoContent(e.target.value)}
                          placeholder={tp("demo.seo.contentPlaceholder")}
                          className="w-full rounded-2xl border border-gray-200 p-4 text-xs font-semibold text-[#1E280E] focus:outline-none focus:ring-2 focus:ring-[#D444F1]/30 focus:border-[#D444F1] flex-1 resize-none font-mono"
                        />
                      </div>
                    </div>

                    {/* Quality score and metrics dashboard */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 sm:p-6 flex flex-col gap-6 items-stretch justify-between shadow-inner">
                      {/* Metric header details */}
                      <div className="flex items-center gap-6">
                        {/* Circular score gauge */}
                        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              className="stroke-gray-200"
                              strokeWidth="6"
                              fill="transparent"
                            />
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              className="transition-all duration-300 stroke-[#D444F1]"
                              strokeWidth="6"
                              fill="transparent"
                              strokeDasharray={2 * Math.PI * 40}
                              strokeDashoffset={
                                2 * Math.PI * 40 * (1 - seoMetrics.score / 100)
                              }
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-xl font-black text-[#1E280E]">
                              {seoMetrics.score}%
                            </span>
                            <span className="text-[7px] text-gray-400 uppercase font-black">
                              {tp("demo.seo.scoreLabel")}
                            </span>
                          </div>
                        </div>

                        {/* Readability word details */}
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col justify-center">
                            <span className="text-[8px] font-bold text-gray-400 uppercase">Words</span>
                            <span className="text-base font-extrabold text-[#1E280E]">
                              {seoMetrics.wordCount}
                            </span>
                          </div>
                          <div className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col justify-center">
                            <span className="text-[8px] font-bold text-gray-400 uppercase">Density</span>
                            <span className="text-base font-extrabold text-[#1E280E]">
                              {seoMetrics.density.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Checklist details */}
                      <div className="flex-1 flex flex-col gap-3 mt-4 border-t border-gray-200/50 pt-4">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                          {tp("demo.seo.tips.title")}
                        </span>

                        <div className="flex flex-col gap-2 text-xs font-semibold">
                          {/* Rule 1: Word Count */}
                          <div className="flex items-center gap-2">
                            {seoMetrics.wordCount >= 30 ? (
                              <CheckCircle2 className="h-4 w-4 text-[#94C748] shrink-0" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                            )}
                            <span className={seoMetrics.wordCount >= 30 ? "text-gray-700" : "text-gray-400"}>
                              {tp("demo.seo.tips.length")}
                            </span>
                          </div>

                          {/* Rule 2: Keyword present */}
                          <div className="flex items-center gap-2">
                            {seoMetrics.kwCount > 0 ? (
                              <CheckCircle2 className="h-4 w-4 text-[#94C748] shrink-0" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                            )}
                            <span className={seoMetrics.kwCount > 0 ? "text-gray-700" : "text-gray-400"}>
                              {tp("demo.seo.tips.keywordMissing")}
                            </span>
                          </div>

                          {/* Rule 3: Density rule */}
                          <div className="flex items-center gap-2">
                            {seoMetrics.density >= 1 && seoMetrics.density <= 3 ? (
                              <CheckCircle2 className="h-4 w-4 text-[#94C748] shrink-0" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                            )}
                            <span className={seoMetrics.density >= 1 && seoMetrics.density <= 3 ? "text-gray-700" : "text-gray-400"}>
                              {tp("demo.seo.tips.keywordDensity")}
                            </span>
                          </div>

                          {/* Rule 4: Headings rule */}
                          <div className="flex items-center gap-2">
                            {seoMetrics.hasHeadings ? (
                              <CheckCircle2 className="h-4 w-4 text-[#94C748] shrink-0" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                            )}
                            <span className={seoMetrics.hasHeadings ? "text-gray-700" : "text-gray-400"}>
                              {tp("demo.seo.tips.headings")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Integration icons section */}
        <ConnectSection />

        {/* FAQ list */}
        <FaqSection />

        {/* Action funnel banner */}
        <CtaSection />
      </main>

      <Footer />
      <ScrollUpButton threshold={SCROLL_UP_THRESHOLD} />
    </div>
  );
}
