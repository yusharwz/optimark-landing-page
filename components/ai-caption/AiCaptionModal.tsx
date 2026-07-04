"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CaptionHeader } from "./CaptionHeader";
import { PromptPanel, type PromptStatus } from "./PromptPanel";
import { ResultPanel } from "./ResultPanel";

export type AiCaptionModalProps = {
  className?: string;
  title?: string;
  prompt?: string;
  tip?: string;
  lines?: string[];
  hashtags?: string;
};

type Phase = "typing" | "loading" | "done";

const TYPE_SPEED = 45; // ms per character
const PAUSE_AFTER_TYPE = 400; // pause after prompt finishes typing
const LOADING_MS = 1300; // fake "generating" duration

/**
 * Animated re-creation of the "AI Caption Assistant" mockup.
 *
 * Sequence (auto-plays on mount; re-runs whenever the component remounts —
 * e.g. each time this slide becomes active in the carousel):
 *   1. typing  — prompt types into the input (typewriter + caret)
 *   2. loading — action button turns into a spinner ("Membuat…")
 *   3. done    — right panel content + icons cascade in, button becomes
 *                "Generate Ulang", and "Terapkan" enables
 */
export function AiCaptionModal({
  className,
  title,
  prompt,
  tip,
  lines,
  hashtags,
}: AiCaptionModalProps) {
  const t = useTranslations("aiCaptionModal");
  const resolvedPrompt = prompt ?? t("promptText");
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState("");

  // Respect reduced motion: jump straight to the finished state.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(resolvedPrompt);
      setPhase("done");
    }
  }, [resolvedPrompt]);

  // Typewriter: append one character at a time, then move to loading.
  useEffect(() => {
    if (phase !== "typing") return;
    if (typed.length >= resolvedPrompt.length) {
      const timer = setTimeout(() => setPhase("loading"), PAUSE_AFTER_TYPE);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(
      () => setTyped(resolvedPrompt.slice(0, typed.length + 1)),
      TYPE_SPEED,
    );
    return () => clearTimeout(timer);
  }, [phase, typed, resolvedPrompt]);

  // Loading → done.
  useEffect(() => {
    if (phase !== "loading") return;
    const timer = setTimeout(() => setPhase("done"), LOADING_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  const status: PromptStatus =
    phase === "typing" ? "idle" : phase === "loading" ? "loading" : "done";

  return (
    <div
      className={`ai-caption w-full overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white shadow-xl ${
        className ?? ""
      }`}
    >
      <CaptionHeader title={title} />
      <div className="grid divide-y divide-[#E9EAEB] md:grid-cols-2 md:divide-x md:divide-y-0">
        <PromptPanel
          typedText={typed}
          showCaret={phase === "typing"}
          status={status}
          tip={tip}
        />
        <ResultPanel lines={lines} hashtags={hashtags} revealed={phase === "done"} />
      </div>
    </div>
  );
}
