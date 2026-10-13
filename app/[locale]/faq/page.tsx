import { notFound } from "next/navigation";

/**
 * TEMP DISABLED: Halaman FAQ dinonaktifkan sementara agar menghasilkan 404.
 * Kode asli dipertahankan di bawah dalam bentuk komentar agar mudah diaktifkan kembali.
 */
export default function FaqPage() {
  notFound();
}

/*
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import { breadcrumbJsonLd, faqPageJsonLd, localeAlternates, localizedUrl } from "@/lib/seo";
import { getSeoKeywords } from "@/config/seo";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

const FAQ_NUMBERS = [1, 2, 3, 4, 5] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "faqMetadata" });

  const ogImage = buildOgImageUrl({
    title: t("title"),
    description: t("description"),
    locale,
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: getSeoKeywords("faq", locale),
    alternates: localeAlternates(locale, "/faq"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: t("title"),
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImage],
    },
  };
}

export async function OriginalFaqPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  const tCrumb = await getTranslations({ locale, namespace: "header" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const url = localizedUrl(locale, "/faq");

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tCrumb("nav.home"), url: localizedUrl(locale, "/") },
          { name: tCrumb("nav.faq"), url },
        ])}
      />
      <JsonLd
        data={faqPageJsonLd({
          url,
          locale,
          items: FAQ_NUMBERS.map((n) => ({
            question: tFaq(`items.q${n}`),
            answer: tFaq(`items.a${n}`),
          })),
        })}
      />
      <Header />
      <main className="relative pt-24">
        <div className="relative z-10">
          <FaqSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
*/
