import Navbar from "../../components/layout/Navbar";
// import TrademarkRegistration from "../../components/services/trademark-registration/TrademarkRegistrationHero";
import TrademarkRegistration from "../../components/services/trademark-registration/TrademarkRegistration";
import CTASection from "../../components/layout/CTA";
import Footer from "../../components/layout/Footer";

export const metadata = {
  title: "Trademark Registration Services in India | AarambhGrow Advisory",
  description:
    "Get professional assistance for trademark registration in India, including trademark search, application preparation, documentation, filing support, and registration process guidance.",
};

export default function TrademarkRegistrationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Trademark Registration Services",
    serviceType: "Trademark Registration",
    description:
      "Professional assistance for trademark registration in India, including trademark search, application preparation, documentation, filing support, and registration process guidance.",
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
        <TrademarkRegistration />
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