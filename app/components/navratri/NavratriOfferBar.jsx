"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function NavratriOfferBar() {
  const [visible, setVisible] = useState(true);
  const barRef = useRef(null);

  // Publish the bar's height so the navbar (and anything else sticky) can sit below it.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const root = document.documentElement;
    const sync = () => root.style.setProperty("--offer-bar-h", `${bar.offsetHeight}px`);
    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(bar);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--offer-bar-h");
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={barRef}
      className="sticky top-0 z-[60] w-full overflow-hidden border-b border-[#FFD166]/30 bg-[#2A0016] text-white"
      style={{
        backgroundImage: "url('/images/navratri-offer-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Center darkening so text stays readable, edges stay bright to show the artwork */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#1c000e]/55 to-transparent" />

      {/* Thin gold line on top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD166]/80 to-transparent" />

      <div className="relative mx-auto flex min-h-[64px] max-w-7xl items-center justify-center px-12 py-2.5 sm:min-h-[72px] sm:px-16">
        <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FFD166]/50 bg-[#FFD166]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFD166] shadow-[0_0_18px_rgba(255,209,102,0.25)] backdrop-blur-sm sm:text-[11px]">
            <Sparkles size={12} className="animate-pulse" />
            Navratri Special
          </span>

          {/* Offer text */}
          {/* <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-white/90 sm:text-sm">
            <span>Get</span>
            <span className="bg-gradient-to-r from-[#FFE9A8] via-[#FFD166] to-[#FFA94D] bg-clip-text font-extrabold text-transparent">
              3 Months Social Media Management
            </span>
            <span className="font-bold text-[#FFD166]">+</span>
            <span className="rounded-md bg-gradient-to-r from-[#FFD166] to-[#FF9F43] px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-[#3A001F] shadow-md sm:text-xs">
              Website FREE
            </span>
            <span className="hidden text-white/70 lg:inline">
              with selected services
            </span>
          </p> */}

          


<p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-white/90 sm:text-sm">
  <span>Buy Any Digital Service &amp; Get</span>

  <span className="border border-dashed border-[#FFD166] px-2 py-1 bg-white/5 rounded-sm">
    <span className="bg-gradient-to-r from-[#FFE9A8] via-[#FFD166] to-[#FFA94D] bg-clip-text font-extrabold text-transparent">
      2 Growth Consultations
    </span>
  </span>

  <span className="font-bold text-[#FFD166]">100% FREE</span>
</p>



          {/* CTA */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#FFE9A8] via-[#FFD166] to-[#FFB84D] px-4 py-1.5 text-xs font-bold text-[#3A001F] shadow-[0_4px_16px_rgba(255,170,60,0.45)] transition-all hover:scale-[1.04] hover:shadow-[0_6px_22px_rgba(255,170,60,0.65)]"
          >
            {/* Shine sweep */}
            <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/50 blur-sm transition-all duration-700 group-hover:left-[130%]" />
            <span className="relative">Claim Offer</span>
            <ArrowUpRight
              size={14}
              className="relative transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Close Navratri offer"
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/70 backdrop-blur-sm transition hover:bg-white/15 hover:text-white sm:right-4"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}