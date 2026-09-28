import { notFound } from "next/navigation";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import CTASection from "../../components/layout/CTA";
import JsonLd from "../../components/seo/JsonLd";
import ServiceDetail from "../../components/services/ServiceDetail";
import { getServiceBySlug, serviceSlugs } from "../../data/services";
import { getServiceHeroImage } from "../../data/serviceImages";
import { ORGANIZATION_ID, SITE_URL } from "../../data/site";
import { buildMetadata } from "../../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return {};

  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const url = `${SITE_URL}/services/${service.slug}`;
  const heroImage = getServiceHeroImage(service.slug);
  const entry = service.data?.services?.[0];
  const faqs = entry?.faqs?.length ? entry.faqs : service.faqs;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.schema.name,
        serviceType: service.schema.serviceType,
        description: service.schema.description,
        url,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "Country", name: "India" },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Startups, MSMEs, entrepreneurs and businesses in India",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: service.schema.serviceType, item: url },
        ],
      },
    ],
  };

  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={serviceSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <Navbar />

      <main className="min-h-screen">
        <ServiceDetail service={service} heroImage={heroImage} />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
