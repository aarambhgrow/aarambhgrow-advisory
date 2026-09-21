"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Building2, ArrowUpRight } from "lucide-react";

import { services } from "../../data/services";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = services.map((service) => ({
  label: service.label,
  href: `/services/${service.slug}`,
}));

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/aarambhgrow",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/aarambhgrow",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.204-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/aarambhgrow-group-of-companies",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative w-full overflow-hidden border-t-4 border-[#F26522] bg-[#081B33] font-sans text-slate-300"
      style={{
        backgroundImage: "url('/images/footer-bg.png')",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 370px",
      }}
    >
      {/* Subtle background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[10%] top-20 h-48 w-48 rounded-full bg-[#F26522]/5 blur-3xl" />

      <div aria-hidden="true" className="pointer-events-none absolute right-[10%] top-20 h-48 w-48 rounded-full bg-[#157327]/5 blur-3xl" />

      {/* =========================================================
          MAIN CORPORATE FOOTER
      ========================================================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pb-9 sm:pt-10 lg:px-8">
        <motion.div
          className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* =====================================================
              BRAND PROFILE
          ===================================================== */}
          <motion.div variants={itemVariants} className="space-y-4 lg:col-span-3">
            {/* LOGO */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="relative flex w-fit items-center"
            >
              <Image
                src="/images/whitelogo1.png"
                alt="AarambhGrow Services Private Limited"
                width={400}
                height={120}
                priority
                unoptimized
                className="h-auto w-[200px] object-contain sm:w-[240px] lg:w-[250px]"
              />
            </motion.div>

            {/* COMPANY DESCRIPTION */}
            <p className="max-w-sm text-xs leading-[1.75] text-slate-400">
              AarambhGrow Advisory provides practical support for business registration, taxation, statutory compliance, licences,
              certifications and startup recognition.{" "}
            </p>
          </motion.div>

          {/* =====================================================
              NAVIGATION & 12 FUNDING SOLUTIONS
          ===================================================== */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-[0.75fr_1.75fr] lg:col-span-5 lg:grid-cols-[0.75fr_1.75fr] lg:border-l lg:border-slate-700/50 lg:pl-7"
          >
            {/* Navigation */}
            <div>
              <h4 className="mb-3 flex items-center pl-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                <span className="mr-2 h-4 w-[2px] rounded-full bg-[#F26522]" />
                Navigation
              </h4>

              <ul className="space-y-1 text-xs">
                {quickLinks.map((link) => (
                  <motion.li
                    key={link.label}
                    whileHover={{ x: 3 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  >
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 rounded-r-md border-l-2 border-transparent px-2.5 py-1.5 text-slate-400 transition-all duration-200 hover:border-[#F26522] hover:bg-[#F26522]/10 hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600 transition-all duration-200 group-hover:scale-125 group-hover:bg-[#F26522]" />

                      <span className="font-medium tracking-wide">{link.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* 12 Funding Solutions */}
            <div>
              <h4 className="mb-3 flex items-center pl-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                <span className="mr-2 h-4 w-[2px] rounded-full bg-[#157327]" />
                Funding Solutions
              </h4>

              <ul className="grid grid-cols-1 gap-y-1 text-xs sm:grid-cols-2 sm:gap-x-3 lg:grid-cols-2">
                {serviceLinks.map((link) => (
                  <motion.li
                    key={link.label}
                    whileHover={{ x: 3 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  >
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 rounded-r-md border-l-2 border-transparent px-2.5 py-1.5 text-slate-400 transition-all duration-200 hover:border-[#157327] hover:bg-[#157327]/10 hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600 transition-all duration-200 group-hover:scale-125 group-hover:bg-[#157327]" />

                      <span className="font-medium tracking-wide">{link.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* =====================================================
              REGISTERED OFFICE
          ===================================================== */}
          <motion.div variants={itemVariants} className="lg:col-span-4 lg:border-l lg:border-slate-700/50 lg:pl-7">
            <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
              <Building2 size={14} className="text-[#F26522]" strokeWidth={2} />

              <span>Registered Office</span>
            </h4>

            <motion.div
              whileHover={{
                y: -2,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="space-y-3.5 rounded-md border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <p className="text-xs leading-[1.7] text-slate-300">
                813, Silver Radiance 4, Ovnaj, Bhavik Publication, SG Highway, Ahmedabad, Gujarat, 380060
              </p>

              <motion.a
                whileHover={{
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                href="https://www.google.com/maps/dir/?api=1&destination=813%2C%20Silver%20Radiance%204%2C%20Ovnaj%2C%20Bhavik%20Publication%2C%20SG%20Highway%2C%20Ahmedabad%2C%20Gujarat%2C%20380060"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white transition-all duration-300 hover:border-[#F26522] hover:bg-[#F26522]"
              >
                <span className="flex items-center gap-2">
                  <MapPin size={13} className="transition-transform duration-300 group-hover/btn:scale-110" />
                  <span>Open Location Map</span>
                </span>

                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* =========================================================
          CONTACT STRIP
      ========================================================= */}
      <div className="relative z-10 border-y border-slate-700/50 bg-[#07182D]/70 py-5 backdrop-blur-[2px]">
        <motion.div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-3">
            {/* ===================================================
                PHONE
            =================================================== */}
            <motion.div
              variants={itemVariants}
              whileHover={{ x: 2 }}
              transition={{
                duration: 0.2,
              }}
              className="group flex items-center gap-3.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-[#F26522] transition-all duration-300 group-hover:border-[#F26522] group-hover:bg-[#F26522] group-hover:text-white">
                <Phone size={18} strokeWidth={2} className="transition-transform duration-300 group-hover:rotate-12" />
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">Direct Inquiries</p>
                <a
                  href="tel:+919998715799"
                  className="mt-0.5 block text-xs font-semibold text-white transition-colors duration-200 hover:text-[#F26522]"
                >
                  +91 9998715799
                </a>
              </div>
            </motion.div>

            {/* ===================================================
                EMAIL
            =================================================== */}
            <motion.div
              variants={itemVariants}
              whileHover={{ x: 2 }}
              transition={{
                duration: 0.2,
              }}
              className="group flex items-center gap-3.5 md:border-l md:border-slate-700/50 md:pl-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-[#157327] transition-all duration-300 group-hover:border-[#157327] group-hover:bg-[#157327] group-hover:text-white">
                <Mail size={18} strokeWidth={2} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">Official Correspondence</p>
                <a
                  href="mailto:info@aarambhgrow.com"
                  className="mt-0.5 block text-xs font-semibold text-white transition-colors duration-200 hover:text-[#157327]"
                >
                  info@aarambhgrow.com
                </a>
              </div>
            </motion.div>

            {/* ===================================================
                SOCIAL LINKS
            =================================================== */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-start gap-2.5 md:justify-end md:border-l md:border-slate-700/50 md:pl-6"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.08,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-slate-300 transition-all duration-300 hover:border-[#F26522] hover:bg-[#F26522] hover:text-white"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          COPYRIGHT
      ========================================================= */}
      <div className="relative z-10 bg-[#051120] py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 text-center text-xs text-slate-500 sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p>© {currentYear} AarambhGrow Advisory. All rights reserved.</p>

          <div className="flex justify-center gap-5">
            <a
              href="/privacy-policy"
              className="transition-colors duration-200 hover:text-slate-300 hover:underline hover:underline-offset-4"
            >
              Privacy Policy
            </a>

            <a
              href="/terms-of-service"
              className="transition-colors duration-200 hover:text-slate-300 hover:underline hover:underline-offset-4"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
