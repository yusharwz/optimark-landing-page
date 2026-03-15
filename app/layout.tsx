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
