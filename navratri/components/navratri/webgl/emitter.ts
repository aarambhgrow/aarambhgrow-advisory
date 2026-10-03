import { IDLE_REDUCE_MS, IDLE_STOP_MS, type NavratriSettings } from "../config";
import type { CursorZone, PointerTracker } from "../runtime/pointer";
import { PARTICLE_TYPE, type ParticlePool, type ParticleType } from "./particle-pool";

const TAU = Math.PI * 2;

export interface EmitFrame {
  time: number;
  dt: number;
  pointer: PointerTracker;
  settings: NavratriSettings;
  /** Viewport size in CSS px. */
  width: number;
  height: number;
  coarsePointer: boolean;
  /** Current hover-halo radius in CSS px; orbiting sparks spawn on it. */
  haloRadius: number;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);
/** Roughly normal in -1‥1, cheap. */
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

function pickType(zone: CursorZone): ParticleType {
  const r = Math.random();
  if (zone === "move") {
    // The "move" card is a place to paint: more flowers and sparks.
    if (r < 0.46) return PARTICLE_TYPE.dot;
    if (r < 0.7) return PARTICLE_TYPE.spark;
    if (r < 0.8) return PARTICLE_TYPE.diamond;
    if (r < 0.95) return PARTICLE_TYPE.flower;
    return PARTICLE_TYPE.ring;
  }
  // Mostly glowing powder, with the occasional spark, diamond or flower.
  if (r < 0.62) return PARTICLE_TYPE.dot;
  if (r < 0.84) return PARTICLE_TYPE.spark;
  if (r < 0.955) return PARTICLE_TYPE.diamond;
  if (r < 0.975) return PARTICLE_TYPE.flower;
  return PARTICLE_TYPE.ring;
}

/** Sprite diameter in CSS px. Skewed small: a few large, many fine. */
function sizeFor(type: ParticleType): number {
  const r = Math.random();
  switch (type) {
    case PARTICLE_TYPE.dot:
      // One dot in fourteen is a large, dim, out-of-focus mote: depth.
      return Math.random() < 0.07 ? 26 + 18 * r : 6 + 13 * r * r * r;
    case PARTICLE_TYPE.spark:
      return 14 + 20 * r * r;
    case PARTICLE_TYPE.diamond:
      return 10 + 12 * r;
    case PARTICLE_TYPE.flower:
      return 16 + 12 * r;
    default:
      return 16 + 20 * r;
  }
}

/** Lifetime in seconds, before the trail-length multiplier. */
function lifeFor(type: ParticleType): number {
  switch (type) {
    case PARTICLE_TYPE.dot:
      return rand(0.8, 1.9);
    case PARTICLE_TYPE.spark:
      return rand(0.5, 1.1);
    case PARTICLE_TYPE.diamond:
      return rand(0.8, 1.5);
    case PARTICLE_TYPE.flower:
      return rand(1.1, 1.9);
    default:
      return rand(0.55, 0.95);
  }
}

/** Sparks stay near upright (a classic ✦); everything else tumbles freely. */
function rotationFor(type: ParticleType): number {
  return type === PARTICLE_TYPE.spark ? rand(-0.35, 0.35) : rand(0, TAU);
}

/**
 * Decides *when and where* particles are born. Emission is proportional to
 * the distance the cursor travelled, so faster movement leaves more powder,
 * slow movement leaves little, and a resting cursor leaves none.
 */
export class Emitter {
  private carry = 0;
  private orbitCarry = 0;
  private ambientCarry = 0;

  constructor(private pool: ParticlePool) {}

  update(frame: EmitFrame): void {
    const { pointer, settings } = frame;
    if (!settings.particles) return;

    if (frame.coarsePointer) {
      this.emitAmbientField(frame);
      return;
    }
    if (pointer.presence > 0.5) {
      this.emitTrail(frame);
      if (pointer.hover > 0.5) this.emitOrbit(frame);
    }
  }

