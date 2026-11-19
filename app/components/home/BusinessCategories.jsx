"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Rocket,
  Factory,
  ShoppingCart,
  HeartPulse,
  GraduationCap,
  Building2,
  Cpu,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const industries = [
  {
    id: "01",
    label: "Startups & Early-Stage Ventures",
    icon: Rocket,
    color: "#F26522",
    tagline:
      "Accelerating execution, capital readiness, and legal foundations.",
    points: ["Entity structuring", "Cap table setup", "Seed fundraising prep"],
  },
  {
    id: "02",
    label: "MSMEs & Manufacturers",
    icon: Factory,
    color: "#157327",
    tagline: "Industrial compliance, government schemes, and plant operations.",
    points: [
      "Factory licensing",
      "MSME registration",
      "Environmental approvals",
    ],
  },
  {
    id: "03",
    label: "Retail, E-commerce, & Trading",
    icon: ShoppingCart,
    color: "#2563EB",
    tagline:
      "Omnichannel scaling, logistics frameworks, and multi-state taxation.",
    points: ["Multi-state GST", "Trademark protection", "Vendor agreements"],
  },
  {
    id: "04",
    label: "Healthcare & Life Sciences",
    icon: HeartPulse,
    color: "#DC2626",
    tagline: "Clinical regulatory approvals, certifications, and compliance.",
    points: [
      "CDSCO licensing",
      "Data privacy (HIPAA/DISHA)",
      "Lab accreditations",
    ],
  },
  {
    id: "05",
    label: "Education & E-Learning",
    icon: GraduationCap,
    color: "#059669",
    tagline: "Institutional governance, platform terms, and accreditation.",
    points: ["Platform compliance", "IP protection", "Institutional approvals"],
  },
  {
    id: "06",
    label: "Construction & Real Estate",
    icon: Building2,
    color: "#7C3AED",
    tagline: "RERA advisory, property approvals, and joint venture deals.",
    points: [
      "RERA registration",
      "Title clearance",
      "Environmental clearances",
    ],
  },
  {
    id: "07",
    label: "IT, Technology, & SaaS",
    icon: Cpu,
    color: "#0284C7",
    tagline: "Cross-border structures, IP filings, and data security.",
    points: [
      "SaaS legal agreements",
      "International tax setup",
      "Patent & IP strategy",
    ],
  },
  {
    id: "08",
    label: "Professional Services & Hospitality",
    icon: Briefcase,
    color: "#D97706",
    tagline: "Commercial licensing, operational safety, and brand expansion.",
    points: [
      "FSSAI & trade licenses",
      "Service agreements",
      "Labor law compliance",
    ],
  },
];

export default function SupportedIndustriesList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-40px" });

  return (
    <section className="bg-[#fafafa] py-12 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* CENTERED HEADER SECTION */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 pb-6 border-b border-slate-200 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[10px] font-extrabold text-[#F26522] uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Sectors We Empower</span>
          </div>

          <div
            ref={headerRef}
            className={`text-center max-w-3xl mx-auto space-y-4 transition-all duration-700 delay-150 ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f2a4a] leading-tight tracking-tight transition-colors duration-300 hover:text-[#f26522]">
              Industries & Categories We Support
            </h2>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-lg">
            Hover or tap any sector to explore specialized operational, legal,
            and growth capabilities tailored to your domain.
          </p>
        </div>

        {/* INTERACTIVE STACKED ROW LIST */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {industries.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`group cursor-pointer py-4 sm:py-5 transition-colors duration-300 ${
                  isActive ? "bg-white/80" : "hover:bg-slate-100/50"
                }`}
              >
                <div className="px-2 sm:px-4">
                  {/* MAIN ROW BAR */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-6">
                      {/* Number */}
                      <span
                        className={`text-xs sm:text-sm font-extrabold transition-colors duration-300 ${
                          isActive
                            ? "text-[#F26522]"
                            : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      >
                        {item.id}
                      </span>

                      {/* Icon */}
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-slate-900 text-white shadow-md scale-105"
                            : "bg-slate-100 text-slate-600 group-hover:bg-white group-hover:shadow-sm"
                        }`}
                      >
                        <Icon
                          size={16}
                          style={{ color: isActive ? "#ffffff" : item.color }}
                          strokeWidth={2}
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-sm sm:text-lg font-bold transition-colors duration-300 ${
                          isActive
                            ? "text-[#0F2A4A]"
                            : "text-slate-700 group-hover:text-[#0F2A4A]"
                        }`}
                      >
                        {item.label}
                      </h3>
                    </div>
                  </div>

                  {/* EXPANDABLE DETAILS AREA */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 sm:pt-5 pl-8 sm:pl-20 pr-4">
                          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-3 max-w-2xl">
                            {item.tagline}
                          </p>

                          {/* Bullet Points Row */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                            {item.points.map((point) => (
                              <span
                                key={point}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-[11px] font-semibold text-[#0F2A4A]"
                              >
                                <CheckCircle2
                                  size={11}
                                  className="text-[#F26522]"
                                />
                                {point}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
