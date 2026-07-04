import { Loader2, SlidersHorizontal, Sparkles } from "lucide-react";

export type PromptStatus = "idle" | "loading" | "done";

type PromptPanelProps = {
  /** Text currently shown in the input (grows while typing). */
  typedText?: string;
  /** Show the blinking caret (while the typewriter is running). */
  showCaret?: boolean;
  /** Drives the action button: Generate / loading / Generate Ulang. */
  status?: PromptStatus;
  tip?: string;
};

/** Left column: prompt input (typewriter-filled) + action button + tip. */
export function PromptPanel({
  typedText = "",
  showCaret = false,
  status = "idle",
  tip = "Tips: Makin detail promptnya, makin bagus hasilnya. Coba sebutkan jenis konten, manfaat produk, dan siapa target audiensnya.",
}: PromptPanelProps) {
  return (
    <div className="p-5">
      <p className="text-sm text-[#535862]">Prompt</p>

      <div className="mt-3 flex min-h-[180px] flex-col rounded-xl border border-[#E9EAEB] p-3">
        <p
          className="ai-caption__prompt flex-1 text-sm text-[#1E280E]"
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

        <div className="mt-3 flex items-center justify-between">
          <SlidersHorizontal className="h-4 w-4 text-[#A4A7AE]" />

          {status === "loading" ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5D7DA] bg-white px-3 py-2 text-xs font-semibold text-[#717680]">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Membuat…
            </span>
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5D7DA] bg-white px-3 py-2 text-xs font-semibold text-[#414651] transition hover:bg-gray-50"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#BA24D5]" />
              {status === "done" ? "Generate Ulang" : "Generate"}
            </button>
          )}
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-[#717680]">{tip}</p>
    </div>
  );
}
