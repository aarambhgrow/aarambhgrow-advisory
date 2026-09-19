import Navbar from "../../components/layout/Navbar";
// import MCAAnnualFilingROCCompliance from "../../components/services/mca-annual-filing-roc-compliance/MCAAnnualFilingROCComplianceHero";
import MCAAnnualFilingROCCompliance from "../../components/services/mca-annual-filing-roc-compliance/MCAAnnualFilingROCCompliance";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title:
    "MCA Annual Filing & ROC Compliance Services in India | AarambhGrow Advisory",
  description:
    "Get professional assistance for MCA annual filing and ROC compliance in India, including annual return filing, financial statement filing, documentation, compliance tracking, and statutory filing support.",
};

export default function MCAAnnualFilingROCCompliancePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "MCA Annual Filing & ROC Compliance Services",
    serviceType: "MCA Annual Filing & ROC Compliance",
    description:
      "Professional assistance for MCA annual filing and ROC compliance in India, including annual return filing, financial statement filing, documentation, compliance tracking, and statutory filing support.",
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
        <MCAAnnualFilingROCCompliance />
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