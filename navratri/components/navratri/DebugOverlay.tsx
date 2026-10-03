"use client";

import { useEffect, useRef } from "react";
import styles from "./NavratriDemo.module.css";
import { TICK_ORDER, type NavratriRuntime } from "./runtime/runtime";

/** Seconds between refreshes — a readable 4 Hz. */
const REFRESH = 0.25;

/**
 * FPS, particle count, DPR and the WebGL renderer. Development only: the
 * parent never mounts this in a production build.
 */
export default function DebugOverlay({ runtime }: { runtime: NavratriRuntime }) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let clock = REFRESH;

    return runtime.ticker.add((dt) => {
      clock += dt;
      if (clock < REFRESH) return;
      clock = 0;
      const stats = runtime.stats;
      const pointer = runtime.pointer;
      node.textContent = [
        `FPS        ${stats.fps ? stats.fps.toFixed(0) : "…"}  (${stats.frameMs.toFixed(1)} ms)`,
        `PARTICLES  ${stats.particles} / ${stats.capacity}`,
        `DPR        ${stats.dpr}  (device ${window.devicePixelRatio})`,
        `QUALITY    ${stats.tier}`,
        `TRAIL      ${stats.trail}`,
        `STATE      ${pointer.state}  ·  ${pointer.speed.toFixed(0)} px/s`,
        `API        ${stats.api}`,
        `RENDERER   ${stats.renderer.replace(/^ANGLE \((.*)\)$/, "$1")}`,
      ].join("\n");
    }, TICK_ORDER.debug);
  }, [runtime]);

  return <pre ref={ref} className={styles.debug} aria-hidden="true" />;
}
