import type messages from "../messages/id.json";
import type { routing } from "../i18n/routing";
import type { PrivacyPolicyMessages } from "./privacy-policy";
import type { BlogPostsMessages } from "./blog";

type Messages = typeof messages & {
  privacyPolicy: PrivacyPolicyMessages;
  termsOfService: PrivacyPolicyMessages;
  blogPosts: BlogPostsMessages;
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: Messages;
  }
}

export type AppMessages = Messages;
