import Navbar from "../../components/layout/Navbar";
import DSC from "../../components/services/dsc/DSC";
// import DSC from "../../components/services/dsc/DSCHero";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title: "DSC Digital Signature Certificate Services in India | AarambhGrow Advisory",
  description:
    "Get structured assistance for Digital Signature Certificate (DSC) application, issuance, renewal, and usage for MCA, GST, income tax, tenders, and other online filings.",
};

export default function DSCPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Signature Certificate (DSC) Services",
    serviceType: "Digital Signature Certificate",
    description:
      "Structured assistance for Digital Signature Certificate application, issuance, renewal, and usage for MCA, GST, income tax, tenders, e-procurement, and other online filings.",
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
        <DSC />
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