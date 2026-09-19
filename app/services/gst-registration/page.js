import Navbar from "../../components/layout/Navbar";
import GSTRegistration from "../../components/services/gst-registration/GSTRegistration";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title: "GST Registration Services in India | AarambhGrow Advisory",
  description:
    "Get structured assistance for GST registration in India, including eligibility assessment, documentation, application filing, ARN tracking, and GST compliance support.",
};

export default function GSTRegistrationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "GST Registration Services",
    serviceType: "GST Registration",
    description:
      "Structured assistance for GST registration in India, including eligibility assessment, documentation, application filing, ARN tracking, and GST compliance support.",
    provider: {
      "@type": "Organization",
      name: "AarambhGrow Advisory",
      url: "https://aarambhgrow.group",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <GSTRegistration />
        <CTASection />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  );
}