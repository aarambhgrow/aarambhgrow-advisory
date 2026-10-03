"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { DEBUG, DEFAULT_SETTINGS, IS_PRODUCTION, type NavratriSettings } from "./config";
import CssTrail from "./CssTrail";
import DandiyaArt from "./DandiyaArt";
import DandiyaCursor from "./DandiyaCursor";
import DebugOverlay from "./DebugOverlay";
import DevPanel from "./DevPanel";
import Diya from "./Diya";
import styles from "./NavratriDemo.module.css";
import NavratriWebGL from "./NavratriWebGL";
import {
  FINE_POINTER_QUERY,
  REDUCED_MOTION_QUERY,
  useHydrated,
  useMediaQuery,
} from "./runtime/hooks";
import { NavratriRuntime } from "./runtime/runtime";
import StateReadout from "./StateReadout";

const CARDS = [
  {
    zone: "move",
    index: "01",
    tag: "Trail",
    title: "Move here",
    note: "Sweep across. Speed lengthens the light.",
  },
  {
    zone: "hover",
    index: "02",
    tag: "Halo",
    title: "Hover here",
    note: "Rest a moment, and a halo gathers.",
  },
  {
    zone: "click",
    index: "03",
    tag: "Strike",
    title: "Click here",
    note: "The sticks meet. A ring blooms.",
  },
] as const;

/** Delays (ms) of the two extra beats after "Enter experience" is pressed. */
const ENCORE_BEATS = [130, 270];

/**
 * The Navratri Dandiya cursor demo.
 *
 * React draws the page once. Everything that moves — the SVG Dandiya, the
 * shader trail, the particles — is driven imperatively by `NavratriRuntime`,
 * so moving the mouse never causes a re-render.
 */
export default function NavratriDemo() {
  const hydrated = useHydrated();
  const finePointer = useMediaQuery(FINE_POINTER_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  const [runtime] = useState(() => new NavratriRuntime());
  const [settings, setSettings] = useState<NavratriSettings>(DEFAULT_SETTINGS);
  const [panelOpen, setPanelOpen] = useState(false);
  const [debug, setDebug] = useState(DEBUG);
  const [webglFailed, setWebglFailed] = useState(false);
  const encore = useRef<number[]>([]);

  // Layout effects run before any child's passive effect, so the runtime
  // already knows the settings and the device when the WebGL layer starts.
  useLayoutEffect(() => {
    runtime.setSettings(settings);
  }, [runtime, settings]);

  useLayoutEffect(() => {
    runtime.setEnvironment({ reducedMotion, coarsePointer: !finePointer });
  }, [runtime, reducedMotion, finePointer]);

  useEffect(() => runtime.mount(), [runtime]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "d") return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || /^(TEXTAREA|SELECT)$/.test(target.tagName) ||
          (target instanceof HTMLInputElement && target.type !== "range"))
      ) {
        return;
      }
      setPanelOpen((open) => !open);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const timers = encore.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.length = 0;
    };
  }, []);

  const changeSettings = useCallback((patch: Partial<NavratriSettings>) => {
    // Switching WebGL back on is also a request to try again.
    if (patch.webgl) setWebglFailed(false);
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const handleWebGLUnavailable = useCallback(() => setWebglFailed(true), []);

  /** "Enter experience": the click's own burst, then two more beats. */
  const enter = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const fromKeyboard = event.detail === 0;
    const x = fromKeyboard ? rect.left + rect.width / 2 : event.clientX;
    const y = fromKeyboard ? rect.top + rect.height / 2 : event.clientY;
    if (fromKeyboard) runtime.pointer.pulse(x, y, 1.25);
    ENCORE_BEATS.forEach((delay, beat) => {
      encore.current.push(
        window.setTimeout(() => runtime.pointer.pulse(x, y, 1.5 + 0.35 * beat), delay),
      );
    });
  };

  const showCursor = hydrated && finePointer;
  const webglOn = hydrated && settings.webgl && !webglFailed;

  return (
    <div className={styles.root} data-native-cursor={showCursor ? "hidden" : undefined}>
      {webglOn && <NavratriWebGL runtime={runtime} onUnavailable={handleWebGLUnavailable} />}
      {!webglOn && showCursor && !reducedMotion && <CssTrail runtime={runtime} />}

      <div className={styles.content}>
        <header className={styles.topbar}>
          <span className={styles.brand}>
            <i className={styles.gem} aria-hidden="true" />
            Navratri &rsquo;26
          </span>
          <span className={styles.lamp}>{settings.diya && <Diya runtime={runtime} />}</span>
          <span className={styles.meta}>Dandiya cursor &mdash; WebGL study</span>
        </header>

        <main className={styles.hero}>
          {/* Touch screens have no cursor to become a Dandiya, so one lives here. */}
          <DandiyaArt className={styles.heroDandiya} />
          <p className={styles.eyebrow}>
            <span>Navratri Special</span>
          </p>
          <h1 className={styles.title}>
            A little <em>Garba</em>,
            <br />
            in every movement.
          </h1>
          <p className={styles.lede}>
            A subtle interactive experience
            <br />
            for the modern web.
          </p>
          <a className={styles.cta} href="#playground" data-cursor="button">
            <span>Enter the experience</span>
            <span className={styles.arrow} aria-hidden="true">
              &rarr;
            </span>
          </a>
        </main>

        <section id="playground" className={styles.playground} aria-label="Cursor playground">
          {CARDS.map((card) => (
            <article key={card.zone} className={styles.card} data-cursor={card.zone}>
              <p className={styles.cardMeta}>
                <span>{card.index}</span>
                <span>{card.tag}</span>
              </p>
              <h2 className={styles.cardTitle}>
                <span>{card.title}</span>
              </h2>
              <p className={styles.cardNote}>{card.note}</p>
            </article>
          ))}
          <button type="button" className={styles.enter} data-cursor="button" onClick={enter}>
            <span className={styles.enterLabel}>
              <span aria-hidden="true">[</span>
              <span>Enter experience</span>
              <span aria-hidden="true">]</span>
            </span>
            <span className={styles.enterNote}>Three beats</span>
          </button>
        </section>

        <footer className={styles.footer}>
          <StateReadout runtime={runtime} />
          <span className={styles.hint}>Hold still &mdash; the light settles</span>
        </footer>
      </div>

      {hydrated && (
        <DevPanel
          open={panelOpen}
          onOpenChange={setPanelOpen}
          settings={settings}
          onChange={changeSettings}
          debug={debug}
          onDebugChange={setDebug}
          webglAvailable={!webglFailed}
        />
      )}
      {hydrated && debug && !IS_PRODUCTION && <DebugOverlay runtime={runtime} />}
      {showCursor && <DandiyaCursor runtime={runtime} />}
    </div>
  );
}
