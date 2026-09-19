import Navbar from "../../components/layout/Navbar";
// import StartupIndiaDPIITRecognition from "../../components/services/startup-india-dpiit-recognition/StartupIndiaDPIITRecognitionHero";
import StartupIndiaDPIITRecognition from "../../components/services/startup-india-dpiit-recognition/StartupIndiaDPIITRecognition";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title:
    "Startup India DPIIT Recognition Services in India | AarambhGrow Advisory",
  description:
    "Get professional assistance for Startup India DPIIT Recognition in India, including eligibility assessment, application preparation, documentation support, and DPIIT recognition process guidance.",
};

export default function StartupIndiaDPIITRecognitionPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Startup India DPIIT Recognition Services",
    serviceType: "Startup India DPIIT Recognition",
    description:
      "Professional assistance for Startup India DPIIT Recognition in India, including eligibility assessment, application preparation, documentation support, and DPIIT recognition process guidance.",
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
        <StartupIndiaDPIITRecognition />
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