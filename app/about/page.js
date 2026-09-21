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

export const metadata = {
  title: "About AarambhGrow Advisory – Business Registration & Compliance Experts",

  description:
    "Learn about AarambhGrow Advisory and our services for company incorporation, GST, MSME registration, ITR filing, MCA compliance, licences, certifications and startup recognition across India.",

  alternates: {
    canonical: "https://aarambhgrow.com/about",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "About AarambhGrow Advisory – Business Registration & Compliance Experts",

    description:
      "AarambhGrow Advisory provides company incorporation, GST, MSME registration, tax filing, MCA compliance, licences, certifications and startup compliance services across India.",

    url: "https://aarambhgrow.com/about",

    type: "website",

    images: [
      {
        url: "https://aarambhgrow.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AarambhGrow Advisory",
      },
    ],
  },
};

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
