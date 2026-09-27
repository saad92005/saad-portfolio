import { Resend } from "resend";
import { contactSchema } from "@/lib/contactSchema";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "saad39587@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return Response.json(
      { error: "The contact form isn't configured yet. Please email directly instead." },
      { status: 503 }
    );
  }

  const { name, email, subject, brief } = parsed.data;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: subject?.trim() ? subject.trim() : `New project inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${brief}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(
        brief
      ).replace(/\n/g, "<br />")}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Couldn't send your message. Please try again shortly." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return Response.json({ error: "Couldn't send your message. Please try again shortly." }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
