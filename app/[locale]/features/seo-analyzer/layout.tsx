import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { FeatureJsonLd, featureMetadata } from "@/components/FeatureSeo";
import { resolveLocale } from "@/lib/locale";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  return featureMetadata("seo", resolveLocale(localeParam));
}

export default async function Layout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  return (
    <>
      <FeatureJsonLd id="seo" locale={locale} />
      {children}
    </>
  );
}
