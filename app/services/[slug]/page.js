import { notFound } from "next/navigation";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import CTASection from "../../components/layout/CTA";
import JsonLd from "../../components/seo/JsonLd";
import ServiceDetail from "../../components/services/ServiceDetail";
import { getServiceBySlug, serviceSlugs } from "../../data/services";
import { getServiceHeroImage } from "../../data/serviceImages";
import { ORGANIZATION_NAME, SITE_URL } from "../../data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return {};

  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    title: service.seo.title,
    description: service.seo.description,

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url,
      type: "website",
    },
  };
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
    "@type": "Service",
    name: service.schema.name,
    serviceType: service.schema.serviceType,
    description: service.schema.description,
    url,
    provider: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.label, item: url },
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
      <JsonLd data={breadcrumbSchema} />
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
