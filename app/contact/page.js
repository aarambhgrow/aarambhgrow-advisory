import Navbar from "../components/layout/Navbar";
import ContactHero from "../components/contact/Hero";
import ContactInfoSection from "../components/contact/ContactInfoSection";
import ContactFormWithMap from "../components/contact/ContactFormWithMap";
import WhyGetInTouch from "../components/contact/WhyGetInTouch";
import CTASection from "../components/layout/CTA";
import Footer from "../components/layout/Footer";

export const metadata = {
  title: "Contact AarambhGrow Advisory | Business Registration & Compliance Support",
  description:
    "Contact AarambhGrow Advisory for business registration, MSME, GST, ITR filing, MCA compliance, licences, certifications, Startup India DPIIT recognition and other business advisory services across India.",
  alternates: {
    canonical: "https://aarambhgrow.com/contact",
  },
  openGraph: {
    title: "Contact AarambhGrow Advisory | Business Registration & Compliance Support",
    description:
      "Connect with AarambhGrow Advisory for company incorporation, GST, MSME registration, tax filing, MCA compliance, licences, certifications and startup recognition support.",
    url: "https://aarambhgrow.com/contact",
    siteName: "AarambhGrow Advisory",
    type: "website",
  },
};

export default function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AarambhGrow Advisory",
    url: "https://aarambhgrow.com",
    telephone: "+91-9998715799",
    email: "info@aarambhgrow.com",
    description:
      "Business registration, taxation, statutory compliance, licensing and certification advisory services for startups, MSMEs and businesses across India.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "813, Silver Radiance 4, Ovnaj, Bhavik Publication, SG Highway",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380060",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    serviceType: [
      "Company Incorporation",
      "MSME / Udyam Registration",
      "GST Registration",
      "Income Tax ITR Filing",
      "MCA Annual Filing",
      "ROC Compliance",
      "Digital Signature Certificate",
      "Startup India DPIIT Recognition",
      "Labour Licence",
      "FSSAI Licence",
      "ISO Certification",
      "Trademark Registration",
      "ZED Certification",
      "80IAC Tax Exemption",
    ],
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <ContactHero />
        <ContactInfoSection />
        <ContactFormWithMap />
        <WhyGetInTouch />
        <CTASection />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}
