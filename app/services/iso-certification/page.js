import Navbar from "../../components/layout/Navbar";
import ISOCertification from "../../components/services/iso-certification/ISOCertification";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title: "ISO Certification Services in India | AarambhGrow Advisory",
  description:
    "Get structured assistance for ISO certification in India, including standard selection, documentation, implementation support, audit preparation, and certification process guidance.",
};

export default function ISOCertificationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ISO Certification Services",
    serviceType: "ISO Certification",
    description:
      "Structured assistance for ISO certification in India, including standard selection, documentation, implementation support, audit preparation, and certification process guidance.",
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
        <ISOCertification />
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