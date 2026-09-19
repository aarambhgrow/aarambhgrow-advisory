"use client";

import Link from "next/link";
import { ArrowRight, Building2, FileCheck2, Globe2, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] w-full select-none flex-col justify-between bg-[#fafafa] font-sans lg:h-[calc(100dvh-4rem)]">
      {/* Custom Hero Animations */}
      <style jsx global>{`
        @keyframes slowFadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slow-fade-1 {
          animation: slowFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slow-fade-2 {
          animation: slowFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          opacity: 0;
        }

        .animate-slow-fade-3 {
          animation: slowFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }

        .animate-slow-fade-4 {
          animation: slowFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
          opacity: 0;
        }

        .animate-slow-fade-5 {
          animation: slowFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
          opacity: 0;
        }
      `}</style>

      {/* MAIN CONTENT */}
      <div className="relative flex min-h-0 flex-grow items-center py-8 lg:py-0">
        {/* RIGHT BACKGROUND IMAGE */}
        <div
          className="pointer-events-none absolute right-15 top-1 z-0 hidden w-[75%] lg:block"
          style={{
            bottom: "-5rem",
            backgroundImage: "url('/images/hero2.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "100% auto",
          }}
        />

        {/* LEFT CONTENT */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-2 sm:px-6 lg:px-8 lg:py-4">
          <div className="z-20 flex max-w-xl flex-col items-start gap-3 lg:max-w-2xl">
            {/* Status Badge */}
            <div className="animate-slow-fade-1 mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-slate-100/90 px-3.5 py-1 shadow-sm backdrop-blur-sm sm:mb-5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#157327] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#157327]" />
              </span>

              <span className="text-[11px] font-bold uppercase tracking-wider text-[#03254C] sm:text-xs">
                Business Registration & Compliance Advisory
              </span>
            </div>

            {/* SEO H1 */}
            <h1 className="animate-slow-fade-2 text-2xl font-extrabold leading-[1.2] tracking-tight text-[#03254C] sm:text-3xl sm:leading-[1.12] lg:text-[42px] xl:text-[46px]">
              Business Registration & Compliance
              <br className="hidden sm:inline" />
              <span className="text-[#F26522]"> Advisory Services</span>
              <br className="hidden sm:inline" />
              <span className="text-[#157327]"> Across India</span>
            </h1>

            {/* Subheadline */}
            <p className="animate-slow-fade-3 max-w-lg text-sm font-semibold leading-relaxed text-slate-600 sm:text-base">
              Complete Support for Business Registration, Tax, Compliance, Licences & Certifications
            </p>

            {/* Description */}
            <p className="animate-slow-fade-3 max-w-lg text-xs font-normal leading-relaxed text-slate-600 sm:text-sm">
              AarambhGrow Advisory provides structured support for company incorporation, MSME registration, GST registration, ITR filing,
              MCA annual filing, ROC compliance, Startup India DPIIT recognition, licences and business certifications.
            </p>

            {/* ACTION BUTTONS */}
            <div className="animate-slow-fade-4 mt-1 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              {/* Primary CTA */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full border border-[#F26522] bg-[#F26522] px-6 py-3 text-xs font-semibold text-white shadow-md transition-colors duration-300 ease-out hover:text-[#03254C] sm:py-2.5 sm:text-sm"
              >
                <span className="absolute inset-0 z-0 translate-y-full bg-white transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0" />

                <span className="relative z-10 flex items-center gap-1.5">
                  Get a Free Consultation
                  <ArrowUpRight className="h-4 w-4 text-white transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#157327]" />
                </span>
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/services"
                className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-semibold text-[#03254C] shadow-sm transition-colors duration-300 ease-out hover:border-[#03254C] hover:text-white sm:py-2.5 sm:text-sm"
              >
                <span className="absolute inset-0 z-0 translate-y-full bg-[#03254C] transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0" />

                <span className="relative z-10 flex items-center gap-1.5">
                  Explore Our Services
                  <ArrowUpRight className="h-4 w-4 text-[#03254C] transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F26522]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STATS */}
      <div className="animate-slow-fade-5 relative z-20 pb-6 sm:pb-4">
        <div className="mx-auto flex w-full max-w-7xl justify-start px-4 sm:px-6 lg:px-8">
          <div className="w-full p-2 sm:p-3.5 lg:w-[56%]">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-2">
              {/* Stat 1 */}
              <div className="flex items-center gap-2.5 rounded-md border border-slate-200/60 bg-white/70 p-2 shadow-sm sm:rounded-md sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[#03254C]">
                  <Building2 className="h-4.5 w-4.5" />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[#03254C] sm:text-sm">13+</h3>
                  <p className="text-[10px] font-medium text-slate-500 sm:text-xs">Advisory Services</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-2.5 rounded-md border border-slate-200/60 bg-white/70 p-2 shadow-sm sm:rounded-md sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-orange-50 text-[#F26522]">
                  <FileCheck2 className="h-4.5 w-4.5" />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[#03254C] sm:text-sm">End-to-End</h3>
                  <p className="text-[10px] font-medium text-slate-500 sm:text-xs">Compliance Support</p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-2.5 rounded-md border border-slate-200/60 bg-white/70 p-2 shadow-sm sm:rounded-md sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-green-50 text-[#157327]">
                  <Globe2 className="h-4.5 w-4.5" />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[#03254C] sm:text-sm">Pan-India</h3>
                  <p className="text-[10px] font-medium text-slate-500 sm:text-xs">Business Support</p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-2.5 rounded-md border border-slate-200/60 bg-white/70 p-2 shadow-sm sm:rounded-md sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[#03254C]">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[#03254C] sm:text-sm">Clear</h3>
                  <p className="text-[10px] font-medium text-slate-500 sm:text-xs">Advisory Process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
