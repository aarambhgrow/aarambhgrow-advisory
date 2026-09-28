import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CTASection from "../components/layout/CTA";
import JsonLd from "../components/seo/JsonLd";
import ServicesGrid from "../components/services/ServicesGrid";
import { services } from "../data/services";
import { SITE_URL } from "../data/site";
import { buildMetadata, ROBOTS_BASIC } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Business Registration, Tax & Compliance Services | AarambhGrow",
  description:
    "Explore AarambhGrow services for company incorporation, GST, Udyam, ITR, ROC compliance, DSC, DPIIT, labour licence, FSSAI, ISO, trademarks, ZED and 80IAC.",
  path: "/services",
  robots: ROBOTS_BASIC,
  ogDescription:
    "13 advisory services for business registration, tax, compliance, licensing, certification, brand protection and startup recognition across India.",
});

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

  return (
    <>
      <JsonLd data={listSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Navbar />

      <main className="min-h-screen">
        <ServicesGrid services={cards} />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
