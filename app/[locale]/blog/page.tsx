import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import { breadcrumbJsonLd, collectionPageJsonLd, localeAlternates, localizedUrl } from "@/lib/seo";
import { blogHref, getBlogOverviewPosts } from "@/config/blog";
import { getSeoKeywords } from "@/config/seo";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { BlogIndexSection } from "@/components/BlogIndexSection";
import { Footer } from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "blogMetadata" });

  const ogImage = buildOgImageUrl({
    title: t("title"),
    description: t("description"),
    locale,
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: getSeoKeywords("blog", locale),
    alternates: localeAlternates(locale, "/blog"),
    openGraph: {
      title: t("title"),
      description: t("description"),
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
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blogMetadata" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const tPosts = await getTranslations({ locale, namespace: "blogPosts" });
  const url = localizedUrl(locale, "/blog");

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tBlog("profile.breadcrumbHome"), url: localizedUrl(locale, "/") },
          { name: tBlog("profile.breadcrumbBlog"), url },
        ])}
      />
      <JsonLd
        data={collectionPageJsonLd({
          name: t("title"),
          description: t("description"),
          url,
          locale,
          items: getBlogOverviewPosts().map((post) => ({
            name: tPosts(`${post.slug}.title`),
            url: localizedUrl(locale, blogHref(post.slug)),
          })),
        })}
      />
      <Header />
      <main className="relative pt-24">
        <BlogIndexSection />
      </main>
      <Footer />
    </div>
  );
}
