import nodemailer from "nodemailer";

type RsvpEmailPayload = {
  name: string;
  attending: boolean;
  intolerances?: string | null;
  message?: string | null;
};

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = (process.env.SMTP_SECURE ?? "true") === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function sendRsvpEmail(payload: RsvpEmailPayload) {
  const transporter = getTransporter();
  const to = process.env.RSVP_NOTIFY_TO;
  const from = process.env.RSVP_NOTIFY_FROM ?? process.env.SMTP_USER;

  if (!transporter || !to || !from) {
    console.warn("[mail] SMTP not configured — skipping RSVP email.");
    return { sent: false, reason: "SMTP not configured" };
  }

  const status = payload.attending ? "Attending ✓" : "Cannot attend";
  const subject = `RSVP — ${payload.name} (${status})`;

  const html = `
    <div style="font-family: Georgia, serif; color:#2b2724; padding:24px;">
      <h2 style="font-weight:400; letter-spacing:0.05em;">New RSVP Received</h2>
      <table cellpadding="8" style="border-collapse:collapse; font-size:14px;">
        <tr><td style="color:#6b5f4d;">Name</td><td><strong>${escapeHtml(payload.name)}</strong></td></tr>
        <tr><td style="color:#6b5f4d;">Attending</td><td>${status}</td></tr>
        <tr><td style="color:#6b5f4d;">Food intolerances</td><td>${escapeHtml(payload.intolerances ?? "—")}</td></tr>
        <tr><td style="color:#6b5f4d;">Message</td><td>${escapeHtml(payload.message ?? "—")}</td></tr>
      </table>
    </div>
  `;

  const text = [
    "New RSVP Received",
    `Name: ${payload.name}`,
    `Attending: ${status}`,
    `Food intolerances: ${payload.intolerances ?? "-"}`,
    `Message: ${payload.message ?? "-"}`,
  ].join("\n");

  await transporter.sendMail({ from, to, subject, html, text });
  return { sent: true };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
