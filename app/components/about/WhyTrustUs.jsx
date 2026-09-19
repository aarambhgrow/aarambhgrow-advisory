"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileCheck2, Eye } from "lucide-react";

export default function WhyTrustUs() {
  const trustReasons = [
    {
      icon: ShieldCheck,
      title: "Compliance-Focused Support",
      desc: "Structured assistance for business registration, GST, MSME, taxation, MCA compliance and statutory requirements.",
      color: "#157327",
    },
    {
      icon: FileCheck2,
      title: "Complete Documentation",
      desc: "Guidance for licences, certifications, registrations and essential business documentation with a clear process.",
      color: "#F26522",
    },
    {
      icon: Eye,
      title: "Clear & Transparent Process",
      desc: "Clear communication, defined requirements and transparent guidance throughout your registration and compliance journey.",
      color: "#157327",
    },
  ];

  return (
    <section className="w-full border-t border-slate-100 bg-white px-4 py-10 font-sans text-[#03254C] sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-4">
        <div className="mx-auto max-w-xl space-y-1.5 text-center">
          <span className="rounded-full bg-[#157327]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#157327]">
            Trust & Credibility
          </span>

          <h2 className="text-xl font-black text-[#03254C] sm:text-2xl">Why Choose AarambhGrow Advisory?</h2>

          <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
            Practical advisory support for business registration, taxation, compliance, licences and certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {trustReasons.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: idx * 0.1,
                }}
                className="space-y-3 rounded-md border border-slate-200/80 bg-[#f8fafc] p-5"
              >
                <div className="w-fit rounded-md p-2.5 text-white" style={{ backgroundColor: item.color }}>
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-sm font-bold text-[#03254C]">{item.title}</h3>

                <p className="text-xs font-normal leading-relaxed text-slate-500">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
