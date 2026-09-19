"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Target, FileText, BriefcaseBusiness, Award, ClipboardCheck, ChevronDown } from "lucide-react";

import { trademarkRegistrationData } from "../../../data/trademark-registration";

/* =========================================================
   SAFE DATA RENDERER
========================================================= */

const ItemContent = ({ item }) => {
  if (item === null || item === undefined) return null;

  if (typeof item === "string" || typeof item === "number") {
    return <>{item}</>;
  }

  if (Array.isArray(item)) {
    return (
      <>
        {item.map((value, index) => (
          <span key={index}>
            <ItemContent item={value} />
            {index < item.length - 1 ? " " : ""}
          </span>
        ))}
      </>
    );
  }

  if (typeof item === "object") {
    if (item.title && item.desc) {
      return (
        <>
          <strong className="font-semibold text-[#03254C]">{item.title}</strong> <span>{item.desc}</span>
        </>
      );
    }

    if (item.title && item.description) {
      return (
        <>
          <strong className="font-semibold text-[#03254C]">{item.title}</strong> <span>{item.description}</span>
        </>
      );
    }

    if (item.name && item.description) {
      return (
        <>
          <strong className="font-semibold text-[#03254C]">{item.name}</strong> <span>{item.description}</span>
        </>
      );
    }

    if (item.name && item.desc) {
      return (
        <>
          <strong className="font-semibold text-[#03254C]">{item.name}</strong> <span>{item.desc}</span>
        </>
      );
    }

    if (item.title) {
      return <strong className="font-semibold text-[#03254C]">{item.title}</strong>;
    }

    if (item.name) {
      return <strong className="font-semibold text-[#03254C]">{item.name}</strong>;
    }

    if (item.description) {
      return <span>{item.description}</span>;
    }

    if (item.desc) {
      return <span>{item.desc}</span>;
    }

    return null;
  }

  return null;
};

/* =========================================================
   SAFE TITLE EXTRACTOR
========================================================= */

const getItemTitle = (item, fallback = "") => {
  if (typeof item === "string" || typeof item === "number") {
    return String(item);
  }

  if (item && typeof item === "object") {
    return item.title || item.name || item.shortTitle || item.heading || fallback;
  }

  return fallback;
};

/* =========================================================
   SECTION
========================================================= */

const Section = ({ number, title, children }) => (
  <section className="mb-12" id={title.toLowerCase().replace(/\s+/g, "-")}>
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F26522] text-sm font-bold text-white">
        {number}
      </span>

      <h2 className="text-2xl font-bold text-[#03254C] sm:text-3xl">{title}</h2>
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

    <span className="text-sm leading-6 text-slate-600 sm:text-base">
      <ItemContent item={item} />
    </span>
  </li>
);

/* =========================================================
   INFO CARD
========================================================= */

