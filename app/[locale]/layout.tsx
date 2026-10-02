import type { Metadata, Viewport } from "next";
import { Inter, Special_Gothic_Condensed_One } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/providers/theme-provider";
import { RouteProvider } from "@/providers/route-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { routing } from "@/i18n/routing";
import { GA_MEASUREMENT_ID, GSC_VERIFICATION, GTM_ID } from "@/config/site";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl, getBaseUrl } from "@/lib/og";
import { organizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
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
 * Both ids are static, public values from config/site.ts — see the note there
 * on why they are not environment-driven. An empty string means "not set yet"
 * and skips the corresponding tag rather than rendering an undefined id.
 */

/**
 * Google Tag Manager, verbatim from the container's own install instructions.
 *
 * This is deliberately the raw snippet inlined into <head> rather than
 * `@next/third-parties`. That component loads the tag through next/script with
 * the `afterInteractive` strategy, which leaves nothing but a `<link rel=
 * "preload">` in the served HTML and boots the tag from a client chunk after
 * hydration. It works, but the SEO team verifies the install from view-source
 * and asked for the snippet "as high in the <head> as possible", and an install
 * they cannot see is an install they will not sign off on.
 *
 * There is no rendering cost to this: the snippet sets `j.async=true`, so
 * gtm.js is still fetched asynchronously. Only the ~500-byte bootstrap below is
 * synchronous.
 */
const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

/**
 * GA4 bootstrap, the standard gtag.js snippet. gtag.js itself is loaded with
 * `async`, so only this stub is synchronous.
 *
 * Note it writes into the same `dataLayer` array GTM uses — that is by design
 * and how Google's own instructions read; the two coexist. What they must not
 * do is both configure G-YNXD0DYDQ0, or pageviews double-count. See the note in
 * config/site.ts.
 */
const GA_SNIPPET = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`;

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
      // The default locale has no prefix; `/id` would only redirect to `/`.
      url: locale === routing.defaultLocale ? "/" : `/${locale}`,
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
      <head>
        {/* Google Tag Manager — must stay as high in <head> as possible. */}
        {GTM_ID && <script dangerouslySetInnerHTML={{ __html: GTM_SNIPPET }} />}

        {/* Google Analytics 4 (gtag.js) */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script dangerouslySetInnerHTML={{ __html: GA_SNIPPET }} />
          </>
        )}
      </head>
      <body
        className={`${inter.variable} ${specialGothic.variable} font-sans antialiased smooth-scroll`}
      >
        {/* Google Tag Manager (noscript) — must stay first inside <body>. */}
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
        <JsonLd data={organizationJsonLd()} />
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
