"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X, ArrowUpRight, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { services } from "../../data/services";
import { getServiceIcon } from "../services/serviceIcons";

const COLORS = {
  navy: "#03254C",
  orange: "#F26522",
  green: "#157327",
  offWhite: "#fafafa",
  white: "#ffffff",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate500: "#64748b",
  slate600: "#475569",
  orange50: "#fff7ed",
  green50: "#f0fdf4",
};

const SERVICES_URL = "https://aarambhgrow.co.in";
const INFINITY_URL = "https://aarambhgrow.tech";

const SERVICES = services.map((service) => ({
  label: service.label,
  href: `/services/${service.slug}`,
  description: service.navDescription,
  icon: getServiceIcon(service.icon),
}));

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", children: SERVICES },
  { label: "Contact", href: "/contact" },
];

const EXTERNAL_LINKS = [
  { label: "Services", href: SERVICES_URL },
  { label: "Infinity", href: INFINITY_URL },
];

function DesktopNavItem({ link, onNavigate }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(link.children) && link.children.length > 0;

  if (!hasChildren) {
    return (
      <Link
        href={link.href}
        onClick={onNavigate}
        className="group relative flex items-center px-4 py-2.5 text-sm font-semibold transition-colors duration-200"
        style={{ color: COLORS.navy }}
      >
        {link.label}
        <span
          className="absolute bottom-0 left-4 right-4 h-[2px] origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
          style={{ backgroundColor: COLORS.orange }}
        />
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="group relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-colors duration-200"
        style={{ color: COLORS.navy }}
      >
        {link.label}
        <ChevronDown size={16} strokeWidth={2} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        <span
          className="absolute bottom-0 left-4 right-4 h-[2px] origin-left transition-transform duration-200"
          style={{ backgroundColor: COLORS.orange, transform: open ? "scaleX(1)" : "scaleX(0)" }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4"
          >
            <div
              className="w-[1080px] max-w-[calc(100vw-32px)] overflow-hidden rounded-md border bg-white shadow-[0_25px_70px_rgba(3,37,76,0.16)]"
              style={{ borderColor: COLORS.slate200 }}
            >
              <div className="flex">
                <div className="flex-1 p-6">
                  <div className="grid grid-cols-4 gap-3">
                    {link.children.map((service) => {
                      const Icon = service.icon || Building2;

                      return (
                        <Link
                          key={service.href}
                          href={service.href}
                          onClick={() => {
                            setOpen(false);
                            onNavigate?.();
                          }}
                          className="group rounded-md border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                          style={{ borderColor: COLORS.slate200, backgroundColor: COLORS.white }}
                        >
                          <div className="flex gap-3">
                            <div
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors duration-200"
                              style={{ backgroundColor: COLORS.slate100, color: COLORS.navy }}
                            >
                              <Icon size={19} strokeWidth={2} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-sm font-bold leading-5 transition-colors" style={{ color: COLORS.navy }}>
                                  {service.label}
                                </h4>

                                <ArrowUpRight
                                  size={15}
                                  className="shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                  style={{ color: COLORS.orange }}
                                />
                              </div>

                              <p className="mt-1.5 text-[11px] leading-[1.55]" style={{ color: COLORS.slate500 }}>
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div
                className="flex items-center justify-between border-t px-7 py-3.5"
                style={{ borderColor: COLORS.slate200, backgroundColor: COLORS.offWhite }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.green }} />
                  <span className="text-xs font-medium" style={{ color: COLORS.slate600 }}>
                    Business support for startups, MSMEs & entrepreneurs
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DesktopExternalLink({ link }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-1 px-3 py-2.5 text-sm font-semibold transition-colors duration-200"
      style={{ color: COLORS.navy }}
    >
      {link.label}
      <ArrowUpRight
        size={14}
        strokeWidth={2}
        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        style={{ color: COLORS.orange }}
      />
      <span
        className="absolute bottom-0 left-3 right-3 h-[2px] origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
        style={{ backgroundColor: COLORS.orange }}
      />
    </a>
  );
}

function MobileNavItem({ link, onNavigate }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(link.children) && link.children.length > 0;

  if (!hasChildren) {
    return (
      <Link
        href={link.href}
        onClick={onNavigate}
        className="flex items-center justify-between border-b py-4 text-base font-bold"
        style={{ borderColor: COLORS.slate200, color: COLORS.navy }}
      >
        <span>{link.label}</span>
        <ArrowUpRight size={17} style={{ color: COLORS.orange }} />
      </Link>
    );
  }

  return (
    <div className="border-b" style={{ borderColor: COLORS.slate200 }}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left text-base font-bold"
        style={{ color: COLORS.navy }}
      >
        <span>{link.label}</span>
        <ChevronDown
          size={19}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: COLORS.orange }}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 pb-3">
              {link.children.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={onNavigate}
                  className="flex h-8 w-full items-center justify-between rounded-md px-3 transition-all duration-150 active:scale-[0.99]"
                  style={{ backgroundColor: COLORS.offWhite, color: COLORS.navy }}
                >
                  <span className="text-xs font-bold">{service.label}</span>
                  <ArrowUpRight size={13} className="shrink-0" style={{ color: COLORS.orange }} />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileExternalLink({ link, onNavigate }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className="flex items-center justify-between border-b py-4 text-base font-bold"
      style={{ borderColor: COLORS.slate200, color: COLORS.navy }}
    >
      <span>{link.label}</span>
      <ArrowUpRight size={17} style={{ color: COLORS.orange }} />
    </a>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b transition-all duration-300"
      style={{
        backgroundColor: "rgba(255,255,255,0.97)",
        borderColor: scrolled ? COLORS.slate200 : "transparent",
        boxShadow: scrolled ? "0 4px 20px rgba(3,37,76,0.06)" : "none",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={closeMobileMenu} className="relative z-50 flex shrink-0 items-center">
          <Image
            src="/images/logo.png"
            alt="AarambhGrow Services Private Limited"
            width={190}
            height={55}
            priority
            className="h-auto w-[150px] object-contain sm:w-[175px]"
          />
        </Link>

        <nav className="hidden items-center lg:flex">
          {NAV_LINKS.map((link) => (
            <DesktopNavItem key={link.href} link={link} onNavigate={closeMobileMenu} />
          ))}
          <DesktopExternalLink link={EXTERNAL_LINKS[0]} />
          <DesktopExternalLink link={EXTERNAL_LINKS[1]} />
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href="tel:+919998715799" className="group flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-md transition-colors group-hover:bg-orange-50"
              style={{ backgroundColor: COLORS.slate100, color: COLORS.navy }}
            >
              <Phone size={16} />
            </span>

            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider" style={{ color: COLORS.slate500 }}>
                Call Us
              </span>
              <span className="block text-sm font-bold" style={{ color: COLORS.navy }}>
                +91 99987 15799
              </span>
            </span>
          </a>

          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:gap-4"
            style={{ backgroundColor: COLORS.orange }}
          >
            <span
              className="absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
              style={{ backgroundColor: "#111111" }}
            />

            <span className="relative z-10 overflow-hidden">
              <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                Get Consultation
              </span>
              <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
                Get Started
              </span>
            </span>

            <span className="relative z-10 flex h-5 w-5 items-center justify-center overflow-hidden">
              <ArrowUpRight
                size={17}
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-6 group-hover:-translate-y-6"
              />
              <ArrowUpRight
                size={17}
                className="absolute -translate-x-6 translate-y-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0"
              />
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
          style={{ backgroundColor: COLORS.slate100, color: COLORS.navy }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              >
                <X size={23} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
              >
                <Menu size={23} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 top-[78px] z-40 bg-[#03254C]/30 lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 top-[78px] z-40 h-[calc(100dvh-78px)] overflow-y-auto overscroll-contain border-t bg-white px-5 pb-8 shadow-xl lg:hidden"
              style={{
                borderColor: COLORS.slate200,
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
              }}
            >
              <nav className="mx-auto max-w-2xl">
                {NAV_LINKS.map((link) => (
                  <MobileNavItem key={link.href} link={link} onNavigate={closeMobileMenu} />
                ))}

                <MobileExternalLink link={EXTERNAL_LINKS[0]} onNavigate={closeMobileMenu} />
                <MobileExternalLink link={EXTERNAL_LINKS[1]} onNavigate={closeMobileMenu} />

                <div className="mt-6 rounded-md border p-5" style={{ backgroundColor: COLORS.offWhite, borderColor: COLORS.slate200 }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-md"
                      style={{ backgroundColor: COLORS.green50, color: COLORS.green }}
                    >
                      <Phone size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold" style={{ color: COLORS.slate500 }}>
                        Speak With Our Team
                      </p>

                      <a href="tel:+919998715799" className="mt-0.5 block text-sm font-bold" style={{ color: COLORS.navy }}>
                        +91 99987 15799
                      </a>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-md px-5 py-3.5 text-sm font-bold text-white"
                    style={{ backgroundColor: COLORS.orange }}
                  >
                    Get Free Consultation
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