const InfoCard = ({ icon: Icon, title, children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7ed]">
      <Icon className="h-5 w-5 text-[#F26522]" />
    </div>

    <h3 className="mb-2 text-base font-bold text-[#03254C]">{title}</h3>

    <p className="text-sm leading-6 text-slate-600">{children}</p>
  </div>
);

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function TrademarkRegistration() {
  const [openFaq, setOpenFaq] = useState(null);

  /* =======================================================
     SERVICE DATA
  ======================================================= */

  const service =
    trademarkRegistrationData?.services?.find(
      (item) =>
        item?.id === "trademark-registration" || item?.name === "Trademark Registration" || item?.shortTitle === "Trademark Registration",
    ) || trademarkRegistrationData?.services?.[0];

  /* =======================================================
     DATA NOT FOUND
  ======================================================= */

  if (!service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-[#03254C]">Trademark Registration service data not found</h1>

          <p className="mt-2 text-sm text-slate-600">Please check the data/trademark-registration.js file.</p>
        </div>
      </main>
    );
  }

  /* =======================================================
     DATA
  ======================================================= */

  const hero = trademarkRegistrationData?.hero || {};

  const benefits = service?.benefits || [];
  const suitedFor = service?.suitedFor || [];
  const trademarkTypes = service?.trademarkTypes || [];
  const trademarkClasses = service?.trademarkClasses || [];
  const businessNeeds = service?.businessNeeds || [];
  const whatWeDo = service?.whatWeDo || [];
  const documents = service?.documents || [];
  const process = service?.process || [];
  const whyChoose = service?.whyChoose || [];

  /* =======================================================
     FAQ
  ======================================================= */

  const faqs = service?.faqs?.length
    ? service.faqs
    : [
        {
          question: "What is Trademark Registration?",
          answer:
            "Trademark Registration is the formal process of registering an eligible trademark such as a brand name, logo, symbol, word, label, tagline, or other mark used in connection with goods or services. The application and registration process is subject to applicable trademark laws and requirements.",
        },
        {
          question: "Who can apply for Trademark Registration?",
          answer:
            "Entrepreneurs, startups, companies, LLPs, partnership firms, proprietorships, MSMEs, and other eligible applicants may apply for trademark registration depending on the nature of the mark and applicable requirements.",
        },
        {
          question: "What can be registered as a trademark?",
          answer:
            "Depending on applicable requirements, trademarks may include brand names, words, logos, symbols, labels, taglines, product names, service names, and combinations of eligible marks.",
        },
        {
          question: "Why is trademark search important?",
          answer:
            "A preliminary trademark search can help identify potentially relevant existing marks before filing. It can assist with evaluating the proposed mark and selecting an appropriate application strategy, although a search does not guarantee registration.",
        },
        {
          question: "What documents are required for trademark registration?",
          answer:
            "Documents may include applicant identity and address details, business registration documents where applicable, trademark or logo details, goods or services description, class information, use-related information where applicable, authorization documents, and other supporting documents.",
        },
        {
          question: "Can you help with trademark application filing?",
          answer:
            "Yes. Assistance can include preliminary search, class identification, application preparation, documentation, filing support, application tracking, and applicable examination or objection-related assistance.",
        },
      ];

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-800">
      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#03254C] to-[#062a57]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F26522]/10 blur-3xl" />

        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#157327]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-200">
              {hero?.category || service?.category || "Intellectual Property & Compliance"}
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {hero?.title || service?.title || "Trademark Registration Services in India"}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
              {service?.tagline ||
                "Get structured assistance for trademark search, application, documentation, filing, and registration support"}
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              <ItemContent item={service?.description} />
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#F26522] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d95316]"
              >
                Get Consultation
              </a>

              <a
                href="#trademark-registration-content"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/15"
              >
                Explore Service
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div id="trademark-registration-content" className="mx-auto flex max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:px-10">
        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#F26522]">Intellectual Property & Compliance</p>

            <h3 className="mb-5 text-lg font-bold text-[#03254C]">Trademark Registration</h3>

            <nav className="space-y-2">
              {[
                ["Introduction", "introduction"],
                ["Benefits", "benefits"],
                ["Who Can Benefit", "who-can-benefit"],
                ["Trademark Types", "trademark-types"],
                ["Trademark Classes", "trademark-classes"],
                ["Business Needs", "business-needs"],
                ["What We Do", "what-we-do"],
                ["Documents", "documents-required"],
                ["Process", "trademark-registration-process"],
                ["Why Choose Us", "why-choose-us"],
                ["FAQs", "frequently-asked-questions"],
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

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="min-w-0 flex-1">
          {/* =================================================
              INTRODUCTION
          ================================================= */}

          <div id="introduction">
            <Section number="01" title="Trademark Registration Services">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-base leading-8 text-slate-600">
                  <ItemContent item={service?.description} />
                </p>

                <p className="mt-4 text-base leading-8 text-slate-600">
                  Trademark registration can help eligible businesses protect and formally register distinctive brand identifiers used with
                  their goods or services. The process may involve preliminary search, classification, applicant information, documentation,
                  application filing, examination, and applicable post-filing stages.
                </p>
              </div>
            </Section>
          </div>

          {/* =================================================
              BENEFITS
          ================================================= */}

          <div id="benefits">
            <Section number="02" title="Benefits of Trademark Registration Support">
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((item, index) => (
                  <InfoCard
                    key={index}
                    icon={index % 2 === 0 ? ShieldCheck : ClipboardCheck}
                    title={getItemTitle(item, `Benefit ${index + 1}`)}
                  >
                    <ItemContent item={item?.description || item?.desc || item} />
                  </InfoCard>
                ))}
              </div>
            </Section>
          </div>

          {/* =================================================
              WHO CAN BENEFIT
          ================================================= */}

          <div id="who-can-benefit">
            <Section number="03" title="Who Can Benefit">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {suitedFor.map((item, index) => (
                    <ListItem key={index} item={item} />
                  ))}
                </ul>
              </div>
            </Section>
          </div>

          {/* =================================================
              TRADEMARK TYPES
          ================================================= */}

          <div id="trademark-types">
            <Section number="04" title="Types of Trademarks">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {trademarkTypes.map((item, index) => (
                  <InfoCard key={index} icon={BriefcaseBusiness} title={getItemTitle(item, `Trademark Type ${index + 1}`)}>
                    <ItemContent
                      item={
                        item?.description ||
                        item?.desc ||
                        "Trademark application support based on the nature of the proposed mark and applicable requirements."
                      }
                    />
                  </InfoCard>
                ))}
              </div>
            </Section>
          </div>

          {/* =================================================
              TRADEMARK CLASSES
          ================================================= */}

          <div id="trademark-classes">
            <Section number="05" title="Trademark Classification Areas">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {trademarkClasses.map((item, index) => (
                    <ListItem key={index} item={item} />
                  ))}
                </ul>
              </div>
            </Section>
          </div>

          {/* =================================================
              BUSINESS NEEDS
          ================================================= */}

          <div id="business-needs">
            <Section number="06" title="Business Needs We Support">
              <div className="grid gap-4 sm:grid-cols-2">
                {businessNeeds.map((item, index) => (
                  <InfoCard
                    key={index}
                    icon={index % 2 === 0 ? Target : BriefcaseBusiness}
                    title={getItemTitle(item, `Business Requirement ${index + 1}`)}
                  >
                    <ItemContent item={item?.description || item?.desc || item} />
                  </InfoCard>
                ))}
              </div>
            </Section>
          </div>

          {/* =================================================
              WHAT WE DO
          ================================================= */}

          <div id="what-we-do">
            <Section number="07" title="What We Do">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <ul className="space-y-4">
                  {whatWeDo.map((item, index) => (
                    <ListItem key={index} item={item} />
                  ))}
                </ul>
              </div>
            </Section>
          </div>

          {/* =================================================
              DOCUMENTS
          ================================================= */}

          <div id="documents-required">
            <Section number="08" title="Documents & Information Required">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7ed]">
                    <FileText className="h-5 w-5 text-[#F26522]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#03254C]">Typical Documents</h3>

                    <p className="text-sm text-slate-500">
                      Requirements may vary based on the applicant, trademark, business structure, and application requirements.
                    </p>
                  </div>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {documents.map((item, index) => (
                    <ListItem key={index} item={item} />
                  ))}
                </ul>
              </div>
            </Section>
          </div>

          {/* =================================================
              PROCESS
          ================================================= */}

          <div id="trademark-registration-process">
            <Section number="09" title="Trademark Registration Process">
              <div className="space-y-4">
                {process.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -12,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.04,
                    }}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#03254C] text-sm font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="pt-1">
                      <p className="text-sm leading-6 text-slate-600 sm:text-base">
                        <ItemContent item={item} />
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>
          </div>

          {/* =================================================
              WHY CHOOSE
          ================================================= */}

          <div id="why-choose-us">
            <Section number="10" title="Why Choose Our Trademark Registration Support">
              <div className="grid gap-4 sm:grid-cols-2">
                {whyChoose.map((item, index) => (
                  <InfoCard
                    key={index}
                    icon={index % 2 === 0 ? Award : ShieldCheck}
                    title={getItemTitle(item, `Support Advantage ${index + 1}`)}
                  >
                    <ItemContent item={item?.description || item?.desc || item} />
                  </InfoCard>
                ))}
              </div>
            </Section>
          </div>

          {/* =================================================
              FAQ
          ================================================= */}

          <div id="frequently-asked-questions">
            <Section number="11" title="Frequently Asked Questions">
              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  const question = typeof faq === "object" ? faq?.question || faq?.title || "Frequently Asked Question" : String(faq);

                  const answer = typeof faq === "object" ? faq?.answer || faq?.description || faq?.desc || "" : "";

                  return (
                    <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                      >
                        <span className="text-sm font-bold text-[#03254C] sm:text-base">{question}</span>

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
                            <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600 sm:px-6">
                              <ItemContent item={answer} />
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

          {/* =================================================
              CTA
          ================================================= */}

          <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#03254C] to-[#062a57] p-7 shadow-xl sm:p-10">
            <div className="relative">
              <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-[#F26522]/10 blur-2xl" />

              <div className="relative">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-200">Trademark Registration</span>

                <h2 className="mt-3 max-w-2xl text-2xl font-bold text-white sm:text-3xl">
                  Get Structured Support for Your Trademark Registration
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Get assistance with trademark search, class identification, documentation, application preparation, filing, application
                  tracking, and applicable post-filing support.
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
