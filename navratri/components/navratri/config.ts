/**
 * Flip to `true` to show the debug overlay (FPS, particle count, DPR, WebGL
 * renderer) on load. It can also be toggled from the developer panel.
 * The overlay never renders in production builds.
 */
export const DEBUG = false;

export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export type QualityTier = "high" | "medium" | "low";

export interface QualityProfile {
  /** Size of the GPU particle pool. */
  particles: number;
  /** Upper bound for the canvas device-pixel-ratio. */
  maxDpr: number;
  /** Light-trail buffer resolution, in texels per CSS pixel. */
  trailRes: number;
}

export const QUALITY: Record<QualityTier, QualityProfile> = {
  high: { particles: 800, maxDpr: 2, trailRes: 1 },
  medium: { particles: 400, maxDpr: 1.5, trailRes: 0.66 },
  low: { particles: 180, maxDpr: 1, trailRes: 0.5 },
};

/** The light-trail buffer never exceeds this many texels, whatever the screen. */
export const MAX_TRAIL_TEXELS = 1_600_000;

/**
 * On a see-through canvas there is no dark stage for the mandala to glow
 * against, so over a host page its hairlines are drawn with this much more ink.
 */
export const OVERLAY_MANDALA_GAIN = 6;

/** Navratri palette — keep in sync with `shaders/common.glsl.ts`. */
export const PALETTE = {
  gold: "#F5B942",
  orange: "#FF7A18",
  pink: "#FF3D81",
  purple: "#A855F7",
  white: "#FFF7E6",
} as const;

export interface NavratriSettings {
  webgl: boolean;
  particles: boolean;
  trail: boolean;
  mandala: boolean;
  glow: boolean;
  clickBurst: boolean;
  diya: boolean;
  /** Particle density multiplier. */
  density: number;
  /** Lifetime multiplier for particles and the light trail. */
  trailLength: number;
  /** Glow intensity multiplier. */
  glowAmount: number;
  /** Dandiya cursor scale. */
  cursorSize: number;
  /** Amount of organic motion: flow field, wobble, cursor easing. */
  motion: number;
  quality: "auto" | QualityTier;
  /**
   * The palette's two accent colours, as hex. Pink and purple unless a host
   * re-tints them (a colour per day of Navratri, say); the gold of the light
   * itself is not configurable.
   */
  accent: string;
  accentDeep: string;
}

export const DEFAULT_SETTINGS: NavratriSettings = {
  webgl: true,
  particles: true,
  trail: true,
  mandala: true,
  glow: true,
  clickBurst: true,
  diya: true,
  density: 1,
  trailLength: 1,
  glowAmount: 1,
  cursorSize: 1,
  motion: 1,
  quality: "auto",
  accent: PALETTE.pink,
  accentDeep: PALETTE.purple,
};

/** Cursor timing, shared by the pointer tracker, the emitter and the shaders. */
export const IDLE_REDUCE_MS = 1000;
export const IDLE_STOP_MS = 2500;
/** Seconds for `uClick` to fall from 1 back to 0 (the radial wave lifetime). */
export const CLICK_DURATION = 0.62;

/** Dandiya cursor size in CSS pixels at `cursorSize = 1`. */
export const CURSOR_BASE_SIZE = 76;
