import { cx } from "@/utils/cx";

export interface FeatureBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function FeatureBadge({ children, className }: FeatureBadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex w-fit items-center justify-center gap-2 rounded-full",
        "bg-[#FAFAFA] px-2 py-[2px]",
        "border border-[#E9EAEB]",
        "text-[12px] font-medium leading-[1.5em] text-[#535862]",
        className,
      )}
    >
      {children}
    </span>
  );
}
