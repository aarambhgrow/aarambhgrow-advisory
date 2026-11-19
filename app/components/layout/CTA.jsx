"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Sparkles, PhoneCall, Calendar } from "lucide-react";

export default function CTASection() {
  const highlights = ["No obligation consultation", "Clear compliance guidance", "Confidential information handling"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#fafafa] py-6 font-sans text-[#0f172a] select-none sm:py-8">
      {/* Background Accents */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#f26522]/5 blur-3xl" />

      <div className="pointer-events-none absolute right-1/3 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#157327]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-md bg-[#fafafa] p-5 shadow-md shadow-slate-200/50 sm:p-6 lg:p-8"
        >
          {/* Decorative Gradient Bar */}
          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#03254C] via-[#F26522] to-[#157327]" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12"
          >
            {/* LEFT CONTENT */}
            <motion.div variants={itemVariants} className="space-y-3 text-center lg:col-span-7 lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#f26522]/20 bg-[#fff5f0] px-3 py-0.5 lg:justify-start">
                <Sparkles className="h-3 w-3 text-[#f26522]" />

                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#f26522]">Get Started Today</span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl font-black leading-tight tracking-tight text-[#0f2a4a] sm:text-3xl lg:text-4xl">
                Need Help With Your <span className="text-[#f26522]">Business Registration?</span>
              </h2>

              {/* Subtitle */}
              <p className="mx-auto max-w-xl text-xs font-normal leading-relaxed text-slate-600 sm:text-sm lg:mx-0">
                Get practical support for company incorporation, GST, MSME, ITR filing, MCA compliance, licences, certifications and Startup
                India recognition.
              </p>

              {/* Trust Highlights */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1 sm:gap-4 lg:justify-start">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#157327]" />

                    <span className="text-[11px] font-bold text-[#0f2a4a]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT CTA CARD */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center lg:col-span-5">
              <div className="space-y-3 rounded-md border border-slate-200/80 bg-[#f8fafc] p-4 shadow-2xs">
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#f26522]" />

                    <span className="text-[11px] font-black uppercase tracking-wider text-[#0f2a4a]">Advisory Support</span>
                  </div>

                  <span className="rounded-md bg-[#157327]/10 px-1.5 py-0.5 text-[9px] font-extrabold text-[#157327]">Mon–Sat</span>
                </div>

                {/* PRIMARY CTA */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href="/contact"
                    className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#03254C] px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-white shadow-md shadow-[#03254C]/20 transition-colors duration-300 hover:bg-[#F26522] hover:shadow-[#F26522]/30"
                  >
                    <Calendar className="h-3.5 w-3.5" />

                    <span>Book a Consultation</span>

                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </motion.div>

                {/* SECONDARY CTA */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href="https://wa.me/919998715799?text=Hello%20AarambhGrow%20Advisory%2C%20I%20would%20like%20to%20discuss%20my%20business%20requirement."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-200/80 bg-white px-4 py-2 text-[11px] font-extrabold text-[#0f2a4a] shadow-2xs transition-colors duration-200 hover:bg-slate-50"
                  >
                    <PhoneCall className="h-3.5 w-3.5 text-[#157327]" />

                    <span>Talk to an Advisor</span>
                  </a>
                </motion.div>

                {/* FOOTER NOTICE */}
                <div className="text-center">
                  <span className="text-[10px] font-bold text-slate-400">Business registration & compliance support across India.</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
