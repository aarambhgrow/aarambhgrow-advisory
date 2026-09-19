"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  Target,
  FileText,
  BriefcaseBusiness,
  Award,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";
import {itrData} from "../../../data/income-tax-itr-filing";

const Section = ({ number, title, children }) => (
  <section className="mb-10">
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F26522] text-sm font-bold text-white">
        {number}
      </span>
      <h2 className="text-2xl font-bold tracking-tight text-[#03254C] sm:text-3xl">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const ListItem = ({ children }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#157327]" />
    <span className="text-[15px] leading-7 text-slate-600">{children}</span>
  </li>
);

const InfoCard = ({ icon: Icon, title, items = [] }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
      <Icon className="h-5 w-5 text-[#F26522]" />
    </div>

    <h3 className="mb-3 text-lg font-bold text-[#03254C]">{title}</h3>

    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <ListItem key={`${title}-${index}`}>{item}</ListItem>
      ))}
    </ul>
  </div>
);

export default function IncomeTaxITRFiling() {
  const [openFaq, setOpenFaq] = useState(null);

  const service =
    itrData?.services?.find(
      (item) =>
        item.id === "income-tax-itr-filing" ||
        item.name === "Income Tax (ITR) Filing" ||
        item.shortTitle === "Income Tax (ITR) Filing"
    ) || itrData?.services?.[0];

  if (!service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-red-600">
            Income Tax ITR data not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Please check data/income-tax-itr-filing.js
          </p>
        </div>
      </main>
    );
  }

  const hero = itrData.hero || {};
  const benefits = service.benefits || [];
  const suitedFor = service.suitedFor || [];
  const itrAreas = service.itrAreas || [];
  const taxpayerTypes = service.taxpayerTypes || [];
  const incomeSources = service.incomeSources || [];
  const taxNeeds = service.taxNeeds || [];
  const whatWeDo = service.whatWeDo || [];
  const documents = service.documents || [];
  const process = service.process || [];
  const whyChoose = service.whyChoose || [];

  const faqs = service.faqs || [
    {
      question: "What is Income Tax Return (ITR) Filing?",
      answer:
        "Income Tax Return filing is the process of reporting applicable income, deductions, taxes, and other required information to the Income Tax Department through the applicable return form and procedure.",
    },
    {
      question: "Who may need to file an Income Tax Return?",
      answer:
        "Individuals, businesses, firms, companies, professionals, and other taxpayers may have an income tax return filing requirement depending on their income, nature of activities, applicable provisions, and other circumstances.",
    },
    {
      question: "Which ITR form is applicable?",
      answer:
        "The applicable ITR form depends on factors such as taxpayer type, sources of income, residential status, business or professional income, capital gains, and other applicable conditions. The correct form should be selected after reviewing the taxpayer's profile.",
    },
    {
      question: "What documents are required for ITR Filing?",
      answer:
        "Common documents and information may include PAN, Aadhaar, Form 16, salary details, bank statements, interest income details, investment information, capital gains statements, business or professional income records, deduction documents, and other applicable financial records.",
    },
    {
      question: "Can ITR Filing include deductions and tax benefits?",
      answer:
        "Applicable deductions, exemptions, and tax benefits may be considered based on the taxpayer's eligibility, selected tax regime, income sources, and supporting documentation under the applicable income-tax provisions.",
    },
    {
      question: "Do you provide ITR Filing support for businesses and professionals?",
      answer:
        "Yes. ITR filing support can cover eligible individuals, salaried taxpayers, professionals, proprietors, firms, companies, and other taxpayers based on their applicable return filing requirements.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-800">
      {/* HERO */}
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
              {hero.title ||
                service.title ||
                "Income Tax (ITR) Filing Services in India"}
            </motion.h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
              {service.tagline ||
                "Get structured assistance for Income Tax Return filing, tax documentation, return preparation, and applicable income-tax compliance requirements"}
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#F26522] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d95416]"
              >
                Get Consultation
              </a>

              <a
                href="#income-tax-itr-filing-content"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:bg-white/15"
              >
                Explore ITR Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section
        id="income-tax-itr-filing-content"
        className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* SIDEBAR */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                  <BriefcaseBusiness className="h-5 w-5 text-[#F26522]" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Service
                  </p>
                  <h3 className="font-bold text-[#03254C]">
                    Income Tax (ITR) Filing
                  </h3>
                </div>
              </div>

              <nav className="space-y-1.5">
                {[
                  ["Introduction", "introduction"],
                  ["Benefits", "benefits"],
                  ["Who Can Benefit", "suited-for"],
                  ["ITR Areas", "itr-areas"],
                  ["Taxpayer Types", "taxpayer-types"],
                  ["Income Sources", "income-sources"],
                  ["Tax Needs", "tax-needs"],
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

          {/* MAIN CONTENT */}
          <div className="min-w-0">
            {/* INTRODUCTION */}
            <section id="introduction" className="mb-12 scroll-mt-24">
              <Section number="01" title="Income Tax (ITR) Filing Services">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-[15px] leading-8 text-slate-600">
                    {service.description}
                  </p>

                  <p className="mt-4 text-[15px] leading-8 text-slate-600">
                    Income Tax Return filing requirements vary according to
                    taxpayer type, income sources, residential status, business
                    or professional activities, deductions, investments, and
                    other applicable conditions. A structured review of
                    financial information helps in preparing the applicable
                    return and supporting documentation.
                  </p>
                </div>
              </Section>
            </section>

            {/* BENEFITS */}
            <section id="benefits" className="mb-12 scroll-mt-24">
              <Section number="02" title="Benefits of ITR Filing Support">
                <div className="grid gap-4 sm:grid-cols-2">
                  {benefits.map((item, index) => (
                    <InfoCard
                      key={index}
                      icon={CheckCircle2}
                      title={`ITR Support ${String(index + 1).padStart(
                        2,
                        "0"
                      )}`}
                      items={[item]}
                    />
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
                      <ListItem key={index}>{item}</ListItem>
                    ))}
                  </div>
                </div>
              </Section>
            </section>

            {/* ITR AREAS */}
            <section id="itr-areas" className="mb-12 scroll-mt-24">
              <Section number="04" title="ITR Filing Areas">
                <div className="grid gap-4 sm:grid-cols-2">
                  {itrAreas.map((item, index) => (
                    <InfoCard
                      key={index}
                      icon={FileText}
                      title={item}
                      items={[
                        `Support for ${item.toLowerCase()} requirements`,
                      ]}
                    />
                  ))}
                </div>
              </Section>
            </section>

            {/* TAXPAYER TYPES */}
            <section id="taxpayer-types" className="mb-12 scroll-mt-24">
              <Section number="05" title="Taxpayer Types">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {taxpayerTypes.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                        <ShieldCheck className="h-5 w-5 text-[#157327]" />
                      </div>

                      <h3 className="text-sm font-bold leading-6 text-[#03254C]">
                        {item}
                      </h3>
                    </div>
                  ))}
                </div>
              </Section>
            </section>

            {/* INCOME SOURCES */}
            <section id="income-sources" className="mb-12 scroll-mt-24">
              <Section number="06" title="Income Sources Covered">
                <div className="grid gap-4 sm:grid-cols-2">
                  {incomeSources.map((item, index) => (
                    <InfoCard
                      key={index}
                      icon={BriefcaseBusiness}
                      title={item}
                      items={[
                        `ITR filing support for ${item.toLowerCase()} income`,
                      ]}
                    />
                  ))}
                </div>
              </Section>
            </section>

            {/* TAX NEEDS */}
            <section id="tax-needs" className="mb-12 scroll-mt-24">
              <Section number="07" title="Tax Filing Needs">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {taxNeeds.map((item, index) => (
                      <ListItem key={index}>{item}</ListItem>
                    ))}
                  </div>
                </div>
              </Section>
            </section>

            {/* WHAT WE DO */}
            <section id="what-we-do" className="mb-12 scroll-mt-24">
              <Section number="08" title="What We Do">
                <div className="grid gap-4 sm:grid-cols-2">
                  {whatWeDo.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                        <ClipboardCheck className="h-5 w-5 text-[#F26522]" />
                      </div>

                      <div>
                        <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#F26522]">
                          Step {String(index + 1).padStart(2, "0")}
                        </span>

                        <p className="text-sm font-semibold leading-6 text-[#03254C]">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </section>

            {/* DOCUMENTS */}
            <section id="documents" className="mb-12 scroll-mt-24">
              <Section number="09" title="Documents Required for ITR Filing">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                      <FileText className="h-5 w-5 text-[#F26522]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#03254C]">
                        Commonly Required Documents & Information
                      </h3>

                      <p className="text-sm text-slate-500">
                        Requirements vary according to taxpayer type, income
                        sources, and applicable return requirements.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {documents.map((item, index) => (
                      <ListItem key={index}>{item}</ListItem>
                    ))}
                  </div>
                </div>
              </Section>
            </section>

            {/* PROCESS */}
            <section id="process" className="mb-12 scroll-mt-24">
              <Section number="10" title="Income Tax Return Filing Process">
                <div className="space-y-4">
                  {process.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#03254C] text-sm font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div>
                        <h3 className="font-bold text-[#03254C]">
                          Stage {index + 1}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </section>

            {/* WHY CHOOSE */}
            <section id="why-choose" className="mb-12 scroll-mt-24">
              <Section number="11" title="Why Choose Our ITR Filing Support">
                <div className="grid gap-4 sm:grid-cols-2">
                  {whyChoose.map((item, index) => (
                    <InfoCard
                      key={index}
                      icon={Award}
                      title={`Support Advantage ${String(index + 1).padStart(
                        2,
                        "0"
                      )}`}
                      items={[item]}
                    />
                  ))}
                </div>
              </Section>
            </section>

            {/* FAQ */}
            <section id="faqs" className="mb-12 scroll-mt-24">
              <Section number="12" title="Frequently Asked Questions">
                <div className="space-y-3">
                  {faqs.map((faq, index) => {
                    const isOpen = openFaq === index;

                    return (
                      <div
                        key={index}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                          aria-expanded={isOpen}
                        >
                          <span className="text-sm font-bold leading-6 text-[#03254C] sm:text-base">
                            {faq.question}
                          </span>

                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-[#F26522] transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                                <p className="text-sm leading-7 text-slate-600">
                                  {faq.answer}
                                </p>
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

            {/* CTA */}
            <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#03254C] to-[#062a57] p-7 shadow-xl sm:p-10">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#F26522]">
                    <Target className="h-4 w-4" />
                    Income Tax & ITR Support
                  </div>

                  <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                    Need Assistance With Your Income Tax Return?
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                    Get structured assistance with ITR form selection,
                    financial information review, document preparation, return
                    filing, and applicable income-tax compliance support.
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