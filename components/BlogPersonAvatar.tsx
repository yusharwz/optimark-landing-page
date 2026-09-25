import { initialsOf } from "@/config/blog";
import { cx } from "@/utils/cx";

const SIZES = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-28 w-28 text-3xl sm:h-32 sm:w-32",
} as const;

/**
 * Initials avatar for authors and reviewers. Profiles carry no photos yet, and
 * a generated stand-in face would misrepresent a real person, so this shows
 * initials on a brand tint instead. Swap for `next/image` once real headshots
 * exist.
 */
export function BlogPersonAvatar({
  name,
  size = "md",
  kind = "author",
  className,
}: {
  name: string;
  size?: keyof typeof SIZES;
  kind?: "author" | "reviewer";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cx(
        "flex shrink-0 items-center justify-center rounded-full font-semibold tracking-wide ring-4 ring-white",
        kind === "reviewer" ? "bg-[#1E280E] text-[#C7E59A]" : "bg-[#94C748]/15 text-[#3F5B17]",
        SIZES[size],
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
