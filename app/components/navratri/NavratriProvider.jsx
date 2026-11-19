"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

import { NAVRATRI_OFF, resolveNavratri } from "../../lib/navratri";

/*
  Everything heavy — WebGL, the shaders, the Dandiya cursor, the frame loop —
  sits behind this import. While Navratri mode is off it is never rendered, so
  none of it is downloaded, initialised or run.
*/
const NavratriExperience = dynamic(() => import("./NavratriExperience"), { ssr: false });

const NavratriContext = createContext({ ...NAVRATRI_OFF, setHeroSlot: () => {} });

export const useNavratri = () => useContext(NavratriContext);

/*
  The mode is decided once per page load, in the browser: the server and the
  hydration pass always render the original site, so the markup never mismatches.
*/
let resolved = null;
const subscribe = () => () => {};
const getSnapshot = () => (resolved ??= resolveNavratri());
const getServerSnapshot = () => NAVRATRI_OFF;

export default function NavratriProvider({ children }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [heroSlot, setHeroSlot] = useState(null);
  const value = useMemo(() => ({ ...mode, setHeroSlot }), [mode]);

  return (
    <NavratriContext value={value}>
      {children}
      {mode.active && <NavratriExperience accent={mode.day?.color} heroSlot={heroSlot} />}
    </NavratriContext>
  );
}
