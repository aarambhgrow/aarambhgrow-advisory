"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { DEFAULT_SETTINGS } from "../../../navratri/components/navratri/config";
import CssTrail from "../../../navratri/components/navratri/CssTrail";
import DandiyaCursor from "../../../navratri/components/navratri/DandiyaCursor";
import Diya from "../../../navratri/components/navratri/Diya";
import NavratriWebGL from "../../../navratri/components/navratri/NavratriWebGL";
import { FINE_POINTER_QUERY, REDUCED_MOTION_QUERY, useMediaQuery } from "../../../navratri/components/navratri/runtime/hooks";
import { NavratriRuntime, TICK_ORDER } from "../../../navratri/components/navratri/runtime/runtime";

import GarbaDancers from "./GarbaDancers";

/* True while `element` is on screen; false when there is no element. */
function useOnScreen(element) {
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    if (!element) return;
    const observer = new IntersectionObserver((entries) => setVisible(entries.at(-1).isIntersecting ? element : null));
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return element !== null && visible === element;
}

/*
  The Navratri layer itself, built from the existing pieces in /navratri.

  With a mouse: the Dandiya cursor, its light (trail, sparkles, click bursts),
  a diya in the bottom-left corner and the Garba dancers in the bottom-right,
  on every page. The mandala belongs to the home hero, so it is drawn only
  inside `heroSlot` — the box <NavratriHeroSlot /> renders there.

  On touch screens there is no cursor to follow, so the canvas stays inside the
  home hero, as the demo's mobile behaviour intends.

  This file is only ever loaded while Navratri mode is on — see NavratriProvider.
*/
export default function NavratriExperience({ accent, heroSlot }) {
  // Same device rules as the demo: no custom cursor on touch screens, and
  // reduced motion gets a still canvas and a cursor without easing or trail.
  const finePointer = useMediaQuery(FINE_POINTER_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  const [runtime] = useState(() => new NavratriRuntime());
  const [webglFailed, setWebglFailed] = useState(false);
  const heroOnScreen = useOnScreen(heroSlot);

  // The demo's defaults, plus today's accent.
  const settings = useMemo(() => ({ ...DEFAULT_SETTINGS, ...(accent && { accent, accentDeep: accent }) }), [accent]);

  // Layout effects run before the canvas and cursor start, so the runtime
  // already knows the settings and the device when they do.
  useLayoutEffect(() => {
    runtime.setSettings(settings);
  }, [runtime, settings]);

  useLayoutEffect(() => {
    runtime.setEnvironment({ reducedMotion, coarsePointer: !finePointer });
  }, [runtime, reducedMotion, finePointer]);

  // Keep the mandala to the hero: each frame, tell the renderer which rows of
  // the screen the hero covers. No hero on this page means no mandala.
  useEffect(() => {
    if (!heroSlot) {
      runtime.setMandalaBand({ top: 0, bottom: 0 });
      return;
    }
    return runtime.ticker.add(() => {
      const rect = heroSlot.getBoundingClientRect();
      const clamp = (y) => Math.min(Math.max(y, 0), window.innerHeight);
      runtime.setMandalaBand({ top: clamp(rect.top), bottom: clamp(rect.bottom) });
    }, TICK_ORDER.diya);
  }, [runtime, heroSlot]);

  // The frame loop and pointer listeners run only while there is something to
  // drive: the cursor (fine pointers, every page) or the hero canvas in view.
  const live = finePointer || heroOnScreen;
  useEffect(() => (live ? runtime.mount() : undefined), [runtime, live]);

  const handleWebGLUnavailable = useCallback(() => setWebglFailed(true), []);

  if (!finePointer) {
    // Touch: the canvas lives in the hero, clipped to it, and rests when the hero is out of view.
    if (!heroSlot || webglFailed) return null;
    return createPortal(
      <NavratriWebGL runtime={runtime} transparent paused={!heroOnScreen} onUnavailable={handleWebGLUnavailable} />,
      heroSlot,
    );
  }

  return (
    <>
      {/* The light, the lamp and the dancers: over the page, under the navbar and its menus. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45]">
        {webglFailed ? (
          !reducedMotion && <CssTrail runtime={runtime} />
        ) : (
          <NavratriWebGL runtime={runtime} transparent onUnavailable={handleWebGLUnavailable} />
        )}
        {/* Full size where the page has side margins to spare; smaller, inside the 32px gutter, where it does not. */}
        <div className="absolute bottom-0.5 left-0.5 z-[1] origin-bottom-left scale-[0.6] min-[1344px]:bottom-3 min-[1344px]:left-3 min-[1344px]:scale-100">
          <Diya runtime={runtime} />
        </div>
        {/* The dancers are too big for the gutter, so they stand over the corner of the page; the same breakpoint keeps them smaller. */}
        <div className="absolute bottom-0 right-1 z-[1] w-28 min-[1344px]:right-3 min-[1344px]:w-40">
          <GarbaDancers still={reducedMotion} />
        </div>
      </div>

      {/* Its own layer, so the Dandiya stays above everything — preloader included. */}
      <div className="pointer-events-none fixed left-0 top-0 z-[10000]">
        {/* The Dandiya replaces the pointer, only while it is live. */}
        <style>{"*, *::before, *::after { cursor: none !important; }"}</style>
        <DandiyaCursor runtime={runtime} accent={accent} />
      </div>
    </>
  );
}
