import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import { BLOG_POSTS, authorHref, blogHref, getBlogPost } from "@/config/blog";
import { cmsArticleToBlogPost, fetchCmsPostBySlug } from "@/lib/cms";
import { Header } from "@/components/Header";
import { BlogPostView } from "@/components/BlogPostView";
import { BlogTocBar } from "@/components/BlogToc";
import { Footer } from "@/components/Footer";
import { ScrollUpButton } from "@/components/ScrollUpButton";
import { JsonLd } from "@/components/JsonLd";
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  defaultRobots,
  localeAlternates,
  localizedUrl,
} from "@/lib/seo";
import { SCROLL_UP_THRESHOLD } from "@/config/site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;

/**
 * Prerender known slugs at build time. Dynamic slugs created in CMS
 * will be fetched and rendered on demand via dynamicParams = true.
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_POSTS.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);

  const cmsData = await fetchCmsPostBySlug(slug);
  const entry = cmsData ? cmsArticleToBlogPost(cmsData.post) : getBlogPost(slug);
  if (!entry) return {};

  let title = entry.title && entry.title !== entry.slug ? entry.title : "";
  let metaDescription = entry.excerpt || "";
  let metaTitle = entry.title && entry.title !== entry.slug ? entry.title : "";

  try {
    const t = await getTranslations({ locale, namespace: "blogPosts" });
    if (!title) {
      if (t.has(`${entry.slug}.title` as never)) {
        title = t(`${entry.slug}.title` as never);
      }
    }
    if (!metaDescription) {
      if (t.has(`${entry.slug}.metaDescription` as never)) {
        metaDescription = t(`${entry.slug}.metaDescription` as never);
      }
    }
    if (t.has(`${entry.slug}.metaTitle` as never)) {
      metaTitle = t(`${entry.slug}.metaTitle` as never);
    }
  } catch {
    // Dynamic post without static translations
  }

  if (!title) {
    title = entry.title || slug;
  }
  if (!metaTitle) {
    metaTitle = title;
  }

  const ogImage =
    entry.cover ||
    buildOgImageUrl({
      title: title || slug,
      description: metaDescription,
      locale,
    });

  const canonicalUrl = localizedUrl(locale, blogHref(entry.slug));

  return {
    title: metaTitle,
    description: metaDescription,
    robots: defaultRobots(true),
    alternates: localeAlternates(locale, blogHref(entry.slug)),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      type: "article",
      publishedTime: entry.publishedAt,
      modifiedTime: entry.updatedAt ?? entry.publishedAt,
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: title || slug,
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

  const cmsData = await fetchCmsPostBySlug(slug);
  const post = cmsData ? cmsArticleToBlogPost(cmsData.post) : getBlogPost(slug);

  if (!post) {
    notFound();
  }

  let title = post.title && post.title !== post.slug ? post.title : "";
  let metaDescription = post.excerpt || "";

  try {
    const t = await getTranslations({ locale, namespace: "blogPosts" });
    if (!title) {
      if (t.has(`${post.slug}.title` as never)) {
        title = t(`${post.slug}.title` as never);
      }
    }
    if (!metaDescription) {
      if (t.has(`${post.slug}.metaDescription` as never)) {
        metaDescription = t(`${post.slug}.metaDescription` as never);
      }
    }
  } catch {
    // Dynamic post without static translation file
  }

  if (!title) {
    title = post.title || post.slug;
  }

  const tPeople = await getTranslations({ locale, namespace: "blogPeople" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const url = localizedUrl(locale, blogHref(post.slug));

  let authorName = post.authorName;
  if (!authorName) {
    try {
      authorName = tPeople(`authors.${post.author}.name` as never);
    } catch {
      authorName = typeof post.author === "string" ? post.author : "Optimark Team";
    }
  }

  const blogPosting = blogPostingJsonLd({
    headline: title || post.slug,
    description: metaDescription,
    url,
    locale,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    cover: post.cover,
    keywords: post.tags.map((tag) => {
      try {
        return (tBlog as unknown as (k: string) => string)(`tags.${tag}`) || tag;
      } catch {
        return tag;
      }
    }),
    author: {
      name: authorName,
      url: localizedUrl(locale, authorHref(post.author)),
    },
  });

  const relatedPosts = cmsData?.relatedPosts
    ? cmsData.relatedPosts.map(cmsArticleToBlogPost)
    : undefined;

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={blogPosting} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tBlog("profile.breadcrumbHome"), url: localizedUrl(locale, "/") },
          { name: tBlog("profile.breadcrumbBlog"), url: localizedUrl(locale, "/blog") },
          { name: title || post.slug, url },
        ])}
      />
      <Header subnav={<BlogTocBar slug={post.slug} content={post.content} />} />
      <main className="relative pt-36 sm:pt-40 lg:pt-24">
        <BlogPostView slug={post.slug} initialPost={post} relatedPosts={relatedPosts} />
      </main>
      <Footer />
      <ScrollUpButton threshold={SCROLL_UP_THRESHOLD} />
    </div>
  );
}
