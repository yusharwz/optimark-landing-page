import { Sparkles, X } from "lucide-react";

type CaptionHeaderProps = {
  title?: string;
};

/** Modal top bar: AI sparkle + title on the left, close affordance on the right. */
export function CaptionHeader({ title = "AI Caption Assistant" }: CaptionHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#E9EAEB] px-5 py-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[#D444F1]" />
        <span className="ai-caption__title text-sm font-semibold text-[#1E280E] sm:text-base">
          {title}
        </span>
      </div>
      <X className="h-5 w-5 text-[#A4A7AE]" />
    </div>
  );
}
