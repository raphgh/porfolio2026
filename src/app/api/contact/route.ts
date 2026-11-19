import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";

export const runtime = "nodejs";

type ContactBody = {
  name?: string;
  message?: string;
  website?: string; // honeypot
};

function sanitize(input: string, max: number) {
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is not configured yet. Add RESEND_API_KEY." },
      { status: 503 },
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill hidden fields - silently succeed
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(String(body.name ?? ""), 80);
  const message = sanitize(String(body.message ?? ""), 4000);

  if (message.length < 2) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL || site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: name ? `Portfolio message from ${name}` : "Portfolio message",
    text: [
      name ? `From: ${name}` : "From: (no name)",
      "",
      message,
      "",
      ` -  sent via ${site.url}`,
    ].join("\n"),
  });

  if (error) {
    console.error("contact email failed", error);
    return NextResponse.json({ error: "Could not send email. Try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
