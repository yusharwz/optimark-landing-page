import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToElement(target: HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset: -offset });
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
