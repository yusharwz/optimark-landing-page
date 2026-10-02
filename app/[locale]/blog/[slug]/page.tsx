import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import { BLOG_POSTS, authorHref, blogHref, getBlogPost } from "@/config/blog";
import { Header } from "@/components/Header";
import { BlogPostView } from "@/components/BlogPostView";
import { BlogTocBar } from "@/components/BlogToc";
import { Footer } from "@/components/Footer";
import { ScrollUpButton } from "@/components/ScrollUpButton";
import { JsonLd } from "@/components/JsonLd";
import { ORGANIZATION_ID, breadcrumbJsonLd, localeAlternates, localizedUrl } from "@/lib/seo";
import { SCROLL_UP_THRESHOLD, SITE_URL } from "@/config/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/**
 * Every post in both locales, so the whole blog prerenders at build time like
 * the rest of the site. `dynamicParams` is left at its default — an unknown
 * slug falls through to notFound() below rather than rendering an empty shell.
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_POSTS.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);

  const entry = getBlogPost(slug);
  if (!entry) return {};

  // Each post is its own message namespace, keyed by slug.
  const t = await getTranslations({ locale, namespace: `blogPosts.${entry.slug}` });

  const metaTitle = t("metaTitle");
  const metaDescription = t("metaDescription");

  const ogImage = buildOgImageUrl({
    title: t("title"),
    description: metaDescription,
    locale,
  });

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: localeAlternates(locale, blogHref(entry.slug)),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      publishedTime: entry.publishedAt,
      modifiedTime: entry.updatedAt ?? entry.publishedAt,
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
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: `blogPosts.${post.slug}` });
  const tPeople = await getTranslations({ locale, namespace: "blogPeople" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const url = localizedUrl(locale, blogHref(post.slug));

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: t("title"),
    description: t("metaDescription"),
    inLanguage: locale,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    url,
    mainEntityOfPage: url,
    ...(post.cover && { image: `${SITE_URL}${post.cover}` }),
    keywords: (t.raw("tags") as string[]).join(", "),
    author: {
      "@type": "Person",
      name: tPeople(`authors.${post.author}.name`),
      url: localizedUrl(locale, authorHref(post.author)),
    },
    publisher: { "@id": ORGANIZATION_ID },
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={blogPosting} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tBlog("profile.breadcrumbHome"), url: localizedUrl(locale, "/") },
          { name: tBlog("profile.breadcrumbBlog"), url: localizedUrl(locale, "/blog") },
          { name: t("title"), url },
        ])}
      />
      <Header subnav={<BlogTocBar slug={post.slug} />} />
      <main className="relative pt-36 sm:pt-40 lg:pt-24">
        <BlogPostView slug={post.slug} />
      </main>
      <Footer />
      <ScrollUpButton threshold={SCROLL_UP_THRESHOLD} />
    </div>
  );
}
