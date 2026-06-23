import type { Metadata } from "next";
import { PrivacyPolicyView } from "@/components/PrivacyPolicyView";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "privacyMetadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PrivacyPolicy({ params }: Props) {
  const { locale: localeParam } = await params;
  setRequestLocale(resolveLocale(localeParam));

  return <PrivacyPolicyView />;
}
