"use client";

import { useEffect, useRef } from "react";
import { Cinzel, Tiro_Devanagari_Hindi } from "next/font/google";

import { DIWALI } from "../../data/diwali";
import { INTRO_ATTR } from "../../lib/diwali";
import DiyaArt from "./DiyaArt";
import styles from "./DiwaliIntro.module.css";

// Not preloaded: the files are fetched only when the intro actually shows.
const cinzel = Cinzel({ subsets: ["latin"], preload: false });
const tiro = Tiro_Devanagari_Hindi({ subsets: ["devanagari"], weight: "400", preload: false });

const ROW = [0, 1, 2, 3, 4];

const endIntro = () => document.documentElement.removeAttribute(INTRO_ATTR);

/* Set when the intro unmounts mid-scene; cancelled if it mounts again at once (React dev mode does that). */
let pendingEnd = 0;

/*
  "Light the diya" — the home page's opening during Diwali, in place of the
  usual loading screen. The whole scene is CSS, timed from the first paint: it
  is in the HTML from the server, and the head script (app/lib/diwali.js)
  decides whether it shows, so it plays even before React has loaded.

  This component only adds what needs JavaScript: centring the closing light on
  the diya, skipping on any click, tap, scroll or key, and tidying up after.
*/
export default function DiwaliIntro() {
  const rootRef = useRef(null);
  const lampRef = useRef(null);

  useEffect(() => {
    clearTimeout(pendingEnd);
    const root = rootRef.current;
    if (!root || !document.documentElement.hasAttribute(INTRO_ATTR)) return;

    // The light spreads out from the big diya's flame.
    const centreOnFlame = () => {
      const rect = lampRef.current.getBoundingClientRect();
      root.style.setProperty("--x", `${rect.left + rect.width / 2}px`);
      root.style.setProperty("--y", `${rect.top + rect.height * 0.34}px`);
    };
    centreOnFlame();

    const skip = () => root.setAttribute("data-skip", "");
    const onAnimationEnd = (event) => {
      if (event.target === root && event.animationName.includes("leave")) endIntro();
    };

    // React can load after the scene has already ended (slow connection).
    const leaving = root.getAnimations?.().find((animation) => animation.animationName?.includes("leave"));
    if (leaving?.playState === "finished") {
      endIntro();
      return;
    }

    const skipEvents = ["pointerdown", "wheel", "touchstart", "keydown"];
    skipEvents.forEach((type) => window.addEventListener(type, skip, { passive: true }));
    window.addEventListener("resize", centreOnFlame);
    root.addEventListener("animationend", onAnimationEnd);
    // Backstop, in case the end of the animation is never reported (e.g. a background tab).
    const backstop = setTimeout(endIntro, 6000);

    return () => {
      skipEvents.forEach((type) => window.removeEventListener(type, skip));
      window.removeEventListener("resize", centreOnFlame);
      root.removeEventListener("animationend", onAnimationEnd);
      clearTimeout(backstop);
      // Leaving the home page mid-scene: don't replay it on the way back.
      pendingEnd = setTimeout(endIntro);
    };
  }, []);

  if (!DIWALI.enabled) return null;

  return (
    <div ref={rootRef} className={`diwali-intro ${styles.intro}`} aria-hidden="true">
      <div className={styles.sky} />

      <div className={styles.stage}>
        <div ref={lampRef} className={styles.lamp}>
          <span className={styles.lampGlow} />
          <DiyaArt size={112} className={styles.lampArt} flameClassName={styles.lampFlame} />
        </div>

        <p className={`${cinzel.className} ${styles.wordmark}`}>AarambhGrow</p>
        <p className={`${cinzel.className} ${styles.advisory}`}>Advisory</p>

        <p lang="hi" className={`${tiro.className} ${styles.greeting}`}>
          {DIWALI.greeting}
        </p>
        <p className={styles.line}>Wishing you a bright new beginning</p>

        <div className={styles.row}>
          {ROW.map((i) => (
            <span key={i} className={styles.rowLamp} style={{ "--i": i }}>
              <DiyaArt size={34} flameClassName={styles.rowFlame} />
            </span>
          ))}
        </div>
      </div>

      <span className={styles.skip}>Skip</span>
    </div>
  );
}
