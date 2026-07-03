import type { Metadata } from "next";
import { TermsOfServiceView } from "@/components/TermsOfServiceView";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "termsMetadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TermsOfService({ params }: Props) {
  const { locale: localeParam } = await params;
  setRequestLocale(resolveLocale(localeParam));

  return <TermsOfServiceView />;
}
