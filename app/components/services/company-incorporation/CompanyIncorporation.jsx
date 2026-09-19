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
  IndianRupee,
  ChevronDown,
} from "lucide-react";
import {companyIncorporationData} from "../../../data/company-incorporation";

export default function CompanyIncorporation() {
  const [openFaq, setOpenFaq] = useState(null);
  const data = companyIncorporationData;
  const service =
    data.services?.find((item) => item.id === "company-incorporation") ||
    data.services?.[0];

  const faqs = [
    {
      q: "What is company incorporation?",
      a: "Company incorporation is the legal process of registering a business entity and establishing its legal structure according to applicable requirements.",
    },
    {
      q: "Which business structures can be incorporated?",
      a: "Depending on the business requirements and applicable rules, structures may include Private Limited Company, One Person Company (OPC), LLP, and Partnership Firm.",
    },
    {
      q: "What documents are required for company incorporation?",
      a: "Common requirements may include identity and address proofs, PAN, registered office details, business information, and entity-specific incorporation documents.",
    },
    {
      q: "What is the company incorporation process?",
      a: "The process generally includes business assessment, structure selection, information and document collection, application preparation, filing, verification, and incorporation-related formalities.",
    },
    {
      q: "Can startups and MSMEs get incorporation assistance?",
      a: "Yes. Startups, MSMEs, entrepreneurs, professionals, and other eligible businesses can receive structured assistance based on their proposed business structure and applicable requirements.",
    },
  ];

  const icons = [
    BriefcaseBusiness,
    FileText,
    ClipboardCheck,
    ShieldCheck,
    Award,
    Target,
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#03254C] to-[#062a57] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <span className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              {service?.category || "Business Registration"}
            </span>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {data.hero?.title || "Company Incorporation Services in India"}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
              {service?.tagline ||
                "Get structured assistance for company incorporation, documentation, application preparation, and registration requirements."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="rounded-xl bg-[#F26522] px-6 py-3 font-semibold text-white transition hover:bg-[#d95416]"
              >
                Get Consultation
              </a>

              <a
                href="#company-incorporation-content"
                className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                Explore Service
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section
        id="company-incorporation-content"
        className="px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_1fr]">
          {/* SIDEBAR */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#F26522]">
                Business Registration
              </p>

              <div className="rounded-xl bg-gradient-to-r from-[#F26522] to-[#157327] p-[1px]">
                <div className="rounded-xl bg-white p-4">
                  <p className="font-bold text-[#03254C]">
                    Company Incorporation
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Business registration and incorporation support
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                {[
                  "Private Limited Company",
                  "One Person Company (OPC)",
                  "Limited Liability Partnership",
                  "Partnership Firm",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="space-y-10">
            {/* INTRODUCTION */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-base leading-8 text-slate-600">
                {service?.description ||
                  "Company incorporation is the process of establishing a legally registered business entity. Our structured incorporation assistance covers business structure assessment, documentation, application preparation, filing support, and incorporation-related requirements based on the selected entity type."}
              </p>
            </section>

            {/* BENEFITS */}
            {data.benefits?.length > 0 && (
              <Section title="Company Incorporation Benefits">
                <div className="grid gap-4 sm:grid-cols-2">
                  {data.benefits.map((item, index) => (
                    <InfoCard
                      key={index}
                      item={item}
                      icon={CheckCircle2}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* SUITED FOR */}
            {service?.suitedFor?.length > 0 && (
              <Section title="Who Can Benefit From Company Incorporation?">
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.suitedFor.map((item, index) => (
                    <ListItem key={index} text={item} />
                  ))}
                </div>
              </Section>
            )}

            {/* INCORPORATION AREAS */}
            {data.incorporationAreas?.length > 0 && (
              <Section title="Company Incorporation Areas">
                <div className="grid gap-4 sm:grid-cols-2">
                  {data.incorporationAreas.map((item, index) => (
                    <InfoCard
                      key={index}
                      item={item}
                      icon={icons[index % icons.length]}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* BUSINESS STRUCTURES */}
            {data.businessStructures?.length > 0 && (
              <Section title="Business Structures">
                <div className="grid gap-4 sm:grid-cols-2">
                  {data.businessStructures.map((item, index) => (
                    <InfoCard
                      key={index}
                      item={item}
                      icon={BriefcaseBusiness}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* BUSINESS NEEDS */}
            {data.businessNeeds?.length > 0 && (
              <Section title="Business Incorporation Requirements">
                <div className="grid gap-3 sm:grid-cols-2">
                  {data.businessNeeds.map((item, index) => (
                    <ListItem key={index} text={item} />
                  ))}
                </div>
              </Section>
            )}

            {/* WHAT WE DO */}
            {service?.whatWeDo?.length > 0 && (
              <Section title="What We Do">
                <div className="space-y-3">
                  {service.whatWeDo.map((item, index) => (
                    <InfoCard
                      key={index}
                      item={item}
                      icon={ClipboardCheck}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* DOCUMENTS */}
            {service?.documents?.length > 0 && (
              <Section title="Documents Required">
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.documents.map((item, index) => (
                    <ListItem
                      key={index}
                      text={item}
                      icon={FileText}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* PROCESS */}
            {service?.process?.length > 0 && (
              <Section title="Company Incorporation Process">
                <div className="space-y-4">
                  {service.process.map((item, index) => {
                    const title =
                      typeof item === "string"
                        ? item
                        : item?.title || item?.name || "";

                    const description =
                      typeof item === "string"
                        ? ""
                        : item?.description || "";

                    return (
                      <div
                        key={index}
                        className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#03254C] text-sm font-bold text-white">
                          {index + 1}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {title}
                          </p>

                          {description && (
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                              {description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* WHY CHOOSE */}
            {service?.whyChoose?.length > 0 && (
              <Section title="Why Choose Our Company Incorporation Support?">
                <div className="grid gap-4 sm:grid-cols-2">
                  {service.whyChoose.map((item, index) => (
                    <InfoCard
                      key={index}
                      item={item}
                      icon={ShieldCheck}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* FAQ */}
            <Section title="Frequently Asked Questions">
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-800"
                    >
                      <span>{faq.q}</span>

                      <ChevronDown
                        size={20}
                        className={`shrink-0 transition-transform ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <p className="border-t border-slate-100 px-5 py-4 text-sm leading-7 text-slate-600">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </Section>

            {/* CTA */}
            <section className="rounded-2xl bg-gradient-to-r from-[#03254C] to-[#157327] p-7 text-white sm:p-10">
              <div className="max-w-3xl">
                <div className="mb-4 flex items-center gap-3">
                  <IndianRupee size={24} />
                  <span className="font-semibold">
                    Business Registration
                  </span>
                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Start Your Company Incorporation Process
                </h2>

                <p className="mt-3 leading-7 text-slate-200">
                  Get structured assistance for business structure selection,
                  documentation, application preparation, and incorporation
                  requirements.
                </p>

                <a
                  href="/contact"
                  className="mt-6 inline-flex rounded-xl bg-[#F26522] px-6 py-3 font-semibold text-white transition hover:bg-[#d95416]"
                >
                  Get Consultation
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

/* SECTION */
function Section({ title, children }) {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold text-[#03254C] sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

/* LIST ITEM */
function ListItem({ text, icon: Icon = CheckCircle2 }) {
  const value =
    typeof text === "string"
      ? text
      : text?.title || text?.name || "";

  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <Icon className="mt-0.5 shrink-0 text-[#157327]" size={20} />
      <span className="text-sm leading-6 text-slate-600">{value}</span>
    </div>
  );
}

/* INFO CARD */
function InfoCard({ item, icon: Icon = CheckCircle2 }) {
  if (typeof item === "string") {
    return <ListItem text={item} icon={Icon} />;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-[#F26522]">
        <Icon size={20} />
      </div>

      <h3 className="font-semibold text-slate-800">
        {item?.title || item?.name || item?.shortTitle}
      </h3>

      {item?.description && (
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {item.description}
        </p>
      )}
    </div>
  );
}
