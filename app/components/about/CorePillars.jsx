"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  DollarSign,
  Award,
  Megaphone,
  Scale,
  Settings,
  Sparkles,
  Check,
  ShieldCheck,
} from "lucide-react";

export default function CorePillars() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: "01",
      title: "Business Registration",
      subtitle: "Entity Setup",
      icon: FileText,
      accent: "#f26522",
      image: "/images/a1.jpg",
      tagline: "Comprehensive Incorporation & Statutory Licensing",
      description:
        "End-to-end business setup support to help entrepreneurs establish legally compliant entities and obtain necessary registrations.",
      impact: "Legal Entity Creation",
      deliverables: [
        "Private Limited, LLP, OPC & Section 8 Registration",
        "GST, MSME (Udyam) & Import Export Code (IEC)",
        "Trademark & Intellectual Property Registration",
        "Shop & Establishment Licensing",
      ],
    },
    {
      id: "02",
      title: "Financial Advisory",
      subtitle: "Finance & Tax",
      icon: DollarSign,
      accent: "#157327",
      image: "/images/a2.jpg",
      tagline: "Strategic Capital & Financial Management",
      description:
        "Guidance and operational management for corporate accounting, tax filings, financial projections, and funding preparation.",
      impact: "Financial Oversight",
      deliverables: [
        "Accounting & Monthly Bookkeeping Support",
        "Detailed Project Reports (DPR) & Funding Decks",
        "Direct & Indirect Tax Planning and Advisory",
        "Working Capital Assistance & Banking Documentation",
      ],
    },
    {
      id: "03",
      title: "Certifications & Approvals",
      subtitle: "Standards & Compliance",
      icon: Award,
      accent: "#f26522",
      image: "/images/a3.jpg",
      tagline: "Quality Standards & Regulatory Accreditations",
      description:
        "Assistance in acquiring industry-standard certifications and official government recognitions to build market credibility.",
      impact: "Regulatory Trust",
      deliverables: [
        "ISO Certifications (9001, 27001, etc.)",
        "Startup India (DPIIT) Recognition",
        "FSSAI Licensing, ZED Certification & BIS Support",
        "Vendor Empanelment & Government Registration",
      ],
    },
    {
      id: "04",
      title: "Branding & Expansion",
      subtitle: "Growth & Digital",
      icon: Megaphone,
      accent: "#157327",
      image: "/images/a4.jpg",
      tagline: "Market Presence & Expansion Support",
      description:
        "Digital presence building and brand positioning assets designed to enhance market reach and client trust.",
      impact: "Market Visibility",
      deliverables: [
        "Brand Identity & Corporate Design Setup",
        "Website Architecture & Digital Presence Development",
        "Market Entry Strategy & Advisory",
        "Marketing Collateral & Promotional Assets",
      ],
    },
    {
      id: "05",
      title: "Legal & Compliance",
      subtitle: "Governance & ROC",
      icon: Scale,
      accent: "#f26522",
      image: "/images/a5.jpg",
      tagline: "Corporate Governance & Statutory Protection",
      description:
        "Continuous corporate compliance monitoring and legal drafting to keep operations smooth and fully compliant.",
      impact: "Governance Shield",
      deliverables: [
        "ROC Annual Filings & Secretarial Services",
        "Commercial Contract & Agreement Drafting",
        "Labor Law, EPF, ESIC & Statutory Filings",
        "Legal Audits & Corporate Risk Advisory",
      ],
    },
    {
      id: "06",
      title: "Operational Support",
      subtitle: "Process Optimization",
      icon: Settings,
      accent: "#157327",
      image: "/images/a6.jpg",
      tagline: "Internal Efficiency & Process Management",
      description:
        "Designing internal workflows, standard operating procedures, and administrative frameworks for scalable business execution.",
      impact: "Operational Efficiency",
      deliverables: [
        "SOP Development & Workflow Optimization",
        "Internal Control & Governance Structuring",
        "Process Efficiency Audits",
        "Franchise & Branch Operations Setup",
      ],
    },
  ];

  const currentPillar = pillars[activePillar] || pillars[0];

  return (
    <section
      id="pillars"
      className="w-full bg-[#f8fafc] py-20 font-sans text-[#0f2a4a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-[#157327]">
              <Sparkles className="w-3.5 h-3.5 text-[#f26522]" />
              <span>Services Scope</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f2a4a] tracking-tight">
              Capabilities & Scope
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-xs font-medium">
            Hover over or select a service pillar to explore core operational
            capabilities and detailed key deliverables.
          </p>
        </div>

        {/* TOP 6 MATRIX CARDS WITH IMAGE INTEGRATION & HOVER TRIGGER */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activePillar === idx;

            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(idx)}
                onMouseEnter={() => setActivePillar(idx)}
                className={`group text-left rounded-md transition-all duration-300 relative border cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? "border-[#0f2a4a] shadow-xl ring-2 ring-[#0f2a4a]/20 -translate-y-1"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {/* Top Image Preview Banner */}
                <div className="relative w-full h-24 overflow-hidden bg-slate-900">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      isActive
                        ? "opacity-90 scale-105"
                        : "opacity-60 group-hover:opacity-80"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Pillar ID Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-widest bg-black/60 text-white backdrop-blur-md">
                    {pillar.id}
                  </span>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span
                      className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full shadow-md animate-pulse"
                      style={{ backgroundColor: pillar.accent }}
                    />
                  )}

                  {/* Icon Overlay */}
                  <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 text-white">
                    <Icon className="w-4 h-4 text-white shrink-0 drop-shadow" />
                    <span className="text-[10px] font-bold text-slate-200 truncate max-w-[90px]">
                      {pillar.subtitle}
                    </span>
                  </div>
                </div>

                {/* Bottom Card Body */}
                <div
                  className={`p-3.5 flex-1 flex flex-col justify-between space-y-1 transition-colors duration-300 ${
                    isActive
                      ? "bg-[#0f2a4a] text-white"
                      : "bg-white text-[#0f2a4a]"
                  }`}
                >
                  <h3
                    className={`text-xs font-black leading-tight ${
                      isActive ? "text-white" : "text-[#0f2a4a]"
                    }`}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    className={`text-[10px] line-clamp-2 leading-tight ${
                      isActive ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {pillar.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* FOCUS BLUEPRINT DRAWER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-md border border-slate-200 p-6 sm:p-10 shadow-sm overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Side: Summary & Details */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md text-white"
                      style={{
                        backgroundColor: currentPillar?.accent || "#f26522",
                      }}
                    >
                      Pillar {currentPillar?.id}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#157327]">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{currentPillar?.impact}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#0f2a4a]">
                    {currentPillar?.title}
                  </h3>

                  <p className="text-xs font-bold italic text-slate-500">
                    "{currentPillar?.tagline}"
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {currentPillar?.description}
                  </p>
                </div>
              </div>

              {/* Right Side: Key Deliverables Grid */}
              <div className="lg:col-span-7 lg:border-l lg:border-slate-100 lg:pl-8 space-y-4 flex flex-col justify-start">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                  Key Deliverables
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentPillar?.deliverables?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3.5 rounded-md bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100/70"
                    >
                      <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#157327]" />
                      <span className="text-xs font-semibold text-[#0f2a4a] leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
