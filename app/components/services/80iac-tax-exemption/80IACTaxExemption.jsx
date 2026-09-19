"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  Target,
  FileText,
  BriefcaseBusiness,
  Award,
  ClipboardCheck,
  IndianRupee,
  ChevronDown,
} from "lucide-react";
import taxExemptionData from "../../../data/80iac-tax-exemption";

export default function I80IACTaxExemption() {
  const [activeTab, setActiveTab] = useState(0);
  const [isTaxOpen, setIsTaxOpen] = useState(true);
  const currentService = taxExemptionData.services?.[activeTab] || taxExemptionData.services?.[0];

  if (!currentService) return null;

  const taxServices = taxExemptionData.services.slice(0, 1);
  const otherServices = taxExemptionData.services.slice(1);

  const handleServiceClick = (index) => {
    setActiveTab(index);
    if (index < 1) setIsTaxOpen(true);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById("80iac-tax-exemption-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Section 80-IAC tax exemption?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Section 80-IAC provides a tax deduction framework for eligible startups that satisfy the applicable conditions under the Income-tax Act and related rules. Eligibility depends on the startup's legal structure, recognition status, incorporation date, business activity, and other applicable requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Who can apply for 80-IAC tax exemption?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eligible startups that satisfy the applicable conditions can seek the benefit under Section 80-IAC. Eligibility depends on factors such as startup recognition, legal structure, incorporation date, business activity, and other prescribed requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Is DPIIT recognition required for 80-IAC tax exemption?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Startup recognition and other prescribed conditions form an important part of the 80-IAC eligibility assessment. The applicable requirements should be reviewed based on the startup's current status and supporting documentation.",
        },
      },
      {
        "@type": "Question",
        name: "What documents are required for 80-IAC tax exemption?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Documents may include incorporation records, PAN, startup recognition documents where applicable, constitutional documents, founder or director information, business model details, financial information, tax records, and other supporting documents relevant to the eligibility and application process.",
        },
      },
      {
        "@type": "Question",
        name: "Does every startup automatically qualify for 80-IAC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The benefit is subject to applicable eligibility conditions and requirements. A startup should be assessed based on its legal structure, recognition status, incorporation details, business activity, documentation, and other applicable conditions before applying.",
        },
      },
    ],
  };

  return (
    <section id="80iac-tax-exemption" className="relative w-full bg-[#F8FAFC] text-[#03254C] font-sans py-10 sm:py-12 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-3xl mb-8 sm:mb-10"
        >
          <motion.div variants={fadeUp} className="mb-3 sm:mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F26522]/10 border border-[#F26522]/10 text-[#F26522] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.1em]">
              <BriefcaseBusiness className="w-3.5 h-3.5" />
              {taxExemptionData.category}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[22px] sm:text-[28px] lg:text-[34px] xl:text-[36px] font-extrabold tracking-[-0.02em] leading-[1.12] text-[#03254C]"
          >
            80IAC Tax Exemption Services for Eligible Startups in India
          </motion.h1>

          <motion.div variants={fadeUp} className="w-10 h-0.5 sm:h-1 rounded-full bg-gradient-to-r from-[#F26522] to-[#157327] mt-3" />

          <motion.p
            variants={fadeUp}
            className="mt-3 sm:mt-4 text-[12px] sm:text-[13px] lg:text-[14px] font-normal leading-[1.65] text-[#475569] max-w-2xl"
          >
            {taxExemptionData.hero.description}
          </motion.p>
        </motion.div>

        <div className="max-w-5xl mb-10 sm:mb-12 space-y-8">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#03254C] mb-3">80IAC Tax Exemption for Startups in India</h2>
            <p className="text-[12px] sm:text-[13px] lg:text-[14px] leading-[1.7] text-[#475569]">
              Section 80-IAC provides a tax deduction framework for eligible startups that satisfy the applicable conditions under the
              Income-tax Act and related rules. Startups seeking this benefit need to review their legal structure, incorporation details,
              startup recognition status, business activity, innovation or improvement, scalability, financial information, and supporting
              documentation. AarambhGrow provides structured assistance for understanding applicable 80-IAC requirements, reviewing startup
              eligibility, preparing supporting information, organizing documentation, and assisting with the application process.
              Eligibility and availability of the tax benefit remain subject to the applicable law, prescribed conditions, and approval or
              assessment requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#03254C] mb-4">80IAC Tax Exemption Eligibility</h2>
            <div className="overflow-x-auto rounded-md border border-[#E2E8F0] bg-white">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="bg-[#03254C] text-white">
                    <th className="px-4 py-3 text-xs font-bold">Eligibility Area</th>
                    <th className="px-4 py-3 text-xs font-bold">What Is Reviewed</th>
                    <th className="px-4 py-3 text-xs font-bold">Supporting Information</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {[
                    ["Startup Recognition", "Applicable startup recognition status", "Recognition certificate and related records"],
                    ["Legal Structure", "Applicable business or company structure", "Incorporation and constitutional documents"],
                    ["Business Activity", "Nature of business and activities", "Business profile, product or service information"],
                    [
                      "Innovation & Scalability",
                      "Applicable innovation, improvement, or scalability factors",
                      "Business model, product, technology, or process information",
                    ],
                    [
                      "Tax & Financial Records",
                      "Relevant financial and tax information",
                      "Financial statements, ITR and supporting records",
                    ],
                  ].map(([area, review, info]) => (
                    <tr key={area}>
                      <td className="px-4 py-3 text-xs font-bold text-[#03254C]">{area}</td>
                      <td className="px-4 py-3 text-xs text-[#64748B]">{review}</td>
                      <td className="px-4 py-3 text-xs text-[#64748B]">{info}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#03254C] mb-4">80IAC Tax Exemption Application Process</h2>
            <ol className="space-y-3">
              {[
                "Startup profile assessment",
                "80-IAC eligibility review",
                "Startup and business information collection",
                "Supporting document preparation",
                "Application preparation",
                "Application submission",
                "Follow-up and requirement coordination",
                "Post-application documentation",
              ].map((step, index) => (
                <li key={step} className="flex items-start gap-3 rounded-md bg-white border border-[#E2E8F0] p-3.5">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#03254C] text-white text-[10px] font-bold shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#03254C]">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#03254C] mb-4">Documents Required for 80IAC Tax Exemption</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Certificate of Incorporation",
                "PAN of the company or eligible entity",
                "DPIIT Startup Recognition Certificate",
                "MOA and AOA where applicable",
                "LLP Agreement / Partnership Deed where applicable",
                "Registered office address proof",
                "Founder / Director / Partner details",
                "Authorized signatory details",
                "Business activity information",
                "Business model details",
                "Product or service information",
                "Innovation or technology details",
                "Scalability information",
                "Pitch deck where applicable",
                "Financial statements",
                "Income-tax return and tax records",
                "Turnover and financial information",
                "Relevant banking records",
                "Previous compliance records",
                "Other supporting documents as applicable",
              ].map((document) => (
                <li key={document} className="flex items-center gap-2.5 rounded-md bg-white border border-[#E2E8F0] p-3.5">
                  <CheckCircle2 className="w-4 h-4 text-[#157327] shrink-0" />
                  <span className="text-xs sm:text-[13px] text-[#475569]">{document}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#03254C] mb-3">Section 80-IAC Tax Benefit for Eligible Startups</h2>
            <p className="text-[12px] sm:text-[13px] lg:text-[14px] leading-[1.7] text-[#475569]">
              Section 80-IAC provides a deduction framework for eligible startups subject to the applicable conditions under the Income-tax
              Act and related rules. The availability of the benefit depends on satisfying the prescribed eligibility requirements and
              maintaining the relevant supporting records. AarambhGrow helps startups organize their eligibility information, business
              documentation, tax records, and application-related requirements for a structured 80-IAC process.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#03254C] mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                [
                  "What is Section 80-IAC tax exemption?",
                  "Section 80-IAC provides a tax deduction framework for eligible startups that satisfy applicable conditions under the Income-tax Act and related rules.",
                ],
                [
                  "Who can apply for 80-IAC tax exemption?",
                  "Eligible startups that satisfy the applicable requirements can seek the benefit. Eligibility depends on factors such as recognition, legal structure, incorporation details, business activity, and prescribed conditions.",
                ],
                [
                  "Is DPIIT recognition required for 80-IAC?",
                  "Startup recognition and other prescribed conditions are relevant to the eligibility assessment. The applicable requirements should be reviewed based on the startup's current status.",
                ],
                [
                  "What documents are required for 80-IAC tax exemption?",
                  "Documents may include incorporation records, PAN, startup recognition documents, constitutional documents, business information, financial records, tax records, and other supporting documents.",
                ],
                [
                  "Does every startup automatically qualify for 80-IAC?",
                  "No. The benefit is subject to applicable eligibility conditions. A startup should be assessed before applying based on its recognition status, legal structure, business activity, documentation, and other requirements.",
                ],
              ].map(([question, answer]) => (
                <div key={question} className="rounded-md bg-white border border-[#E2E8F0] p-4">
                  <h3 className="text-xs sm:text-[13px] font-bold text-[#03254C]">{question}</h3>
                  <p className="mt-2 text-[11px] sm:text-xs leading-[1.6] text-[#64748B]">{answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-[12px] sm:text-[13px] lg:text-[14px] leading-[1.7] text-[#475569]">
              Startups can also explore our{" "}
              <a href="/services/startup-india-dpiit-recognition" className="font-semibold text-[#F26522] hover:underline">
                Startup India DPIIT Recognition services
              </a>{" "}
              and{" "}
              <a href="/services/company-incorporation" className="font-semibold text-[#F26522] hover:underline">
                Company Incorporation services
              </a>{" "}
              for business registration and startup compliance requirements.
            </p>
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          <aside className="lg:col-span-1 bg-white border border-[#E2E8F0] rounded-md p-3 sm:p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)] lg:sticky lg:top-6">
            <div className="flex items-start gap-3 p-3 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] mb-3">
              <div className="w-8 h-8 rounded-md bg-[#03254C]/10 flex items-center justify-center shrink-0">
                <BriefcaseBusiness className="w-4 h-4 text-[#03254C]" />
              </div>
              <div>
                <h3 className="text-[11px] sm:text-xs font-bold leading-[1.35] text-[#03254C]">Startup Tax Exemption & 80-IAC Support</h3>
              </div>
            </div>

            <div className="space-y-1">
              <div>
                <button
                  type="button"
                  onClick={() => setIsTaxOpen(!isTaxOpen)}
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-md text-[11px] sm:text-xs font-semibold text-[#03254C] hover:bg-[#F8FAFC] transition-colors"
                >
                  <span>80IAC Tax Exemption</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isTaxOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isTaxOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden ml-2 pl-3 border-l-2 border-[#E2E8F0] space-y-1 mt-1 mb-2"
                    >
                      {taxServices.map((service, index) => {
                        const isActive = activeTab === index;
                        return (
                          <button
                            type="button"
                            key={service.id}
                            onClick={() => handleServiceClick(index)}
                            className={`w-full text-left px-3 py-2 rounded-md text-[10px] sm:text-[11px] font-medium transition-all duration-200 ${isActive ? "bg-[#03254C]/5 text-[#03254C] font-bold border-l-2 border-[#157327]" : "text-[#64748B] hover:text-[#03254C] hover:bg-[#F8FAFC]"}`}
                          >
                            {service.shortTitle || service.title}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {otherServices.length > 0 && (
                <div className="pt-2 mt-1 border-t border-[#E2E8F0] space-y-1">
                  {otherServices.map((service, index) => {
                    const serviceIndex = index + 1;
                    const isActive = activeTab === serviceIndex;
                    return (
                      <button
                        type="button"
                        key={service.id}
                        onClick={() => handleServiceClick(serviceIndex)}
                        className={`w-full text-left px-2.5 py-2 rounded-md text-[10px] sm:text-[11px] font-semibold transition-all duration-200 ${isActive ? "bg-[#03254C]/5 text-[#03254C] border-l-2 border-[#F26522]" : "text-[#03254C] hover:bg-[#F8FAFC]"}`}
                      >
                        {service.shortTitle || service.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>

          <div id="80iac-tax-exemption-content" className="lg:col-span-3 scroll-mt-24">
            <AnimatePresence mode="wait">
              <motion.article
                key={currentService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-5 sm:space-y-6"
              >
                <div className="relative overflow-hidden rounded-md bg-white border border-[#E2E8F0] p-5 sm:p-7 lg:p-8 shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#157327]" />

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                    <span className="inline-flex items-center justify-center min-w-8 h-6 px-2 rounded-md bg-[#03254C] text-white text-[10px] font-bold">
                      {currentService.number}
                    </span>
                    {currentService.tagline && (
                      <span className="text-[11px] sm:text-xs font-semibold text-[#F26522] leading-[1.4]">{currentService.tagline}</span>
                    )}
                  </div>

                  <h2 className="text-[20px] sm:text-[26px] lg:text-[30px] font-extrabold tracking-[-0.02em] leading-[1.15] text-[#03254C]">
                    {currentService.title}
                  </h2>

                  <p className="mt-3 text-[12px] sm:text-[13px] lg:text-[14px] font-normal leading-[1.65] text-[#475569] max-w-3xl">
                    {currentService.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white border border-[#E2E8F0] rounded-md p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.025)] transition-shadow duration-200 hover:shadow-[0_5px_18px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#E2E8F0]">
                      <div className="w-8 h-8 rounded-md bg-[#157327]/10 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4 text-[#157327]" />
                      </div>
                      <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] text-[#03254C]">Key Benefits</h3>
                    </div>

                    <div className="space-y-3.5">
                      {currentService.benefits?.map((benefit, index) => (
                        <div key={`${benefit.title}-${index}`} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#157327] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-[11px] sm:text-xs font-bold leading-[1.3] text-[#03254C]">{benefit.title}</h4>
                            <p className="mt-1 text-[10px] sm:text-[11px] font-normal leading-[1.4] text-[#64748B]">{benefit.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white border border-[#E2E8F0] rounded-md p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.025)] transition-shadow duration-200 hover:shadow-[0_5px_18px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#E2E8F0]">
                      <div className="w-8 h-8 rounded-md bg-[#03254C]/10 flex items-center justify-center">
                        <Target className="w-4 h-4 text-[#03254C]" />
                      </div>
                      <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] text-[#03254C]">Best Suitable For</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {currentService.suitedFor?.map((item, index) => (
                        <span
                          key={`${item}-${index}`}
                          className="px-2.5 py-1.5 rounded-md bg-[#157327]/5 border border-[#157327]/15 text-[10px] sm:text-[11px] font-semibold text-[#157327]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white border border-[#E2E8F0] rounded-md p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.025)]"
                >
                  <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#E2E8F0]">
                    <div className="w-8 h-8 rounded-md bg-[#03254C]/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#03254C]" />
                    </div>
                    <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] text-[#03254C]">
                      What AarambhGrow Does
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentService.whatWeDo?.map((item, index) => (
                      <motion.div
                        key={`${item.title}-${index}`}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-md bg-[#F8FAFC] border border-[#E2E8F0] p-3.5"
                      >
                        <h4 className="text-[11px] sm:text-xs font-bold leading-[1.3] text-[#03254C]">{item.title}</h4>
                        <p className="mt-1 text-[10px] font-normal leading-[1.4] text-[#64748B]">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white border border-[#E2E8F0] rounded-md p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.025)]"
                >
                  <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#E2E8F0]">
                    <div className="w-8 h-8 rounded-md bg-[#F26522]/10 flex items-center justify-center">
                      <Award className="w-4 h-4 text-[#F26522]" />
                    </div>
                    <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] text-[#03254C]">
                      Why Businesses Choose {currentService.name || currentService.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {currentService.whyChoose?.map((item, index) => (
                      <motion.div
                        key={`${item.title}-${index}`}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start gap-3 bg-[#F8FAFC] rounded-md border border-[#E2E8F0] p-3.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#157327] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-[11px] sm:text-xs font-bold leading-[1.35] text-[#03254C]">{item.title}</h4>
                          <p className="mt-1 text-[10px] sm:text-[11px] font-normal leading-[1.5] text-[#64748B]">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {currentService.eligibility?.length > 0 && (
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white border border-[#E2E8F0] rounded-md p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.025)]"
                  >
                    <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#E2E8F0]">
                      <div className="w-8 h-8 rounded-md bg-[#157327]/10 flex items-center justify-center">
                        <ClipboardCheck className="w-4 h-4 text-[#157327]" />
                      </div>
                      <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] text-[#03254C]">
                        Eligibility Requirements
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentService.eligibility.map((item, index) => (
                        <div key={`${item.title}-${index}`} className="rounded-md bg-[#F8FAFC] border border-[#E2E8F0] p-3.5">
                          <h4 className="text-[11px] sm:text-xs font-bold text-[#03254C]">{item.title}</h4>
                          <p className="mt-1 text-[10px] sm:text-[11px] font-normal leading-[1.4] text-[#64748B]">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentService.eligibilityAreas?.length > 0 && (
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white border border-[#E2E8F0] rounded-md p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.025)]"
                  >
                    <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#E2E8F0]">
                      <div className="w-8 h-8 rounded-md bg-[#03254C]/10 flex items-center justify-center">
                        <ClipboardCheck className="w-4 h-4 text-[#03254C]" />
                      </div>
                      <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] text-[#03254C]">
                        80-IAC Eligibility Areas
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {currentService.eligibilityAreas.map((item, index) => (
                        <span
                          key={`${item}-${index}`}
                          className="px-2.5 py-1.5 rounded-md bg-[#03254C]/5 border border-[#03254C]/10 text-[10px] sm:text-[11px] font-semibold text-[#03254C]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentService.exemptionAreas?.length > 0 && (
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white border border-[#E2E8F0] rounded-md p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.025)]"
                  >
                    <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#E2E8F0]">
                      <div className="w-8 h-8 rounded-md bg-[#F26522]/10 flex items-center justify-center">
                        <IndianRupee className="w-4 h-4 text-[#F26522]" />
                      </div>
                      <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] text-[#03254C]">
                        Tax Exemption Areas
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {currentService.exemptionAreas.map((item, index) => (
                        <span
                          key={`${item}-${index}`}
                          className="px-2.5 py-1.5 rounded-md bg-[#F26522]/5 border border-[#F26522]/15 text-[10px] sm:text-[11px] font-semibold text-[#F26522]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

