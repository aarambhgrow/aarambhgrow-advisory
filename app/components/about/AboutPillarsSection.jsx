"use client";

import React, { useState } from "react";
import {
  FileText,
  DollarSign,
  Award,
  Megaphone,
  Scale,
  Settings,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function AboutPillarsSection() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: "01",
      title: "Business Registration",
      subtitle: "Legal Entity Setup & Licensing",
      icon: FileText,
      accent: "#f26522",
      tagline: "Speed to Market with Zero Legal Ambiguity",
      description:
        "Complete end-to-end entity incorporation and government filings designed to establish your corporate structure securely from day one.",
      impact: "100% Statutory Compliance",
      deliverables: [
        "Private Limited, LLP, One Person Company (OPC) Setup",
        "GST Registration, MSME / Udyam & Import Export Code (IEC)",
        "Trademark Registration & Intellectual Property Protection",
        "Local Authority, Shop & Establishment Licensing",
      ],
    },
    {
      id: "02",
      title: "Financial Advisory",
      subtitle: "Capital Strategy & Virtual CFO",
      icon: DollarSign,
      accent: "#157327",
      tagline: "Investor-Grade Financial Discipline",
      description:
        "Robust accounting, financial forecasting, and CFO oversight aimed at preserving capital efficiency and driving enterprise value.",
      impact: "Audit-Ready Books",
      deliverables: [
        "Virtual CFO Services & Monthly Strategic Accounting",
        "Detailed Project Reports (DPR) & Funding Pitch Decks",
        "Tax Planning, Optimization & Annual Auditing",
        "Working Capital Management & Banking Documentation",
      ],
    },
    {
      id: "03",
      title: "Certifications & Approvals",
      subtitle: "Credibility & Standards Accreditation",
      icon: Award,
      accent: "#f26522",
      tagline: "Institutional Trust & Global Quality Recognition",
      description:
        "Secure recognized quality approvals and government accreditation to clear vendor onboarding hurdles and build authority.",
      impact: "Global Quality Alignment",
      deliverables: [
        "ISO 9001, 27001 & Industry-Specific Certifications",
        "Startup India (DPIIT) Recognition & Benefits",
        "FSSAI, ZED Scheme & BIS Quality Standards",
        "Vendor Assessment & Enterprise Empanelment Support",
      ],
    },
    {
      id: "04",
      title: "Branding & Expansion",
      subtitle: "Corporate Presence & Market Entry",
      icon: Megaphone,
      accent: "#157327",
      tagline: "Distinct Corporate Identity & Market Authority",
      description:
        "Strategic communication kits, brand architecture, and digital presence tailored to help growing companies scale smoothly.",
      impact: "Enterprise Market Presence",
      deliverables: [
        "Corporate Brand Systems, Identity & Logo Guidelines",
        "Digital Web Architecture & Collaterals",
        "Market Entry Strategy & Competitive Positioning",
        "Go-To-Market Communication & Media Kits",
      ],
    },
    {
      id: "05",
      title: "Legal & Regulatory Shield",
      subtitle: "Risk Governance & Statutory Compliance",
      icon: Scale,
      accent: "#f26522",
      tagline: "Proactive Shielding Against Regulatory Penalties",
      description:
        "Continuous corporate monitoring and legal risk mitigation to guard your enterprise against statutory delays and compliance lapses.",
      impact: "Zero Penalty Assurance",
      deliverables: [
        "ROC Annual Filings, Board Resolutions & Statutory Registers",
        "Custom Commercial Contracts & Vendor Agreement Drafting",
        "Labor Law Frameworks, EPF & ESIC Governance",
        "Comprehensive Regulatory Risk Audits",
      ],
    },
    {
      id: "06",
      title: "Operational Frameworks",
      subtitle: "Process Optimization & SOP Architecture",
      icon: Settings,
      accent: "#157327",
      tagline: "Scalable Infrastructure for Growth",
      description:
        "Engineer internal operational workflows, implement institutional standard operating procedures (SOPs), and improve execution speed.",
      impact: "Optimined Workflow Speed",
      deliverables: [
        "Institutional SOP Development & Workflow Mapping",
        "Internal Control & Governance Management Systems",
        "Resource Allocation & Operational Efficiency Audits",
        "Multi-Location Expansion & Franchise Architecture",
      ],
    },
  ];

  const current = pillars[activePillar] || pillars[0];

  return (
    <section
      id="pillars"
      className="w-full bg-[#f8fafc] py-16 sm:py-24 font-sans text-[#0f172a]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Badge & Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fff5f0] border border-[#f26522]/20 px-3.5 py-1">
            <Sparkles className="w-3.5 h-3.5 text-[#f26522]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f26522]">
              DEEP DIVE INTO OUR CAPABILITIES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f2a4a] tracking-tight">
            Our Core Pillars & Execution Scope
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            Select a pillar to review the exact deliverables, legal frameworks,
            and strategic advantages we provide.
          </p>
        </div>

        {/* Side-by-Side Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Vertical Navigation List (5 columns) */}
          <div className="lg:col-span-5 space-y-2">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activePillar === idx;

              return (
                <button
                  key={item.id}
                  onClick={() => setActivePillar(idx)}
                  className={`w-full text-left p-4 rounded-md border transition-all duration-200 flex items-center justify-between group ${
                    isActive
                      ? "bg-white border-[#0f2a4a] shadow-md translate-x-1"
                      : "bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2.5 rounded-md transition-colors ${
                        isActive
                          ? "text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      }`}
                      style={{
                        backgroundColor: isActive ? item.accent : undefined,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 tracking-wider block uppercase">
                        Pillar {item.id}
                      </span>
                      <h3 className="text-xs sm:text-sm font-black text-[#0f2a4a]">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive
                        ? "text-[#f26522] translate-x-1"
                        : "text-slate-300 group-hover:text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Active Pillar Detail Canvas (7 columns) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-md p-6 sm:p-8 shadow-sm space-y-6 sticky top-8">
            {/* Header info for selected pillar */}
            <div className="pb-4 border-b border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#f26522]">
                  Pillar {current.id} • {current.subtitle}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#f8fafc] border border-slate-200 text-[#0f2a4a]">
                  <ShieldCheck className="w-3 h-3 text-[#157327]" />
                  {current.impact}
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#0f2a4a]">
                {current.title}
              </h3>

              <p className="text-xs font-extrabold text-slate-400 italic">
                "{current.tagline}"
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {current.description}
            </p>

            {/* Included Deliverables */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#0f2a4a] block">
                Deliverable Scope & Capabilities:
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {current.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-md bg-[#f8fafc] border border-slate-200/60"
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: current.accent }}
                    />
                    <span className="text-xs font-bold text-[#0f2a4a]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
