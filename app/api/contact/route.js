import { Resend } from "resend";
import { adminEmailHtml, userEmailHtml, serviceLabel } from "@/app/lib/emailTemplates";
import { ORGANIZATION_NAME } from "@/app/data/site";

const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL;

export async function POST(request) {
  try {
    if (!process.env.RESEND_API_KEY || !TO_EMAIL) {
      console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL env var.");
      return Response.json({ success: false, message: "Email service is not configured." }, { status: 500 });
    }

    const body = await request.json();
    const fullName = (body.fullName || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const subject = (body.subject || "").trim();
    const message = (body.message || "").trim();

    if (!fullName || !email || !message) {
      return Response.json({ success: false, message: "Name, email and message are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const payload = { fullName, email, phone, subject, message };

    const { error } = await resend.emails.send({
      from: `${ORGANIZATION_NAME} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New Enquiry: ${serviceLabel(subject)} — ${fullName}`,
      html: adminEmailHtml(payload),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ success: false, message: "Failed to send message." }, { status: 502 });
    }

    // Acknowledgement to the visitor — failure here should not fail the request.
    try {
      await resend.emails.send({
        from: `${ORGANIZATION_NAME} <${FROM_EMAIL}>`,
        to: [email],
        subject: `We received your enquiry — ${ORGANIZATION_NAME}`,
        html: userEmailHtml(payload),
      });
    } catch (ackError) {
      console.error("Acknowledgement email failed:", ackError);
    }

    return Response.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact route error:", error);
    return Response.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
