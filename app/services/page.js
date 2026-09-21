import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CTASection from "../components/layout/CTA";
import JsonLd from "../components/seo/JsonLd";
import ServicesGrid from "../components/services/ServicesGrid";
import { services } from "../data/services";
import { ORGANIZATION_NAME, SITE_URL } from "../data/site";

const TITLE = "Business Registration, Tax & Compliance Services | AarambhGrow Advisory";

const DESCRIPTION =
  "Explore AarambhGrow Advisory services — company incorporation, MSME Udyam and GST registration, ITR filing, MCA and ROC compliance, DSC, Startup India DPIIT recognition, licences, ISO, trademark, ZED certification and 80IAC tax exemption.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,

  alternates: {
    canonical: `${SITE_URL}/services`,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/services`,
    type: "website",
  },
};

/* Cards only need a serializable slice of each registry entry. */
const cards = services.map((service) => ({
  slug: service.slug,
  label: service.label,
  navDescription: service.navDescription,
  icon: service.icon,
  category: service.data?.services?.[0]?.category || service.data?.category || null,
}));

export default function ServicesPage() {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AarambhGrow Advisory Services",
    itemListElement: cards.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.label,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: SITE_URL,
  };

  return (
    <>
      <JsonLd data={listSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={organizationSchema} />

      <Navbar />

      <main className="min-h-screen">
        <ServicesGrid services={cards} />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
