"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, ShieldCheck, ReceiptText, FileCheck2, Award, Headphones, CheckCircle2 } from "lucide-react";

export default function ValueOutcomes() {
  const outcomes = [
    {
      num: "01",
      icon: Building2,
      title: "Proper Business Setup",
      description: "Structured support for company incorporation, LLP, OPC, partnership and business registrations.",
      accent: "#157327",
    },
    {
      num: "02",
      icon: ShieldCheck,
      title: "Simplified Compliance",
      description: "Support for GST, MSME, MCA annual filing, ROC compliance and other statutory requirements.",
      accent: "#F26522",
    },
    {
      num: "03",
      icon: ReceiptText,
      title: "Tax & ITR Support",
      description: "Assistance with income tax return filing and essential tax compliance requirements.",
      accent: "#157327",
    },
    {
      num: "04",
      icon: FileCheck2,
      title: "Licence & Registration Support",
      description: "Guidance for FSSAI, labour licence, Startup India DPIIT recognition and other registrations.",
      accent: "#F26522",
    },
    {
      num: "05",
      icon: Award,
      title: "Certification & Protection",
      description: "Support for ISO, ZED certification, trademark registration and other business certifications.",
      accent: "#157327",
    },
    {
      num: "06",
      icon: Headphones,
      title: "Dedicated Advisory Support",
      description: "Practical guidance to help entrepreneurs and businesses manage important regulatory requirements.",
      accent: "#F26522",
    },
  ];

  return (
    <section className="w-full bg-[#f8fafc] px-4 py-14 font-sans text-[#03254C] sm:px-8 sm:py-12 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-7">
        {/* TOP ROW */}
        <div className="flex flex-col justify-between gap-6 border-b border-slate-200/80 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#157327]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#157327]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Practical Business Support</span>
            </div>

            <h2 className="text-2xl font-extrabold leading-tight text-[#03254C] sm:text-3xl lg:text-3xl">
              What You Gain With <span className="text-[#F26522]">AarambhGrow Advisory?</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-slate-600">
            From business incorporation and registrations to tax filing, statutory compliance, licences and certifications, AarambhGrow
            Advisory provides structured support for entrepreneurs, startups and MSMEs.
          </p>
        </div>

        {/* OUTCOME CARDS */}
        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.1,
                }}
                className="group relative space-y-4 rounded-md border border-slate-200/80 bg-white p-5 shadow-sm"
              >
                {/* NUMBER */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black tracking-tight" style={{ color: item.accent }}>
                      {item.num}
                    </span>

                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.accent }} />
                  </div>
                </div>

                {/* TITLE & DESCRIPTION */}
                <div className="space-y-1.5">
                  <h3 className="flex items-center gap-2 text-base font-bold text-[#03254C]">
                    <Icon className="h-4 w-4 shrink-0" style={{ color: item.accent }} />

                    {item.title}
                  </h3>

                  <p className="text-xs font-normal leading-relaxed text-slate-600">{item.description}</p>
                </div>

                {/* ACCENT LINE */}
                <div
                  className="mt-4 h-0.5 w-full origin-left bg-slate-200 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: item.accent }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
