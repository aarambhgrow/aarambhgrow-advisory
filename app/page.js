import Preloader from "./components/layout/Preloader";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import AboutSection from "./components/home/About";
import Services from "./components/home/Services";
import WhyChooseUs from "./components/home/WhyChooseUs";
import ProcessSection from "./components/home/Process";
import BusinessCategories from "./components/home/BusinessCategories";
import CTASection from "./components/layout/CTA";
import Footer from "./components/layout/Footer";
import JsonLd from "./components/seo/JsonLd";

export const metadata = {
  title: "AarambhGrow Advisory – Company Registration, GST & Compliance Services",

  description:
    "AarambhGrow Advisory provides company incorporation, MSME registration, GST registration, ITR filing, MCA compliance, DSC, Startup India recognition, licences, certifications and business compliance services across India.",

  alternates: {
    canonical: "https://aarambhgrow.com/",
  },

  openGraph: {
    title: "AarambhGrow Advisory – Company Registration, GST & Compliance Services",

    description:
      "Company incorporation, GST, MSME registration, ITR filing, MCA compliance, licences, certifications and startup compliance support for businesses across India.",

    url: "https://aarambhgrow.com/",

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

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",

    name: "AarambhGrow Advisory",

    alternateName: "AarambhGrow Advisory",

    url: "https://aarambhgrow.com",

    logo: "https://aarambhgrow.com/images/white-logo.png",

    description:
      "AarambhGrow Advisory provides company incorporation, MSME registration, GST registration, income tax filing, MCA compliance, Startup India recognition, licences, certifications and business compliance services for startups, entrepreneurs and MSMEs.",

    address: {
      "@type": "PostalAddress",

      streetAddress: "813, Silver Radiance 4, Ovnaj, Bhavik Publication, SG Highway",

      addressLocality: "Ahmedabad",

      addressRegion: "Gujarat",

      postalCode: "380060",

      addressCountry: "IN",
    },

    contactPoint: {
      "@type": "ContactPoint",

      telephone: "+91-9998715799",

      contactType: "customer service",

      areaServed: "IN",

      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",

    name: "AarambhGrow Advisory",

    image: "https://aarambhgrow.com/images/white-logo.png",

    url: "https://aarambhgrow.com",

    telephone: "+91-9998715799",

    email: "info@aarambhgrow.com",

    description:
      "Professional business registration and compliance services including company incorporation, MSME registration, GST registration, ITR filing, MCA annual filing, ROC compliance, DSC, Startup India recognition, labour licence, FSSAI licence, ISO certification, trademark registration, ZED certification and 80IAC tax exemption support.",

    address: {
      "@type": "PostalAddress",

      streetAddress: "813, Silver Radiance 4, Ovnaj, Bhavik Publication, SG Highway",

      addressLocality: "Ahmedabad",

      addressRegion: "Gujarat",

      postalCode: "380060",

      addressCountry: "IN",
    },

    geo: {
      "@type": "GeoCoordinates",

      latitude: 23.0929,

      longitude: 72.5247,
    },

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",

        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

        opens: "09:00",

        closes: "19:00",
      },
    ],

    areaServed: ["Ahmedabad", "Surat", "Vadodara"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    name: "AarambhGrow Advisory",

    url: "https://aarambhgrow.com",

    description:
      "Company registration, GST, MSME, tax filing, MCA compliance, licences and certification services for businesses across India.",
  };

  return (
    <main className="min-h-screen bg-white font-sans antialiased">
      <JsonLd data={organizationSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={websiteSchema} />

      <Preloader />
      <Navbar />
      <Hero />
      <AboutSection />
      <Services />
      <WhyChooseUs />
      <ProcessSection />
      <BusinessCategories />
      <CTASection />
      <Footer />
    </main>
  );
}
