"use client";

import Image from "next/image";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cx } from "@/utils/cx";

type BentoFeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional pill shown top-right (e.g. "Available now" / "Coming soon"). */
  badge?: string;
  /** Decorative cover image tucked into the top-right corner. */
  coverImage?: string;
  /** Optional React component illustration to show next to the content. */
  illustration?: React.ReactNode;
  /**
   * Media that fills the entire card — the copy is overlaid on top of it behind
   * a scrim. Takes precedence over `illustration` / `coverImage`.
   */
  showcase?: React.ReactNode;
  /** Whether the card is featured (uses a vertical layout instead of grid). */
  featured?: boolean;
  /** When true, paints a subtle green brand-flourish background to draw the eye. */
  highlight?: boolean;
  /** When set, the whole card becomes a link to this route. */
  href?: string;
  /**
   * Label for the in-card CTA. The whole card is already the link, so this
   * renders as a styled `<span>`, never a nested `<a>` — it exists purely to
   * make the card read as clickable. Ignored when there is no `href`.
   */
  ctaLabel?: string;
  className?: string;
};

/**
 * The bento-style feature card used on both the homepage features section and
 * the features page. Pass `href` to make the entire card a locale-aware link.
 */
export function BentoFeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  coverImage,
  illustration,
  showcase,
  featured,
  highlight,
  href,
  ctaLabel,
  className,
}: BentoFeatureCardProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const cardClass = cx(
    "group relative overflow-hidden rounded-3xl border shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
    showcase
      ? "flex min-h-[22rem] flex-col justify-end border-gray-900/10 bg-gray-900 p-0"
      : cx(
          "p-8",
          highlight
            ? "border-brand-200 bg-gradient-to-br from-brand-50/60 via-white to-brand-50/40"
            : "border-gray-200 bg-white",
          featured
            ? "flex flex-col justify-between items-stretch gap-8 h-full"
            : "grid grid-cols-1 gap-8 lg:grid-cols-[65fr_35fr] lg:items-start lg:gap-6",
        ),
    className,
  );

  /**
   * The card as a whole is the link, so the CTA is a styled `<span>`, never an
   * `<a>` — nesting anchors is invalid markup and would split the click target.
   * It exists because a card that only *looks* like a card gives no hint that
   * it navigates anywhere.
   */
  const renderCta = (onDark: boolean) =>
    href && ctaLabel ? (
      <span
        className={cx(
          "mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
          onDark
            ? "bg-white/15 text-white backdrop-blur-sm group-hover:bg-white/25"
            : "bg-brand-500 text-[#1E280E] group-hover:bg-brand-600",
        )}
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    ) : null;

  const showcaseContent = (
    <>
      <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105">
        {showcase}
      </div>
      {/* Scrim: the copy sits on real photography, so it needs its own ground. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-gray-950/90 via-gray-950/55 to-gray-950/10"
      />

      <div className="relative z-20 p-8">
        <div className="mb-3 flex items-center gap-4 lg:block">
          <div className="inline-flex shrink-0 rounded-2xl bg-white/15 p-4 text-white backdrop-blur-sm transition-colors group-hover:bg-white/25 lg:mb-6">
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
        </div>
        <p className="text-base leading-relaxed text-white/80">{description}</p>
        {renderCta(true)}
      </div>
    </>
  );

  const content = (
    <>
      {highlight && (
        // Subtle green flourish blobs that bleed off the card corners.
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-200/25 blur-3xl" />
          <div className="absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-brand-300/20 blur-3xl" />
        </div>
      )}
      {/* Background Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 68, 241, 0.08), transparent 80%)`,
        }}
      />
      {/* Border Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl border border-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60 z-10"
        style={{
          background: `radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 68, 241, 0.4), transparent 40%)`,
          WebkitMaskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: `xor`,
          maskComposite: `exclude`,
          padding: "1px",
        }}
      />

      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-4 lg:block">
          <div className="inline-flex shrink-0 rounded-2xl bg-brand-100 p-4 text-brand-600 transition-colors group-hover:bg-brand-200 lg:mb-6">
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="text-display text-2xl">{title}</h3>
        </div>
        <p className="text-detail text-base">{description}</p>
        {renderCta(false)}
      </div>

      {illustration && (
        <div
          className={cx(
            "relative z-10 transition-all duration-300 group-hover:scale-105 select-none pointer-events-none",
            featured
              ? "w-full flex justify-center mt-auto"
              : "h-full w-full flex items-center justify-center",
          )}
        >
          {illustration}
        </div>
      )}

      {!illustration && coverImage && (
        <div className="relative z-10 h-full min-h-[200px] w-full transition-all duration-300 group-hover:scale-105">
          <Image src={coverImage} alt="" fill className="object-contain" />
        </div>
      )}
    </>
  );

  const body = showcase ? showcaseContent : content;

  if (href) {
    return (
      <Link href={href} className={cx(cardClass, "cursor-pointer")} onMouseMove={handleMouseMove}>
        {body}
      </Link>
    );
  }

  return (
    <div className={cardClass} onMouseMove={handleMouseMove}>
      {body}
    </div>
  );
}
