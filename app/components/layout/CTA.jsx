"use client";

import React from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  PhoneCall,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/* =========================================================
   EXTERNAL WEBSITE LINKS
   Replace these with your actual website URLs
========================================================= */

const SERVICES_URL = "https://aarambhgrow.co.in";
const INFINITY_URL = "https://aarambhgrow.tech";

export default function CTASection() {
  const highlights = [
    "No-obligation funding consultation",
    "Tailored funding strategy",
    "Confidential business information",
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="cta-title"
        className="relative w-full overflow-hidden bg-[#fafafa] py-8 font-sans text-[#0f172a] sm:py-10 lg:py-12"
      >
        {/* Background Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/4 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-[#f26522]/5 blur-3xl sm:h-[350px] sm:w-[350px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1/4 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-[#157327]/5 blur-3xl sm:h-[350px] sm:w-[350px]"
        />

        {/* Main Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.98,
              filter: "blur(5px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.75,
              ease: EASE,
            }}
            className="relative overflow-hidden rounded-md border border-slate-200/80 bg-white"
          >
            {/* Top Gradient Line */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#0f2a4a] via-[#f26522] to-[#157327]"
            />

            <div className="relative grid grid-cols-1 items-center gap-6 p-5 sm:gap-8 sm:p-7 lg:grid-cols-12 lg:gap-10 lg:p-9">
              {/* =================================================
                  LEFT CONTENT
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -25,
                  filter: "blur(5px)",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: EASE,
                }}
                className="text-center lg:col-span-7 lg:text-left"
              >
                {/* Badge */}
                <div className="mb-3 flex justify-center lg:justify-start">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#f26522]/20 bg-[#fff5f0] px-3 py-1">
                    <Sparkles className="h-3 w-3 text-[#f26522]" />

                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#f26522] sm:text-[11px]">
                      START YOUR FUNDING JOURNEY
                    </span>
                  </div>
                </div>

                {/* Heading */}
                <h2
                  id="cta-title"
                  className="text-2xl font-black leading-[1.1] tracking-tight text-[#0f2a4a] sm:text-3xl lg:text-4xl"
                >
                  Ready to Find the Right{" "}
                  <span className="text-[#f26522]">
                    Funding Opportunity?
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-xl text-xs font-normal leading-[1.7] text-slate-600 sm:mt-4 sm:text-sm lg:mx-0">
                  Whether you are a startup, MSME or growing business, our
                  experts help you understand suitable government schemes,
                  grants, startup funding, business loans and credit options
                  based on your business and funding requirements.
                </p>

                {/* Trust Highlights */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:mt-5 sm:gap-x-5 lg:justify-start">
                  {highlights.map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#157327]" />

                      <span className="text-[10px] font-bold text-[#0f2a4a] sm:text-[11px]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* =================================================
                  RIGHT CTA CARD
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 25,
                  filter: "blur(5px)",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.18,
                  ease: EASE,
                }}
                className="lg:col-span-5"
              >
                <div className="rounded-md border border-slate-200/80 bg-[#f8fafc] p-4 sm:p-5">
                  {/* Card Header */}
                  <div className="mb-3 flex items-center justify-between gap-3 border-b border-slate-200/70 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#f26522]" />

                      <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#0f2a4a] sm:text-[11px]">
                        Quick Funding Assessment
                      </span>
                    </div>

                    <span className="shrink-0 rounded-md bg-[#157327]/10 px-1.5 py-0.5 text-[9px] font-extrabold text-[#157327]">
                      Get Started
                    </span>
                  </div>

                  {/* =================================================
                      PRIMARY CTA
                  ================================================== */}

                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href="/contact"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0f2a4a] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-[#f26522] sm:text-[11px]"
                    >
                      <Calendar className="h-3.5 w-3.5" />

                      <span>Book Free Consultation</span>

                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </motion.div>

                  {/* =================================================
                      SECONDARY CTA
                  ================================================== */}

                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-2"
                  >
                    <a
                      href="https://wa.me/919998715799?text=Hello%20AarambhGrow%2C%20I%20would%20like%20to%20discuss%20my%20business%20funding%20requirements."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-200/80 bg-white px-4 py-2.5 text-[10px] font-extrabold text-[#0f2a4a] transition-colors duration-300 hover:border-[#157327]/30 hover:bg-slate-50 sm:text-[11px]"
                    >
                      <PhoneCall className="h-3.5 w-3.5 text-[#157327]" />

                      <span>Talk to a Funding Expert</span>
                    </a>
                  </motion.div>

                  {/* Supporting Text */}
                  <p className="mt-3 text-center text-[9px] font-semibold leading-relaxed text-slate-400 sm:text-[10px]">
                    Discuss startup funding, government schemes, grants, MSME
                    loans and business finance options.
                  </p>

                  {/* =================================================
                      AARAMBH GROW ECOSYSTEM LINKS
                  ================================================== */}

                  <div className="mt-4 border-t border-slate-200/70 pt-3">
                    <p className="mb-2 text-center text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                      Explore AarambhGrow
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Advisory */}
                      <motion.a
                        href={SERVICES_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center justify-between rounded-md border border-slate-200/80 bg-white px-3 py-2.5 transition-all duration-300 hover:border-[#f26522]/30 hover:bg-[#fff7ed]"
                      >
                        <div className="min-w-0">
                          <span className="block text-[10px] font-black text-[#0f2a4a] sm:text-[11px]">
                            AarambhGrow Services
                          </span>

                          <span className="mt-0.5 block text-[8px] font-semibold text-slate-400 sm:text-[9px]">
                            Business Advisory
                          </span>
                        </div>

                        <ArrowUpRight
                          size={14}
                          className="ml-2 shrink-0 text-[#f26522] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </motion.a>

                      {/* Infinity */}
                      <motion.a
                        href={INFINITY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center justify-between rounded-md border border-slate-200/80 bg-white px-3 py-2.5 transition-all duration-300 hover:border-[#157327]/30 hover:bg-[#f0fdf4]"
                      >
                        <div className="min-w-0">
                          <span className="block text-[10px] font-black text-[#0f2a4a] sm:text-[11px]">
                            AarambhGrow Infinity
                          </span>

                          <span className="mt-0.5 block text-[8px] font-semibold text-slate-400 sm:text-[9px]">
                            Explore Infinity
                          </span>
                        </div>

                        <ArrowUpRight
                          size={14}
                          className="ml-2 shrink-0 text-[#157327] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
