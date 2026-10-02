import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import {
  BLOG_REVIEWER_IDS,
  BLOG_PERSON_LINKEDIN,
  BLOG_PERSON_PHOTOS,
  reviewerHref,
  isBlogReviewerId,
} from "@/config/blog";
import {
  breadcrumbJsonLd,
  firstParagraph,
  localeAlternates,
  localizedUrl,
  profilePageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { BlogProfileView } from "@/components/BlogProfileView";
import { Footer } from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => BLOG_REVIEWER_IDS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  if (!isBlogReviewerId(slug)) return {};

  const tProfile = await getTranslations({ locale, namespace: "blog.profile" });
  const tPerson = await getTranslations({ locale, namespace: `blogPeople.reviewers.${slug}` });

  const title = tProfile("reviewerMetaTitle", { name: tPerson("name") });
  const description = firstParagraph(tPerson("bio"));
  const ogImage = buildOgImageUrl({ title, description, locale });

  return {
    title,
    description,
    alternates: localeAlternates(locale, reviewerHref(slug)),
    openGraph: {
      title,
      description,
      type: "profile",
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
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function BlogReviewerPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  if (!isBlogReviewerId(slug)) {
    notFound();
  }

  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const tPerson = await getTranslations({ locale, namespace: `blogPeople.reviewers.${slug}` });
  const name = tPerson("name");
  const url = localizedUrl(locale, reviewerHref(slug));

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tBlog("profile.breadcrumbHome"), url: localizedUrl(locale, "/") },
          { name: tBlog("profile.breadcrumbBlog"), url: localizedUrl(locale, "/blog") },
          { name, url },
        ])}
      />
      <JsonLd
        data={profilePageJsonLd({
          url,
          name,
          jobTitle: tPerson("role"),
          description: firstParagraph(tPerson("bio")),
          image: BLOG_PERSON_PHOTOS[slug],
          knowsAbout: tPerson.raw("expertise") as string[],
          sameAs: BLOG_PERSON_LINKEDIN[slug] || undefined,
        })}
      />
      <Header />
      <main className="relative pt-24">
        <BlogProfileView kind="reviewer" id={slug} />
      </main>
      <Footer />
    </div>
  );
}
