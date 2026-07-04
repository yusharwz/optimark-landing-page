"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  /** Render as a different element (default: div). */
  as?: ElementType;
  className?: string;
  /** Stagger direct children instead of animating the wrapper as one unit. */
  stagger?: boolean;
  /** Per-item stagger delay in seconds (only used when stagger is true). */
  staggerAmount?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** ScrollTrigger start position (default: reveal when 85% into viewport). */
  start?: string;
};

const EASE = "power3.out";

/**
 * Scroll-triggered reveal built on GSAP + ScrollTrigger, synced to Lenis via
 * the SmoothScrollProvider. Fades + slides content up as it enters the
 * viewport. Respects prefers-reduced-motion. Set `stagger` to cascade the
 * wrapper's direct children.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  stagger = false,
  staggerAmount = 0.12,
  y = 40,
  duration = 0.8,
  delay = 0,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return; // leave content in its natural, fully-visible state
      }

      const targets = stagger ? Array.from(el.children) : el;

      // fromTo (not from) with explicit clearProps so the final state is the
      // element's natural CSS — content is never left stranded invisible if a
      // refresh recomputes the trigger.
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: EASE,
          clearProps: "opacity,transform",
          stagger: stagger ? staggerAmount : 0,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
