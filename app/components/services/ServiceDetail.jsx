"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  Target,
} from "lucide-react";

/* =========================================================
   SAFE CONTENT RENDERER

   Data files describe list items as plain strings or as
   objects using several different key pairs, so every
   renderer here has to cope with all of them.
========================================================= */

const ItemContent = ({ item }) => {
  if (item === null || item === undefined) return null;

  if (typeof item === "string" || typeof item === "number") {
    return <>{item}</>;
  }

  if (typeof item !== "object") return null;

  const title = item.title || item.name || item.step;
  const body = item.description || item.desc;

  if (title && body) {
    return (
      <>
        <strong className="font-semibold text-[#03254C]">{title}</strong> <span>{body}</span>
      </>
    );
  }

  return <span>{title || body || null}</span>;
};

const getItemTitle = (item, fallback = "") => {
  if (typeof item === "string" || typeof item === "number") return String(item);

  if (item && typeof item === "object") {
    return item.title || item.name || item.shortTitle || item.step || fallback;
  }

  return fallback;
};

const getItemBody = (item) => {
  if (item && typeof item === "object") return item.description || item.desc || "";
  return item;
};

/* =========================================================
   BUILDING BLOCKS

   The detail body is intentionally compact: one panel is
   visible at a time, so the page stays short no matter how
   much content a service data file carries.
========================================================= */

const ListItem = ({ item }) => (
  <li className="flex items-start gap-2.5">
    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#157327]" />

    <span className="text-[13px] leading-6 text-slate-600">
      <ItemContent item={item} />
    </span>
  </li>
);

const InfoCard = ({ icon: Icon, title, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 transition-colors duration-200 hover:border-[#F26522]/40">
    <div className="mb-2.5 flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff7ed]">
        <Icon className="h-4 w-4 text-[#F26522]" />
      </span>

      <h3 className="text-sm font-bold leading-snug text-[#03254C]">{title}</h3>
    </div>

    <div className="text-[13px] leading-6 text-slate-600">
      {typeof children === "object" ? <ItemContent item={children} /> : children}
    </div>
  </div>
);

/* Alternating icon pairs keep the card grids visually varied. */
const CARD_ICONS = {
  benefits: [ShieldCheck, ClipboardCheck],
  whyChoose: [Award, ShieldCheck],
  default: [Target, BriefcaseBusiness],
};

/* =========================================================
   SECTION VARIANTS
========================================================= */

const CardsSection = ({ sectionKey, items }) => {
  const [IconA, IconB] = CARD_ICONS[sectionKey] || CARD_ICONS.default;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <InfoCard key={index} icon={index % 2 === 0 ? IconA : IconB} title={getItemTitle(item, `Item ${index + 1}`)}>
          {getItemBody(item)}
        </InfoCard>
      ))}
    </div>
  );
};

const ListSection = ({ items }) => (
  <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
    {items.map((item, index) => (
      <ListItem key={index} item={item} />
    ))}
  </ul>
);

