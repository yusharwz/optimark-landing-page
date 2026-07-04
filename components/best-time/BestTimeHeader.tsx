import { useTranslations } from "next-intl";
import { Clock, X } from "lucide-react";

type BestTimeHeaderProps = {
  title?: string;
};

/** Modal top bar: clock icon + title on the left, close affordance on the right. */
export function BestTimeHeader({ title }: BestTimeHeaderProps) {
  const t = useTranslations("bestTimeModal");
  return (
    <div className="flex items-center justify-between border-b border-[#E9EAEB] px-5 py-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-[#D444F1]" />
        <span className="best-time__title text-sm font-semibold text-[#1E280E] sm:text-base">
          {title ?? t("title")}
        </span>
      </div>
      <X className="h-5 w-5 text-[#A4A7AE]" />
    </div>
  );
}
