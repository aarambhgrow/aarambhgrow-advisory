"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Headphones, ShieldCheck, Lock } from "lucide-react";

export default function ContactHero() {
  const features = [
    {
      icon: Headphones,
      title: "Quick Response",
      description: "We reply within 24 hours",
      iconColor: "text-[#157327]",
      bgColor: "bg-[#157327]/10",
    },
    {
      icon: ShieldCheck,
      title: "Expert Support",
      description: "Guidance from business experts",
      iconColor: "text-[#F26522]",
      bgColor: "bg-[#F26522]/10",
    },
    {
      icon: Lock,
      title: "Confidential & Secure",
      description: "Your information is always safe with us",
      iconColor: "text-[#157327]",
      bgColor: "bg-[#157327]/10",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <section className="relative w-full bg-[#f8fafc] font-sans text-[#03254C] overflow-hidden m-0 p-0">
      <div className="w-full flex items-center relative p-0 m-0 py-8 sm:py-12 lg:py-16">
        {/* LEFT SIDE: Text Content with Framer Motion Animations */}
        <motion.div
          className="w-full lg:w-3/5 space-y-5 text-center lg:text-left px-6 sm:px-12 lg:pl-16 lg:pr-8 z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div variants={fadeInUp} className="inline-block">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#157327]/10 border border-[#157327]/20 text-[11px] sm:text-xs font-bold text-[#03254C] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#157327]" />
              <span>CONTACT US</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={fadeInUp} className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-[42px] xl:text-[46px] font-extrabold tracking-tight text-[#03254C] leading-[1.2] sm:leading-[1.12]">
              Let’s Talk
            </h1>
            <h1 className="text-2xl sm:text-3xl lg:text-[42px] xl:text-[46px] font-extrabold tracking-tight leading-[1.2] sm:leading-[1.12]">
              <span className="text-[#F26522]">Business </span>
              <span className="text-[#157327]">Growth.</span>
            </h1>
            <div className="w-12 h-1 bg-[#F26522] rounded-full mt-2 mx-auto lg:mx-0" />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-xs sm:text-sm font-normal text-[#475569] leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            Have questions about business setup, legal compliance, financial
            advisory, or digital scaling? Reach out to our expert consultants
            today—we are here to guide your journey.
          </motion.p>

          {/* Feature Cards Grid */}
          <motion.div
            variants={fadeInUp}
            className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0"
          >
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3 p-3.5 rounded-md bg-white border border-slate-200/70 shadow-xs text-left"
                >
                  <div
                    className={`p-2.5 rounded-md ${item.bgColor} ${item.iconColor} shrink-0`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#03254C]">
                      {item.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs font-medium text-[#64748B] mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Graphic Flush to Top & Right (Hidden on mobile to prevent text overlap, visible on lg screens) */}
        <div className="hidden lg:block absolute right-0 -top-4 -bottom-4 w-1/2 p-0 m-0 pointer-events-none">
          <Image
            src="/images/contact-hero.png"
            alt="Contact Support Illustration"
            fill
            priority
            sizes="50vw"
            className="object-contain object-right-top mix-blend-multiply p-0 scale-105 origin-top-right"
          />
        </div>
      </div>
    </section>
  );
}