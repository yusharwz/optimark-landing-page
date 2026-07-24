"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook built on useSyncExternalStore. Returns
 * `serverFallback` during server rendering / hydration so the first client
 * render matches the server markup, then re-renders with the real result
 * (and again whenever the query result changes).
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}
