import { ORGANIZATION_NAME } from "./site";

const EMAIL = "info@aarambhgrow.com";
const WEBSITE = "aarambhgrow.com";

/*
  Content for the Privacy Policy and Terms of Service pages.
  Each section is a list of blocks: { text, label? }, { list }, { heading } or { email }.
*/

export const privacyPolicy = {
  badge: "Legal",
  title: "Privacy Policy",
  subtitle: "How we collect, use, and protect your information",
  intro: [
    `${ORGANIZATION_NAME} is committed to protecting the privacy and confidentiality of all users accessing ${WEBSITE}. This Privacy Policy explains how we collect, use, store, and safeguard your information.`,
  ],
  sections: [
    {
      title: "1. Purpose",
      blocks: [
        {
          text: `${ORGANIZATION_NAME} empowers startups, entrepreneurs, MSMEs, and established companies by providing consultancy, certification, compliance, tender, and advisory services. We are committed to handling all personal and business information with transparency, responsibility, and due care.`,
        },
      ],
    },
    {
      title: "2. Applicability",
      blocks: [
        {
          text: `This Privacy Policy applies only to online activities conducted through our website and is valid for visitors with respect to information shared and/or collected by ${ORGANIZATION_NAME}.`,
        },
      ],
    },
    {
      title: "3. Information Collected",
      blocks: [
        { heading: "3.1 Information You Provide" },
        {
          list: [
            "Name, email address, phone number",
            "Organization and business details",
            "Documents submitted for registrations or compliance",
            "Survey responses, inquiries, and communication records",
          ],
        },
        { heading: "3.2 Automatically Collected Information" },
        {
          list: [
            "IP address and browser type",
            "Device, operating system, and network information",
            "Pages visited before and after accessing our website",
            "Date, time, and usage statistics",
          ],
        },
        { heading: "3.3 Additional Information During Services" },
        {
          text: "During service delivery, we may additionally collect address details, service usage records, payment transaction references, and records of communications or agreements. Providing information is voluntary; however, certain services require minimum information to proceed effectively.",
        },
      ],
    },
    {
      title: "4. How We Use Your Information",
      blocks: [
        {
          list: [
            "To communicate regarding inquiries, applications, and service updates",
            "To process service requests and documentation",
            "To provide technical and customer support",
            "To enforce legal terms and policies",
            "To conduct internal analysis and research",
            "To comply with legal and regulatory obligations",
          ],
        },
        {
          text: `The legal basis for processing personal data is your explicit consent. You may withdraw consent at any time by emailing ${EMAIL}.`,
        },
      ],
    },
    {
      title: "5. Cookies",
      blocks: [
        {
          text: "Our website uses cookies to enhance user experience, store preferences, and collect anonymized analytics data. You may disable cookies via your browser settings, though certain features may not function correctly.",
        },
      ],
    },
    {
      title: "6. Security & Data Processing",
      blocks: [
        { heading: "6.1 Data Security" },
        {
          text: "We implement physical, electronic, and administrative safeguards to protect personal and business data from unauthorized access, alteration, disclosure, or misuse.",
        },
        { heading: "6.2 Data Retention" },
        {
          text: "Information is retained only for the duration necessary to provide services, or as required by legal, regulatory, audit, or contractual obligations.",
        },
        { heading: "6.3 Limitation of Liability" },
        {
          text: `While reasonable security measures are implemented, no method of electronic data transmission or storage is completely secure. ${ORGANIZATION_NAME} shall not be liable for breaches beyond reasonable control, except in cases of proven gross negligence.`,
        },
      ],
    },
    {
      title: "7. Acceptance of Policy",
      blocks: [
        {
          text: "By accessing, browsing, or using our website, submitting information, or availing our services, you acknowledge and accept this Privacy Policy. If you do not agree, please discontinue use of the website.",
        },
      ],
    },
    {
      title: "8. Policy Updates",
      blocks: [
        {
          text: "We may update this Privacy Policy periodically. Continued use of the website after changes are published constitutes acceptance of the updated policy.",
        },
      ],
    },
    {
      title: "9. Third-Party Links",
      blocks: [
        {
          text: "Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of such external websites.",
        },
      ],
    },
    {
      title: "10. Contact Us",
      blocks: [{ text: "For questions or concerns regarding this Privacy Policy, contact us at:" }, { email: EMAIL }],
    },
  ],
};

