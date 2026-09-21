import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import { contactEmailHtml, contactEmailText } from "@/lib/emailTemplates";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s()-]{6,19}$/;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!firstName) fieldErrors.firstName = "First name is required.";
  if (!lastName) fieldErrors.lastName = "Last name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "Enter a valid email address.";
  // Contact number is optional, but if provided it must look like a real number.
  if (phone && !PHONE_PATTERN.test(phone)) fieldErrors.phone = "Enter a valid contact number.";
  if (!message) fieldErrors.message = "Message is required.";
  else if (message.length > MAX_MESSAGE_LENGTH) fieldErrors.message = "Message is too long.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", fieldErrors }, { status: 400 });
  }

  const fromAddress = process.env.EMAIL_FROM;
  const contactInbox = process.env.CONTACT_INBOX_EMAIL || process.env.CAREERS_INBOX_EMAIL;

  if (!process.env.RESEND_API_KEY || !fromAddress || !contactInbox) {
    console.error("Missing Resend configuration environment variables.");
    return NextResponse.json({ error: "Email is not configured on the server." }, { status: 500 });
  }

  const name = `${firstName} ${lastName}`.trim();
  const templateData = { name, email, phone: phone || undefined, message };

  try {
    await sendEmail({
      from: `Avenza Website <${fromAddress}>`,
      to: contactInbox,
      replyTo: email,
      subject: `New contact request — ${name}`,
      text: contactEmailText(templateData),
      html: contactEmailHtml(templateData),
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
