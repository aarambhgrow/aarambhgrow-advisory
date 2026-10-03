import {
  DEFAULT_SETTINGS,
  type NavratriSettings,
  type QualityTier,
} from "../config";
import { PointerTracker } from "./pointer";
import { Ticker } from "./ticker";

/** Where a diya's flame sits on screen, so the shader can light it. */
export interface DiyaAnchor {
  x: number;
  y: number;
  /** Flame height in CSS px; 0 while the diya is not mounted. */
  size: number;
  /** 0‥1 brightness; dips when the cursor rushes past. */
  intensity: number;
}

/** A stretch of the viewport, top to bottom, in CSS px. */
export interface MandalaBand {
  top: number;
  bottom: number;
}

export interface RuntimeStats {
  fps: number;
  frameMs: number;
  particles: number;
  capacity: number;
  dpr: number;
  tier: QualityTier | "—";
  api: string;
  renderer: string;
  trail: string;
}

/** Subscriber order inside a frame: input first, then DOM, then pixels. */
export const TICK_ORDER = {
  pointer: 0,
  cursor: 10,
  diya: 15,
  render: 20,
  debug: 30,
} as const;

/**
 * The imperative half of the demo. React renders the scene once; everything
 * that changes per frame lives here and is driven by a single ticker, so no
 * component re-renders while the cursor moves.
 */
export class NavratriRuntime {
  readonly ticker = new Ticker();
  readonly pointer = new PointerTracker();
  /** One anchor per lamp on the page, in the order they mounted. */
  readonly diyas: DiyaAnchor[] = [];
  /**
   * The rows of the viewport the mandala may be drawn in — for a host whose
   * see-through canvas covers more than the section the mandala belongs to.
   * `null` means all of it.
   */
  mandalaBand: MandalaBand | null = null;
  readonly stats: RuntimeStats = {
    fps: 0,
    frameMs: 0,
    particles: 0,
    capacity: 0,
    dpr: 1,
    tier: "—",
    api: "—",
    renderer: "—",
    trail: "—",
  };

  settings: NavratriSettings = DEFAULT_SETTINGS;
  reducedMotion = false;
  coarsePointer = false;
  /**
   * Bumped whenever something that affects a *still* frame changes (settings,
   * layout, the diya moving). Under reduced motion the WebGL layer redraws
   * only when this changes.
   */
  revision = 0;

  private mounts = 0;
  private offPointer: (() => void) | null = null;

  /** Start listening and ticking. Returns the matching teardown. */
  mount(): () => void {
    this.mounts++;
    if (this.mounts === 1) {
      this.pointer.attach();
      this.offPointer = this.ticker.add(
        (dt) => this.pointer.update(dt),
        TICK_ORDER.pointer,
      );
      this.ticker.start();
    }
    return () => {
      this.mounts--;
      if (this.mounts > 0) return;
      this.ticker.stop();
      this.offPointer?.();
      this.offPointer = null;
      this.pointer.detach();
    };
  }

  setSettings(settings: NavratriSettings): void {
    this.settings = settings;
    this.pointer.lag = settings.motion;
    this.revision++;
  }

  setEnvironment(env: { reducedMotion: boolean; coarsePointer: boolean }): void {
    this.reducedMotion = env.reducedMotion;
    this.coarsePointer = env.coarsePointer;
    this.pointer.interpolate = !env.reducedMotion;
    this.revision++;
  }

  /** Register a lamp. The anchor returned is handed back to the calls below. */
  addDiya(): DiyaAnchor {
    const diya: DiyaAnchor = { x: 0, y: 0, size: 0, intensity: 1 };
    this.diyas.push(diya);
    return diya;
  }

  removeDiya(diya: DiyaAnchor): void {
    const index = this.diyas.indexOf(diya);
    if (index === -1) return;
    this.diyas.splice(index, 1);
    this.revision++;
  }

  setDiyaAnchor(diya: DiyaAnchor, x: number, y: number, size: number): void {
    if (diya.x === x && diya.y === y && diya.size === size) return;
    diya.x = x;
    diya.y = y;
    diya.size = size;
    this.revision++;
  }

  setDiyaIntensity(diya: DiyaAnchor, intensity: number): void {
    diya.intensity = intensity;
  }

  setMandalaBand(band: MandalaBand | null): void {
    const current = this.mandalaBand;
    if (band === current) return;
    if (band && current && band.top === current.top && band.bottom === current.bottom) return;
    this.mandalaBand = band;
    this.revision++;
  }

  /** Published by the WebGL layer for the debug overlay. */
  updateStats(patch: Partial<RuntimeStats>): void {
    Object.assign(this.stats, patch);
  }

  invalidate(): void {
    this.revision++;
  }
}
