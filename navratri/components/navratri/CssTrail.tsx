"use client";

import { useEffect, useRef } from "react";
import { IDLE_STOP_MS, PALETTE } from "./config";
import styles from "./NavratriDemo.module.css";
import { TICK_ORDER, type NavratriRuntime } from "./runtime/runtime";

/** A fixed pool: the fallback never creates DOM nodes while running. */
const POOL_SIZE = 28;
const POOL = Array.from({ length: POOL_SIZE }, (_, index) => index);
/** `null` is the accent of the moment (`settings.accent`, pink by default). */
const COLORS = [PALETTE.gold, PALETTE.orange, PALETTE.gold, PALETTE.white, null];
/** Leave one mote for every this many pixels of travel. */
const SPACING = 12;

/**
 * Fallback for browsers without WebGL: a lightweight particle trail made of
 * a few recycled elements, animated with the Web Animations API (transform
 * and opacity only, so it stays on the compositor).
 */
export default function CssTrail({ runtime }: { runtime: NavratriRuntime }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const motes = Array.from(host.children) as HTMLElement[];
    const pointer = runtime.pointer;
    const running = new Set<Animation>();

    let head = 0;
    let travelled = 0;
    let lastClick = pointer.clickSerial;

    const emit = (x: number, y: number, dx: number, dy: number, duration: number, scale: number) => {
      const mote = motes[head];
      head = (head + 1) % motes.length;
      mote.style.background = COLORS[head % COLORS.length] ?? runtime.settings.accent;
      const spin = head % 2 === 0 ? 45 : 0;
      const animation = mote.animate(
        [
          {
            transform: `translate3d(${x}px, ${y}px, 0) rotate(${spin}deg) scale(${scale})`,
            opacity: 1,
          },
          {
            transform: `translate3d(${x + dx}px, ${y + dy}px, 0) rotate(${spin + 90}deg) scale(0.2)`,
            opacity: 0,
          },
        ],
        { duration, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", fill: "both" },
      );
      running.add(animation);
      animation.onfinish = animation.oncancel = () => running.delete(animation);
    };

    const off = runtime.ticker.add(() => {
      const settings = runtime.settings;

      if (pointer.clickSerial !== lastClick) {
        lastClick = pointer.clickSerial;
        if (settings.clickBurst && settings.particles) {
          for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2;
            const reach = 46 + Math.random() * 34;
            emit(
              pointer.clickX,
              pointer.clickY,
              Math.cos(angle) * reach,
              Math.sin(angle) * reach,
              620,
              1.2,
            );
          }
        }
      }

      if (!settings.particles || pointer.presence < 0.5 || pointer.idleMs > IDLE_STOP_MS) return;
      travelled += Math.hypot(pointer.x - pointer.prevX, pointer.y - pointer.prevY);
      const spacing = SPACING / Math.max(settings.density, 0.2);
      if (travelled < spacing) return;
      travelled = 0;
      emit(
        pointer.x + (Math.random() - 0.5) * 10,
        pointer.y + (Math.random() - 0.5) * 10,
        pointer.vx * 0.04 + (Math.random() - 0.5) * 22,
        pointer.vy * 0.04 - 10 - Math.random() * 22,
        (650 + Math.random() * 450) * settings.trailLength,
        0.7 + Math.random() * 0.8,
      );
    }, TICK_ORDER.render);

    return () => {
      off();
      running.forEach((animation) => animation.cancel());
      running.clear();
    };
  }, [runtime]);

  return (
    <div ref={hostRef} className={styles.cssTrail} aria-hidden="true">
      {POOL.map((index) => (
        <i key={index} />
      ))}
    </div>
  );
}
