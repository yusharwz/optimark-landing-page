"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/use-media-query";
import { BestTimeHeader } from "./BestTimeHeader";
import { KeywordPanel, type AnalyzeStatus } from "./KeywordPanel";
import { TimeResultPanel } from "./TimeResultPanel";
import { type TimeSlot } from "./TimeSlotCard";

export type BestTimeModalProps = {
  className?: string;
  title?: string;
  label?: string;
  keyword?: string;
  tip?: string;
  heading?: string;
  slots?: TimeSlot[];
};

type Phase = "typing" | "loading" | "done";

const TYPE_SPEED = 45; // ms per character
const PAUSE_AFTER_TYPE = 400; // pause after keyword finishes typing
const LOADING_MS = 1300; // fake "analyzing" duration

/**
 * Animated re-creation of the "Best Time to Post" mockup.
 *
 * Sequence (auto-plays on mount; re-runs whenever the component remounts —
 * e.g. each time this slide becomes active in the carousel):
 *   1. typing  — keyword types into the input (typewriter + caret)
 *   2. loading — action button turns into a spinner ("Menganalisa…")
 *   3. done    — the recommendation cards cascade in
 *
 * The slot selection is interactive: the user picks a card (purple highlight),
 * which enables the green "Simpan" button.
 */
export function BestTimeModal({
  className,
  title,
  label,
  keyword,
  tip,
  heading,
  slots,
}: BestTimeModalProps) {
  const t = useTranslations("bestTimeModal");
  const resolvedKeyword = keyword ?? t("keywordText");
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Respect reduced motion: render the finished state instead of animating.
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const effectivePhase: Phase = prefersReducedMotion ? "done" : phase;
  const effectiveTyped = prefersReducedMotion ? resolvedKeyword : typed;

  // Typewriter: append one character at a time, then move to loading.
  useEffect(() => {
    if (prefersReducedMotion || phase !== "typing") return;
    if (typed.length >= resolvedKeyword.length) {
      const timer = setTimeout(() => setPhase("loading"), PAUSE_AFTER_TYPE);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(
      () => setTyped(resolvedKeyword.slice(0, typed.length + 1)),
      TYPE_SPEED,
    );
    return () => clearTimeout(timer);
  }, [phase, typed, resolvedKeyword, prefersReducedMotion]);

  // Loading → done.
  useEffect(() => {
    if (prefersReducedMotion || phase !== "loading") return;
    const timer = setTimeout(() => setPhase("done"), LOADING_MS);
    return () => clearTimeout(timer);
  }, [phase, prefersReducedMotion]);

  const status: AnalyzeStatus =
    effectivePhase === "typing" ? "idle" : effectivePhase === "loading" ? "loading" : "done";

  return (
    <div
      className={`best-time w-full overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white shadow-xl ${
        className ?? ""
      }`}
    >
      <BestTimeHeader title={title} />

      <KeywordPanel
        label={label}
        typedText={effectiveTyped}
        showCaret={effectivePhase === "typing"}
        status={status}
        tip={tip}
      />

      <AnimatePresence initial={false}>
        {effectivePhase !== "typing" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <TimeResultPanel
              heading={heading}
              slots={slots}
              status={effectivePhase === "loading" ? "loading" : "done"}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
