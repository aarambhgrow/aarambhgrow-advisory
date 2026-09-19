import Navbar from "../../components/layout/Navbar";
import LabourLicence from "../../components/services/labour-licence/LabourLicence";
import LabourLicence from "../../components/services/labour-licence/LabourLicenceHero";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title: "Labour Licence Services in India | AarambhGrow Advisory",
  description:
    "Get professional assistance for labour licence registration in India, including application preparation, documentation, compliance support, and licence process guidance.",
};

export default function LabourLicencePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Labour Licence Services",
    serviceType: "Labour Licence",
    description:
      "Professional assistance for labour licence registration in India, including application preparation, documentation, compliance support, and licence process guidance.",
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
        <LabourLicence />
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