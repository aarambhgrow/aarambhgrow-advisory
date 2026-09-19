"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Target, FileText, BriefcaseBusiness, Award, ClipboardCheck, ChevronDown } from "lucide-react";
import { gstRegistrationData } from "../../../data/gst-registration";

/* =========================================================
   SAFE CONTENT RENDERER
========================================================= */

const ItemContent = ({ item }) => {
  if (item === null || item === undefined) {
    return null;
  }

  if (typeof item === "string" || typeof item === "number") {
    return <span>{item}</span>;
  }

  if (typeof item === "object") {
    return (
      <span className="block">
        {item.title && <span className="block font-semibold text-[#03254C]">{item.title}</span>}

        {item.desc && <span className="mt-1 block text-slate-600">{item.desc}</span>}

        {!item.title && !item.desc && item.name && <span>{item.name}</span>}

        {!item.title && !item.desc && !item.name && item.description && <span>{item.description}</span>}
      </span>
    );
  }

  return null;
};

/* =========================================================
   SECTION
========================================================= */

const Section = ({ number, title, children }) => (
  <section className="mb-10">
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F26522] text-sm font-bold text-white">
        {number}
      </span>

      <h2 className="text-2xl font-bold tracking-tight text-[#03254C] sm:text-3xl">{title}</h2>
    </div>

    {children}
  </section>
);

/* =========================================================
   LIST ITEM
========================================================= */

const ListItem = ({ item }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#157327]" />

    <span className="text-[15px] leading-7 text-slate-600">
      <ItemContent item={item} />
    </span>
  </li>
);

/* =========================================================
   INFO CARD
========================================================= */

const InfoCard = ({ icon: Icon, title, item }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
      <Icon className="h-5 w-5 text-[#F26522]" />
    </div>

    <h3 className="mb-3 text-lg font-bold text-[#03254C]">{title}</h3>

    <div className="text-[15px] leading-7 text-slate-600">
      <ItemContent item={item} />
    </div>
  </div>
);

/* =========================================================
   GST REGISTRATION PAGE
========================================================= */

