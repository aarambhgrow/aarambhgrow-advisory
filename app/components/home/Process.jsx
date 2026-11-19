"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Search,
  Compass,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "01",
      badge: "PHASE 01",
      title: "Discovery & Analysis",
      subtitle: "Business & Growth Evaluation",
      icon: Search,
      accent: "#f26522",
      description:
        "We evaluate your business model, operational roadblocks, and growth targets.",
      deliverables: [
        "Business Model Evaluation",
        "Operational Roadblock Assessment",
        "Growth Target Mapping",
      ],
      metric: "100% Operational Clarity",
    },
    {
      id: "02",
      badge: "PHASE 02",
      title: "Tailored Strategy",
      subtitle: "Custom Scaling Roadmap",
      icon: Compass,
      accent: "#157327",
      description:
        "Our specialists design a clear roadmap tailored to your compliance and scaling requirements.",
      deliverables: [
        "Tailored Compliance Framework",
        "Custom Scaling Strategy",
        "Regulatory Milestone Plan",
      ],
      metric: "Targeted Roadmap",
    },
    {
      id: "03",
      badge: "PHASE 03",
      title: "Precision Execution",
      subtitle: "Filing & Implementation",
      icon: Zap,
      accent: "#f26522",
      description:
        "We handle filings, documentation, digital implementations, and registrations with speed and accuracy.",
      deliverables: [
        "Rapid Documentation & Filings",
        "Digital System Implementations",
        "Precision Regulatory Registrations",
      ],
      metric: "Speed & Accuracy",
    },
    {
      id: "04",
      badge: "PHASE 04",
      title: "Continuous Support",
      subtitle: "Ongoing Advisory & Scale",
      icon: ShieldCheck,
      accent: "#157327",
      description:
        "We deliver ongoing compliance management and strategic advisory as your business scales.",
      deliverables: [
        "Ongoing Compliance Management",
        "Strategic Scaling Advisory",
        "Proactive Growth Guidance",
      ],
      metric: "Long-Term Scale",
    },
  ];

  const current = steps[activeStep] || steps[0];

  return (
    <section className="relative w-full bg-[#fafafa] py-12 sm:py-16 lg:py-16 font-sans select-none overflow-hidden text-[#0f172a]">
      <div className="absolute top-6 left-6 opacity-20 pointer-events-none hidden sm:block">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#f26522]" />
          ))}
        </div>
      </div>

      <div className="absolute top-6 right-6 opacity-20 pointer-events-none hidden sm:block">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#157327]" />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* SECTION BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-3 sm:mb-4"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fff5f0] border border-[#f26522]/20 px-3 py-1 sm:px-3.5 sm:py-1">
            <Star className="w-3 h-3 fill-[#f26522] text-[#f26522]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#f26522]">
              OUR METHODOLOGY
            </span>
          </div>
        </motion.div>

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f2a4a] leading-tight tracking-tight transition-colors duration-300 hover:text-[#f26522]">
            Simple Process & Powerful Results
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-xl mx-auto">
            An engineered four-stage execution rail built to navigate regulatory
            complexity with absolute clarity.
          </p>
        </motion.div>

        {/* TIMELINE INTERACTIVE SELECTOR GRID */}
        <div className="mb-8 sm:mb-10 relative">
          {/* Continuous Light Rail Line (Desktop) */}
          {/* <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-slate-200/80 -translate-y-1/2 z-0 rounded-full" /> */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10"
          >
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeStep === idx;

              return (
                <motion.button
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4 },
                    },
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => {
                    if (window.matchMedia("(hover: hover)").matches) {
                      setActiveStep(idx);
                    }
                  }}
                  className={`group relative text-left p-3.5 sm:p-4 rounded-md transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white border-b-2 border-[#0f2a4a] shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/50"
                      : "bg-white/70 border border-slate-200/80 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <span
                      className={`text-[11px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-md transition-colors duration-300 ${
                        isActive
                          ? "text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                      }`}
                      style={{
                        backgroundColor: isActive ? item.accent : undefined,
                      }}
                    >
                      {item.id}
                    </span>

                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? "text-[#0f2a4a]"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      {item.badge}
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-[#0f2a4a] truncate">
                      {item.title}
                    </h3>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* MAIN FEATURE DISPLAY PANEL */}
        <div className="bg-white border border-slate-200/80 rounded-md p-5 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10"
            >
              {/* LEFT: TEXT CONTENT & STRATEGY */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: current.accent }}
                  />
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#0f2a4a]">
                    {current.badge} • {current.subtitle}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0f2a4a] leading-tight">
                  {current.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {current.description}
                </p>

                {/* Impact Metric Bar */}
                <div className="pt-1 sm:pt-2 flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-md bg-[#f8fafc] border border-slate-200/80 text-xs font-bold text-[#0f2a4a]">
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f26522]" />
                    <span>Strategic Focus: {current.metric}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: DELIVERABLE CHECKLIST CARD */}
              <div className="lg:col-span-5">
                <div className="bg-[#f8fafc] border border-slate-200/80 rounded-md p-4 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5 sm:pb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-[#0f2a4a]">
                      Phase Deliverables
                    </span>
                    <Sparkles className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="space-y-2 sm:space-y-2.5">
                    {current.deliverables.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.08 }}
                        className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-md bg-white border border-slate-200/60 shadow-xs"
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: current.accent }}
                        />
                        <span className="text-[11px] sm:text-xs font-bold text-[#0f2a4a]">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* BOTTOM STEP COUNTER */}
                  <div className="pt-2 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-400">
                    <span>Methodology Execution</span>
                    <span className="text-[#0f2a4a] font-black">
                      Step {current.id} of 04
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* STATIC FOOTER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 py-2 px-3.5 sm:px-4 bg-white border border-slate-200/80 rounded-md text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#0f2a4a]/70 cursor-default shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f26522]" />
            <span>Institutional Operational Standard</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
