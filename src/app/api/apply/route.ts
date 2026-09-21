import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { applicationEmailHtml, applicationEmailText } from "@/lib/emailTemplates";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s()-]{6,19}$/;

function hasAllowedExtension(filename: string) {
  const lower = filename.toLowerCase();
  return ALLOWED_RESUME_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const jobTitle = String(formData.get("jobTitle") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const linkedin = String(formData.get("linkedin") ?? "").trim();
  const resume = formData.get("resume");

  const fieldErrors: Record<string, string> = {};
  if (!jobTitle) fieldErrors.job = "Role is required.";
  if (!name) fieldErrors.name = "Name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (!phone) fieldErrors.phone = "Contact number is required.";
  else if (!PHONE_PATTERN.test(phone)) fieldErrors.phone = "Enter a valid contact number.";

  if (!(resume instanceof File) || resume.size === 0) {
    fieldErrors.resume = "Resume is required.";
  } else {
    const typeOk = ALLOWED_RESUME_TYPES.has(resume.type) || hasAllowedExtension(resume.name);
    if (!typeOk) {
      fieldErrors.resume = "Resume must be a PDF or Word document (.pdf, .doc, .docx).";
    } else if (resume.size > MAX_RESUME_BYTES) {
      fieldErrors.resume = "Resume must be 5MB or smaller.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", fieldErrors }, { status: 400 });
  }

  const resumeFile = resume as File;
  const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const careersInbox = process.env.CAREERS_INBOX_EMAIL;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !careersInbox) {
    console.error("Missing SMTP configuration environment variables.");
    return NextResponse.json({ error: "Email is not configured on the server." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: smtpUser, pass: smtpPass },
  });

  const templateData = {
    jobTitle,
    name,
    email,
    phone,
    linkedin: linkedin || undefined,
    resumeFileName: resumeFile.name,
  };

  try {
    await transporter.sendMail({
      from: `"Avenza Careers" <${smtpUser}>`,
      to: careersInbox,
      replyTo: email,
      subject: `New application: ${jobTitle} — ${name}`,
      text: applicationEmailText(templateData),
      html: applicationEmailHtml(templateData),
      attachments: [
        {
          filename: resumeFile.name,
          content: resumeBuffer,
        },
      ],
    });
  } catch (error) {
    console.error("Failed to send application email:", error);
    return NextResponse.json({ error: "Failed to send application. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
