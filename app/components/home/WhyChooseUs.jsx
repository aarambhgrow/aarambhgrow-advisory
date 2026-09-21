"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Briefcase, Calendar, ShieldCheck, Check } from "lucide-react";

const features = [
  "End-to-End Solutions Under One Roof",
  "Expert Advisory Across Legal, Tax, & Strategy",
  "Swift Documentation & Guaranteed Compliance",
  "Transparent Process with No Hidden Fees",
  "Scalable Strategies Tailored to Your Business Model",
  "Dedicated Account Manager & Ongoing Support",
];

const stats = [
  {
    icon: Users,
    value: "1000+",
    label: "Happy Clients",
    iconBg: "bg-[#FFF5F0]",
    iconColor: "text-[#F26522]",
  },
  {
    icon: Briefcase,
    value: "500+",
    label: "Projects Completed",
    iconBg: "bg-[#F0FDF4]",
    iconColor: "text-[#157327]",
  },
  {
    icon: Calendar,
    value: "20+",
    label: "Years of Experience",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: ShieldCheck,
    value: "98%",
    label: "Client Satisfaction",
    iconBg: "bg-[#FFF5F0]",
    iconColor: "text-[#F26522]",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="font-body flex items-center justify-center py-6 px-4 lg:py-0 lg:px-0">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative w-full min-h-[480px] lg:min-h-0 lg:aspect-[15/9] flex flex-col justify-center py-8 px-5 sm:px-8 lg:px-10 overflow-hidden shadow-md lg:shadow-none border-y border-slate-200/60 lg:border-none bg-[#fafafa] lg:bg-transparent"
      >
        {/* FULL BACKGROUND IMAGE — Visible on laptop, hidden on mobile */}
        <Image
          src="/images/why.png"
          alt="Why Choose Us - Business Consultancy Experts"
          fill
          priority
          sizes="(min-width: 1024px) 1330px, 100vw"
          className="object-cover object-center z-0 hidden lg:block"
        />

        {/* TOP BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative z-10 flex justify-center mb-3 sm:mb-5"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF5F0] border border-orange-100 text-[10px] sm:text-[11px] font-bold font-heading text-[#F26522] uppercase tracking-wider shadow-2xs">
            <span className="w-1 h-1 rounded-full bg-[#F26522]" />
            Why Choose Us
            <span className="w-1 h-1 rounded-full bg-[#157327]" />
          </span>
        </motion.div>

        {/* CONTENT GRID */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 ml-4 items-center">
          {/* LEFT COLUMN — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-7 space-y-2 sm:space-y-3 text-center lg:text-left"
          >
            <h2 className="text-[20px] sm:text-[26px] lg:text-[30px] font-extrabold font-heading text-[#0F2A4A] leading-tight">
              Built for Confidence,
              <br className="hidden sm:inline" />
              Speed, <span className="text-[#F26522]">and Growth</span>
            </h2>

            <p className="text-[11px] sm:text-[12px] lg:text-[13px] font-normal text-[#64748B] leading-snug max-w-lg mx-auto lg:mx-0">
              We simplify your business journey with expert guidance, transparent processes, and technology-driven solutions.
            </p>

            {/* Feature Bullet Points */}
            <div className="space-y-1.5 sm:space-y-1.5 pt-1 max-w-sm mx-auto lg:mx-0">
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + idx * 0.08,
                  }}
                  className="flex items-center gap-2 justify-start"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-[#F26522] flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-2 h-2 text-white stroke-[3]" />
                  </div>

                  <span className="text-[11px] sm:text-[12px] font-semibold font-heading text-[#0F2A4A] text-left">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* SEO-FRIENDLY INTERNAL LINK */}
            <div className="pt-2 sm:pt-3 flex justify-center lg:justify-start">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold font-heading text-[#F26522] hover:text-[#03254C] transition-colors duration-200 group"
              >
                Learn how our business consultancy experts support your growth
                <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — 2x2 Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-6 grid grid-cols-2 gap-2.5 sm:gap-3"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/95 lg:bg-white/90 backdrop-blur-xs rounded-md p-2.5 sm:p-3 border border-[#E2E8F0] shadow-2xs flex flex-col items-center justify-center text-center transition-transform duration-200"
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${stat.iconBg} flex items-center justify-center mb-1 shadow-2xs`}>
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${stat.iconColor}`} />
                  </div>

                  <span className="text-[15px] sm:text-[18px] font-bold font-heading text-[#0F2A4A] leading-none mb-0.5">{stat.value}</span>

                  <span className="text-[10px] sm:text-[11px] font-normal text-[#64748B]">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