export const termsOfService = {
  badge: "Legal",
  title: "Terms & Conditions",
  subtitle: "The terms that govern your use of our website and services",
  intro: [
    `Welcome to ${ORGANIZATION_NAME} (“Company”, “we”, “our”, or “us”). These Terms & Conditions govern your use of our website and services. By accessing or using our website or purchasing our services, you agree to be bound by these Terms.`,
    "If you do not agree with these Terms, please do not use our website or services.",
  ],
  sections: [
    {
      title: "1. Nature of Services",
      blocks: [
        {
          text: "Company provides business consultancy, documentation support, marketing and designing work, compliance assistance, licensing support, certification assistance, and related advisory services.",
        },
        { text: "We strive to offer guidance tailored to modern enterprises. However:" },
        {
          list: [
            "Company is a consultancy service provider only",
            "We are not affiliated with any Government or Non-Government body",
            "All approvals are subject to respective authority rules and client responsibility",
          ],
        },
      ],
    },
    {
      title: "2. Third-Party Services",
      blocks: [
        {
          list: [
            "Some services may involve third-party partners",
            "They may contact you directly via email or phone",
            "Company is not liable for third-party services or practices",
          ],
        },
      ],
    },
    {
      title: "3. Intellectual Property Rights",
      blocks: [
        {
          text: "All content including documents, text, graphics, logos, and software are owned by the Company or licensors.",
        },
        { text: "Unauthorized copying, resale, or redistribution is strictly prohibited." },
      ],
    },
    {
      title: "4. Limitation of Liability",
      blocks: [
        {
          text: "Company shall not be liable for indirect or consequential damages including loss of profit, data, or goodwill.",
        },
        { text: "Liability is limited to the amount paid for the specific service." },
      ],
    },
    {
      title: "5. Indemnification",
      blocks: [
        {
          text: "You agree to indemnify and hold harmless the Company from any claims, damages, or liabilities arising from your use of services or violation of these Terms.",
        },
      ],
    },
    {
      title: "6. Refund & Cancellation Policy",
      blocks: [
        { text: "Refund eligibility depends strictly on the Service Agreement or MOU." },
        {
          list: [
            "Services may be refundable or non-refundable as per agreement",
            "No refund beyond agreed terms will be entertained",
          ],
        },
        { label: "Refund Timeframe:", text: "Up to 45 working days after completion of required formalities." },
        { label: "Refund Process:", text: "Confirmation via email and submission of bank details is required." },
      ],
    },
    {
      title: "7. Delivery of Services",
      blocks: [{ text: "Services may be delivered electronically or physically. Shipping charges may apply." }],
    },
    {
      title: "8. Force Majeure",
      blocks: [
        {
          text: "Company is not liable for delays caused by events beyond control such as natural disasters, strikes, or government actions.",
        },
      ],
    },
    {
      title: "9. Cookies & Data Collection",
      blocks: [
        {
          text: "We use cookies to enhance user experience and analyze traffic. Disabling cookies may affect functionality.",
        },
      ],
    },
    {
      title: "10. Reviews & User Content",
      blocks: [{ text: "By submitting content, you grant us rights to use it for promotional purposes." }],
    },
    {
      title: "11. Dispute Resolution",
      blocks: [{ text: "Disputes shall be resolved through arbitration under the Indian Council of Arbitration." }],
    },
    {
      title: "12. Governing Law",
      blocks: [{ text: "These Terms are governed by Indian law with jurisdiction in Ahmedabad, Gujarat." }],
    },
    {
      title: "13. Acknowledgement",
      blocks: [{ text: "By using our services, you confirm that you are 18+ and agree to these Terms." }],
    },
    {
      title: "14. Grievance Resolution",
      blocks: [{ text: "For queries, email us with company name, service details, and contact information." }],
    },
    {
      title: "15. Contact Us",
      blocks: [{ email: EMAIL }],
    },
  ],
};
