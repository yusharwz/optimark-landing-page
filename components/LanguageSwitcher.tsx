"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cx } from "@/utils/cx";

export function LanguageSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <fieldset className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white/80 p-0.5">
      <legend className="sr-only">{t("label")}</legend>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-label={t(loc)}
          aria-current={locale === loc ? "true" : undefined}
          className={cx(
            "rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
            locale === loc
              ? "bg-[#94C748] text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          {loc}
        </button>
      ))}
    </fieldset>
  );
}
