import Navbar from "../../components/layout/Navbar";
import ZEDCertification from "../../components/services/zed-certification/ZEDCertificationHero";
import ZEDCertification from "../../components/services/zed-certification/ZEDCertification";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title: "ZED Certification Services in India | AarambhGrow Advisory",
  description:
    "Get professional assistance for ZED Certification in India, including eligibility assessment, application support, documentation, certification guidance, and ZED compliance assistance for MSMEs.",
};

export default function ZEDCertificationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ZED Certification Services",
    serviceType: "ZED Certification",
    description:
      "Professional assistance for ZED Certification in India, including eligibility assessment, application support, documentation, certification guidance, and ZED compliance assistance for MSMEs.",
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
        <ZEDCertification />
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