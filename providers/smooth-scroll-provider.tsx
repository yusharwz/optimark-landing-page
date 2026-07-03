"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Keep ScrollTrigger's cached scroll position in sync with Lenis so
    // scroll-driven animations line up with the smoothed scroll.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker instead of a standalone rAF loop. This
    // guarantees a single, frame-synced update pass for both libraries.
    const update = (time: number) => {
      lenis.raf(time * 1000); // gsap ticker time is in seconds; Lenis wants ms
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Reveal triggers are created by child components before this provider's
    // effect runs, and layout is still settling (fonts, hero image). Recompute
    // all trigger positions now and again on window load so nothing stays
    // stranded at its start (invisible) state. (ScrollTrigger auto-refreshes
    // on resize.)
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // On client-side navigation Lenis keeps its scroll position, so a new page
  // can open scrolled to the bottom. Jump Lenis back to the top on every route
  // change, then recompute ScrollTrigger for the new page's content.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
