"use client";

import { useEffect, useId, useRef } from "react";
import { PALETTE } from "./config";
import styles from "./NavratriDemo.module.css";
import { TICK_ORDER, type NavratriRuntime } from "./runtime/runtime";

/** Centre of the flame, as a fraction of the artwork's height. */
const FLAME_CENTER_Y = 22 / 64;
/** The flame pivots about its base when the air moves. */
const FLAME_BASE = { x: 32, y: 32 };

/**
 * A small oil lamp. The lamp and its flame are crisp SVG; the WebGL layer is
 * told where the flame is and adds the warm light around it. Sweep the cursor
 * past and the draught bends the flame.
 */
export default function Diya({ runtime }: { runtime: NavratriRuntime }) {
  const id = `diya-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const flame = svg.querySelector<SVGGElement>('[data-part="flame"]');
    if (!flame) return;
    // Each lamp has its own anchor, so a page can light more than one.
    const anchor = runtime.addDiya();

    const measure = () => {
      const rect = svg.getBoundingClientRect();
      runtime.setDiyaAnchor(
        anchor,
        rect.left + rect.width / 2,
        rect.top + rect.height * FLAME_CENTER_Y,
        rect.width,
      );
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(svg);
    observer.observe(document.documentElement);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    let lean = 0;
    let leanVelocity = 0;
    let wrote = "";

    const off = runtime.ticker.add((dt) => {
      const pointer = runtime.pointer;

      let target = 0;
      if (!runtime.reducedMotion && anchor.size > 0) {
        const dx = pointer.x - anchor.x;
        const dy = pointer.y - anchor.y;
        const reach = 150;
        const closeness = Math.exp(-(dx * dx + dy * dy) / (reach * reach)) * pointer.presence;
        target = Math.max(-34, Math.min(34, pointer.vx / 36)) * closeness;
      }
      const acceleration = -140 * (lean - target) - 9 * leanVelocity;
      leanVelocity += acceleration * dt;
      lean += leanVelocity * dt;
      if (runtime.reducedMotion) lean = leanVelocity = 0;

      const transform = `rotate(${lean.toFixed(1)} ${FLAME_BASE.x} ${FLAME_BASE.y})`;
      if (transform !== wrote) {
        wrote = transform;
        flame.setAttribute("transform", transform);
      }
      // A flame blown sideways gives less light.
      runtime.setDiyaIntensity(anchor, 1 - 0.4 * Math.min(Math.abs(lean) / 30, 1));
    }, TICK_ORDER.diya);

    return () => {
      off();
      observer.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      runtime.removeDiya(anchor);
    };
  }, [runtime]);

  return (
    <svg
      ref={svgRef}
      className={styles.diya}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="A lit diya"
    >
      <defs>
        <radialGradient id={`${id}-flame`} cx="0.5" cy="0.74" r="0.66">
          <stop offset="0" stopColor="#FFFDF3" />
          <stop offset="0.34" stopColor="#FFE9A6" />
          <stop offset="0.7" stopColor={PALETTE.gold} />
          <stop offset="1" stopColor={PALETTE.orange} />
        </radialGradient>
        <linearGradient id={`${id}-clay`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E27A2C" />
          <stop offset="0.5" stopColor="#B4501B" />
          <stop offset="1" stopColor="#6A280C" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B96A12" />
          <stop offset="0.5" stopColor="#FFDD95" />
          <stop offset="1" stopColor="#B96A12" />
        </linearGradient>
      </defs>

      <g data-part="flame">
        <g className={styles.flame}>
          <path
            d="M32 6 C36.5 14 40 19.5 40 25 C40 29.8 36.4 33 32 33 C27.6 33 24 29.8 24 25 C24 19.5 27.5 14 32 6 Z"
            fill={`url(#${id}-flame)`}
          />
          <path
            d="M32 17.5 C34.1 21.2 35.4 23.8 35.4 26.4 C35.4 29 33.9 30.8 32 30.8 C30.1 30.8 28.6 29 28.6 26.4 C28.6 23.8 29.9 21.2 32 17.5 Z"
            fill="#FFFBEA"
            opacity="0.9"
          />
        </g>
      </g>

      <path d="M32 32.4 L32 37" stroke="#2E1406" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 37 C9 48 20 55 32 55 C44 55 55 48 56 37 Z" fill={`url(#${id}-clay)`} />
      <ellipse cx="32" cy="37" rx="24" ry="4.6" fill="#4A1B07" />
      <ellipse cx="32" cy="37.6" rx="17" ry="2.6" fill={PALETTE.gold} opacity="0.26" />
      <ellipse cx="32" cy="37" rx="24" ry="4.6" stroke={`url(#${id}-rim)`} strokeWidth="1.3" />
      <g fill={PALETTE.gold} opacity="0.9">
        <circle cx="16" cy="44.6" r="1" />
        <circle cx="21" cy="48" r="1" />
        <circle cx="26.4" cy="50.1" r="1" />
        <circle cx="32" cy="50.8" r="1" />
        <circle cx="37.6" cy="50.1" r="1" />
        <circle cx="43" cy="48" r="1" />
        <circle cx="48" cy="44.6" r="1" />
      </g>
      <path d="M24 55 L40 55 L42.5 59.4 C39 60.6 25 60.6 21.5 59.4 Z" fill="#5C2209" />
    </svg>
  );
}
