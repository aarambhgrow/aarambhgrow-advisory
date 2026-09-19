"use client";

import React, { useState } from "react";
import { Star, Target, Award, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const [activeHighlight, setActiveHighlight] = useState(0);

  const pillars = [
    {
      id: "purpose",
      phrase: "simplifying business compliance",
      title: "Our Purpose",
      badge: "PURPOSE",
      icon: Target,
      accent: "#f26522",
      description:
        "We simplify business registration and compliance requirements by providing practical support for entrepreneurs, startups, and MSMEs at every stage of their business journey.",
      highlights: ["Simplify business registration processes", "Reduce compliance complexity", "Provide practical business support"],
    },
    {
      id: "vision",
      phrase: "building compliant businesses",
      title: "Our Vision",
      badge: "VISION",
      icon: Award,
      accent: "#157327",
      description:
        "To become a trusted advisory partner for businesses by delivering reliable registration, taxation, compliance, licensing, certification, and startup recognition services.",
      highlights: [
        "Trusted advisory support for businesses",
        "Reliable registration and compliance services",
        "Support for sustainable business development",
      ],
    },
    {
      id: "mission",
      phrase: "delivering complete advisory support",
      title: "Our Mission",
      badge: "MISSION",
      icon: ShieldCheck,
      accent: "#f26522",
      description:
        "To help businesses establish strong foundations through company incorporation, GST, MSME registration, tax filing, MCA compliance, licences, certifications, trademark registration, and startup recognition.",
      highlights: [
        "Complete registration and compliance support",
        "Licensing and certification assistance",
        "Startup and MSME advisory support",
      ],
    },
  ];

  const current = pillars[activeHighlight];

  return (
    <section className="relative w-full overflow-hidden bg-[#f8fafc] py-10 font-sans text-[#0f172a] sm:py-16">
      {/* Background Decorative Grid Patterns */}
      <div className="pointer-events-none absolute left-8 top-8 opacity-20">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#f26522]" />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute right-8 top-8 opacity-20">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#157327]" />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* SECTION BADGE */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#f26522]/20 bg-[#fff5f0] px-3.5 py-1">
            <Star className="h-3 w-3 fill-[#f26522] text-[#f26522]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f26522]">WHO WE ARE</span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT CONTENT */}
          <div className="space-y-4 lg:col-span-7">
            <h2 className="text-2xl font-black leading-[1.2] tracking-tight text-[#0f2a4a] sm:text-3xl lg:text-4xl">
              Building Stronger Businesses Through <span className="text-[#f26522]">Registration & Compliance.</span>
            </h2>

            <p className="text-sm font-normal leading-relaxed text-slate-600 sm:text-base">
              Starting and managing a business requires more than an idea. At{" "}
              <strong className="font-bold text-[#0f2a4a]">AarambhGrow Advisory</strong>, we help entrepreneurs, startups, and MSMEs manage
              essential business registrations, taxation, statutory compliance, licences, certifications, and startup recognition through
              practical and structured advisory support by{" "}
              <button
                onMouseEnter={() => setActiveHighlight(0)}
                onClick={() => setActiveHighlight(0)}
                className={`inline-block cursor-pointer rounded-md border-b-2 px-1.5 py-0.5 font-bold transition-all duration-200 ${
                  activeHighlight === 0
                    ? "border-[#f26522] bg-[#fff5f0] text-[#f26522]"
                    : "border-slate-300 text-[#0f2a4a] hover:border-[#f26522]"
                }`}
              >
                simplifying business compliance
              </button>
              . Our approach focuses on{" "}
              <button
                onMouseEnter={() => setActiveHighlight(1)}
                onClick={() => setActiveHighlight(1)}
                className={`inline-block cursor-pointer rounded-md border-b-2 px-1.5 py-0.5 font-bold transition-all duration-200 ${
                  activeHighlight === 1
                    ? "border-[#157327] bg-[#f0fdf4] text-[#157327]"
                    : "border-slate-300 text-[#0f2a4a] hover:border-[#157327]"
                }`}
              >
                building compliant businesses
              </button>{" "}
              while{" "}
              <button
                onMouseEnter={() => setActiveHighlight(2)}
                onClick={() => setActiveHighlight(2)}
                className={`inline-block cursor-pointer rounded-md border-b-2 px-1.5 py-0.5 font-bold transition-all duration-200 ${
                  activeHighlight === 2
                    ? "border-[#f26522] bg-[#fff5f0] text-[#f26522]"
                    : "border-slate-300 text-[#0f2a4a] hover:border-[#f26522]"
                }`}
              >
                delivering complete advisory support
              </button>{" "}
              for every stage of business development.
            </p>

            {/* QUICK TRIGGER SELECTOR */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="mr-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Explore:</span>

              {pillars.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveHighlight(idx)}
                  onMouseEnter={() => setActiveHighlight(idx)}
                  className={`rounded-full px-3 py-1 text-xs font-extrabold transition-all duration-200 ${
                    activeHighlight === idx
                      ? "bg-[#0f2a4a] text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {item.badge}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT DYNAMIC PANEL */}
          <div className="lg:col-span-5">
            <div className="relative rounded-md border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              {/* TOP META */}
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full" style={{ backgroundColor: current.accent }} />

                  <span className="text-xs font-black uppercase tracking-wider text-[#0f2a4a]">{current.badge}</span>
                </div>

                <Sparkles className="h-4 w-4 text-slate-300" />
              </div>

              {/* TITLE & DESCRIPTION */}
              <div className="mb-5 space-y-2">
                <h3 className="text-lg font-black text-[#0f2a4a]">{current.title}</h3>

                <p className="text-xs leading-relaxed text-slate-500">{current.description}</p>
              </div>

              {/* HIGHLIGHTS */}
              <div className="mb-5 space-y-2">
                {current.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 rounded-md border border-slate-100 bg-[#f8fafc] p-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: current.accent }} />

                    <span className="text-xs font-bold text-[#0f2a4a]">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* OUR JOURNEY */}
        <div className="mt-10 sm:mt-14">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f26522]">OUR JOURNEY</span>

            <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f2a4a] sm:text-3xl">
              Supporting Businesses From Registration to Compliance
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              AarambhGrow Advisory supports entrepreneurs, startups, and MSMEs with essential business registration, taxation, statutory
              compliance, licensing, certification, and startup recognition requirements. Our services are designed to help businesses
              establish the right foundation and manage important regulatory requirements with greater clarity.
            </p>

            <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Service Focus</p>

                <p className="mt-1 text-xl font-black text-[#0f2a4a]">Business Compliance</p>

                <p className="mt-1 text-xs text-slate-500">
                  Registration, taxation, licences, certifications, and statutory compliance support.
                </p>
              </div>

              <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Advisory Focus</p>

                <p className="mt-1 text-xl font-black text-[#0f2a4a]">Startup & MSME Support</p>

                <p className="mt-1 text-xs text-slate-500">
                  Structured support for entrepreneurs, startups, MSMEs, and growing businesses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICE AREAS */}
        <div className="mt-10 border-t border-slate-200 pt-8 sm:mt-14">
          <div className="mx-auto max-w-5xl text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#157327]">OUR SERVICES</span>

            <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">
              Our advisory services cover company incorporation, MSME / Udyam registration, GST registration, income tax filing, MCA annual
              filing and ROC compliance, DSC, Startup India DPIIT recognition, labour and FSSAI licences, ISO certification, trademark
              registration, ZED certification, and 80IAC tax exemption support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
