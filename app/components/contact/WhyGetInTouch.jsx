"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Compass,
  Zap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function WhyGetInTouchSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      id: "expert",
      icon: Award,
      title: "Expert Consultation",
      subtitle: "Direct Access to Specialists",
      description:
        "Speak directly with specialists who understand regulatory requirements and business growth.",
      accent: "#157327",
      badge: "Direct Support",
      metric: "100%",
      metricLabel: "Dedicated Specialists",
    },
    {
      id: "tailored",
      icon: Compass,
      title: "Tailored Guidance",
      subtitle: "Custom-Fit Business Strategies",
      description:
        "Receive recommendations designed specifically for your business stage and industry.",
      accent: "#F26522",
      badge: "Custom Fit",
      metric: "1-on-1",
      metricLabel: "Personalized Advisory",
    },
    {
      id: "turnaround",
      icon: Zap,
      title: "Fast Turnaround",
      subtitle: "Transparent & Rapid Execution",
      description:
        "Clear, actionable steps with transparent timelines for your filings and registrations.",
      accent: "#157327",
      badge: "Rapid Execution",
      metric: "< 24h",
      metricLabel: "Initial Action Plan",
    },
  ];

  return (
    <section className="w-full bg-[#F8FAFC] font-sans text-[#03254C] py-8 sm:py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* COMPACT LIGHT HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#157327]/10 text-[#157327] text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Value Promise</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#03254C] tracking-tight">
              Why <span className="text-[#F26522]">Get in Touch?</span>
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 max-w-sm leading-relaxed">
            Straightforward guidance, reduced risk, and transparent timelines
            designed specifically for your business growth.
          </p>
        </div>

        {/* ULTRA-COMPACT 2-COLUMN PREMIUM INTERACTION LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* LEFT: Interactive Feature Selectors (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-2.5">
            {features.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeIndex === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative p-3.5 sm:p-4 rounded-md border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isActive
                      ? "bg-white border-slate-300 shadow-sm ring-1 ring-slate-200"
                      : "bg-white/60 border-slate-200/70 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  {/* Left Accent Bar */}
                  <div
                    className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ backgroundColor: item.accent }}
                  />

                  <div className="flex items-center gap-3 pl-1">
                    <div
                      className={`p-2 rounded-md transition-colors ${
                        isActive ? "text-white" : "text-slate-500 bg-slate-100"
                      }`}
                      style={{
                        backgroundColor: isActive ? item.accent : undefined,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs sm:text-sm font-bold text-[#03254C]">
                          {item.title}
                        </h3>
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Dynamic Showcase Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-md p-5 shadow-xs flex flex-col justify-between relative overflow-hidden min-h-[220px]">
            {/* Top Light Ambient Glow */}
            <div
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-15 blur-2xl transition-all duration-500"
              style={{ backgroundColor: features[activeIndex].accent }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 relative z-10"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100"
                    style={{ color: features[activeIndex].accent }}
                  >
                    {features[activeIndex].badge}
                  </span>
                  <span className="text-xs font-black text-slate-300">
                    0{activeIndex + 1} / 03
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-[#03254C]">
                    {features[activeIndex].subtitle}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                    {features[activeIndex].description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-baseline gap-3">
                  <span
                    className="text-2xl font-black tracking-tight"
                    style={{ color: features[activeIndex].accent }}
                  >
                    {features[activeIndex].metric}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {features[activeIndex].metricLabel}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Security Assurance */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium relative z-10">
              <ShieldCheck className="w-3.5 h-3.5 text-[#157327]" />
              <span>Guaranteed Regulatory Compliance & Confidentiality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
