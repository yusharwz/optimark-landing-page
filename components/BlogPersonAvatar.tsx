import Image from "next/image";
import {
  BLOG_PERSON_PHOTOS,
  initialsOf,
  type BlogAuthorId,
  type BlogReviewerId,
} from "@/config/blog";
import { cx } from "@/utils/cx";
import { normalizeMediaUrl } from "@/lib/cms";

const SIZES = {
  xs: "h-6 w-6 text-[0.5625rem]",
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-28 w-28 text-3xl sm:h-32 sm:w-32",
} as const;

const PIXELS: Record<keyof typeof SIZES, number> = { xs: 24, sm: 36, md: 48, lg: 64, xl: 128 };

export function BlogPersonAvatar({
  id,
  name,
  avatarUrl,
  size = "md",
  kind = "author",
  className,
}: {
  id?: BlogAuthorId | BlogReviewerId | string;
  name: string;
  avatarUrl?: string | null;
  size?: keyof typeof SIZES;
  kind?: "author" | "reviewer";
  className?: string;
}) {
  const rawPhoto =
    avatarUrl ||
    (id && id in BLOG_PERSON_PHOTOS
      ? BLOG_PERSON_PHOTOS[id as keyof typeof BLOG_PERSON_PHOTOS]
      : undefined);
  const photo = rawPhoto ? normalizeMediaUrl(rawPhoto) : undefined;

  return (
    <span
      aria-hidden
      className={cx(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold tracking-wide ring-4 ring-white",
        photo
          ? "bg-gray-100 outline outline-[0.5px] -outline-offset-[0.5px] outline-black/8"
          : kind === "reviewer"
            ? "bg-[#1E280E] text-[#C7E59A]"
            : "bg-[#94C748]/15 text-[#3F5B17]",
        SIZES[size],
        className,
      )}
    >
      {photo ? (
        <Image src={photo} alt={name || "Foto profil kontributor Optimark"} fill sizes={`${PIXELS[size]}px`} className="object-cover" />
      ) : (
        initialsOf(name)
      )}
    </span>
  );
}
