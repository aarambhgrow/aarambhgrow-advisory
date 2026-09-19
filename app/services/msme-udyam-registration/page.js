import Navbar from "../../components/layout/Navbar";
import MSMEUdyamRegistration from "../../components/services/msme-udyam-registration/MSMEUdyamRegistration";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title: "MSME Udyam Registration Services in India | AarambhGrow Advisory",
  description:
    "Get professional assistance for MSME Udyam Registration in India, including application preparation, documentation support, registration guidance, and Udyam certificate assistance.",
};

export default function MSMEUdyamRegistrationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "MSME Udyam Registration Services",
    serviceType: "MSME Udyam Registration",
    description:
      "Professional assistance for MSME Udyam Registration in India, including application preparation, documentation support, registration guidance, and Udyam certificate assistance.",
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
        <MSMEUdyamRegistration />
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