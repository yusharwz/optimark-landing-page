"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SITE } from "@/config/site";
import { Link, usePathname } from "@/i18n/navigation";

const NAV_LINK_KEYS = [
  { key: "home", href: "/" },
  { key: "features", href: "/features" },
  { key: "pricing", href: "/pricing" },
] as const;

export function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed left-4 right-4 top-4 z-50">
      <div className="mx-auto max-w-7xl">
        <div className={`rounded-2xl p-4 transition-all duration-300 ${
          isScrolled
            ? "border border-gray-100/50 bg-white/85 shadow-sm backdrop-blur-md"
            : "border border-transparent bg-transparent shadow-none backdrop-blur-none hover:border-gray-100/50 hover:bg-white/85 hover:shadow-sm hover:backdrop-blur-md focus-within:border-gray-100/50 focus-within:bg-white/85 focus-within:shadow-sm focus-within:backdrop-blur-md"
        }`}>
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/images/optimark-logo.svg"
                alt={SITE.brandName}
                width={32}
                height={32}
                priority
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-sm font-semibold tracking-tight text-gray-900">
                {SITE.brandName}
              </span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {NAV_LINK_KEYS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "text-[#94C748]"
                        : "text-gray-600 hover:bg-gray-50/50 hover:text-gray-900"
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#94C748]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <div className="hidden md:block">
                <Button href="https://staging.app.optimark.ai/login" color="primary" size="sm">
                  {t("signIn")}
                </Button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-100 bg-gray-50/50 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 md:hidden"
                aria-label={t("toggleMenu")}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg md:hidden"
            >
              {NAV_LINK_KEYS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl p-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#94C748]/10 font-bold text-[#94C748]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                );
              })}
              <div className="mt-1 border-t border-gray-100 pt-3">
                <Button href="https://staging.app.optimark.ai" color="primary" size="lg" className="w-full justify-center">
                  Try Free
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
