import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
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

/**
 * Google Tag Manager container id, and the Search Console ownership token.
 *
 * Both are read at module scope because every page here is statically
 * prerendered — these resolve at build time, which is why the Dockerfile takes
 * them as build args. Both are optional: with the env unset (a local `pnpm dev`
 * or a plain `pnpm build`) the tag and the meta tag simply do not render, rather
 * than shipping a broken `undefined` container id.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

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
    // Emits <meta name="google-site-verification"> for Search Console ownership.
    ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
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
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body className={`${inter.variable} ${specialGothic.variable} font-sans antialiased smooth-scroll`}>
        {/* `<GoogleTagManager>` only emits the JS tags, so the no-JS fallback
            iframe is added by hand. It must stay the first thing in <body>. */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
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
