import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [messages, privacyPolicy, termsOfService, blogPosts] = await Promise.all([
    import(`../messages/${locale}.json`),
    import(`../messages/${locale}/privacy-policy.json`),
    import(`../messages/${locale}/terms-of-service.json`),
    import(`../messages/${locale}/blog-posts.json`),
  ]);

  return {
    locale,
    messages: {
      ...messages.default,
      privacyPolicy: privacyPolicy.default,
      termsOfService: termsOfService.default,
      blogPosts: blogPosts.default,
    },
  };
});
