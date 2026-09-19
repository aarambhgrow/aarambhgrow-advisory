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

import {labourLicenceData} from "../../../data/labour-licence";

const Section = ({ number, title, children }) => (
  <section className="mb-12">
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F26522] text-sm font-bold text-white">
        {number}
      </span>
      <h2 className="text-2xl font-bold text-[#03254C] sm:text-3xl">{title}</h2>
    </div>
    {children}
  </section>
);

const ListItem = ({ children }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#157327]" />
    <span className="text-sm leading-6 text-slate-600 sm:text-base">{children}</span>
  </li>
);

const InfoCard = ({ icon: Icon, title, children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7ed]">
      <Icon className="h-5 w-5 text-[#F26522]" />
    </div>
    <h3 className="mb-2 text-base font-bold text-[#03254C]">{title}</h3>
    <p className="text-sm leading-6 text-slate-600">{children}</p>
  </div>
);

export default function LabourLicence() {
  const [openFaq, setOpenFaq] = useState(null);

  const service =
    labourLicenceData?.services?.find(
      (item) =>
        item.id === "labour-licence" ||
        item.name === "Labour Licence" ||
        item.shortTitle === "Labour Licence"
    ) || labourLicenceData?.services?.[0];

  if (!service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-[#03254C]">
            Labour Licence service data not found
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Please check the data/labour-licence.js file.
          </p>
        </div>
      </main>
    );
  }

  const hero = labourLicenceData?.hero || {};
  const benefits = service.benefits || [];
  const suitedFor = service.suitedFor || [];
  const labourAreas = service.labourAreas || [];
  const licenceTypes = service.licenceTypes || [];
  const businessNeeds = service.businessNeeds || [];
  const whatWeDo = service.whatWeDo || [];
  const documents = service.documents || [];
  const process = service.process || [];
  const whyChoose = service.whyChoose || [];

  const faqs = service.faqs?.length
    ? service.faqs
    : [
        {
          question: "What is a Labour Licence?",
          answer:
            "A Labour Licence is an applicable registration or licence required under relevant labour regulations for certain establishments, contractors, or activities. The specific requirement depends on the nature of the business, workforce, contractual arrangements, location, and applicable regulations.",
        },
        {
          question: "Who may require Labour Licence support?",
          answer:
            "Contractors, principal employers, companies, establishments, and businesses engaging workers or contract labour may require applicable registrations, licences, or compliance support depending on their business activities and workforce arrangements.",
        },
        {
          question: "What documents are required for Labour Licence?",
          answer:
            "Documents may include business registration details, PAN, identity and address proofs, establishment details, contractor or principal employer information, worksite details, contract or work-order information, workforce details, and other documents applicable to the specific registration or licence.",
        },
        {
          question: "Can you help with the Labour Licence application process?",
          answer:
            "Yes. Assistance can cover requirement assessment, document preparation, application information, submission support, applicable follow-up, and maintaining relevant records.",
        },
        {
          question: "Does every business need a Labour Licence?",
          answer:
            "Not necessarily. Labour registration and licensing requirements vary according to the nature of the establishment, workforce, contractual arrangements, state or location, and applicable labour laws and regulations.",
        },
      ];

  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#03254C] to-[#062a57]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F26522]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#157327]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-200">
              {hero.category || service.category || "Labour & Compliance"}
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {hero.title || service.title || "Labour Licence Services in India"}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
              {service.tagline ||
                "Get structured assistance for Labour Licence registration, documentation, application, and applicable compliance requirements"}
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#F26522] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d95316]"
              >
                Get Consultation
              </a>

              <a
                href="#labour-licence-content"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/15"
              >
                Explore Service
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div
        id="labour-licence-content"
        className="mx-auto flex max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:px-10"
      >
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#F26522]">
              Labour & Compliance
            </p>

            <h3 className="mb-5 text-lg font-bold text-[#03254C]">
              Labour Licence Services
            </h3>

            <nav className="space-y-2">
              {[
                ["Introduction", "introduction"],
                ["Benefits", "benefits"],
                ["Who Can Benefit", "suited-for"],
                ["Licence Types", "licence-types"],
                ["Labour Areas", "labour-areas"],
                ["Business Needs", "business-needs"],
                ["What We Do", "what-we-do"],
                ["Documents", "documents"],
                ["Process", "process"],
                ["Why Choose Us", "why-choose"],
                ["FAQs", "faqs"],
              ].map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-[#fff7ed] hover:text-[#F26522]"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {/* Introduction */}
          <div id="introduction">
            <Section number="01" title="Labour Licence Services">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-base leading-8 text-slate-600">
                  {service.description}
                </p>

                <p className="mt-4 text-base leading-8 text-slate-600">
                  Labour-related registration and licensing requirements can
                  vary according to the nature of work, workforce size,
                  contractual arrangements, establishment type, worksite
                  location, and applicable labour regulations. Proper
                  documentation and timely compliance can help businesses
                  maintain organized labour records and meet applicable
                  regulatory requirements.
                </p>
              </div>
            </Section>
          </div>

          {/* Benefits */}
          <div id="benefits">
            <Section number="02" title="Benefits of Labour Licence Support">
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((item, index) => (
                  <InfoCard
                    key={index}
                    icon={index % 2 === 0 ? ShieldCheck : ClipboardCheck}
                    title={item.title || item.name || `Benefit ${index + 1}`}
                  >
                    {item.description || item}
                  </InfoCard>
                ))}
              </div>
            </Section>
          </div>

          {/* Who Can Benefit */}
          <div id="suited-for">
            <Section number="03" title="Who Can Benefit">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {suitedFor.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                  ))}
                </ul>
              </div>
            </Section>
          </div>

          {/* Licence Types */}
          <div id="licence-types">
            <Section number="04" title="Labour Licence Types">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {licenceTypes.map((item, index) => (
                  <InfoCard
                    key={index}
                    icon={BriefcaseBusiness}
                    title={item.title || item.name || item}
                  >
                    {item.description ||
                      "Applicable labour registration or licensing support based on business and workforce requirements."}
                  </InfoCard>
                ))}
              </div>
            </Section>
          </div>

          {/* Labour Areas */}
          <div id="labour-areas">
            <Section number="05" title="Labour Compliance Areas">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {labourAreas.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                  ))}
                </ul>
              </div>
            </Section>
          </div>

          {/* Business Needs */}
          <div id="business-needs">
            <Section number="06" title="Business Needs We Support">
              <div className="grid gap-4 sm:grid-cols-2">
                {businessNeeds.map((item, index) => (
                  <InfoCard
                    key={index}
                    icon={Target}
                    title={
                      item.title || item.name || `Business Requirement ${index + 1}`
                    }
                  >
                    {item.description ||
                      "Structured assistance based on applicable labour registration and compliance requirements."}
                  </InfoCard>
                ))}
              </div>
            </Section>
          </div>

          {/* What We Do */}
          <div id="what-we-do">
            <Section number="07" title="What We Do">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <ul className="space-y-4">
                  {whatWeDo.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                  ))}
                </ul>
              </div>
            </Section>
          </div>

          {/* Documents */}
          <div id="documents">
            <Section number="08" title="Documents Required">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7ed]">
                    <FileText className="h-5 w-5 text-[#F26522]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#03254C]">
                      Typical Documents
                    </h3>
                    <p className="text-sm text-slate-500">
                      Requirements may vary based on the applicable licence or
                      registration.
                    </p>
                  </div>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {documents.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                  ))}
                </ul>
              </div>
            </Section>
          </div>

          {/* Process */}
          <div id="process">
            <Section number="09" title="Labour Licence Process">
              <div className="space-y-4">
                {process.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#03254C] text-sm font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="pt-1">
                      <p className="text-sm leading-6 text-slate-600 sm:text-base">
                        {item}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>
          </div>

          {/* Why Choose */}
          <div id="why-choose">
            <Section number="10" title="Why Choose Our Labour Licence Support">
              <div className="grid gap-4 sm:grid-cols-2">
                {whyChoose.map((item, index) => (
                  <InfoCard
                    key={index}
                    icon={index % 2 === 0 ? Award : ShieldCheck}
                    title={item.title || item.name || `Support Advantage ${index + 1}`}
                  >
                    {item.description || item}
                  </InfoCard>
                ))}
              </div>
            </Section>
          </div>

          {/* FAQs */}
          <div id="faqs">
            <Section number="11" title="Frequently Asked Questions">
              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                      >
                        <span className="text-sm font-bold text-[#03254C] sm:text-base">
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
                            <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600 sm:px-6">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Section>
          </div>

          {/* CTA */}
          <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#03254C] to-[#062a57] p-7 shadow-xl sm:p-10">
            <div className="relative">
              <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-[#F26522]/10 blur-2xl" />

              <div className="relative">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-200">
                  Labour Licence & Compliance Support
                </span>

                <h2 className="mt-3 max-w-2xl text-2xl font-bold text-white sm:text-3xl">
                  Get Structured Support for Your Labour Licence Requirements
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Get assistance with requirement assessment, documentation,
                  application preparation, submission support, and applicable
                  labour compliance requirements based on your business profile.
                </p>

                <a
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#F26522] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d95316]"
                >
                  Get Free Consultation
                  <CheckCircle2 className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}