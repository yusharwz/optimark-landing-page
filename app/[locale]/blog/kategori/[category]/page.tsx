import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import { BLOG_CATEGORY_IDS, blogCategoryHref, blogHref, isBlogCategoryId } from "@/config/blog";
import { breadcrumbJsonLd, collectionPageJsonLd, localeAlternates, localizedUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { BlogIndexSection } from "@/components/BlogIndexSection";
import { Footer } from "@/components/Footer";
import { cmsArticleToBlogPost, fetchCmsPosts } from "@/lib/cms";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_CATEGORY_IDS.map((category) => ({ locale, category })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, category } = await params;
  if (!isBlogCategoryId(category)) return {};
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: `blog.categoryPages.${category}` });

  const ogImage = buildOgImageUrl({
    title: t("title"),
    description: t("metaDescription"),
    locale,
  });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates(locale, blogCategoryHref(category)),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
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
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [ogImage],
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { locale: localeParam, category } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  if (!isBlogCategoryId(category)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });
  const url = localizedUrl(locale, blogCategoryHref(category));

  // Ingest real dynamic posts from CMS API for this category
  const cmsRes = await fetchCmsPosts({ categorySlug: category, limit: 1000 });
  const posts = cmsRes.data.map(cmsArticleToBlogPost);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("profile.breadcrumbHome"), url: localizedUrl(locale, "/") },
          { name: t("profile.breadcrumbBlog"), url: localizedUrl(locale, "/blog") },
          { name: t(`categories.${category}`), url },
        ])}
      />
      <JsonLd
        data={collectionPageJsonLd({
          name: t(`categoryPages.${category}.title`),
          description: t(`categoryPages.${category}.description`),
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
        <BlogIndexSection category={category} initialPosts={posts} />
      </main>
      <Footer />
    </div>
  );
}
