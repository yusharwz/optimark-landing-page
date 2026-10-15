import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  defaultRobots,
  localeAlternates,
  localizedUrl,
} from "@/lib/seo";
import { blogHref } from "@/config/blog";
import { getSeoKeywords } from "@/config/seo";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { BlogIndexSection } from "@/components/BlogIndexSection";
import { Footer } from "@/components/Footer";
import { cmsArticleToBlogPost, fetchCmsPosts, fetchCmsCategories } from "@/lib/cms";

export const dynamic = "force-dynamic";

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
    robots: defaultRobots(true),
    alternates: localeAlternates(locale, "/blog"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localizedUrl(locale, "/blog"),
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
  const url = localizedUrl(locale, "/blog");

  // Ingest real dynamic posts and categories from CMS API with fallback
  const [cmsRes, cmsCategories] = await Promise.all([
    fetchCmsPosts({ limit: 1000, locale }),
    fetchCmsCategories(locale),
  ]);
  const posts = cmsRes.data.map(cmsArticleToBlogPost);
  const categories = cmsCategories.map((c) => ({
    id: (locale === "en" ? c.slugEn || c.slug : c.slugId || c.slug) || c.slug,
    name: (locale === "en" ? c.nameEn || c.name : c.nameId || c.name) || c.slug,
  }));

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
          items: posts.map((post) => ({
            name: post.title || post.slug,
            url: localizedUrl(locale, blogHref(post.slug)),
          })),
        })}
      />
      <Header />
      <main className="relative pt-24">
        <BlogIndexSection initialPosts={posts} categories={categories} />
      </main>
      <Footer />
    </div>
  );
}
