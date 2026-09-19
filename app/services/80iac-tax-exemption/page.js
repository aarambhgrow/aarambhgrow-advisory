import Navbar from "../../components/layout/Navbar";
// import EightyIACTaxExemption from "../../components/services/80iac-tax-exemption/80IACTaxExemptionHero";
import EightyIACTaxExemption from "../../components/services/80iac-tax-exemption/80IACTaxExemption";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title: "80IAC Tax Exemption Services in India | AarambhGrow Advisory",
  description:
    "Get structured assistance for Section 80-IAC tax exemption eligibility, documentation, application, and startup tax compliance requirements.",
};

export default function EightyIACTaxExemptionPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "80IAC Tax Exemption Services",
    serviceType: "Section 80-IAC Tax Exemption",
    description:
      "Structured assistance for Section 80-IAC tax exemption eligibility, documentation, application, and startup tax compliance requirements.",
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
        <EightyIACTaxExemption />
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