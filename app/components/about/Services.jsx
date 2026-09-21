"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  Headphones,
  FileText,
  DollarSign,
  Award,
  Palette,
  Settings,
  Scale,
  ArrowUpRight,
} from "lucide-react";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState("All");

  const filterTabs = [
    { name: "All" },
    { name: "Registration" },
    { name: "Finance" },
    { name: "Certification" },
    { name: "Branding" },
    { name: "Operations" },
    { name: "Legal & CA" },
  ];

  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  ];

  return (
    <section className="relative w-full bg-[#f8fafc] py-16 sm:py-14 font-sans select-none overflow-hidden text-[#0f172a]">
      {/* Background Decorative Grid Patterns */}
      <div className="absolute top-10 left-10 opacity-20 pointer-events-none">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#f26522]" />
          ))}
        </div>
      </div>

      <div className="absolute top-10 right-10 opacity-20 pointer-events-none">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#157327]" />
          ))}
        </div>
      </div>

      {/* Hero-matching Container Wrapper */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fff5f0] border border-[#f26522]/20 px-4 py-1 mb-4">
            <Star className="w-3 h-3 fill-[#f26522] text-[#f26522]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#f26522]">
              OUR EXPERTISE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2a4a] leading-tight tracking-tight">
            Business Solutions Designed <br />
            for <span className="text-[#f26522]">Sustainable</span>{" "}
            <span className="text-[#157327]">Growth</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-500 font-normal max-w-2xl leading-relaxed">
            From registration and financial setup to branding, certifications,
            legal compliance, and operations, we offer tailored end-to-end
            solutions for your business.
          </p>
        </div>

        {/* Category Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.name;

            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-500 ease-out ${
                  isActive
                    ? "bg-[#f26522] text-white shadow-md shadow-[#f26522]/30 scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Bento Grid Layout */}
        <div className="space-y-6">
          {/* Top Grid Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Card 01: Registration */}
            {(activeTab === "All" || activeTab === "Registration") && (
              <Link
                href="/services"
                className="group lg:col-span-6 relative flex flex-col justify-between rounded-md bg-white border border-slate-100 p-3.5 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center h-full">
                  <div className="sm:col-span-7 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-[#f26522] shrink-0" />
                        <span className="text-xs font-extrabold text-[#f26522]">
                          01 —
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-[#0f2a4a] mb-1 group-hover:text-[#f26522] transition-colors duration-500">
                        Registration
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed mb-2">
                        Start your company with ease. We handle Private Limited,
                        LLP, OPC, MSME, and all essential business
                        registrations.
                      </p>

                      <ul className="space-y-1 text-xs font-semibold text-slate-700 mb-3">
                        <li className="flex items-center gap-2">
                          <span className="text-[#f26522] text-xs">✓</span>
                          Private Limited Company
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#f26522] text-xs">✓</span>
                          LLP & Partnership Setup
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#f26522] text-xs">✓</span>
                          One Person Company (OPC)
                        </li>
                      </ul>
                    </div>

                    <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0f2a4a] group-hover:text-[#f26522] transition-colors duration-500">
                      <span>Explore Service</span>
                      <div className="w-5 h-5 rounded-full bg-[#f26522] text-white flex items-center justify-center transition-transform duration-700 ease-out group-hover:translate-x-1">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-5 relative h-32 sm:h-full min-h-[130px] bg-gradient-to-tr from-[#f8fafc] to-[#f1f5f9] rounded-md flex items-center justify-center p-2">
                    <Image
                      src="/images/service-1.png"
                      alt="Registration"
                      width={280}
                      height={220}
                      className="w-full h-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      priority
                    />
                  </div>
                </div>
              </Link>
            )}

            {/* Card 02: Finance */}
            {(activeTab === "All" || activeTab === "Finance") && (
              <Link
                href="/services"
                className="group lg:col-span-3 relative flex flex-col justify-between rounded-md bg-white border border-slate-100 p-3.5 shadow-sm hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 overflow-hidden"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-[#157327] shrink-0" />
                    <span className="text-xs font-extrabold text-[#157327]">
                      02 —
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#0f2a4a] mb-1 group-hover:text-[#157327] transition-colors duration-500">
                    Finance
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-2">
                    Business loans, government subsidy support, investor
                    pitching, and financial planning.
                  </p>

                  <div className="relative h-24 w-full bg-slate-50 rounded-md flex items-center justify-center mb-2 p-1.5">
                    <Image
                      src="/images/service-2.png"
                      alt="Finance"
                      width={200}
                      height={140}
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0f2a4a] group-hover:text-[#157327] transition-colors duration-500 mt-auto">
                  <span>Explore Service</span>
                  <div className="w-5 h-5 rounded-full bg-[#157327] text-white flex items-center justify-center transition-transform duration-700 ease-out group-hover:translate-x-1">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            )}

            {/* Card 03: Certification */}
            {(activeTab === "All" || activeTab === "Certification") && (
              <Link
                href="/services"
                className="group lg:col-span-3 relative flex flex-col justify-between rounded-md bg-white border border-slate-100 p-3.5 shadow-sm hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 overflow-hidden"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-[#f26522] shrink-0" />
                    <span className="text-xs font-extrabold text-[#f26522]">
                      03 —
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#0f2a4a] mb-1 group-hover:text-[#f26522] transition-colors duration-500">
                    Certification
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-2">
                    ISO, MSME, FSSAI, Startup India, and trademark approvals to
                    build market authority.
                  </p>

                  <div className="relative h-24 w-full bg-slate-50 rounded-md flex items-center justify-center mb-2 p-1.5">
                    <Image
                      src="/images/service-3.png"
                      alt="Certification"
                      width={200}
                      height={140}
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0f2a4a] group-hover:text-[#f26522] transition-colors duration-500 mt-auto">
                  <span>Explore Service</span>
                  <div className="w-5 h-5 rounded-full bg-[#f26522] text-white flex items-center justify-center transition-transform duration-700 ease-out group-hover:translate-x-1">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* Bottom Grid Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 04: Branding */}
            {(activeTab === "All" || activeTab === "Branding") && (
              <Link
                href="/services"
                className="group relative flex flex-col justify-between rounded-md bg-white border border-slate-100 p-5 shadow-sm hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 overflow-hidden"
              >
                <div className="grid grid-cols-12 gap-3 items-center mb-2">
                  <div className="col-span-6">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Palette className="w-4 h-4 text-[#157327] shrink-0" />
                      <span className="text-xs font-extrabold text-[#157327]">
                        04 —
                      </span>
                    </div>
                    <h3 className="text-base font-black text-[#0f2a4a] mb-1 group-hover:text-[#157327] transition-colors duration-500">
                      Branding
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Brand positioning, identity design, digital strategy, and
                      high-impact UI/UX experiences.
                    </p>
                  </div>

                  <div className="col-span-6 h-28 bg-slate-50 rounded-md flex items-center justify-center p-2">
                    <Image
                      src="/images/service-4.png"
                      alt="Branding"
                      width={160}
                      height={120}
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="mt-1 inline-flex items-center gap-2 text-xs font-bold text-[#0f2a4a] group-hover:text-[#157327] transition-colors duration-500">
                  <span>Explore Service</span>
                  <div className="w-5 h-5 rounded-full bg-[#157327] text-white flex items-center justify-center transition-transform duration-700 ease-out group-hover:translate-x-1">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              </Link>
            )}

            {/* Card 05: Operations */}
            {(activeTab === "All" || activeTab === "Operations") && (
              <Link
                href="/services"
                className="group relative flex flex-col justify-between rounded-md bg-white border border-slate-100 p-5 shadow-sm hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 overflow-hidden"
              >
                <div className="grid grid-cols-12 gap-3 items-center mb-2">
                  <div className="col-span-6">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Settings className="w-4 h-4 text-[#f26522] shrink-0" />
                      <span className="text-xs font-extrabold text-[#f26522]">
                        05 —
                      </span>
                    </div>
                    <h3 className="text-base font-black text-[#0f2a4a] mb-1 group-hover:text-[#f26522] transition-colors duration-500">
                      Operations
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Streamline operations, workflow automation, team
                      structure, and business consulting.
                    </p>
                  </div>

                  <div className="col-span-6 h-28 bg-slate-50 rounded-md flex items-center justify-center p-2">
                    <Image
                      src="/images/service-5.png"
                      alt="Operations"
                      width={160}
                      height={120}
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="mt-1 inline-flex items-center gap-2 text-xs font-bold text-[#0f2a4a] group-hover:text-[#f26522] transition-colors duration-500">
                  <span>Explore Service</span>
                  <div className="w-5 h-5 rounded-full bg-[#f26522] text-white flex items-center justify-center transition-transform duration-700 ease-out group-hover:translate-x-1">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              </Link>
            )}

            {/* Card 06: Legal & CA */}
            {(activeTab === "All" || activeTab === "Legal & CA") && (
              <Link
                href="/services"
                className="group relative flex flex-col justify-between rounded-md bg-white border border-slate-100 p-5 shadow-sm hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 overflow-hidden"
              >
                <div className="grid grid-cols-12 gap-3 items-center mb-2">
                  <div className="col-span-6">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Scale className="w-4 h-4 text-[#157327] shrink-0" />
                      <span className="text-xs font-extrabold text-[#157327]">
                        06 —
                      </span>
                    </div>
                    <h3 className="text-base font-black text-[#0f2a4a] mb-1 group-hover:text-[#157327] transition-colors duration-500">
                      Legal & CA
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      GST filings, income tax returns, ROC filings, legal
                      drafting, and audit compliance.
                    </p>
                  </div>

                  <div className="col-span-6 h-28 bg-slate-50 rounded-md flex items-center justify-center p-2">
                    <Image
                      src="/images/service-6.png"
                      alt="Legal & CA"
                      width={160}
                      height={120}
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="mt-1 inline-flex items-center gap-2 text-xs font-bold text-[#0f2a4a] group-hover:text-[#157327] transition-colors duration-500">
                  <span>Explore Service</span>
                  <div className="w-5 h-5 rounded-full bg-[#157327] text-white flex items-center justify-center transition-transform duration-700 ease-out group-hover:translate-x-1">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-10 rounded-md bg-gradient-to-r from-[#fff2eb] via-[#fff8f5] to-white border border-[#f26522]/15 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-md bg-white shadow-sm border border-[#f26522]/20 flex items-center justify-center text-[#f26522] shrink-0">
              <Headphones className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#0f2a4a]">
                Ready to Grow Your Business?
              </h3>
              <p className="text-xs text-slate-500">
                Our experts are here to guide you through every stage of your
                business journey.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 bg-[#F26522] text-white px-7 py-3.5 rounded-full text-xs font-bold shadow-lg shadow-[#F26522]/20 transition-all duration-500 hover:bg-[#e05412] hover:shadow-xl hover:scale-105"
            >
              <span>Get Free Consultation</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              <div className="flex -space-x-2">
                {avatars.map((avatar, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 overflow-hidden relative shrink-0"
                  >
                    <Image
                      src={avatar}
                      alt={`Client ${idx + 1}`}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-[#0f2a4a]">1000+</p>
                <p className="text-[10px] text-slate-400 font-medium">
                  Businesses Trust Us
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
