import type Lenis from "lenis";

/**
 * The single Lenis instance owned by SmoothScrollProvider, exposed so other
 * client code can scroll programmatically without creating a second instance
 * (which would fight the first over the frame loop).
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

/**
 * Smooth-scroll so `target` sits `offset` px below the top of the viewport.
 * Falls back to native scrolling when Lenis is not running (e.g. reduced motion
 * setups or before the provider mounts).
 */
export function scrollToElement(target: HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset: -offset });
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
