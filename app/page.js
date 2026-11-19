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
import { buildMetadata } from "./lib/seo";
import { ADDRESS, ORGANIZATION_ID, ORGANIZATION_NAME, SITE_URL, TELEPHONE } from "./data/site";

export const metadata = buildMetadata({
  title: "Business Registration, GST & Compliance Services India | AarambhGrow",
  description:
    "AarambhGrow Advisory supports startups and MSMEs across India with company incorporation, GST, Udyam, ITR, ROC compliance, DPIIT, licences, certifications and trademarks.",
  path: "/",
  ogDescription:
    "Business registration, tax, compliance, licensing and certification support for startups and MSMEs across India.",
  twitterTitle: "Business Registration & Compliance Services India | AarambhGrow",
  twitterDescription:
    "Company incorporation, GST, Udyam, ROC compliance, DPIIT recognition, licences, certifications and trademark support across India.",
});

const address = { "@type": "PostalAddress", ...ADDRESS };
const areaServed = { "@type": "Country", name: "India" };

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: ORGANIZATION_NAME,
      url: `${SITE_URL}/`,
      description:
        "Business registration, taxation, statutory compliance, licensing, certification and startup recognition advisory services for startups and MSMEs across India.",
      telephone: TELEPHONE,
      address,
      areaServed,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: ORGANIZATION_NAME,
      url: `${SITE_URL}/`,
      telephone: TELEPHONE,
      address,
      areaServed,
      parentOrganization: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: ORGANIZATION_NAME,
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "en-IN",
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans antialiased">
      <JsonLd data={homeSchema} />

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
