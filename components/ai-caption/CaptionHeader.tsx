import { Sparkles, X } from "lucide-react";

type CaptionHeaderProps = {
  title?: string;
};

/** Modal top bar: AI sparkle + title on the left, close affordance on the right. */
export function CaptionHeader({ title = "AI Caption Assistant" }: CaptionHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#E9EAEB] px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <Sparkles className="h-4 w-4 text-[#D444F1]" />
        <span className="ai-caption__title text-xs font-semibold text-[#1E280E] sm:text-sm">
          {title}
        </span>
      </div>
      <X className="h-4 w-4 text-[#A4A7AE]" />
    </div>
  );
}
