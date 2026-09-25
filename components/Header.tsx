"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";
import { GET_STARTED_URL } from "@/config/site";
import { ALL_FEATURE_IDS, featureHref } from "@/config/features";

/**
 * There is no `/features` hub page — the "Features" entry opens a menu of the
 * individual feature pages instead of navigating anywhere itself, so it carries
 * no `href`.
 */
const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "features", href: null },
  { key: "pricing", href: "/pricing" },
  { key: "faq", href: "/faq" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/about" },
] as const;

const FEATURES_PREFIX = "/features";

export function Header() {
  const t = useTranslations("header");
  const tf = useTranslations("features");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dismiss the features menu on outside click or Escape.
  useEffect(() => {
    if (!featuresOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!featuresRef.current?.contains(event.target as Node)) setFeaturesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFeaturesOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [featuresOpen]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const featuresActive = pathname.startsWith(FEATURES_PREFIX);

  // Only the homepage has a dark hero behind the (transparent) header. While
  // sitting over it — i.e. before the user scrolls and the white bar appears —
  // switch the header to light text. Once scrolled, it reverts to the default
  // dark-on-white treatment.
  const overDarkHero = pathname === "/" && !isScrolled;

  const navItemClass = (active: boolean) =>
    `relative rounded-lg px-3 py-1.5 text-m font-medium transition-colors ${
      active
        ? "text-[#94C748]"
        : overDarkHero
          ? "text-white/75 hover:text-white"
          : "text-gray-600 hover:bg-gray-50/50 hover:text-gray-900"
    }`;

  const activeUnderline = (
    <motion.div
      layoutId="activeNav"
      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#94C748]"
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    />
  );

  return (
    <header className="fixed left-4 right-4 top-4 z-50">
      <div className="mx-auto max-w-7xl">
        <div
          className={`rounded-2xl p-3 transition-all duration-300 sm:p-4 ${
            isScrolled
              ? "border border-gray-100/50 bg-white/85 shadow-sm backdrop-blur-md"
              : overDarkHero
                ? "border border-transparent bg-transparent shadow-none backdrop-blur-none"
                : "border border-transparent bg-transparent shadow-none backdrop-blur-none hover:border-gray-100/50 hover:bg-white/85 hover:shadow-sm hover:backdrop-blur-md focus-within:border-gray-100/50 focus-within:bg-white/85 focus-within:shadow-sm focus-within:backdrop-blur-md"
          }`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link href="/" className="group min-w-0">
              <Logo
                size="lg"
                inverted={overDarkHero}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {NAV_ITEMS.map((item) => {
                if (item.href === null) {
                  return (
                    <div key={item.key} ref={featuresRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setFeaturesOpen((open) => !open)}
                        aria-expanded={featuresOpen}
                        aria-haspopup="menu"
                        className={`${navItemClass(featuresActive)} inline-flex items-center gap-1.5`}
                      >
                        {t(`nav.${item.key}`)}
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            featuresOpen ? "rotate-180" : ""
                          }`}
                        />
                        {featuresActive && activeUnderline}
                      </button>

                      <AnimatePresence>
                        {featuresOpen && (
                          <motion.div
                            role="menu"
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl"
                          >
                            {ALL_FEATURE_IDS.map((id) => {
                              const active = pathname.startsWith(featureHref(id));
                              return (
                                <Link
                                  key={id}
                                  role="menuitem"
                                  href={featureHref(id)}
                                  onClick={() => setFeaturesOpen(false)}
                                  className={`block whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                                    active
                                      ? "bg-[#94C748]/10 font-semibold text-[#94C748]"
                                      : "text-[#1E280E] hover:bg-gray-50"
                                  }`}
                                >
                                  {tf(`items.${id}.title`)}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href} className={navItemClass(active)}>
                    {t(`nav.${item.key}`)}
                    {active && activeUnderline}
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <LanguageSwitcher onDark={overDarkHero} />
              <div className="hidden md:block">
                <Button href={GET_STARTED_URL} color="primary" size="sm" className="text-white">
                  {t("getStarted")}
                </Button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors sm:h-9 sm:w-9 md:hidden ${
                  overDarkHero
                    ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                    : "border-gray-100 bg-gray-50/50 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
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
              {NAV_ITEMS.map((item) => {
                if (item.href === null) {
                  return (
                    <div key={item.key} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setMobileFeaturesOpen((open) => !open)}
                        aria-expanded={mobileFeaturesOpen}
                        className={`flex items-center justify-between rounded-xl p-3 text-sm font-medium transition-colors ${
                          featuresActive
                            ? "bg-[#94C748]/10 font-bold text-[#94C748]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {t(`nav.${item.key}`)}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileFeaturesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileFeaturesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-1 flex flex-col gap-1 border-l border-gray-100 pl-3">
                              {ALL_FEATURE_IDS.map((id) => {
                                const active = pathname.startsWith(featureHref(id));
                                return (
                                  <Link
                                    key={id}
                                    href={featureHref(id)}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setMobileFeaturesOpen(false);
                                    }}
                                    className={`rounded-xl p-2.5 text-sm transition-colors ${
                                      active
                                        ? "bg-[#94C748]/10 font-semibold text-[#94C748]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                  >
                                    {tf(`items.${id}.title`)}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl p-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#94C748]/10 font-bold text-[#94C748]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                );
              })}
              <div className="mt-1 border-t border-gray-100 pt-3">
                <Button
                  href={GET_STARTED_URL}
                  color="primary"
                  size="lg"
                  className="w-full justify-center"
                >
                  {t("getStarted")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
