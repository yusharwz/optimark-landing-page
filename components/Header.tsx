"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/base/buttons/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SITE } from "@/config/site";
import { Link } from "@/i18n/navigation";

export function Header() {
  const t = useTranslations("header");

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-gray-100/50 bg-white/80 p-4 shadow-sm backdrop-blur-md">
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

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Button color="primary" size="sm">
                {t("comingSoon")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
