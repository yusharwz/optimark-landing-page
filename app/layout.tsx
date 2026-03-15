import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { RouteProvider } from "@/providers/route-provider";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OPTIMARK - Platform All-in-One Digital Marketing",
  description:
    "Semua tools digital marketing dalam satu platform. Jadwalkan konten, tingkatkan visibilitas SEO, optimalkan iklan, dan buat konten lebih cepat dengan bantuan AI.",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", rel: "icon" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "manifest",
        url: "/favicon/site.webmanifest",
      },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} font-sans antialiased smooth-scroll`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <RouteProvider>{children}</RouteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
