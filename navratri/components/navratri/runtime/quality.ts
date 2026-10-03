import { QUALITY, type QualityProfile, type QualityTier } from "../config";

interface DeviceHints {
  coarsePointer: boolean;
  reducedMotion: boolean;
}

const ORDER: readonly QualityTier[] = ["high", "medium", "low"];

/**
 * A first guess from what the browser will tell us. It is only a starting
 * point: `QualityGovernor` corrects it from measured frame times.
 */
export function detectTier({ coarsePointer, reducedMotion }: DeviceHints): QualityTier {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;

  if (reducedMotion || coarsePointer || cores <= 2 || memory <= 2) return "low";
  if (cores <= 4 || memory <= 4) return "medium";
  return "high";
}

/**
 * Resolve the canvas pixel ratio. Never render at a huge DPR: clamp to the
 * tier's ceiling (2 at most, 1 on low-end devices).
 */
export function resolveDpr(profile: QualityProfile, dprCap: number): number {
  const device = window.devicePixelRatio || 1;
  return Math.max(1, Math.min(device, profile.maxDpr, dprCap, 2));
}

export interface QualityLevel {
  tier: QualityTier;
  /** Extra ceiling applied on top of the tier's `maxDpr`. */
  dprCap: number;
}

const WARMUP_SECONDS = 2;
const WINDOW_SECONDS = 1;
const SLOW_FPS = 48;
const SLOW_WINDOWS = 2;

/**
 * Watches real frame times and steps quality down when the frame rate cannot
 * be held: first the pixel ratio, then the particle budget. It never steps
 * back up, which keeps the picture stable instead of oscillating.
 */
export class QualityGovernor {
  fps = 0;
  frameMs = 0;

  private elapsed = 0;
  private frames = 0;
  private age = 0;
  private slowWindows = 0;

  constructor(private level: QualityLevel) {}

  get current(): QualityLevel {
    return this.level;
  }

  /** Feed one frame. Returns a new level when quality should drop. */
  sample(rawDt: number, canAdapt: boolean): QualityLevel | null {
    // Ignore the long frame after a tab switch or a debugger pause.
    if (rawDt > 0.25) return null;

    this.elapsed += rawDt;
    this.age += rawDt;
    this.frames++;
    if (this.elapsed < WINDOW_SECONDS) return null;

    this.fps = this.frames / this.elapsed;
    this.frameMs = (this.elapsed / this.frames) * 1000;
    this.elapsed = 0;
    this.frames = 0;

    if (!canAdapt || this.age < WARMUP_SECONDS) return null;

    this.slowWindows = this.fps < SLOW_FPS ? this.slowWindows + 1 : 0;
    if (this.slowWindows < SLOW_WINDOWS) return null;
    this.slowWindows = 0;

    const next = stepDown(this.level);
    if (!next) return null;
    this.level = next;
    return next;
  }
}

function stepDown(level: QualityLevel): QualityLevel | null {
  const ceiling = Math.min(
    level.dprCap,
    QUALITY[level.tier].maxDpr,
    window.devicePixelRatio || 1,
  );
  if (ceiling > 1) {
    return { tier: level.tier, dprCap: Math.max(1, ceiling - 0.5) };
  }
  const index = ORDER.indexOf(level.tier);
  if (index < ORDER.length - 1) {
    return { tier: ORDER[index + 1], dprCap: 1 };
  }
  return null;
}
