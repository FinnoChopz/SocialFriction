import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGE_CHARS = 6000;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as null | {
      email?: unknown;
      message?: unknown;
      page?: unknown;
      hp?: unknown;
    };

    const honeypot = typeof body?.hp === "string" ? body.hp.trim() : "";
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const page = typeof body?.page === "string" ? body.page.trim() : "";

    if (!message || message.length < 10) {
      return NextResponse.json({ error: "Please include a bit more detail." }, { status: 400 });
    }
    if (message.length > MAX_MESSAGE_CHARS) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }
    if (email && !isValidEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid email address (or leave it blank)." }, { status: 400 });
    }

    const toEmail = process.env.FEEDBACK_TO_EMAIL?.trim() || "fmccooe@gmail.com";
    const subject = `Friction Project feedback${page ? ` (${page})` : ""}`;
    const text = [
      `Page: ${page || "unknown"}`,
      `Email (optional): ${email || "not provided"}`,
      "",
      message,
      "",
      "---",
      `Timestamp: ${new Date().toISOString()}`,
    ].join("\n");

    const resendKey = process.env.RESEND_API_KEY?.trim();
    const webhookUrl = process.env.FEEDBACK_WEBHOOK_URL?.trim();

    if (resendKey) {
      const from = process.env.FEEDBACK_FROM_EMAIL?.trim() || "Friction Feedback <onboarding@resend.dev>";
      const reply_to = email || undefined;
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [toEmail],
          subject,
          text,
          ...(reply_to ? { reply_to } : {}),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        return NextResponse.json(
          { error: `Failed to send feedback email (${response.status}). ${errorText}`.trim() },
          { status: 500 }
        );
      }

      return NextResponse.json({ ok: true, delivered: "email" });
    }

    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          toEmail,
          page,
          email: email || null,
          message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        return NextResponse.json(
          { error: `Failed to deliver feedback (${response.status}). ${errorText}`.trim() },
          { status: 500 }
        );
      }

      return NextResponse.json({ ok: true });
    }

    console.log("[feedback]", { toEmail, page, email: email || null, message });
    return NextResponse.json({ ok: true, delivered: "logged" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error." },
      { status: 500 }
    );
  }
}
