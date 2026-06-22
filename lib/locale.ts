import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export type AppLocale = (typeof routing.locales)[number];

export function resolveLocale(locale: string): AppLocale {
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
}
