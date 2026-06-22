export type PrivacyListItem = string | { html: string; subitems?: string[] };

export type PrivacyBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text?: string; html?: string }
  | { type: "ul"; items: PrivacyListItem[] };

export interface PrivacyPolicyMessages {
  blocks: PrivacyBlock[];
}
