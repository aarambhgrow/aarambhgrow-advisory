"use client";

import dynamic from "next/dynamic";
import { useCallback, useSyncExternalStore } from "react";

import { DIWALI } from "../../data/diwali";
import { DIWALI_ATTR } from "../../lib/diwali";
import DiyaArt from "./DiyaArt";
import styles from "./diwali.module.css";

/* Downloaded only when it will actually be used. */
const DiwaliSparkler = dynamic(() => import("./DiwaliSparkler"), { ssr: false });

const SPARKLER_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const subscribeNever = () => () => {};
const readDiwali = () => document.documentElement.hasAttribute(DIWALI_ATTR);
const serverValue = () => false;

function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, serverValue);
}

/*
  The site-wide Diwali touches for computers with a mouse: a small diya in the
  bottom-left corner (CSS decides where it fits) and the sparkler cursor.
*/
export default function DiwaliLayer() {
  const active = useSyncExternalStore(subscribeNever, readDiwali, serverValue);
  const sparkler = useMediaQuery(SPARKLER_QUERY);

  if (!DIWALI.enabled) return null;

  return (
    <>
      <div className={`diwali-only ${styles.corner}`} aria-hidden="true">
        <DiyaArt size={46} />
      </div>
      {active && sparkler && <DiwaliSparkler />}
    </>
  );
}
