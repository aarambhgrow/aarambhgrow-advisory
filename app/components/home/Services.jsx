"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Headphones } from "lucide-react";
import { services } from "../../data/services";
import { SITE_URL, ORGANIZATION_NAME } from "../../data/site";
import { getServiceIcon } from "../services/serviceIcons";

const CATEGORIES = {
  "company-incorporation": "Business Registration",
  "msme-udyam-registration": "Business Registration",
  "gst-registration": "Tax Registration",
  "income-tax-itr-filing": "Tax Compliance",
  "mca-annual-filing-roc-compliance": "ROC Compliance",
  dsc: "Digital Compliance",
  "startup-india-dpiit-recognition": "Startup Recognition",
  "labour-licence": "Licensing",
  "fssai-licence": "Licensing",
  "iso-certification": "Certification",
  "trademark-registration": "Brand Protection",
  "zed-certification": "Certification",
  "80iac-tax-exemption": "Tax Benefits",
};

const SERVICES = services.map((service, index) => ({
  number: String(index + 1).padStart(2, "0"),
  label: service.label,
  category: CATEGORIES[service.slug] || "Business Services",
  href: `/services/${service.slug}`,
  icon: getServiceIcon(service.icon),
  summary: service.navDescription,
  description: service.schema.description,
  serviceType: service.schema.serviceType,
}));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(7px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function ServicesStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Business Registration, Compliance and Certification Services",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.label,
        description: service.description,
        url: `${SITE_URL}${service.href}`,
        serviceType: service.serviceType,
        areaServed: { "@type": "Country", name: "India" },
        provider: { "@type": "Organization", name: ORGANIZATION_NAME, url: SITE_URL },
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

function AnimatedHeading() {
  const lines = [
    { text: "Business solutions", accent: false },
    { text: "built for sustainable growth.", accent: true },
  ];

  return (
    <motion.h2
      id="services-heading"
      variants={containerVariants}
      className="text-3xl font-black leading-[1.05] tracking-[-0.045em] text-[#0f2a4a] sm:text-4xl md:text-5xl"
    >
      {lines.map((line) => (
        <motion.span key={line.text} variants={fadeUpVariants} className={`block ${line.accent ? "text-[#f26522]" : ""}`}>
          {line.text}
        </motion.span>
      ))}
    </motion.h2>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <motion.li variants={cardVariants} className="group list-none">
      <Link
        href={service.href}
        aria-label={`Learn more about ${service.label}`}
        className="relative flex h-full min-h-[190px] flex-col overflow-hidden rounded-md border border-slate-200 bg-white p-5 transition-colors duration-300 ease-out hover:border-[#f26522]/30 sm:min-h-[195px]"
      >
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#f26522]">{service.number}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[#0f2a4a] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#f26522]/30 group-hover:bg-[#fff5f0]">
              <ArrowUpRight size={15} />
            </span>
          </div>

          <div className="mt-4 flex h-9 w-9 items-center justify-center rounded-md border border-[#f26522]/15 bg-[#fff7f3] text-[#f26522] transition-transform duration-300 group-hover:scale-105">
            <Icon size={18} strokeWidth={1.8} />
          </div>

          <div className="mt-3">
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#157327]">{service.category}</p>
            <h3 className="text-[16px] font-black leading-tight tracking-[-0.02em] text-[#0f2a4a]">{service.label}</h3>
            <p className="mt-1.5 text-[11px] leading-4 text-slate-500">{service.summary}</p>
          </div>

          <div className="mt-auto pt-4">
            <div className="relative h-px w-full overflow-hidden bg-slate-100">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-[22%] bg-[#f26522] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
              />
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-500 transition-colors duration-300 group-hover:text-[#0f2a4a]">
                Explore service
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}

function ConsultationCTA() {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="mt-8 overflow-hidden rounded-md border border-[#f26522]/15 bg-gradient-to-r from-[#fff2eb] via-[#fff8f5] to-white"
    >
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[#f26522]/20 bg-white text-[#f26522] sm:h-12 sm:w-12">
            <Headphones size={21} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#f26522]">Expert Guidance</p>
            <h3 className="mt-1 text-base font-black tracking-[-0.02em] text-[#0f2a4a] sm:text-lg">Ready to grow your business?</h3>
            <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
              Our experts are here to guide you through registration, compliance and certification at every stage of your business
              journey.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-md border border-[#f26522] bg-[#f26522] px-5 py-3 text-xs font-bold text-white transition-all duration-300 sm:w-auto"
        >
          Get Free Consultation
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

function DotGrid({ className }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute top-10 hidden opacity-30 sm:block ${className}`}>
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: 24 }).map((_, index) => (
          <span key={index} className="h-1.5 w-1.5 rounded-full bg-[#f26522]" />
        ))}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <>
      <ServicesStructuredData />

      <section
        aria-labelledby="services-heading"
        className="relative w-full overflow-hidden bg-[#fafafa] py-12 font-sans text-[#0f172a] sm:py-16 lg:py-20"
      >
        <DotGrid className="right-4" />
        <DotGrid className="left-4" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={containerVariants}>
            <div className="mx-auto mb-8 max-w-4xl text-center sm:mb-10 lg:mb-12">
              <motion.div variants={fadeUpVariants}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f26522]/20 bg-[#fff5f0] px-4 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f26522]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#f26522]">Our Expertise</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#157327]" />
                </div>
              </motion.div>

              <AnimatedHeading />

              <motion.p variants={fadeUpVariants} className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
                From company incorporation and tax registration to licences, certifications, trademark protection and ongoing
                compliance, we offer end-to-end support for businesses across India.
              </motion.p>
            </div>

            <motion.div
              variants={fadeUpVariants}
              className="mb-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-y border-slate-200 py-3 sm:mb-8"
            >
              <span className="mr-1 text-[9px] font-bold uppercase tracking-[0.17em] text-slate-400">Our services</span>

              {["Registration", "Tax & Compliance", "Licensing", "Certification", "Brand Protection", "Tax Benefits"].map((item, index) => (
                <span key={item} className="flex items-center gap-2 text-[10px] font-semibold text-[#0f2a4a]">
                  {index !== 0 && <span className="text-slate-300">•</span>}
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.ul
              variants={containerVariants}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
              role="list"
              aria-label="Business registration, compliance and certification services"
            >
              {SERVICES.map((service) => (
                <ServiceCard key={service.href} service={service} />
              ))}
            </motion.ul>

            <ConsultationCTA />
          </motion.div>
        </div>
      </section>
    </>
  );
}
