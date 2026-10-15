import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
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
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  multilingualLocaleAlternates,
  localizedUrl,
} from "@/lib/seo";
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
    BLOG_CATEGORY_IDS.map((catId) => {
      let slug: string = catId;
      if (locale === "id") {
        if (catId === "social-media") slug = "media-sosial";
        if (catId === "visual-content") slug = "konten-visual";
      }
      return { locale, category: slug };
    }),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, category } = await params;
  const locale = resolveLocale(localeParam);

  const cmsCategory = await fetchCmsCategoryBySlug(category, locale);
  if (!isBlogCategoryId(category) && !cmsCategory) return {};

  const idSlug = cmsCategory?.slugId || cmsCategory?.slug || category;
  const enSlug = cmsCategory?.slugEn || cmsCategory?.slug || category;
  const canonicalSlug = locale === "en" ? enSlug : idSlug;

  const title = cmsCategory?.nameEn || cmsCategory?.name || category;
  const description = cmsCategory?.descriptionEn || cmsCategory?.description || "";
  const metaTitle = cmsCategory?.metaTitleEn || title;
  const metaDescription = cmsCategory?.metaDescriptionEn || description;

  const ogImage = buildOgImageUrl({
    title,
    description: metaDescription,
    locale,
  });

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: multilingualLocaleAlternates(locale, {
      id: blogCategoryHref(idSlug, "id"),
      en: blogCategoryHref(enSlug, "en"),
    }),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: localizedUrl(locale, blogCategoryHref(canonicalSlug, locale)),
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

export default async function BlogCategoryPageEn({ params }: Props) {
  const { locale: localeParam, category } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  const cmsCategory = await fetchCmsCategoryBySlug(category, locale);
  if (!isBlogCategoryId(category) && !cmsCategory) {
    notFound();
  }

  const idSlug = cmsCategory?.slugId || cmsCategory?.slug || category;
  const enSlug = cmsCategory?.slugEn || cmsCategory?.slug || category;
  const canonicalSlug = locale === "en" ? enSlug : idSlug;

  // If accessed in Indonesian, redirect to canonical /blog/kategori/{idSlug}
  if (locale === "id") {
    redirect(`/blog/kategori/${idSlug}`);
  }

  // If slug is not canonical for English, redirect to correct English slug
  if (category !== canonicalSlug && (cmsCategory?.slugId || cmsCategory?.slugEn)) {
    redirect(`/en/blog/category/${canonicalSlug}`);
  }

  const t = await getTranslations({ locale: "en", namespace: "blog" });
  const url = localizedUrl("en", blogCategoryHref(canonicalSlug, "en"));

  let categoryTitle = cmsCategory?.nameEn || cmsCategory?.name;
  let categoryDesc = cmsCategory?.descriptionEn || cmsCategory?.description;

  try {
    const tAny = t as unknown as (k: string) => string;
    categoryTitle = categoryTitle || tAny(`categoryPages.${category}.title`);
    categoryDesc = categoryDesc || tAny(`categoryPages.${category}.description`);
  } catch {}

  categoryTitle = categoryTitle || category;

  // Ingest real dynamic posts and all dynamic categories from CMS API
  const [cmsRes, cmsCategories] = await Promise.all([
    fetchCmsPosts({ categorySlug: category, limit: 1000, locale: "en" }),
    fetchCmsCategories("en"),
  ]);
  const posts = cmsRes.data.map(cmsArticleToBlogPost);
  const categories = cmsCategories.map((c) => ({
    id: c.slugEn || c.slug || "",
    name: c.nameEn || c.name || c.slug || "",
  }));

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("profile.breadcrumbHome"), url: localizedUrl("en", "/") },
          { name: t("profile.breadcrumbBlog"), url: localizedUrl("en", "/blog") },
          { name: categoryTitle, url },
        ])}
      />
      <JsonLd
        data={collectionPageJsonLd({
          name: categoryTitle,
          description: categoryDesc || "",
          url,
          locale: "en",
          items: posts.map((post) => ({
            name: post.title || post.slug,
            url: localizedUrl("en", blogHref(post.slug)),
          })),
        })}
      />
      <Header
        alternateHrefs={{
          id: blogCategoryHref(idSlug, "id"),
          en: blogCategoryHref(enSlug, "en"),
        }}
      />
      <main className="relative pt-24">
        <BlogIndexSection
          category={canonicalSlug as BlogCategoryId}
          initialPosts={posts}
          categories={categories}
          categoryInfo={{ name: categoryTitle, description: categoryDesc }}
        />
      </main>
      <Footer />
    </div>
  );
}