export default function GSTRegistration() {
  const [openFaq, setOpenFaq] = useState(null);

  /* IMPORTANT:
     Use gstRegistrationData everywhere.
     Do NOT use gstData.
  */

  const service =
    gstRegistrationData?.services?.find(
      (item) => item?.id === "gst-registration" || item?.name === "GST Registration" || item?.shortTitle === "GST Registration",
    ) || gstRegistrationData?.services?.[0];

  if (!service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-red-600">GST Registration data not found</h1>

          <p className="mt-2 text-sm text-slate-500">Please check data/gst-registration.js</p>
        </div>
      </main>
    );
  }

  const hero = gstRegistrationData?.hero || {};

  const benefits = service?.benefits || [];
  const suitedFor = service?.suitedFor || [];
  const registrationAreas = service?.registrationAreas || [];
  const gstTypes = service?.gstTypes || [];
  const businessNeeds = service?.businessNeeds || [];
  const whatWeDo = service?.whatWeDo || [];
  const documents = service?.documents || [];
  const process = service?.process || [];
  const whyChoose = service?.whyChoose || [];

  const faqs = service?.faqs || [
    {
      question: "What is GST Registration?",
      answer:
        "GST Registration is the process through which an eligible business or person obtains registration under the applicable Goods and Services Tax framework. The requirement depends on the nature of the business, taxable supplies, turnover, location, and other applicable conditions.",
    },
    {
      question: "Who may need GST Registration?",
      answer:
        "Businesses and persons engaged in taxable supplies may require GST registration depending on applicable turnover thresholds, business activities, interstate supplies, e-commerce activities, and other conditions under GST law.",
    },
    {
      question: "Which GST Registration is applicable to my business?",
      answer:
        "The applicable GST registration requirements depend on the nature of the business, type of supplies, location, turnover, interstate activities, e-commerce operations, and other applicable conditions. The specific business profile should be assessed before applying.",
    },
    {
      question: "What documents are required for GST Registration?",
      answer:
        "Common documents may include PAN, identity and address proof, photographs, business constitution documents, principal place of business details, address proof, bank details, authorized signatory information, and other supporting documents depending on the applicant and business structure.",
    },
    {
      question: "Can GST Registration details be amended?",
      answer:
        "Yes. Certain GST registration details may be amended when there is a change in business information, address, authorized signatory, contact details, or other applicable particulars, subject to the relevant GST procedures.",
    },
    {
      question: "Do you provide GST Registration application support?",
      answer:
        "Yes. The service can include GST applicability assessment, document preparation, application assistance, submission support, clarification support where applicable, and guidance regarding subsequent GST compliance requirements.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-800">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#03254C] to-[#062a57] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F26522]/10 blur-3xl" />

        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#157327]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-[#F26522]" />
              Tax & Compliance
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              {hero?.title || service?.title || "GST Registration Services in India"}
            </motion.h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
              {service?.tagline ||
                "Get structured assistance for GST Registration application, documentation, submission, and applicable GST compliance requirements"}
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{service?.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#F26522] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d95416]"
              >
                Get Consultation
              </a>

              <a
                href="#gst-registration-content"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:bg-white/15"
              >
                Explore GST Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <section id="gst-registration-content" className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                  <BriefcaseBusiness className="h-5 w-5 text-[#F26522]" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Service</p>

                  <h3 className="font-bold text-[#03254C]">GST Registration</h3>
                </div>
              </div>

              <nav className="space-y-1.5">
                {[
                  ["Introduction", "introduction"],
                  ["Benefits", "benefits"],
                  ["Who Can Benefit", "suited-for"],
                  ["GST Registration Types", "gst-types"],
                  ["Registration Areas", "registration-areas"],
                  ["Business Needs", "business-needs"],
                  ["What We Do", "what-we-do"],
                  ["Documents Required", "documents"],
                  ["Process", "process"],
                  ["Why Choose Us", "why-choose"],
                  ["FAQs", "faqs"],
                ].map(([label, id]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-orange-50 hover:text-[#F26522]"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* =================================================
              MAIN CONTENT
          ================================================== */}

          <div className="min-w-0">
            {/* INTRODUCTION */}

            <section id="introduction" className="mb-12 scroll-mt-24">
              <Section number="01" title="GST Registration Services">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-[15px] leading-8 text-slate-600">{service?.description}</p>

                  <p className="mt-4 text-[15px] leading-8 text-slate-600">
                    GST registration requirements can vary according to turnover, business activity, type of supply, location, interstate
                    transactions, e-commerce activities, and other applicable conditions. A proper review of the business profile helps
                    identify the applicable registration and documentation requirements.
                  </p>
                </div>
              </Section>
            </section>

            {/* BENEFITS */}

            <section id="benefits" className="mb-12 scroll-mt-24">
              <Section number="02" title="Benefits of GST Registration Support">
                <div className="grid gap-4 sm:grid-cols-2">
                  {benefits.map((item, index) => (
                    <InfoCard key={index} icon={CheckCircle2} title={`GST Support ${String(index + 1).padStart(2, "0")}`} item={item} />
                  ))}
                </div>
              </Section>
            </section>

            {/* WHO CAN BENEFIT */}

            <section id="suited-for" className="mb-12 scroll-mt-24">
              <Section number="03" title="Who Can Benefit">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {suitedFor.map((item, index) => (
                      <ListItem key={index} item={item} />
                    ))}
                  </div>
                </div>
              </Section>
            </section>

            {/* GST TYPES */}

            <section id="gst-types" className="mb-12 scroll-mt-24">
              <Section number="04" title="GST Registration Types">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {gstTypes.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                        <ShieldCheck className="h-5 w-5 text-[#157327]" />
                      </div>

                      <div className="text-sm font-bold leading-6 text-[#03254C]">
                        <ItemContent item={item} />
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </section>

            {/* REGISTRATION AREAS */}

            <section id="registration-areas" className="mb-12 scroll-mt-24">
              <Section number="05" title="GST Registration Areas">
                <div className="grid gap-4 sm:grid-cols-2">
                  {registrationAreas.map((item, index) => {
                    const text = typeof item === "string" ? item : item?.title || item?.name || "GST Registration";

                    return (
                      <InfoCard
                        key={index}
                        icon={BriefcaseBusiness}
                        title={text}
                        item={typeof item === "string" ? `GST support for ${item.toLowerCase()} requirements` : item}
                      />
                    );
                  })}
                </div>
              </Section>
            </section>

            {/* BUSINESS NEEDS */}

            <section id="business-needs" className="mb-12 scroll-mt-24">
              <Section number="06" title="GST Business Needs">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {businessNeeds.map((item, index) => (
                      <ListItem key={index} item={item} />
                    ))}
                  </div>
                </div>
              </Section>
            </section>

            {/* WHAT WE DO */}

            <section id="what-we-do" className="mb-12 scroll-mt-24">
              <Section number="07" title="What We Do">
                <div className="grid gap-4 sm:grid-cols-2">
                  {whatWeDo.map((item, index) => (
                    <div key={index} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                        <ClipboardCheck className="h-5 w-5 text-[#F26522]" />
                      </div>

                      <div>
                        <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#F26522]">
                          Step {String(index + 1).padStart(2, "0")}
                        </span>

                        <p className="text-sm font-semibold leading-6 text-[#03254C]">
                          <ItemContent item={item} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </section>

            {/* DOCUMENTS */}

            <section id="documents" className="mb-12 scroll-mt-24">
              <Section number="08" title="Documents Required for GST Registration">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                      <FileText className="h-5 w-5 text-[#F26522]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#03254C]">Commonly Required Documents</h3>

                      <p className="text-sm text-slate-500">
                        Requirements may vary according to the applicant, business structure, and applicable GST registration.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {documents.map((item, index) => (
                      <ListItem key={index} item={item} />
                    ))}
                  </div>
                </div>
              </Section>
            </section>

            {/* PROCESS */}

            <section id="process" className="mb-12 scroll-mt-24">
              <Section number="09" title="GST Registration Process">
                <div className="space-y-4">
                  {process.map((item, index) => {
                    const title = typeof item === "object" ? item?.title : null;

                    const description = typeof item === "object" ? item?.desc || item?.description : item;

                    return (
                      <div key={index} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#03254C] text-sm font-bold text-white">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div>
                          <h3 className="font-bold text-[#03254C]">{title || `Stage ${index + 1}`}</h3>

                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            <ItemContent item={description} />
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>
            </section>

            {/* WHY CHOOSE */}

            <section id="why-choose" className="mb-12 scroll-mt-24">
              <Section number="10" title="Why Choose Our GST Support">
                <div className="grid gap-4 sm:grid-cols-2">
                  {whyChoose.map((item, index) => (
                    <InfoCard key={index} icon={Award} title={`Support Advantage ${String(index + 1).padStart(2, "0")}`} item={item} />
                  ))}
                </div>
              </Section>
            </section>

            {/* FAQ */}

            <section id="faqs" className="mb-12 scroll-mt-24">
              <Section number="11" title="Frequently Asked Questions">
                <div className="space-y-3">
                  {faqs.map((faq, index) => {
                    const isOpen = openFaq === index;

                    return (
                      <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                          aria-expanded={isOpen}
                        >
                          <span className="text-sm font-bold leading-6 text-[#03254C] sm:text-base">{faq?.question}</span>

                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-[#F26522] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                            >
                              <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                                <p className="text-sm leading-7 text-slate-600">{faq?.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </Section>
            </section>

            {/* =================================================
                CTA
            ================================================== */}

            <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#03254C] to-[#062a57] p-7 shadow-xl sm:p-10">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#F26522]">
                    <Target className="h-4 w-4" />
                    GST Registration Support
                  </div>

                  <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Need Assistance With GST Registration?</h2>

                  <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                    Get structured assistance with GST applicability review, documentation, application preparation, submission, and
                    applicable GST compliance support.
                  </p>
                </div>

                <a
                  href="/contact"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#F26522] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d95416]"
                >
                  Get Free Consultation
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
