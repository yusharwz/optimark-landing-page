"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Mail, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/config/site";

export function FaqSection() {
  const t = useTranslations("faq");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = [
    {
      q: t("items.q1"),
      a: t("items.a1"),
    },
    {
      q: t("items.q2"),
      a: t("items.a2"),
    },
    {
      q: t("items.q3"),
      a: t("items.a3"),
    },
    {
      q: t("items.q4"),
      a: t("items.a4"),
    },
    {
      q: t("items.q5"),
      a: t("items.a5"),
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden px-6 py-20 sm:px-12 lg:px-24 lg:py-28 bg-[#FCFDF9]/20"
      style={{
        // Match the organic feel with very subtle grid backdrop
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.98)), url('/images/hero-swatch.png')",
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "cover, 450px 450px",
      }}
    >
      {/* Decorative green blur */}
      <div className="pointer-events-none absolute -bottom-40 right-10 -z-10 h-96 w-96 rounded-full bg-[#94C748]/5 blur-3xl" />
      <div className="pointer-events-none absolute top-10 left-10 -z-10 h-96 w-96 rounded-full bg-[#94C748]/5 blur-3xl" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Two-Column split layout for premium enterprise design */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
          
          {/* Left Column: Heading & Support Block */}
          <Reveal className="space-y-6 lg:sticky lg:top-28 self-start">
            <h2 className="text-display text-4xl sm:text-5xl lg:text-[3rem] leading-[1.1] text-left">
              {t("title")}
            </h2>
            <p className="text-lead text-base sm:text-lg text-left max-w-md">
              {t("subtitle")}
            </p>

            {/* Support contact card box */}
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xs flex flex-col gap-4 shadow-xs max-w-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#94C748]/10 text-[#94C748]">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-sm">{t("support.title")}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t("support.description")}
                </p>
              </div>
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="inline-flex items-center justify-center gap-1.5 bg-[#94C748] hover:bg-[#94C748]/90 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors w-fit group"
              >
                {t("support.cta")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          {/* Right Column: Minimalist Accordion Stack with borders */}
          <Reveal className="divide-y divide-slate-100">
            {faqItems.map((item, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <div
                  key={idx}
                  className="py-5 first:pt-0 last:pb-0"
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(idx)}
                    className="flex w-full items-center justify-between py-3 text-left focus:outline-hidden group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-semibold text-base sm:text-lg transition-colors duration-300 pr-4 ${
                        isOpen ? "text-[#94C748]" : "text-[#1E280E] group-hover:text-[#94C748]"
                      }`}
                    >
                      {item.q}
                    </span>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-[#94C748] bg-[#94C748]/10 text-[#94C748] rotate-180"
                          : "border-slate-200 bg-white text-slate-500 group-hover:border-[#94C748]/50 group-hover:text-[#94C748]"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-2 text-sm text-[#535862] sm:text-base leading-relaxed max-w-2xl pr-4">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
