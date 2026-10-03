"use client";

import { useEffect, useRef } from "react";

import { startGarba } from "./garba/rig";

/*
  The Garba couple from the standalone animation (index.html). The artwork and
  the rig that dances it are that page's own, copied over untouched — this only
  gives them an <svg> to draw into, sized by whatever wraps it.

  `still` holds the opening pose, for visitors who ask for reduced motion.
*/
export default function GarbaDancers({ still = false }) {
  const stageRef = useRef(null);

  useEffect(() => startGarba(stageRef.current, still), [still]);

  return (
    <svg
      ref={stageRef}
      className="block h-auto w-full overflow-visible"
      viewBox="2 6 463 428"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A couple dancing Garba with dandiya sticks"
    />
  );
}
