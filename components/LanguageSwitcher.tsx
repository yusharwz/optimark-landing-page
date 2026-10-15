"use client";

import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cx } from "@/utils/cx";

export interface LanguageSwitcherProps {
  /**
   * Render the light-on-dark treatment used while the header floats over the
   * dark hero (before the white bar fades in on scroll).
   */
  onDark?: boolean;
  alternateHrefs?: Partial<Record<"id" | "en", string>>;
}

export function LanguageSwitcher({ onDark = false, alternateHrefs }: LanguageSwitcherProps) {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const pathname = usePathname();

  const getTargetHref = (targetLocale: "id" | "en") => {
    if (alternateHrefs && alternateHrefs[targetLocale]) {
      const targetPath = alternateHrefs[targetLocale]!;
      if (targetLocale === "en") {
        return targetPath.startsWith("/en") ? targetPath : `/en${targetPath.startsWith("/") ? "" : "/"}${targetPath}`;
      } else {
        const cleanPath = targetPath.startsWith("/en/") ? targetPath.replace(/^\/en/, "") : targetPath;
        return cleanPath.startsWith("/id/") ? cleanPath.replace(/^\/id/, "") : cleanPath;
      }
    }

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
          aria-current={locale === loc ? "true" : undefined}
          className={cx(
            "rounded-md px-2 py-1 text-xs font-semibold uppercase transition-all duration-200",
            locale === loc
              ? onDark
                ? "bg-white text-gray-900 shadow-sm"
                : "bg-white text-gray-900 shadow-sm"
              : onDark
                ? "text-white/80 hover:bg-white/10 hover:text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          {loc}
        </a>
      ))}
    </fieldset>
  );
}
