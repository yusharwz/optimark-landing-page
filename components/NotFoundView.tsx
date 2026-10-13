"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { ArrowRight, BookOpen, Globe, Home } from "lucide-react";
import { resolveLocale } from "@/lib/locale";

export function NotFoundView() {
  const currentLocale = resolveLocale(useLocale());
  const t = useTranslations("notFound");
  const router = useRouter();
  const pathname = usePathname();

  const isEn = currentLocale === "en";

  const toggleLocale = () => {
    const nextLocale = isEn ? "id" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#F4FAF3] px-4 py-8 sm:py-12 md:px-8">
      {/* Top Floating Utility Bar (Language Switcher & Quick Navigation) */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2 sm:top-6 sm:right-6">
        <button
          type="button"
          onClick={toggleLocale}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#D5E7D1] bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-[#1E280E] shadow-xs backdrop-blur-xs transition-all hover:bg-white hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318]"
          aria-label={isEn ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
        >
          <Globe className="size-3.5 text-[#5BB318]" />
          <span>{isEn ? "ID (Bahasa)" : "EN (English)"}</span>
        </button>
      </div>

      {/* 404 Illustration Container with Exact Interactive Overlays */}
      <div className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-2xl sm:rounded-3xl border border-[#DCEBD9] bg-white shadow-[0_12px_40px_rgba(78,159,21,0.08)]">
        {/* Full Image (1672x941 -> 16:9 Aspect Ratio) */}
        <div className="relative aspect-[1672/941] w-full select-none">
          <Image
            src="/images/404.webp"
            alt={t("title")}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-contain"
          />

          {/* Interactive Overlay 1: Top-Left Optimark Logo */}
          <Link
            href="/"
            className="absolute left-[4.8%] top-[5%] h-[6.5%] w-[15%] rounded-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318]"
            aria-label="Optimark Home"
          />

          {/* Interactive Overlay 2: Center Main CTA Button (Kembali ke Beranda / Back to Homepage) */}
          <Link
            href="/"
            aria-label={isEn ? "Back to Homepage" : "Kembali ke Beranda"}
            className="group absolute left-[38.5%] top-[77.5%] flex h-[7.3%] w-[23%] items-center justify-center rounded-full bg-[#5BB318] text-white shadow-[0_4px_14px_rgba(91,179,24,0.35)] transition-all duration-200 hover:scale-104 hover:bg-[#4E9F15] hover:shadow-[0_6px_20px_rgba(78,159,21,0.45)] active:scale-98 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#5BB318]/50"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 text-center text-[10px] font-bold text-white xs:text-xs sm:text-sm md:text-base tracking-tight">
              <Home className="size-3.5 sm:size-4 md:size-5 shrink-0" aria-hidden="true" />
              <span className="truncate">{isEn ? "Back to Homepage" : "Kembali ke Beranda"}</span>
              <ArrowRight
                className="size-3.5 sm:size-4 md:size-5 shrink-0 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>
          </Link>

          {/* Interactive Overlay 3: Signpost Item 1 ("Beranda" / "Home") */}
          <Link
            href="/"
            aria-label={isEn ? "Home" : "Beranda"}
            className="group absolute left-[76.5%] top-[36.5%] flex h-[8.5%] w-[16.5%] items-center rounded-xl transition-all duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318]"
          />

          {/* Interactive Overlay 4: Signpost Item 2 ("Artikel Blog" / "Blog Articles") */}
          <Link
            href="/blog"
            aria-label={isEn ? "Blog Articles" : "Artikel Blog"}
            className="group absolute left-[75.5%] top-[46.2%] flex h-[8.5%] w-[17.5%] items-center rounded-xl transition-all duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318]"
          />

          {/* Interactive Overlay 5: Signpost Item 3 ("Produk Optimark" / "Optimark Products") */}
          <Link
            href="/product-overview"
            aria-label={isEn ? "Optimark Products" : "Produk Optimark"}
            className="group absolute left-[76.5%] top-[56.0%] flex h-[8.5%] w-[16.5%] items-center rounded-xl transition-all duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB318]"
          />
        </div>

        {/* Mobile Tactile Action Bar (Cleanly shown below image on mobile for effortless tapping) */}
        <div className="flex flex-col gap-3 border-t border-[#E5EFE2] bg-[#FAFDF9] p-5 sm:hidden">
          <div className="text-center">
            <h1 className="text-lg font-bold text-[#111827]">{t("title")}</h1>
            <p className="mt-1 text-xs text-[#535862]">{t("subtitle")}</p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#5BB318] px-5 text-sm font-semibold text-white shadow-xs transition-all active:scale-98"
            >
              <Home className="size-4" />
              <span>{isEn ? "Back to Homepage" : "Kembali ke Beranda"}</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/blog"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#D5E7D1] bg-white px-5 text-sm font-semibold text-[#1E280E] shadow-2xs transition-all active:scale-98"
            >
              <BookOpen className="size-4 text-[#5BB318]" />
              <span>{isEn ? "Visit Blog" : "Kunjungi Blog"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Screen Reader Semantic Heading for Accessibility */}
      <div className="sr-only">
        <h1>{t("title")}</h1>
        <p>{t("subtitle")}</p>
        <nav aria-label="404 navigation">
          <Link href="/">{isEn ? "Back to Homepage" : "Kembali ke Beranda"}</Link>
          <Link href="/blog">{isEn ? "Visit Blog" : "Kunjungi Blog"}</Link>
          <Link href="/product-overview">{isEn ? "Optimark Products" : "Produk Optimark"}</Link>
        </nav>
      </div>
    </main>
  );
}
