import { NextRequest, NextResponse } from "next/server";
import { COMMENT_CONFIG, INITIAL_APPROVED_COMMENTS } from "@/config/comments";
import { validateCommentSubmission } from "@/lib/comments";
import type { BlogComment, CommentSubmissionPayload } from "@/types/comment";

// In-memory runtime cache for approved and pending comments (used before CMS integration)
const runtimeApprovedComments = new Map<string, BlogComment[]>();
const runtimePendingComments = new Map<string, BlogComment[]>();

// Initialize default approved comments
for (const [slug, list] of Object.entries(INITIAL_APPROVED_COMMENTS)) {
  runtimeApprovedComments.set(slug, [...list]);
}

/**
 * GET /api/blog/comments?slug={slug}
 * Retrieves approved comments for a specific blog post.
 * If CMS_COMMENT_API_URL is configured, proxies to the headless CMS.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Parameter 'slug' diperlukan." },
        { status: 400 },
      );
    }

    // 1. If CMS API is configured via environment, proxy the request to CMS
    if (COMMENT_CONFIG.cmsApiUrl) {
      try {
        const cmsUrl = new URL(COMMENT_CONFIG.cmsApiUrl);
        cmsUrl.searchParams.set("slug", slug);

        const response = await fetch(cmsUrl.toString(), {
          headers: {
            Accept: "application/json",
            ...(process.env.CMS_API_KEY
              ? { Authorization: `Bearer ${process.env.CMS_API_KEY}` }
              : {}),
          },
          cache: "no-store",
        });

        if (response.ok) {
          const cmsData = await response.json();
          return NextResponse.json({ success: true, data: Array.isArray(cmsData) ? cmsData : [] });
        }
      } catch (cmsError) {
        console.error("Failed to fetch from CMS, falling back to local store:", cmsError);
      }
    }

    // 2. Standalone fallback: return approved comments from memory/static store
    const comments = runtimeApprovedComments.get(slug) || [];
    return NextResponse.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("Error in GET /api/blog/comments:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}

/**
 * POST /api/blog/comments
 * Submits a new comment for editorial moderation.
 * Enforces anti-spam checks (honeypot, timing, format) before queuing.
 * If CMS_COMMENT_API_URL is configured, forwards to the headless CMS.
 */
export async function POST(request: NextRequest) {
  try {
    const payload: CommentSubmissionPayload = await request.json();

    // 1. Validate submission and check anti-spam (Honeypot + Timing + Heuristics)
    const validation = validateCommentSubmission(payload);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error,
          isSpam: validation.isSpam,
        },
        { status: 400 },
      );
    }

    // 2. Anti-spam CAPTCHA check if reCAPTCHA or Turnstile secret is configured
    if (process.env.RECAPTCHA_SECRET_KEY && payload.captchaToken) {
      try {
        const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${payload.captchaToken}`,
        });
        const verifyJson = await verifyRes.json();
        if (!verifyJson.success) {
          return NextResponse.json(
            { success: false, error: "Verifikasi anti-spam reCAPTCHA gagal.", isSpam: true },
            { status: 400 },
          );
        }
      } catch (captchaErr) {
        console.error("Captcha verification error:", captchaErr);
      }
    }

    // 3. If CMS API is configured, forward the submission to CMS
    if (COMMENT_CONFIG.cmsApiUrl) {
      try {
        const cmsRes = await fetch(COMMENT_CONFIG.cmsApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(process.env.CMS_API_KEY
              ? { Authorization: `Bearer ${process.env.CMS_API_KEY}` }
              : {}),
          },
          body: JSON.stringify({
            slug: payload.slug,
            authorName: payload.authorName.trim(),
            authorEmail: payload.authorEmail.trim(),
            authorWebsite: payload.authorWebsite?.trim() || undefined,
            content: payload.content.trim(),
            parentId: payload.parentId || undefined,
          }),
        });

        if (cmsRes.ok) {
          const cmsResult = await cmsRes.json();
          return NextResponse.json({
            success: true,
            status: "PENDING",
            message: "Komentar berhasil dikirim ke CMS dan sedang menunggu moderasi.",
            data: cmsResult,
          });
        }
      } catch (cmsPostErr) {
        console.error("Failed to submit comment to CMS, storing locally:", cmsPostErr);
      }
    }

    // 4. Standalone fallback: Queue comment as PENDING moderation (AC-03)
    const newComment: BlogComment = {
      id: `cm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      slug: payload.slug,
      authorName: payload.authorName.trim(),
      authorEmail: payload.authorEmail.trim(),
      authorWebsite: payload.authorWebsite?.trim() || undefined,
      content: payload.content.trim(),
      createdAt: new Date().toISOString(),
      status: "PENDING",
      parentId: payload.parentId || null,
    };

    const pendingList = runtimePendingComments.get(payload.slug) || [];
    pendingList.push(newComment);
    runtimePendingComments.set(payload.slug, pendingList);

    return NextResponse.json(
      {
        success: true,
        status: "PENDING",
        message:
          "Komentar Anda telah terkirim dan sedang menunggu moderasi tim editorial sebelum ditampilkan.",
        data: newComment,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST /api/blog/comments:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat memproses komentar." },
      { status: 500 },
    );
  }
}
