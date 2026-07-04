import { useTranslations } from "next-intl";
import { Loader2, Sparkles } from "lucide-react";

export type AnalyzeStatus = "idle" | "loading" | "done";

type KeywordPanelProps = {
  /** Label above the input. */
  label?: string;
  /** Text currently shown in the input (grows while typing). */
  typedText?: string;
  /** Show the blinking caret (while the typewriter is running). */
  showCaret?: boolean;
  /** Drives the action button + helper text: Analisa / loading / done. */
  status?: AnalyzeStatus;
  tip?: string;
  /** Purple helper shown in place of the tip while analyzing. */
  loadingText?: string;
};

/** Top section: keyword input (typewriter-filled) + "Analisa" button + tip. */
export function KeywordPanel({
  label,
  typedText = "",
  showCaret = false,
  status = "idle",
  tip,
  loadingText,
}: KeywordPanelProps) {
  const t = useTranslations("bestTimeModal");
  const hasText = typedText.length > 0;

  return (
    <div className="p-5">
      <p className="text-sm text-[#535862]">
        {label ?? t("keywordLabel")} <span className="text-[#D92D20]">*</span>
      </p>

      <div className="mt-2 flex items-stretch gap-2">
        <div
          className={`flex min-h-[44px] flex-1 items-center rounded-lg border px-3 py-2 transition-colors ${
            hasText ? "border-[#94C748]" : "border-[#E9EAEB]"
          }`}
        >
          <p
            className="best-time__keyword flex-1 text-sm text-[#1E280E]"
            translate="no"
          >
            <span>{typedText}</span>
            <span
              aria-hidden
              className={`ml-0.5 inline-block h-[1.05em] w-px animate-pulse bg-[#1E280E] align-text-bottom ${
                showCaret ? "" : "invisible"
              }`}
            />
          </p>
        </div>

        {status === "loading" ? (
          <span className="inline-flex min-w-[84px] items-center justify-center rounded-lg border border-[#D5D7DA] bg-white text-[#717680]">
            <Loader2 className="h-4 w-4 animate-spin" />
          </span>
        ) : (
          <button
            type="button"
            className="inline-flex min-w-[84px] items-center justify-center rounded-lg border border-[#D5D7DA] bg-white px-4 text-sm font-semibold text-[#414651] transition hover:bg-gray-50"
          >
            {t("analyze")}
          </button>
        )}
      </div>

      {status === "loading" ? (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#BA24D5]">
          <Sparkles className="h-3.5 w-3.5" />
          {loadingText ?? t("analyzing")}
        </p>
      ) : (
        <p className="mt-2 text-xs leading-relaxed text-[#717680]">{tip ?? t("tip")}</p>
      )}
    </div>
  );
}
