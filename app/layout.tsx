import type { ReactNode } from "react";

// The <html> and <body> tags are rendered by app/[locale]/layout.tsx (which
// owns lang, fonts, and the smooth-scroll class). This root layout must not
// render them too, or the page ends up with nested html/body and a hydration
// mismatch. It simply passes children through.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
