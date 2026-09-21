import { SITE_URL, ORGANIZATION_NAME } from "@/app/data/site";

const NAVY = "#03254C";
const ORANGE = "#F26522";
const LOGO_URL = `${SITE_URL}/images/logo.png`;

const SERVICE_LABELS = {
  "company-incorporation": "Company Incorporation",
  "msme-udyam-registration": "MSME / Udyam Registration",
  "gst-registration": "GST Registration",
  "income-tax-itr-filing": "Income Tax / ITR Filing",
  "mca-annual-filing-roc-compliance": "MCA Annual Filing / ROC Compliance",
  dsc: "DSC (Digital Signature Certificate)",
  "startup-india-dpiit-recognition": "Startup India / DPIIT Recognition",
  "labour-licence": "Labour Licence",
  "fssai-licence": "FSSAI Licence",
  "iso-certification": "ISO Certification",
  "trademark-registration": "Trademark Registration",
  "zed-certification": "ZED Certification",
  "80iac-tax-exemption": "80IAC Tax Exemption",
  other: "Other Requirement",
};

export function serviceLabel(value) {
  return SERVICE_LABELS[value] || value || "Not specified";
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shell(innerHtml) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px 12px;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:${NAVY};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="background:${NAVY};padding:24px;text-align:center;">
          <img src="${LOGO_URL}" alt="${ORGANIZATION_NAME}" width="180" style="display:block;margin:0 auto;max-width:180px;height:auto;" />
        </td>
      </tr>
      <tr>
        <td style="padding:28px 24px;">${innerHtml}</td>
      </tr>
      <tr>
        <td style="background:#f1f5f9;padding:18px 24px;text-align:center;font-size:11px;color:#64748b;">
          ${ORGANIZATION_NAME} · 813, Silver Radiance 4, SG Highway, Ahmedabad, Gujarat 380060<br />
          <a href="${SITE_URL}" style="color:${ORANGE};text-decoration:none;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function row(label, value) {
  return `<tr>
    <td style="padding:8px 0;font-size:12px;font-weight:bold;color:${NAVY};width:140px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;font-size:13px;color:#334155;">${escapeHtml(value) || "-"}</td>
  </tr>`;
}

export function adminEmailHtml({ fullName, email, phone, subject, message }) {
  return shell(`
    <h1 style="margin:0 0 4px;font-size:20px;color:${NAVY};">New Contact Enquiry</h1>
    <p style="margin:0 0 20px;font-size:12px;color:#64748b;">A new message was submitted from the website contact form.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;">
      ${row("Full Name", fullName)}
      ${row("Email", email)}
      ${row("Phone", phone)}
      ${row("Service", serviceLabel(subject))}
    </table>
    <div style="margin-top:20px;padding:16px;background:#f8fafc;border-left:3px solid ${ORANGE};border-radius:4px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:bold;color:${NAVY};">Message</p>
      <p style="margin:0;font-size:13px;line-height:1.6;color:#334155;white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
    <a href="mailto:${escapeHtml(email)}" style="display:inline-block;margin-top:22px;background:${ORANGE};color:#ffffff;font-size:12px;font-weight:bold;padding:12px 22px;border-radius:6px;text-decoration:none;">Reply to ${escapeHtml(fullName)}</a>
  `);
}

export function userEmailHtml({ fullName, subject, message }) {
  return shell(`
    <h1 style="margin:0 0 12px;font-size:20px;color:${NAVY};">Thank you, ${escapeHtml(fullName)}!</h1>
    <p style="margin:0 0 16px;font-size:13px;line-height:1.7;color:#334155;">
      We have received your enquiry regarding <strong style="color:${ORANGE};">${escapeHtml(serviceLabel(subject))}</strong>.
      Our advisory team will review it and get back to you within one business day.
    </p>
    <div style="padding:16px;background:#f8fafc;border-left:3px solid ${ORANGE};border-radius:4px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:bold;color:${NAVY};">Your message</p>
      <p style="margin:0;font-size:13px;line-height:1.6;color:#334155;white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
    <p style="margin:20px 0 0;font-size:13px;color:#334155;">Warm regards,<br /><strong>${ORGANIZATION_NAME}</strong></p>
  `);
}
