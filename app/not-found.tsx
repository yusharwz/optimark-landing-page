import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan | Optimark",
  description:
    "Halaman yang Anda tuju tidak ditemukan. Kembali ke beranda Optimark untuk menjelajahi platform otomasi konten dan pemasaran AI terdepan.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootNotFound() {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#F4FAF3] px-4 py-8 font-sans antialiased md:px-8">
        <main className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-2xl sm:rounded-3xl border border-[#DCEBD9] bg-white shadow-[0_12px_40px_rgba(78,159,21,0.08)]">
          {/* Top-Right Language Switcher */}
          <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-[#D5E7D1] bg-white/90 px-3 py-1 text-xs font-medium shadow-xs backdrop-blur-xs sm:right-6 sm:top-6">
            <Link
              href="/"
              className="rounded-full px-2 py-0.5 font-bold text-[#1E280E] hover:text-[#5BB318] focus-visible:outline-none"
            >
              ID
            </Link>
            <span className="text-[#D5E7D1]">|</span>
            <Link
              href="/en"
              className="rounded-full px-2 py-0.5 text-[#535862] hover:text-[#5BB318] focus-visible:outline-none"
            >
              EN
            </Link>
          </div>

          {/* Full 404 Image (1672x941 -> 16:9 Aspect Ratio) */}
          <div className="relative aspect-[1672/941] w-full select-none">
            <Image
              src="/images/404.webp"
              alt="404 — Halaman Tidak Ditemukan"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain"
            />

            {/* Logo Link */}
            <Link
              href="/"
              className="absolute left-[4.8%] top-[5%] h-[6.5%] w-[15%] rounded-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318]"
              aria-label="Optimark Home"
            />

            {/* Overlaid Real Button: Kembali ke Beranda */}
            <Link
              href="/"
              aria-label="Kembali ke Beranda"
              className="group absolute left-[38.5%] top-[77.5%] flex h-[7.3%] w-[23%] items-center justify-center rounded-full bg-[#5BB318] text-white shadow-[0_4px_14px_rgba(91,179,24,0.35)] transition-all duration-200 hover:scale-104 hover:bg-[#4E9F15] hover:shadow-[0_6px_20px_rgba(78,159,21,0.45)] active:scale-98 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#5BB318]/50"
            >
              <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-3 text-center text-[9px] font-bold text-white xs:text-[11px] sm:text-xs md:text-sm lg:text-base tracking-tight">
                <Home className="size-3 sm:size-4 md:size-5 shrink-0" aria-hidden="true" />
                <span className="truncate">Kembali ke Beranda</span>
                <ArrowRight
                  className="size-3 sm:size-4 md:size-5 shrink-0 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </Link>

            {/* Signpost: Beranda */}
            <Link
              href="/"
              aria-label="Beranda"
              className="group absolute left-[76.5%] top-[36.5%] flex h-[8.5%] w-[16.5%] items-center rounded-xl transition-all duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318]"
            />

            {/* Signpost: Artikel Blog */}
            <Link
              href="/blog"
              aria-label="Artikel Blog"
              className="group absolute left-[75.5%] top-[46.2%] flex h-[8.5%] w-[17.5%] items-center rounded-xl transition-all duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318]"
            />

            {/* Signpost: Produk Optimark */}
            <Link
              href="/product-overview"
              aria-label="Produk Optimark"
              className="group absolute left-[76.5%] top-[56.0%] flex h-[8.5%] w-[16.5%] items-center rounded-xl transition-all duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318]"
            />
          </div>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-2.5 border-t border-[#E5EFE2] bg-[#FAFDF9] p-5 sm:hidden">
            <Link
              href="/"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#5BB318] px-5 text-sm font-semibold text-white shadow-xs transition-all active:scale-98"
            >
              <Home className="size-4" />
              <span>Kembali ke Beranda</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/en"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#D5E7D1] bg-white px-5 text-sm font-semibold text-[#1E280E] shadow-2xs transition-all active:scale-98"
            >
              <span>Back to Homepage (EN)</span>
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
