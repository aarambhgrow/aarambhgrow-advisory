import Navbar from "../../components/layout/Navbar";
import CompanyIncorporation from "../../components/services/company-incorporation/CompanyIncorporation";
import CompanyIncorporation from "../../components/services/company-incorporation/CompanyIncorporationHero";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title: "Company Incorporation Services in India | AarambhGrow Advisory",
  description:
    "Get structured assistance for company incorporation in India, including business structure selection, documentation, registration, filing, and incorporation compliance support.",
};

export default function CompanyIncorporationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Company Incorporation Services",
    serviceType: "Company Incorporation",
    description:
      "Structured assistance for company incorporation in India, including business structure selection, documentation, registration, filing, and incorporation compliance support.",
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
        <CompanyIncorporation />
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