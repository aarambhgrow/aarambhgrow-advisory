"use client";

import { useCallback, useSyncExternalStore } from "react";
import DiyaArt from "../diwali/DiyaArt";
import GarbaDancers from "./GarbaDancers";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

/*
  The Navratri layer: a diya in the bottom-left corner and the Garba dancers in the bottom-right.
  This file is only dynamically loaded when Navratri mode is active (see NavratriProvider).
*/
export default function NavratriExperience({ accent, heroSlot }) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45]">
      {/* Diya in the bottom-left corner */}
      <div className="absolute bottom-0.5 left-0.5 z-[1] origin-bottom-left scale-[0.6] min-[1344px]:bottom-3 min-[1344px]:left-3 min-[1344px]:scale-100">
        <DiyaArt size={46} />
      </div>
      {/* Garba couple dancers in the bottom-right corner */}
      <div className="absolute bottom-0 right-1 z-[1] w-28 min-[1344px]:right-3 min-[1344px]:w-40">
        <GarbaDancers still={reducedMotion} />
      </div>
    </div>
  );
}
