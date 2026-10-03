"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { IDLE_STOP_MS, IS_PRODUCTION, QUALITY } from "./config";
import styles from "./NavratriDemo.module.css";
import { detectTier, QualityGovernor, resolveDpr, type QualityLevel } from "./runtime/quality";
import { TICK_ORDER, type NavratriRuntime } from "./runtime/runtime";
import { NavratriRenderer } from "./webgl/renderer";

interface Props {
  runtime: NavratriRuntime;
  /** Called if WebGL cannot be used, so the page can fall back to CSS. */
  onUnavailable: () => void;
  /**
   * Draw only the light, on a see-through canvas, so the layer can sit over a
   * host page instead of its own dark stage. Read once, when the canvas mounts.
   */
  transparent?: boolean;
  /** Skip all GPU work, e.g. while the host has the layer scrolled out of view. */
  paused?: boolean;
}

/**
 * Pending "release the GL context" timers, per canvas. A context cannot be
 * re-created on the same canvas once lost, and React's StrictMode re-runs
 * effects on mount — so the release is deferred by a tick and cancelled if
 * the effect starts again on the same element.
 */
const pendingRelease = new WeakMap<HTMLCanvasElement, number>();

/** While nothing but the slow background is moving, this is plenty. */
const IDLE_FRAME_INTERVAL = 1 / 31;

/**
 * The shader layer. WebGL is created inside an effect — never during render
 * and never on the server — and everything it allocates is released when the
 * component unmounts.
 */
export default function NavratriWebGL({
  runtime,
  onUnavailable,
  transparent = false,
  paused = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const reportUnavailable = useEffectEvent(onUnavailable);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pending = pendingRelease.get(canvas);
    if (pending !== undefined) {
      window.clearTimeout(pending);
      pendingRelease.delete(canvas);
    }

    const chooseLevel = (): QualityLevel => {
      const choice = runtime.settings.quality;
      const tier =
        choice === "auto"
          ? detectTier({
              coarsePointer: runtime.coarsePointer,
              reducedMotion: runtime.reducedMotion,
            })
          : choice;
      return { tier, dprCap: 2 };
    };
    const qualityKey = () =>
      `${runtime.settings.quality}|${runtime.coarsePointer}|${runtime.reducedMotion}`;

    let level = chooseLevel();
    let levelKey = qualityKey();
    let governor = new QualityGovernor(level);

    let renderer: NavratriRenderer;
    try {
      renderer = new NavratriRenderer(canvas, level.tier, runtime.pointer, { transparent });
    } catch (error) {
      if (!IS_PRODUCTION) {
        console.warn("[navratri] WebGL unavailable — using the CSS fallback.", error);
      }
      reportUnavailable();
      return;
    }

    runtime.updateStats({ api: renderer.api, renderer: renderer.rendererName });

    let needsResize = true;
    let lost = false;
    let drawnRevision = -1;
    let lastRender = Number.NEGATIVE_INFINITY;
    let statsClock = 0;
    let wasPaused = false;
    /** The frame on screen was drawn with nothing at all left in motion. */
    let atRest = false;
    let drawnPresence = 0;

    const onResize = () => {
      needsResize = true;
    };
    const onContextLost = (event: Event) => {
      // Without preventDefault the browser will never restore the context.
      event.preventDefault();
      lost = true;
      renderer.handleContextLost();
    };
    const onContextRestored = () => {
      try {
        renderer.handleContextRestored();
        lost = false;
        needsResize = true;
      } catch (error) {
        if (!IS_PRODUCTION) console.warn("[navratri] WebGL could not be restored.", error);
        reportUnavailable();
      }
    };
    window.addEventListener("resize", onResize);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    const off = runtime.ticker.add((dt, time) => {
      if (lost) return;
      if (pausedRef.current) {
        wasPaused = true;
        return;
      }
      if (wasPaused) {
        // Clicks made while nothing was being drawn should not replay now.
        wasPaused = false;
        renderer.catchUp(runtime.pointer);
      }
      const settings = runtime.settings;
      const still = runtime.reducedMotion;

      // The quality choice, or the kind of device, changed.
      const key = qualityKey();
      if (key !== levelKey) {
        levelKey = key;
        level = chooseLevel();
        governor = new QualityGovernor(level);
        renderer.setTier(level.tier);
        needsResize = true;
      }

      // Adaptive quality: give up pixels, then particles, before frame rate.
      const lowered = governor.sample(runtime.ticker.rawDt, settings.quality === "auto" && !still);
      if (lowered) {
        level = lowered;
        renderer.setTier(lowered.tier);
        needsResize = true;
      }

      // Numbers for the debug overlay — development builds only.
      statsClock += dt;
      if (!IS_PRODUCTION && statsClock > 0.25) {
        statsClock = 0;
        runtime.updateStats({
          fps: governor.fps,
          frameMs: governor.frameMs,
          dpr: renderer.pixelRatio,
          tier: level.tier,
          trail: renderer.trailLabel,
          capacity: renderer.capacity,
          particles: still ? 0 : renderer.aliveCount(time),
        });
      }

      let mustDraw = false;
      if (needsResize) {
        needsResize = false;
        mustDraw = true;
        renderer.resize(
          canvas.clientWidth,
          canvas.clientHeight,
          resolveDpr(QUALITY[level.tier], level.dprCap),
        );
      }

      // The cursor has come to rest and its light has died away.
      const presence = runtime.pointer.presence;
      const calm =
        !still &&
        runtime.pointer.idleMs > IDLE_STOP_MS &&
        runtime.pointer.hover === 0 &&
        !renderer.isBusy(time);

      if (still) {
        // Reduced motion: one still frame, redrawn only when something changed.
        if (!mustDraw && runtime.revision === drawnRevision) return;
      } else if (!mustDraw && calm) {
        if (renderer.backgroundMoving) {
          // Idle: only the slow background is alive, so halve the GPU work.
          if (time - lastRender < IDLE_FRAME_INTERVAL) return;
        } else if (
          atRest &&
          runtime.revision === drawnRevision &&
          Math.abs(presence - drawnPresence) < 0.002
        ) {
          // Not even that (a see-through canvas with no mandala in view): the
          // frame on screen stays as it is until the pointer or the page stirs.
          return;
        }
      }

      const step = Number.isFinite(lastRender) ? Math.min(time - lastRender, 0.1) : dt;
      drawnRevision = runtime.revision;
      lastRender = time;
      renderer.render({
        time,
        dt: step,
        pointer: runtime.pointer,
        settings,
        diyas: runtime.diyas,
        mandalaBand: runtime.mandalaBand,
        reducedMotion: still,
        coarsePointer: runtime.coarsePointer,
      });
      atRest = calm && !renderer.backgroundMoving;
      drawnPresence = presence;
    }, TICK_ORDER.render);

    return () => {
      off();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      renderer.dispose();
      runtime.updateStats({ tier: "—", particles: 0, capacity: 0, trail: "—" });
      // Free the GPU context too, once we know this is a real unmount.
      pendingRelease.set(
        canvas,
        window.setTimeout(() => {
          pendingRelease.delete(canvas);
          renderer.releaseContext();
        }, 0),
      );
    };
  }, [runtime, transparent]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
