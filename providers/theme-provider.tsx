"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { type PropsWithChildren } from "react";

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    // The site is designed light-only and has no theme toggle, so the theme is
    // forced. Following the OS setting put `.dark-mode` on <html> for dark-OS
    // visitors, which flipped the semantic tokens used by the base components
    // (e.g. the Input background) while hardcoded section colours stayed light.
    <NextThemeProvider
      disableTransitionOnChange
      attribute="class"
      forcedTheme="light"
      value={{ light: "light-mode", dark: "dark-mode" }}
    >
      {children}
    </NextThemeProvider>
  );
}