const DocumentsSection = ({ items }) => (
  <div>
    <p className="mb-4 flex items-start gap-2 rounded-lg bg-[#fff7ed] px-3.5 py-2.5 text-xs leading-5 text-[#8a4a1c]">
      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#F26522]" />
      <span>Requirements may vary based on the business, activity, and applicable regulations.</span>
    </p>

    <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
      {items.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </ul>
  </div>
);

const ProcessSection = ({ items }) => (
  <ol className="relative space-y-4 border-l border-dashed border-slate-300 pl-6">
    {items.map((item, index) => (
      <li key={index} className="relative">
        <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-[#03254C] text-[10px] font-bold text-white">
          {index + 1}
        </span>

        <p className="text-[13px] leading-6 text-slate-600">
          <ItemContent item={item} />
        </p>
      </li>
    ))}
  </ol>
);

const FaqSection = ({ faqs }) => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {faqs.map((faq, index) => {
        const isOpen = openFaq === index;

        return (
          <div key={index}>
            <button
              type="button"
              onClick={() => setOpenFaq(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-left"
            >
              <span className="text-[13px] font-bold text-[#03254C]">{faq.question}</span>

              <ChevronDown
                className={`h-4 w-4 shrink-0 text-[#F26522] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-[13px] leading-6 text-slate-600">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const SectionBody = ({ section, items }) => {
  if (section.variant === "process") return <ProcessSection items={items} />;
  if (section.variant === "cards") return <CardsSection sectionKey={section.key} items={items} />;
  if (section.key === "documents") return <DocumentsSection items={items} />;
  return <ListSection items={items} />;
};

/* =========================================================
   SERVICE DETAIL

   Renders any service in the registry (app/data/services.js).
========================================================= */

export default function ServiceDetail({ service, heroImage = null }) {
  const entry = service.data?.services?.[0];

  const [activeTab, setActiveTab] = useState(0);

  if (!entry) return null;

  const hero = service.data?.hero || {};
  const category = hero.category || entry.category || service.data?.category;

  /* Skip sections the data file has nothing for. */
  const sections = service.sections
    .map((section) => ({ ...section, items: entry[section.key] || [] }))
    .filter((section) => section.items.length > 0);

  const faqs = entry.faqs?.length ? entry.faqs : service.faqs;

  const tabs = [
    ...sections,
    ...(faqs.length ? [{ key: "faqs", id: "frequently-asked-questions", navLabel: "FAQs", title: "Frequently Asked Questions" }] : []),
  ];

  const current = tabs[Math.min(activeTab, tabs.length - 1)];

  const contentId = `${service.slug}-content`;

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800">
      {/* =====================================================
          HERO
      ===================================================== */}

{/* =====================================================
    HERO
===================================================== */}
<section className="relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F4FAFF] to-[#E6F3FF]">
  {/* Ambient background glows */}
  <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F26522]/10 blur-3xl" />
  <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#157327]/10 blur-3xl" />
  <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[#2F80ED]/5 blur-3xl" />

  <div
    className={`relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-14 lg:h-[500px] lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-0 ${
      heroImage ? "" : "lg:grid-cols-1"
    }`}
  >
    {/* =====================================================
        HERO CONTENT
    ===================================================== */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={heroImage ? "lg:col-span-6" : "max-w-4xl"}
    >
      {category && (
        <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F26522]">
          {category}
        </span>
      )}

      <h1 className="mt-5 line-clamp-2 text-3xl font-bold leading-tight text-[#03254C] sm:text-4xl lg:text-5xl">
        {hero.title || entry.title || service.label}
      </h1>

      <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
        {entry.tagline || hero.description || entry.description}
      </p>

      {/* Buttons */}
      <div className="mt-7 flex flex-wrap gap-4">
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-[#F26522] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d95316] hover:shadow-lg"
        >
          Get Consultation
        </a>

        <a
          href={`#${contentId}`}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#03254C] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2F80ED] hover:bg-[#F4FAFF] hover:text-[#157327]"
        >
          Explore Service
        </a>
      </div>
    </motion.div>

    {/* =====================================================
        HERO IMAGE
    ===================================================== */}
    {heroImage && (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative flex h-64 items-center justify-center sm:h-80 lg:col-span-6 lg:h-[400px]"
      >
        {/* Soft blue glow behind transparent artwork */}
        <div className="absolute inset-x-4 top-1/2 h-[70%] -translate-y-1/2 rounded-full bg-[#2F80ED]/10 blur-3xl" />

        <Image
          src={heroImage.src}
          alt={`${service.label} illustration`}
          width={heroImage.width}
          height={heroImage.height}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="relative h-full w-full object-contain drop-shadow-[0_18px_45px_rgba(3,37,76,0.15)]"
        />
      </motion.div>
    )}
  </div>
</section>

      {/* =====================================================
          CONTENT

          Compact overview strip + a single tabbed panel, so
          the page never runs to several screens of stacked
          sections.
      ===================================================== */}

      <div id={contentId} className="mx-auto max-w-7xl scroll-mt-24 px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        {/* Overview */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="text-xl font-bold text-[#03254C] sm:text-2xl">{service.intro.title}</h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">{entry.description}</p>

            {service.intro.extra && <p className="mt-3 text-sm leading-7 text-slate-600">{service.intro.extra}</p>}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-4">
            {category && <p className="text-[11px] font-bold uppercase tracking-wider text-[#F26522]">{category}</p>}

            <h3 className="mt-1 text-base font-bold text-[#03254C]">{service.label}</h3>

            <ul className="mt-3 space-y-2">
              {["End-to-end documentation support", "Expert-reviewed filings", "Transparent, fixed-scope pricing"].map((point) => (
                <li key={point} className="flex items-start gap-2 text-[13px] leading-6 text-slate-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#157327]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-[#F26522] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#d95316]"
            >
              Talk to an Advisor
            </a>
          </div>
        </div>

        {/* Tabbed detail */}
        {tabs.length > 0 && (
          <div className="mt-10">
            <div className="sticky top-16 z-20 -mx-5 border-b border-slate-200 bg-[#fafafa]/95 px-5 backdrop-blur-sm sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
              <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {tabs.map((tab, index) => {
                  const isActive = tab === current;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(index)}
                      className={`relative shrink-0 cursor-pointer whitespace-nowrap px-4 py-3 text-[13px] font-semibold transition-colors ${
                        isActive ? "text-[#F26522]" : "text-slate-500 hover:text-[#03254C]"
                      }`}
                    >
                      {tab.navLabel}

                      {isActive && (
                        <motion.span layoutId={`${contentId}-tab`} className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[#F26522]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="pt-7"
              >
                <h3 className="mb-4 text-base font-bold text-[#03254C] sm:text-lg">{current.title}</h3>

                {current.key === "faqs" ? <FaqSection faqs={faqs} /> : <SectionBody section={current} items={current.items} />}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
