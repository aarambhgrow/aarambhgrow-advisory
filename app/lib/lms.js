import { SITE_URL, ORGANIZATION_NAME } from "@/app/data/site";
import { serviceLabel } from "@/app/lib/emailTemplates";

const LMS_TIMEOUT_MS = 8000;

/*
  Pushes a contact-form enquiry into the LMS (POST /api/external/leads).
  Returns true when the LMS accepted the lead; never throws.
*/
export async function pushLeadToLms({ fullName, email, phone, subject, message, consentNote }) {
  const url = process.env.LMS_API_URL;
  const secret = process.env.LMS_INTERNAL_SECRET;

  if (!url || !secret) {
    console.error("Missing LMS_API_URL or LMS_INTERNAL_SECRET env var.");
    return false;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": secret,
      },
      body: JSON.stringify({
        name: fullName,
        email,
        phone,
        // The LMS has no consent field yet, so the consent record travels in the message.
        message: `${subject ? `[${serviceLabel(subject)}] ` : ""}${message}\n\n[Consent] ${consentNote}`,
        domain: new URL(SITE_URL).hostname,
        source: ORGANIZATION_NAME,
      }),
      signal: AbortSignal.timeout(LMS_TIMEOUT_MS),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`LMS rejected lead (${res.status}):`, await res.text().catch(() => ""));
      return false;
    }

    return true;
  } catch (error) {
    console.error("LMS request failed:", error);
    return false;
  }
}
