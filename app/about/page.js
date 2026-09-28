import Navbar from "../components/layout/Navbar";
import Hero from "../components/about/Hero";
import About from "../components/about/About";
import ValueOutcomes from "../components/about/ValueOutcomes";
import CorePillars from "../components/about/CorePillars";
import WhyTrustUs from "../components/about/WhyTrustUs";
import FAQ from "../components/layout/FAQ";
import CTASection from "../components/layout/CTA";
import Footer from "../components/layout/Footer";
import JsonLd from "../components/seo/JsonLd";
import { buildMetadata, ROBOTS_BASIC } from "../lib/seo";

export const metadata = buildMetadata({
  title: "About AarambhGrow Advisory | Business Compliance Experts India",
  description:
    "Learn about AarambhGrow Advisory, supporting startups and MSMEs across India with business registration, taxation, compliance, licences and certifications.",
  path: "/about",
  robots: ROBOTS_BASIC,
  ogDescription:
    "Practical business registration, tax, compliance, licensing and certification support for startups and MSMEs across India.",
});

const breadcrumbSchema = {
  "@context": "https://schema.org",

  "@type": "BreadcrumbList",

  itemListElement: [
    {
      "@type": "ListItem",

      position: 1,

      name: "Home",

      item: "https://aarambhgrow.com/",
    },

    {
      "@type": "ListItem",

      position: 2,

      name: "About Us",

      item: "https://aarambhgrow.com/about",
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <Navbar />

      <main className="min-h-screen">
        <Hero />
        <About />
        <ValueOutcomes />
        <CorePillars />
        <WhyTrustUs />
        <FAQ />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
