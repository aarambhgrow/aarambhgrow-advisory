import Navbar from "../../components/layout/Navbar";
import FSSAILicence from "../../components/services/fssai-licence/FSSAILicence";
import FSSAILicence from "../../components/services/fssai-licence/FSSAILicenceHero";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title: "FSSAI Licence Services in India | AarambhGrow Advisory",
  description:
    "Get structured assistance for FSSAI licence and registration, including eligibility assessment, documentation, application filing, renewal, and food business compliance support.",
};

export default function FSSAILicencePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FSSAI Licence Services",
    serviceType: "FSSAI Licence and Registration",
    description:
      "Structured assistance for FSSAI licence and registration, including eligibility assessment, documentation, application filing, renewal, and food business compliance support.",
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
        <FSSAILicence />
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