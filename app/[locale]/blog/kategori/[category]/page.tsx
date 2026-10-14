import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import {
  BLOG_CATEGORY_IDS,
  blogCategoryHref,
  blogHref,
  isBlogCategoryId,
  type BlogCategoryId,
} from "@/config/blog";
import { breadcrumbJsonLd, collectionPageJsonLd, localeAlternates, localizedUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { BlogIndexSection } from "@/components/BlogIndexSection";
import { Footer } from "@/components/Footer";
import {
  cmsArticleToBlogPost,
  fetchCmsCategoryBySlug,
  fetchCmsPosts,
  fetchCmsCategories,
} from "@/lib/cms";

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
  const locale = resolveLocale(localeParam);

  const cmsCategory = await fetchCmsCategoryBySlug(category);
  if (!isBlogCategoryId(category) && !cmsCategory) return {};

  let title =
    locale === "en"
      ? cmsCategory?.nameEn || cmsCategory?.name
      : cmsCategory?.nameId || cmsCategory?.name;
  let description =
    locale === "en"
      ? cmsCategory?.descriptionEn || cmsCategory?.description
      : cmsCategory?.descriptionId || cmsCategory?.description;
  let metaTitle =
    locale === "en"
      ? cmsCategory?.metaTitleEn || cmsCategory?.nameEn || cmsCategory?.name
      : cmsCategory?.metaTitleId || cmsCategory?.nameId || cmsCategory?.name;
  let metaDescription =
    locale === "en"
      ? cmsCategory?.metaDescriptionEn || cmsCategory?.descriptionEn || cmsCategory?.description
      : cmsCategory?.metaDescriptionId || cmsCategory?.descriptionId || cmsCategory?.description;

  try {
    const t = await getTranslations({ locale, namespace: "blog" });
    const tAny = t as unknown as (k: string) => string;
    title = title || tAny(`categoryPages.${category}.title`);
    description = description || tAny(`categoryPages.${category}.description`);
    metaTitle = metaTitle || tAny(`categoryPages.${category}.metaTitle`);
    metaDescription = metaDescription || tAny(`categoryPages.${category}.metaDescription`);
  } catch {}

  title = title || category;
  metaTitle = metaTitle || title;
  metaDescription = metaDescription || description || "";

  const ogImage = buildOgImageUrl({
    title,
    description: metaDescription,
    locale,
  });

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: localeAlternates(locale, blogCategoryHref(category)),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { locale: localeParam, category } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  const cmsCategory = await fetchCmsCategoryBySlug(category);
  if (!isBlogCategoryId(category) && !cmsCategory) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });
  const url = localizedUrl(locale, blogCategoryHref(category));

  let categoryTitle =
    locale === "en"
      ? cmsCategory?.nameEn || cmsCategory?.name
      : cmsCategory?.nameId || cmsCategory?.name;
  let categoryDesc =
    locale === "en"
      ? cmsCategory?.descriptionEn || cmsCategory?.description
      : cmsCategory?.descriptionId || cmsCategory?.description;

  try {
    const tAny = t as unknown as (k: string) => string;
    categoryTitle = categoryTitle || tAny(`categoryPages.${category}.title`);
    categoryDesc = categoryDesc || tAny(`categoryPages.${category}.description`);
  } catch {}

  categoryTitle = categoryTitle || category;

  // Ingest real dynamic posts and all dynamic categories from CMS API
  const [cmsRes, cmsCategories] = await Promise.all([
    fetchCmsPosts({ categorySlug: category, limit: 1000 }),
    fetchCmsCategories(),
  ]);
  const posts = cmsRes.data.map(cmsArticleToBlogPost);
  const categories = cmsCategories.map((c) => ({
    id: c.slug,
    name: (locale === "en" ? c.nameEn || c.name : c.nameId || c.name) || c.slug,
  }));

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("profile.breadcrumbHome"), url: localizedUrl(locale, "/") },
          { name: t("profile.breadcrumbBlog"), url: localizedUrl(locale, "/blog") },
          { name: categoryTitle, url },
        ])}
      />
      <JsonLd
        data={collectionPageJsonLd({
          name: categoryTitle,
          description: categoryDesc || "",
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
        <BlogIndexSection
          category={category as BlogCategoryId}
          initialPosts={posts}
          categories={categories}
          categoryInfo={{ name: categoryTitle, description: categoryDesc }}
        />
      </main>
      <Footer />
    </div>
  );
}
