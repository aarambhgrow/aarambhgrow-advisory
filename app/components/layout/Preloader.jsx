"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

let hasShownPreloader = false;

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("entering");
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (hasShownPreloader) {
      setShouldShow(false);
      return;
    }

    hasShownPreloader = true;
    setShouldShow(true);

    let animationFrameId;

    const t1 = setTimeout(() => {
      setPhase("loading");

      const duration = 1800;
      let startTime = null;

      function tick(now) {
        if (!startTime) startTime = now;

        const elapsed = now - startTime;
        const raw = Math.min(elapsed / duration, 1);
        const currentProgress = Math.floor(raw * 100);

        setProgress(currentProgress);

        if (raw < 1) {
          animationFrameId = requestAnimationFrame(tick);
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    }, 800);

    const t2 = setTimeout(() => {
      setPhase("exiting");
    }, 2800);

    const t3 = setTimeout(() => {
      setPhase("done");
      setShouldShow(false);
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  if (!shouldShow || phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden">
      <style>{`
        @keyframes ag-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .ag-spinner-ring {
          background: conic-gradient(
            from 0deg,
            #F26522 0%,
            #F26522 25%,
            #ffffff 50%,
            #157327 75%,
            #03254C 100%
          );

          -webkit-mask: radial-gradient(
            farthest-side,
            transparent calc(100% - 6px),
            black calc(100% - 5px)
          );

          mask: radial-gradient(
            farthest-side,
            transparent calc(100% - 6px),
            black calc(100% - 5px)
          );

          animation: ag-spin 1.5s linear infinite;
        }

        @keyframes ag-glow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }

          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>

      {/* Orange Glow */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 85% 25%, rgba(242,101,34,0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Green Glow */}
      <div
        className="absolute bottom-0 left-0 w-1/2 h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 15% 80%, rgba(21,115,39,0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Center Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(3,37,76,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "ag-glow 3s ease-in-out infinite",
        }}
      />

      {/* Preloader Content */}
      <div
        className={`flex flex-col items-center transition-all duration-700 ease-out ${
          phase === "entering"
            ? "scale-[0.6] opacity-0 blur-[10px]"
            : phase === "loading"
              ? "scale-100 opacity-100 blur-0"
              : "scale-110 opacity-0 blur-[6px]"
        }`}
      >
        {/* Logo */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full ag-spinner-ring" />
          <div className="absolute inset-[6px] rounded-full bg-white shadow-sm" />

          <Image
            src="/images/favicon.png"
            alt="AarambhGrow Advisory"
            width={100}
            height={100}
            priority
            className="relative z-10 w-16 h-16 object-contain"
          />
        </div>

        {/* Brand Name */}
        <div className="flex flex-col items-start md:items-center text-left md:text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-wide leading-none"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#03254C",
              letterSpacing: "0.05em",
            }}
          >
            AarambhGrow
          </h1>

          <p
            className="mt-2 text-lg md:text-xl leading-none"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#7D7768",
              letterSpacing: "0.18em",
            }}
          >
            Advisory
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-[4px] bg-slate-100 rounded-full mt-8 overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${phase === "entering" ? 0 : progress}%`,
              background: "linear-gradient(to right, #F26522, #ffffff, #157327)",
              boxShadow: "0 0 10px rgba(21, 115, 39, 0.4)",
            }}
          />
        </div>

        {/* Loading Status */}
        <div className="flex flex-col items-center mt-4">
          <p
            className="text-[10px] font-medium tracking-[0.25em] text-slate-400 uppercase mb-1"
            style={{
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Preparing Your Advisory Experience
          </p>

          <p
            className="text-sm font-bold tracking-widest text-[#03254C]"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontFeatureSettings: '"tnum"',
            }}
          >
            {phase === "entering" ? "0" : progress}%
          </p>
        </div>
      </div>

      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
