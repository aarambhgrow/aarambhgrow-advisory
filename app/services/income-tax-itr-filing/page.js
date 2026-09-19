import Navbar from "../../components/layout/Navbar";
import IncomeTaxITRFiling from "../../components/services/income-tax-itr-filing/IncomeTaxITRFiling";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title: "Income Tax & ITR Filing Services in India | AarambhGrow Advisory",
  description:
    "Get structured assistance for income tax return (ITR) filing in India, including tax assessment, documentation, return preparation, filing, verification, and income tax compliance support.",
};

export default function IncomeTaxITRFilingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Income Tax & ITR Filing Services",
    serviceType: "Income Tax Return Filing",
    description:
      "Structured assistance for income tax return filing in India, including tax assessment, documentation, return preparation, filing, verification, and income tax compliance support.",
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
        <IncomeTaxITRFiling />
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