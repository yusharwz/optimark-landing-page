import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import { BLOG_TAG_IDS, blogHref, blogTagHref, getPostsByTag, isBlogTagId } from "@/config/blog";
import { breadcrumbJsonLd, collectionPageJsonLd, localeAlternates, localizedUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { BlogIndexSection } from "@/components/BlogIndexSection";
import { Footer } from "@/components/Footer";
import { cmsArticleToBlogPost, fetchCmsPosts } from "@/lib/cms";

type Props = {
  params: Promise<{ locale: string; tag: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => BLOG_TAG_IDS.map((tag) => ({ locale, tag })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, tag } = await params;
  if (!isBlogTagId(tag)) return {};
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "blog" });

  const label = t(`tags.${tag}`);
  const title = t("tagMetaTitle", { tag: label });
  const description = t("tagMetaDescription", { tag: label });
  const ogImage = buildOgImageUrl({ title: label, description, locale });

  return {
    title,
    description,
    alternates: localeAlternates(locale, blogTagHref(tag)),
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: label,
          type: "image/png",
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function BlogTagPage({ params }: Props) {
  const { locale: localeParam, tag } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  if (!isBlogTagId(tag)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });
  const label = t(`tags.${tag}`);
  const url = localizedUrl(locale, blogTagHref(tag));

  // Ingest dynamic posts from CMS API for this tag
  const cmsRes = await fetchCmsPosts({ tag, limit: 1000 });
  const posts = cmsRes.data.map(cmsArticleToBlogPost);
  const displayPosts = posts.length > 0 ? posts : getPostsByTag(tag);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("profile.breadcrumbHome"), url: localizedUrl(locale, "/") },
          { name: t("profile.breadcrumbBlog"), url: localizedUrl(locale, "/blog") },
          { name: label, url },
        ])}
      />
      <JsonLd
        data={collectionPageJsonLd({
          name: label,
          description: t("tagMetaDescription", { tag: label }),
          url,
          locale,
          items: displayPosts.map((post) => ({
            name: post.title || post.slug,
            url: localizedUrl(locale, blogHref(post.slug)),
          })),
        })}
      />
      <Header />
      <main className="relative pt-24">
        <BlogIndexSection tag={tag} initialPosts={displayPosts} />
      </main>
      <Footer />
    </div>
  );
}
