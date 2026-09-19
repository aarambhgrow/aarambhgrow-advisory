import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    if (!fullName || !email || !message) {
      return Response.json(
        {
          success: false,
          message: "Full name, email and message are required.",
        },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: email,

      subject: subject ? `New Contact Inquiry - ${subject}` : "New Contact Inquiry - AarambhGrow Advisory",

      html: `
        <div style="max-width:650px;margin:0 auto;font-family:Arial,sans-serif;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">

          <div style="background:#03254C;padding:25px;">
            <h2 style="margin:0;color:#ffffff;font-size:22px;">
              New Contact Form Submission
            </h2>

            <p style="margin:8px 0 0;color:#dbeafe;font-size:14px;">
              AarambhGrow Advisory
            </p>
          </div>

          <div style="padding:25px;">

            <h3 style="color:#03254C;">
              Contact Details
            </h3>

            <p>
              <strong>Full Name:</strong>
              ${escapeHtml(fullName)}
            </p>

            <p>
              <strong>Email:</strong>
              ${escapeHtml(email)}
            </p>

            <p>
              <strong>Phone:</strong>
              ${escapeHtml(phone || "Not provided")}
            </p>

            <p>
              <strong>Subject:</strong>
              ${escapeHtml(subject || "Not selected")}
            </p>

            <h3 style="color:#03254C;margin-top:25px;">
              Message
            </h3>

            <div style="background:#f8fafc;border-left:4px solid #F26522;padding:15px;color:#475569;line-height:1.6;">
              ${escapeHtml(message).replace(/\n/g, "<br />")}
            </div>

            <p style="margin-top:25px;padding-top:15px;border-top:1px solid #e5e7eb;color:#94a3b8;font-size:12px;">
              This message was submitted through the AarambhGrow Advisory website.
            </p>

          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);

      return Response.json(
        {
          success: false,
          message: error.message || "Failed to send email.",
        },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      message: "Your message has been sent successfully.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 },
    );
  }
}

function escapeHtml(value = "") {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
