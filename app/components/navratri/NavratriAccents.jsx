"use client";

import { NAVRATRI } from "../../data/navratri";
import { useNavratri } from "./NavratriProvider";

/* The animation's own gold, for days that have no colour of their own. */
const GOLD = "#F5B942";

/*
  The small pieces of Navratri that live inside existing sections. Each renders
  nothing while Navratri mode is off, so the original markup is left as it was.
*/

/*
  Marks out the hero for the Navratri layer. With a mouse the canvas spans the
  whole site and this box only tells it where the mandala belongs. On touch
  screens the canvas sits inside it — over the artwork, under the copy — fixed
  to the viewport (its shaders work in viewport pixels) and clipped to the hero.
*/
export function NavratriHeroSlot() {
  const { active, setHeroSlot } = useNavratri();
  if (!active) return null;

  return (
    <div ref={setHeroSlot} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5]" style={{ clipPath: "inset(0)" }} />
  );
}

/* Navbar: a tiny line centred under the logo's wordmark, so nothing in the bar moves. */
export function NavratriBadge() {
  const { active, day } = useNavratri();
  if (!active) return null;

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-[68%] top-[68%] -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase leading-none tracking-[0.18em] text-slate-500"
    >
      <span style={{ color: day?.color ?? GOLD, textShadow: "0 0 1px rgba(3,37,76,0.45)" }}>✦</span> {NAVRATRI.label}
    </span>
  );
}

/* Footer: a quiet greeting in the copyright bar. */
export function NavratriGreeting() {
  const { active, day } = useNavratri();
  if (!active) return null;

  const star = (
    <span aria-hidden="true" style={{ color: day?.color ?? GOLD }}>
      ✦
    </span>
  );

  return (
    <p lang="hi" className="text-slate-400">
      {star} {NAVRATRI.greeting} {star}
    </p>
  );
}
