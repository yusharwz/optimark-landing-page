"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { resolveLocale } from "@/lib/locale";
import { getSeoFaq, type SeoFaqKey } from "@/config/seo-faq";
import { Play } from "lucide-react";
import { cx } from "@/utils/cx";

interface SeoFaqSectionProps {
  pageKey: SeoFaqKey;
  className?: string;
  containerClassName?: string;
}

export function SeoFaqSection({ pageKey, className, containerClassName }: SeoFaqSectionProps) {
  const rawLocale = useLocale();
  const locale = resolveLocale(rawLocale);
  const faqData = getSeoFaq(pageKey, locale);

  // User memory preference: UI accordion: card tebal, cursor pointer, default 1 open (index 0)
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

  if (!faqData || faqData.items.length === 0) {
    return null;
  }

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  // Structured Data (JSON-LD FAQPage for Google Search Rich Snippets)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      aria-labelledby={`faq-heading-${pageKey}`}
      className={cx("relative w-full py-16 sm:py-20", className)}
    >
      {/* Schema.org FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className={cx("mx-auto max-w-7xl px-4 sm:px-6 md:px-8", containerClassName)}>
        {/* Accordion Card Tebal per memory rule */}
        <div className="rounded-2xl sm:rounded-3xl border-2 border-[#E2E8F0] bg-white p-6 sm:p-10 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          {/* Section Heading (H2) */}
          <h2
            id={`faq-heading-${pageKey}`}
            className="text-2xl sm:text-3xl lg:text-[2rem] font-bold tracking-tight text-[#1E280E] mb-8 leading-snug"
          >
            {faqData.title}
          </h2>

          {/* Accordion Item Rows */}
          <div className="divide-y divide-[#E2E8F0] border-t border-[#E2E8F0]">
            {faqData.items.map((item, index) => {
              const isOpen = openIndices.has(index);
              const triggerId = `faq-trigger-${pageKey}-${index}`;
              const panelId = `faq-panel-${pageKey}-${index}`;

              return (
                <div key={index} className="py-2 first:pt-0 last:pb-0">
                  {/* Trigger Header with H3 & Cursor Pointer */}
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleIndex(index)}
                    className="group flex w-full items-start gap-3.5 py-4 text-left cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318] focus-visible:ring-offset-2 rounded-lg"
                  >
                    {/* Left Rotating Triangle Icon (▶) matching Mekari reference */}
                    <span
                      aria-hidden="true"
                      className="mt-1 flex size-4 shrink-0 items-center justify-center text-[#94A3B8] transition-colors group-hover:text-[#5BB318]"
                    >
                      <Play
                        className={cx(
                          "size-3 fill-current transition-transform duration-200",
                          isOpen ? "rotate-90 text-[#5BB318]" : "text-[#94A3B8]",
                        )}
                      />
                    </span>

                    {/* Semantic H3 for SEO Keyword Relevance */}
                    <h3 className="text-base sm:text-lg font-semibold text-[#1E293B] group-hover:text-[#1E280E] transition-colors leading-snug flex-1">
                      {item.question}
                    </h3>
                  </button>

                  {/* Expandable Answer Panel */}
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className="pl-7 sm:pl-8 pr-2 pb-5 pt-1 text-sm sm:text-base leading-relaxed text-[#535862] animate-in fade-in-50 duration-200"
                    >
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