  /** A radial spray for a click. `strength` scales count and reach. */
  burst(x: number, y: number, time: number, strength: number, settings: NavratriSettings): void {
    if (!settings.particles) return;
    const pool = this.pool;
    const budget = pool.capacity >= 800 ? 46 : pool.capacity >= 400 ? 30 : 16;
    const density = Math.min(Math.max(settings.density, 0.4), 1.6);
    const count = Math.round(budget * density * Math.sqrt(strength));
    const reach = Math.sqrt(strength) * (0.6 + 0.4 * settings.motion);

    for (let i = 0; i < count; i++) {
      const angle = ((i + Math.random()) / count) * TAU;
      const r = Math.random();
      const type =
        r < 0.48
          ? PARTICLE_TYPE.spark
          : r < 0.82
            ? PARTICLE_TYPE.dot
            : r < 0.94
              ? PARTICLE_TYPE.diamond
              : PARTICLE_TYPE.flower;
      const speed = (190 + 540 * Math.pow(Math.random(), 1.3)) * reach;
      const start = rand(2, 9);
      pool.spawn(
        x + Math.cos(angle) * start,
        y + Math.sin(angle) * start,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        sizeFor(type) * 1.15,
        // A few milliseconds of stagger keeps the spray from being one flash.
        time + Math.random() * 0.05,
        lifeFor(type) * rand(0.75, 1.15) * settings.trailLength,
        type,
        rotationFor(type),
      );
    }

    // Small rings that open as they drift, echoing the wave.
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * TAU;
      const speed = rand(40, 130) * reach;
      pool.spawn(
        x,
        y,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        rand(22, 40),
        time + i * 0.04,
        rand(0.6, 1.0) * settings.trailLength,
        PARTICLE_TYPE.ring,
        0,
      );
    }
  }

  private emitTrail(frame: EmitFrame): void {
    const { pointer: p, settings, dt, time } = frame;
    const pool = this.pool;

    const dx = p.x - p.prevX;
    const dy = p.y - p.prevY;
    const distance = Math.hypot(dx, dy);
    const rush = Math.min(p.speed / 1800, 1);

    const zoneDensity = p.zone === "move" ? 1.9 : 1 + 0.5 * p.hover;
    const zoneLife = p.zone === "move" ? 1.35 : 1;
    // Lower tiers have a smaller pool, so they emit proportionally less.
    const tierScale = 0.3 + 0.7 * (pool.capacity / 800);

    // Powder shed per pixel travelled — denser the faster the cursor moves.
    let count = distance * (0.085 + 0.085 * rush) * zoneDensity;
    // A faint shimmer while resting, which thins out and then stops.
    const idle = p.idleMs;
    const restingRate = idle < IDLE_REDUCE_MS ? 5 : idle < IDLE_STOP_MS ? 1.5 : 0;
    count += restingRate * dt;
    count *= settings.density * tierScale;

    // Never emit faster than the pool can hold: recycling a particle that is
    // still visible would make it pop.
    const sustainable = (pool.capacity / (1.6 * settings.trailLength * zoneLife)) * dt;
    this.carry += Math.min(count, sustainable);
    const n = Math.floor(this.carry);
    if (n === 0) return;
    this.carry -= n;

    const moving = distance > 0.001;
    const dirX = moving ? dx / distance : 0;
    const dirY = moving ? dy / distance : 0;

    for (let i = 0; i < n; i++) {
      // Spread births along the segment and across the frame's time, so fast
      // strokes read as a continuous stream rather than one clump per frame.
      const f = (i + Math.random()) / n;
      const type = pickType(p.zone);
      const spread = gauss() * (3 + 6 * rush);
      const x = p.prevX + dx * f - dirY * spread + gauss() * 2.5;
      const y = p.prevY + dy * f + dirX * spread + gauss() * 2.5;

      // Carried along with the stroke, fanned out sideways, plus a little chaos.
      const inherit = rand(0.08, 0.3);
      const fan = gauss() * (14 + p.speed * 0.045);
      const scatterAngle = Math.random() * TAU;
      const scatter = rand(6, 30);
      const vx = p.vx * inherit - dirY * fan + Math.cos(scatterAngle) * scatter;
      const vy = p.vy * inherit + dirX * fan + Math.sin(scatterAngle) * scatter;

      pool.spawn(
        x,
        y,
        vx * settings.motion,
        vy * settings.motion,
        sizeFor(type),
        time - dt * (1 - f),
        // FAST_MOVEMENT: the faster the stroke, the longer its trail lingers.
        lifeFor(type) * settings.trailLength * zoneLife * (1 + 0.55 * rush),
        type,
        rotationFor(type),
      );
    }
  }

  /** Hover: sparkles orbit the halo ring. */
  private emitOrbit(frame: EmitFrame): void {
    const { pointer: p, settings, dt, time, haloRadius } = frame;
    this.orbitCarry += 11 * dt * settings.density * p.hover;
    const n = Math.floor(this.orbitCarry);
    this.orbitCarry -= n;

    for (let i = 0; i < n; i++) {
      const angle = Math.random() * TAU;
      const radius = haloRadius + gauss() * 3;
      const tangential = rand(26, 54) * (Math.random() < 0.5 ? -1 : 1);
      const outward = rand(4, 16);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const type = Math.random() < 0.6 ? PARTICLE_TYPE.dot : PARTICLE_TYPE.spark;
      this.pool.spawn(
        p.x + cos * radius,
        p.y + sin * radius,
        (-sin * tangential + cos * outward) * settings.motion,
        (cos * tangential + sin * outward) * settings.motion,
        sizeFor(type) * 0.8,
        time,
        rand(0.5, 1.0) * settings.trailLength,
        type,
        rotationFor(type),
      );
    }
  }

  /**
   * Touch devices have no cursor to follow, so they get a sparse field of
   * slow motes rising through the scene instead.
   */
  private emitAmbientField(frame: EmitFrame): void {
    const { settings, dt, time, width, height } = frame;
    this.ambientCarry += 8 * dt * settings.density;
    const n = Math.floor(this.ambientCarry);
    this.ambientCarry -= n;

    for (let i = 0; i < n; i++) {
      const r = Math.random();
      const type =
        r < 0.7 ? PARTICLE_TYPE.dot : r < 0.9 ? PARTICLE_TYPE.spark : PARTICLE_TYPE.flower;
      this.pool.spawn(
        rand(0, width),
        rand(height * 0.2, height),
        rand(-8, 8) * settings.motion,
        rand(-26, -8) * settings.motion,
        sizeFor(type) * 0.9,
        time,
        rand(2.8, 4.6) * settings.trailLength,
        type,
        rotationFor(type),
      );
    }
  }
}
