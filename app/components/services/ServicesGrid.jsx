"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { getServiceIcon } from "./serviceIcons";

export default function ServicesGrid({ services }) {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#03254C] to-[#062a57]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F26522]/10 blur-3xl" />

        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#157327]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-200">
              Our Services
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Registration, Tax & Compliance Services for Indian Businesses
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
              Structured, end-to-end support across incorporation, registrations, tax filings, licences and certifications — handled by
              the AarambhGrow advisory team.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#F26522] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d95316]"
              >
                Get Consultation
              </Link>

              <a
                href="#all-services"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/15"
              >
                Browse Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SERVICE CARDS
      ===================================================== */}

      <section id="all-services" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#03254C] sm:text-3xl">All Services</h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            Choose a service to see what it covers, who it suits, the documents involved and the step-by-step process.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service.icon);

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: (index % 3) * 0.05 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F26522]/40 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7ed]">
                      <Icon className="h-5 w-5 text-[#F26522]" />
                    </div>

                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#F26522] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </div>

                  {service.category && (
                    <span className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">{service.category}</span>
                  )}

                  <h3 className="text-base font-bold leading-6 text-[#03254C]">{service.label}</h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{service.navDescription}</p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#03254C] transition-colors group-hover:text-[#F26522]">
                    View Service
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
