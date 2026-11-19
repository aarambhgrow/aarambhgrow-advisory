import { useId } from "react";

import styles from "./diwali.module.css";

const GOLD = "#F5B942";
const ORANGE = "#FF7A18";

/*
  The Navratri diya's artwork (navratri/components/navratri/Diya.tsx), without
  its WebGL light, so it can be drawn anywhere at any size. The flame flickers
  on its own; `flameClassName` goes on a wrapper around the flame, so a parent
  can animate it in (the intro lights each lamp this way).
*/
export default function DiyaArt({ size = 46, className, flameClassName, style }) {
  const id = `diya-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible", ...style }}
    >
      <defs>
        <radialGradient id={`${id}-flame`} cx="0.5" cy="0.74" r="0.66">
          <stop offset="0" stopColor="#FFFDF3" />
          <stop offset="0.34" stopColor="#FFE9A6" />
          <stop offset="0.7" stopColor={GOLD} />
          <stop offset="1" stopColor={ORANGE} />
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

      <g className={flameClassName} data-flame="">
        <g className={styles.flicker}>
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
      <ellipse cx="32" cy="37.6" rx="17" ry="2.6" fill={GOLD} opacity="0.26" />
      <ellipse cx="32" cy="37" rx="24" ry="4.6" stroke={`url(#${id}-rim)`} strokeWidth="1.3" />
      <g fill={GOLD} opacity="0.9">
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
