export type CommentStatus = "APPROVED" | "PENDING" | "SPAM" | "REJECTED";

export interface BlogComment {
  id: string;
  slug: string;
  authorName: string;
  authorEmail?: string;
  authorWebsite?: string;
  avatarUrl?: string;
  content: string;
  createdAt: string;
  status: CommentStatus;
  likes?: number;
  parentId?: string | null;
  replies?: BlogComment[];
}

export interface CommentSubmissionPayload {
  slug: string;
  authorName: string;
  authorEmail: string;
  authorWebsite?: string;
  content: string;
  parentId?: string | null;
  hpWebsite?: string;
  captchaToken?: string;
  renderedAt?: number;
}

export interface CommentApiResponse {
  success: boolean;
  message?: string;
  data?: BlogComment | BlogComment[];
  error?: string;
}
