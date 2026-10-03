"use client";

import { useEffect, useRef } from "react";
import { CURSOR_BASE_SIZE } from "./config";
import DandiyaArt, { DANDIYA, type DandiyaArtProps } from "./DandiyaArt";
import styles from "./NavratriDemo.module.css";
import { TICK_ORDER, type NavratriRuntime } from "./runtime/runtime";

/** The Dandiya never leans further than this with the cursor's velocity. */
const MAX_TILT = 8;
/** Horizontal speed (px/s) at which the lean reaches about half of MAX_TILT. */
const TILT_SPEED = 900;
/** The artwork is laid out at full size and scaled *down* at rest, so the
 *  hover state (scale 1) is rendered 1:1 and stays perfectly crisp. */
const REST_SCALE = 0.88;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** Semi-implicit damped spring; returns the new [position, velocity]. */
function spring(
  position: number,
  velocity: number,
  target: number,
  stiffness: number,
  damping: number,
  dt: number,
): [number, number] {
  const nextVelocity = velocity + (-stiffness * (position - target) - damping * velocity) * dt;
  return [position + nextVelocity * dt, nextVelocity];
}

/**
 * The physical-looking object: crisp SVG sticks that follow the eased
 * pointer. Driven entirely from the shared ticker by writing transforms to
 * the DOM — React never re-renders while the cursor moves.
 */
export default function DandiyaCursor({
  runtime,
  accent,
  accentDeep,
}: { runtime: NavratriRuntime } & Pick<DandiyaArtProps, "accent" | "accentDeep">) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const find = (part: string) => root.querySelector<SVGElement>(`[data-part="${part}"]`);
    const stickA = find("stick-a");
    const stickB = find("stick-b");
    const tasselA = find("tassel-a");
    const tasselB = find("tassel-b");
    const aura = find("aura");
    if (!stickA || !stickB || !tasselA || !tasselB || !aura) return;

    const { cross, tassel, halfAngle } = DANDIYA;
    const pointer = runtime.pointer;

    let tilt = 0;
    let scale = REST_SCALE;
    // Strike: how far the sticks have swung from rest (negative = together).
    let strike = 0;
    let strikeVelocity = 0;
    let swingA = 0;
    let swingAVelocity = 0;
    let swingB = 0;
    let swingBVelocity = 0;
    let lastClick = pointer.clickSerial;

    // Last values written, so an idle cursor touches the DOM not at all.
    let wroteTransform = "";
    let wroteSticks = "";
    let wroteSize = 0;
    let wroteOpacity = -1;
    let wroteAura = -1;

    return runtime.ticker.add((dt) => {
      const settings = runtime.settings;
      const still = runtime.reducedMotion;
      const sway = Math.min(settings.motion, 1);

      // Velocity → lean: about ±4° at a brisk pace, never beyond ±8°.
      const tiltTarget = still ? 0 : MAX_TILT * Math.tanh(pointer.vx / TILT_SPEED) * sway;
      tilt += (tiltTarget - tilt) * (1 - Math.exp(-dt / 0.09));
      if (Math.abs(tilt) < 0.005) tilt = 0;

      // A click knocks the sticks together; they spring back with a bounce.
      // Hovering opens them a little, and they are held shut while pressed.
      if (pointer.clickSerial !== lastClick) {
        lastClick = pointer.clickSerial;
        if (!still) strikeVelocity -= 430;
      }
      const openness = pointer.zone === "click" ? 7 : 3.5;
      const strikeRest = still ? 0 : pointer.pressed ? -9 : openness * pointer.hover;
      [strike, strikeVelocity] = spring(strike, strikeVelocity, strikeRest, 520, 24, dt);
      strike = clamp(strike, -22, 16);
      if (still) strike = strikeVelocity = 0;

      // Tassels are pendulums: they lag the motion and keep swinging after.
      const swingTarget = still ? 0 : clamp(-pointer.vx * 0.022, -34, 34) * sway;
      [swingA, swingAVelocity] = spring(swingA, swingAVelocity, swingTarget, 95, 7.5, dt);
      [swingB, swingBVelocity] = spring(swingB, swingBVelocity, swingTarget * 0.9, 120, 6.5, dt);
      if (still) swingA = swingB = swingAVelocity = swingBVelocity = 0;

      const scaleTarget = pointer.pressed ? 0.84 : REST_SCALE + (1 - REST_SCALE) * pointer.hover;
      scale = still ? scaleTarget : scale + (scaleTarget - scale) * (1 - Math.exp(-dt / 0.1));

      const size = CURSOR_BASE_SIZE * settings.cursorSize;
      if (size !== wroteSize) {
        wroteSize = size;
        root.style.setProperty("--dandiya-size", `${size}px`);
      }

      const transform =
        `translate3d(${pointer.x.toFixed(2)}px, ${pointer.y.toFixed(2)}px, 0) ` +
        `rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      if (transform !== wroteTransform) {
        wroteTransform = transform;
        root.style.transform = transform;
      }

      const opacity = Math.round(pointer.presence * 100) / 100;
      if (opacity !== wroteOpacity) {
        wroteOpacity = opacity;
        root.style.opacity = String(opacity);
      }

      const half = halfAngle + strike;
      const sticks = `${half.toFixed(2)}|${tilt.toFixed(2)}|${swingA.toFixed(1)}|${swingB.toFixed(1)}`;
      if (sticks !== wroteSticks) {
        wroteSticks = sticks;
        stickA.setAttribute("transform", `rotate(${half.toFixed(2)} ${cross.x} ${cross.y})`);
        stickB.setAttribute("transform", `rotate(${(-half).toFixed(2)} ${cross.x} ${cross.y})`);
        // Undo the stick's lean and the cursor's tilt so gravity stays "down".
        tasselA.setAttribute(
          "transform",
          `rotate(${(-half - tilt + swingA).toFixed(2)} ${tassel.x} ${tassel.y})`,
        );
        tasselB.setAttribute(
          "transform",
          `rotate(${(half - tilt + swingB).toFixed(2)} ${tassel.x} ${tassel.y})`,
        );
      }

      const glow = settings.glow
        ? Math.round((0.6 + 0.4 * pointer.hover) * Math.min(settings.glowAmount, 1.6) * 50) / 50
        : 0;
      if (glow !== wroteAura) {
        wroteAura = glow;
        aura.style.opacity = String(glow);
      }
    }, TICK_ORDER.cursor);
  }, [runtime]);

  return (
    <div ref={rootRef} className={styles.cursor} aria-hidden="true">
      <DandiyaArt accent={accent} accentDeep={accentDeep} />
    </div>
  );
}
