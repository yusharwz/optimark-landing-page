import type { Metadata, Viewport } from "next";
import { Inter, Special_Gothic_Condensed_One } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/providers/theme-provider";
import { RouteProvider } from "@/providers/route-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl, getBaseUrl } from "@/lib/og";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const specialGothic = Special_Gothic_Condensed_One({
  weight: "400",
  variable: "--font-gothic",
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "metadata" });

  const ogImage = buildOgImageUrl({
    title: t("title"),
    description: t("description"),
    locale,
  });

  return {
    metadataBase: new URL(getBaseUrl()),
    title: t("title"),
    description: t("description"),
    other: {
      google: "notranslate",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      siteName: "OPTIMARK",
      locale,
      type: "website",
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
    icons: {
      icon: [
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon.ico", rel: "icon" },
      ],
      apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
      other: [{ rel: "manifest", url: "/favicon/site.webmanifest" }],
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "light",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;

  if (!hasLocale(routing.locales, localeParam)) {
    notFound();
  }

  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} translate="no" suppressHydrationWarning>
      <body className={`${inter.variable} ${specialGothic.variable} font-sans antialiased smooth-scroll`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <ThemeProvider>
              <RouteProvider>{children}</RouteProvider>
            </ThemeProvider>
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
