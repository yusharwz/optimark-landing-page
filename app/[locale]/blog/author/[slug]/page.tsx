import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { resolveLocale } from "@/lib/locale";
import { buildOgImageUrl } from "@/lib/og";
import {
  BLOG_AUTHOR_IDS,
  BLOG_PERSON_LINKEDIN,
  BLOG_PERSON_PHOTOS,
  authorHref,
  isBlogAuthorId,
  getPostsByAuthor,
  type BlogAuthorId,
  type BlogPost,
} from "@/config/blog";
import {
  breadcrumbJsonLd,
  defaultRobots,
  firstParagraph,
  localeAlternates,
  localizedUrl,
  profilePageJsonLd,
} from "@/lib/seo";
import {
  fetchCmsPersonBySlug,
  cmsArticleToBlogPost,
  type CmsArticleSummary,
} from "@/lib/cms";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { BlogProfileView } from "@/components/BlogProfileView";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => BLOG_AUTHOR_IDS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);

  const cmsPerson = await fetchCmsPersonBySlug(slug);
  const isStatic = isBlogAuthorId(slug);

  if (!cmsPerson && !isStatic) return {};

  const tProfile = await getTranslations({ locale, namespace: "blog.profile" });
  let fullName = slug;
  let description = "";

  if (cmsPerson) {
    fullName = cmsPerson.name;
    const rawBio = locale === "en" ? cmsPerson.bioEn || cmsPerson.bio : cmsPerson.bioId || cmsPerson.bio;
    description = firstParagraph(rawBio || `Profil penulis editorial Optimark: ${fullName}.`);
  } else if (isStatic) {
    const tPeople = await getTranslations({ locale, namespace: "blogPeople" });
    const tPerson = (k: string) => (tPeople as unknown as (k: string) => string)(`authors.${slug}.${k}`);
    fullName = tPerson("fullName");
    description = firstParagraph(tPerson("bio"));
  }

  const title = tProfile("authorMetaTitle", { name: fullName });
  const ogImage = buildOgImageUrl({ title, description, locale });
  const canonicalUrl = localizedUrl(locale, authorHref(slug));

  return {
    title,
    description,
    robots: defaultRobots(true),
    alternates: localeAlternates(locale, authorHref(slug)),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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

export default async function BlogAuthorPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);

  const cmsPerson = await fetchCmsPersonBySlug(slug);
  const isStatic = isBlogAuthorId(slug);

  if (!cmsPerson && !isStatic) {
    notFound();
  }

  const tBlog = await getTranslations({ locale, namespace: "blog" });
  let name = slug;
  let role = "Author";
  let bio = "";
  let image = "";
  let expertise: string[] = [];
  let linkedin: string | undefined;

  if (cmsPerson) {
    name = cmsPerson.name;
    role = (locale === "en" ? cmsPerson.roleEn || cmsPerson.role : cmsPerson.roleId || cmsPerson.role) || "Author";
    bio = (locale === "en" ? cmsPerson.bioEn || cmsPerson.bio : cmsPerson.bioId || cmsPerson.bio) || "";
    image = cmsPerson.avatarUrl || "";
    expertise = locale === "en"
      ? cmsPerson.expertiseEn?.length ? cmsPerson.expertiseEn : cmsPerson.expertiseId || []
      : cmsPerson.expertiseId?.length ? cmsPerson.expertiseId : cmsPerson.expertiseEn || [];
    linkedin =
      cmsPerson.linkedinUrl ||
      (BLOG_PERSON_LINKEDIN as Record<string, string>)[slug] ||
      undefined;
  } else {
    const tPeople = await getTranslations({ locale, namespace: "blogPeople" });
    const tPerson = (k: string) => (tPeople as unknown as (k: string) => string)(`authors.${slug}.${k}`);
    name = tPerson("fullName");
    role = tPerson("role");
    bio = tPerson("bio");
    image = BLOG_PERSON_PHOTOS[slug as keyof typeof BLOG_PERSON_PHOTOS] || "";
    expertise = (tPeople.raw(`authors.${slug}.expertise` as never) as string[]) || [];
    linkedin = (BLOG_PERSON_LINKEDIN as Record<string, string>)[slug] || undefined;
  }

  const url = localizedUrl(locale, authorHref(slug));

  // Collect articles: CMS articles first, then merge static fallback if any
  const cmsArticles = (cmsPerson?.authoredArticles || []).map((item) =>
    cmsArticleToBlogPost(item as unknown as CmsArticleSummary),
  );
  const staticArticles = isStatic ? getPostsByAuthor(slug as BlogAuthorId) : [];
  const articleMap = new Map<string, BlogPost>();
  for (const a of [...cmsArticles, ...staticArticles]) {
    if (!articleMap.has(a.slug)) {
      articleMap.set(a.slug, a);
    }
  }
  const initialPosts = Array.from(articleMap.values());

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
          jobTitle: role,
          description: firstParagraph(bio || `Profil penulis editorial Optimark: ${name}.`),
          image: image || undefined,
          knowsAbout: expertise,
          sameAs: linkedin,
        })}
      />
      <Header />
      <main className="relative pt-24">
        <BlogProfileView
          kind="author"
          id={slug}
          cmsPerson={cmsPerson}
          initialPosts={initialPosts}
        />
      </main>
      <Footer />
    </div>
  );
}
