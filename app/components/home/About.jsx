"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function HomeAboutTeaser() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 24,
      },
    },
  };

  const headerRef = useRef(null);

  const isInView = useInView(headerRef, {
    once: true,
    margin: "-40px",
  });

  return (
    <section className="w-full bg-[#fafafa] py-12 font-sans text-[#0f172a] sm:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={containerVariants}
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section Badge */}
        <motion.div variants={fadeUpVariants} className="mb-4 flex justify-center">
          <div className="group inline-flex cursor-default items-center gap-1.5 rounded-full border border-[#157327]/20 bg-[#157327]/10 px-3.5 py-1 transition-all duration-300 ease-out hover:scale-105 hover:border-[#157327]/40 hover:shadow-sm">
            <ShieldCheck className="h-3 w-3 text-[#157327] transition-transform duration-300 ease-out group-hover:scale-110" />

            <span className="text-[11px] font-bold uppercase tracking-wider text-[#157327]">WHO WE ARE</span>
          </div>
        </motion.div>

        {/* Heading & Content */}
        <motion.div variants={fadeUpVariants} className="mx-auto max-w-3xl space-y-4 text-center">
          <div
            ref={headerRef}
            className={`mx-auto max-w-3xl space-y-4 text-center transition-all duration-700 delay-150 ease-out ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <h2 className="text-2xl font-black leading-tight tracking-tight text-[#0f2a4a] transition-colors duration-300 hover:text-[#f26522] sm:text-3xl lg:text-4xl">
              Simplifying Business Registration & Compliance
              <br className="hidden sm:inline" />
            </h2>
          </div>

          {/* Body Copy */}
          <div className="space-y-3 text-xs font-normal leading-relaxed text-slate-600 sm:text-sm">
            <p>
              Starting and managing a business involves important registrations, tax requirements, statutory filings, licences and
              certifications. At <strong className="text-[#0f2a4a]">AarambhGrow Advisory</strong>, we help entrepreneurs, startups and MSMEs
              navigate these requirements with structured and practical advisory support.
            </p>

            <p>
              Based in Ahmedabad, Gujarat, AarambhGrow Advisory supports businesses across India with company incorporation, MSME / Udyam
              registration, GST registration, income tax and ITR filing, MCA annual filing, ROC compliance and Digital Signature
              Certificates.
            </p>

            <p>
              We also provide support for Startup India DPIIT recognition, labour licences, FSSAI licences, ISO certification, trademark
              registration, ZED certification and 80IAC tax exemption, helping businesses manage essential regulatory and certification
              requirements from one place.
            </p>

            <p className="pt-1 text-sm font-bold text-[#157327] sm:text-base">
              Clear guidance. Structured processes. Reliable business compliance support.
            </p>
          </div>

          {/* Action Link */}
          <div className="pt-3">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-xs font-bold text-[#f26522] transition-colors hover:text-[#0f2a4a]"
            >
              <span>Learn More About Us</span>

              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
