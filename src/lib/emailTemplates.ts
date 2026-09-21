type ApplicationEmailData = {
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  resumeFileName: string;
};

type ContactEmailData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8e6e1;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b6f76;width:140px;vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e6e1;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0a0a0a;vertical-align:top;">
        ${value}
      </td>
    </tr>`;
}

export function applicationEmailHtml(data: ApplicationEmailData) {
  const rows = [
    detailRow("Role", escapeHtml(data.jobTitle)),
    detailRow("Name", escapeHtml(data.name)),
    detailRow(
      "Email",
      `<a href="mailto:${escapeHtml(data.email)}" style="color:#ff8a2b;text-decoration:none;">${escapeHtml(data.email)}</a>`
    ),
    detailRow("Phone", escapeHtml(data.phone)),
    data.linkedin
      ? detailRow(
          "LinkedIn / Portfolio",
          `<a href="${escapeHtml(data.linkedin)}" style="color:#ff8a2b;text-decoration:none;">${escapeHtml(data.linkedin)}</a>`
        )
      : "",
    detailRow("Resume", escapeHtml(data.resumeFileName)),
  ].join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New job application</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f3f0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f3f0;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e6e1;">
            <tr>
              <td style="background-color:#06070a;padding:24px 32px;">
                <span style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#ff8a2b;">avenza</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#ff8a2b;">
                  New Application
                </p>
                <h1 style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:#0a0a0a;">
                  ${escapeHtml(data.jobTitle)}
                </h1>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>
                <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#6b6f76;">
                  The candidate's resume is attached to this email. Reply directly
                  to this message to reach the applicant — their email address is
                  already set as the reply-to.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;background-color:#f4f3f0;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#9a9da3;">
                  Sent automatically from the Avenza Consulting careers page.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function applicationEmailText(data: ApplicationEmailData) {
  return [
    `New application — ${data.jobTitle}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    data.linkedin ? `LinkedIn / portfolio: ${data.linkedin}` : null,
    `Resume: ${data.resumeFileName} (attached)`,
    "",
    "Reply to this email to reach the applicant directly.",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function contactEmailHtml(data: ContactEmailData) {
  const rows = [
    detailRow("Name", escapeHtml(data.name)),
    detailRow(
      "Email",
      `<a href="mailto:${escapeHtml(data.email)}" style="color:#ff8a2b;text-decoration:none;">${escapeHtml(data.email)}</a>`
    ),
    data.phone ? detailRow("Phone", escapeHtml(data.phone)) : "",
  ].join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New contact form submission</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f3f0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f3f0;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e6e1;">
            <tr>
              <td style="background-color:#06070a;padding:24px 32px;">
                <span style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#ff8a2b;">avenza</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#ff8a2b;">
                  New Contact Request
                </p>
                <h1 style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:#0a0a0a;">
                  ${escapeHtml(data.name)}
                </h1>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>
                <p style="margin:20px 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#6b6f76;">
                  Message
                </p>
                <p style="margin:0;padding:14px;background-color:#f4f3f0;border-radius:8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#0a0a0a;white-space:pre-wrap;">
                  ${escapeHtml(data.message)}
                </p>
                <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#6b6f76;">
                  Reply directly to this message to reach them — their email
                  address is already set as the reply-to.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;background-color:#f4f3f0;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#9a9da3;">
                  Sent automatically from the Avenza Consulting contact page.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function contactEmailText(data: ContactEmailData) {
  return [
    "New contact request",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    "",
    "Message:",
    data.message,
    "",
    "Reply to this email to reach them directly.",
  ]
    .filter((line) => line !== null)
    .join("\n");
}
