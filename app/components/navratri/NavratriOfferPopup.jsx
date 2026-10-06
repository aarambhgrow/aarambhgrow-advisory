"use client";

import Link from "next/link";
import { ArrowUpRight, Gift, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/* ---------- Settings (change these) ---------- */
const POPUP_DELAY_MS = 20 * 1000; // 20 seconds after the site loads. For 5 minutes use 5 * 60 * 1000
const STORAGE_KEY = "navratri-offer-popup-seen";
// "forever" = show once per visitor, never again on this browser
// "session" = show once per browser tab session
// number    = show again after that many hours (e.g. 24)
const REPEAT_RULE = "forever";
/* --------------------------------------------- */

function alreadySeen() {
  try {
    if (REPEAT_RULE === "session") {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    if (REPEAT_RULE === "forever") return true;
    const hours = Number(REPEAT_RULE);
    return Date.now() - Number(raw) < hours * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    if (REPEAT_RULE === "session") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } else {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
  } catch {}
}

export default function NavratriOfferPopup() {
  const [open, setOpen] = useState(false);

  // Show once after the delay, on whichever page the visitor is on
  useEffect(() => {
    if (alreadySeen()) return;
    const timer = setTimeout(() => {
      setOpen(true);
      markSeen();
    }, POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Close on Escape + lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="navratri-popup-title"
    >
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(4px)",
        }}
        onClick={() => setOpen(false)}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#FFD166]/40 bg-[#2A0016] text-white shadow-[0_0_60px_rgba(255,150,40,0.35)] animate-[popIn_.35s_ease-out]"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "28rem",
          overflow: "hidden",
          borderRadius: "1.5rem",
          backgroundColor: "#2A0016",
          backgroundImage: "url('/images/navratri-offer-bg2.png')", // <- your popup bg image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Readability overlay: darker toward the bottom where the text sits */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1c000e]/30 via-[#1c000e]/60 to-[#1c000e]/90" />

        {/* Gold top line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD166] to-transparent" />

        {/* Close */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close offer"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/80 backdrop-blur-sm transition hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD166]"
        >
          <X size={16} />
        </button>

        <div className="relative flex flex-col items-center px-6 pb-8 pt-12 text-center sm:px-10">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FFD166]/50 bg-[#FFD166]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FFD166] shadow-[0_0_18px_rgba(255,209,102,0.3)]">
            <Gift size={13} />
            Navratri Special
          </span>

          <h2
            id="navratri-popup-title"
            className="text-[1.65rem] font-extrabold leading-tight sm:text-3xl"
          >
            <span className="bg-gradient-to-r from-[#FFE9A8] via-[#FFD166] to-[#FFA94D] bg-clip-text text-transparent">
              Spent on passes? Now spend on your business.
            </span>
          </h2>

          <p className="mt-3 max-w-sm text-sm text-white/85 sm:text-base">
            Get{" "}
            <strong className="text-[#FFD166]">
              3 months of Social Media Management + a Website
            </strong>
            , absolutely free, on selected services.
          </p>

          <p className="mt-2 text-xs text-white/60">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="underline underline-offset-2 hover:text-white"
            >
              T&amp;C apply.
            </Link>{" "}
            Details on the contact page.
          </p>

          <div className="mt-7 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="group relative inline-flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#FFE9A8] via-[#FFD166] to-[#FFB84D] px-6 py-3 text-sm font-bold text-[#3A001F] shadow-[0_6px_22px_rgba(255,170,60,0.5)] transition-all hover:scale-[1.03] hover:shadow-[0_8px_28px_rgba(255,170,60,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/50 blur-sm transition-all duration-700 group-hover:left-[130%]" />
              <span className="relative">Claim offer</span>
              <ArrowUpRight
                size={16}
                className="relative transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-white/70 underline-offset-4 transition hover:text-white hover:underline"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>

      {/* Pop-in animation (works without editing tailwind.config) */}
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: translateY(16px) scale(.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[popIn_\\.35s_ease-out\\] { animation: none !important; }
        }
      `}</style>
    </div>,
    document.body
  );
}