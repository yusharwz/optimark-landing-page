"use client";

import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cx } from "@/utils/cx";

interface LanguageSwitcherProps {
  /**
   * Render the light-on-dark treatment used while the header floats over the
   * dark hero (before the white bar fades in on scroll).
   */
  onDark?: boolean;
}

export function LanguageSwitcher({ onDark = false }: LanguageSwitcherProps) {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const pathname = usePathname();

  const getTargetHref = (targetLocale: "id" | "en") => {
    if (targetLocale === "en") {
      if (pathname === "/perencana-konten" || pathname === "/features/perencana-konten") {
        return "/en/content-planner";
      }
    } else {
      if (pathname === "/content-planner" || pathname === "/features/content-planner") {
        return "/perencana-konten";
      }
    }
    return getPathname({ href: pathname, locale: targetLocale });
  };

  return (
    <fieldset
      className={cx(
        "flex shrink-0 items-center gap-0.5 rounded-lg border p-0.5 transition-colors duration-300",
        onDark ? "border-white/20 bg-white/10 backdrop-blur-md" : "border-gray-200 bg-gray-50",
      )}
    >
      <legend className="sr-only">{t("label")}</legend>
      {routing.locales.map((loc) => (
        <a
          key={loc}
          href={getTargetHref(loc)}
          hrefLang={loc}
          aria-label={t(loc)}
          aria-current={locale === loc ? "true" : undefined}
          className={cx(
            "rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors sm:px-2.5",
            locale === loc
              ? "bg-[#94C748] text-white shadow-sm"
              : onDark
                ? "text-white/60 hover:bg-white/10 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          {loc}
        </a>
      ))}
    </fieldset>
  );
}
