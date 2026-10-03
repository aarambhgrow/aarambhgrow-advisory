import { CLICK_DURATION, IDLE_REDUCE_MS } from "../config";

export type CursorState =
  | "DEFAULT"
  | "HOVER"
  | "CLICK"
  | "FAST_MOVEMENT"
  | "IDLE";

/**
 * What the cursor is over. Set with `data-cursor="…"` on any element;
 * links, buttons and form controls default to `hover`.
 */
export type CursorZone = "none" | "move" | "hover" | "click" | "button";

const ZONES: readonly CursorZone[] = ["none", "move", "hover", "click", "button"];
const INTERACTIVE =
  '[data-cursor], a, button, input, select, textarea, label, summary, [role="button"], [role="switch"]';

/** Time constant of the cursor easing (target → smooth), in seconds. */
const FOLLOW_TAU = 0.045;
/** Time constant used to de-noise the per-frame velocity. */
const VELOCITY_TAU = 0.07;
const HOVER_TAU = 0.14;
const PRESENCE_TAU = 0.12;

/** Hysteresis for FAST_MOVEMENT so the state does not flicker (px/s). */
const FAST_ENTER = 1500;
const FAST_EXIT = 850;

const ease = (dt: number, tau: number) => 1 - Math.exp(-dt / tau);

/**
 * Turns raw pointer events into a stable, eased cursor description:
 *
 *   targetMouse → lerp → smoothMouse → (SVG cursor + shader uniforms)
 *
 * Events only record the target; all easing happens once per frame in
 * `update()`, so the result is frame-rate independent.
 */
export class PointerTracker {
  /** Raw pointer position (CSS px). */
  targetX = 0;
  targetY = 0;
  /** Eased position — what the Dandiya and the shaders see. */
  x = 0;
  y = 0;
  /** Eased position on the previous frame. */
  prevX = 0;
  prevY = 0;
  /** Smoothed velocity (CSS px / s) and its magnitude. */
  vx = 0;
  vy = 0;
  speed = 0;
  /** Acceleration (CSS px / s²). */
  ax = 0;
  ay = 0;
  /** Direction of travel in radians; keeps its last value while at rest. */
  direction = 0;

  /** Eased 0‥1: over a hover-style zone. */
  hover = 0;
  /** 1 at the moment of a click, falling linearly to 0 over CLICK_DURATION. */
  click = 0;
  clickX = 0;
  clickY = 0;
  clickStrength = 1;
  /** Incremented on every click so consumers can detect new ones. */
  clickSerial = 0;
  pressed = false;

  zone: CursorZone = "none";
  /** Pointer is currently inside the viewport. */
  inside = false;
  /** Eased 0‥1 visibility of the cursor. */
  presence = 0;
  /** Milliseconds since the pointer last moved. */
  idleMs = Number.POSITIVE_INFINITY;
  state: CursorState = "IDLE";

  /** `false` under reduced motion: the cursor follows the pointer directly. */
  interpolate = true;
  /** Scales the easing time constant (the "Motion" control). */
  lag = 1;

  private seen = false;
  private snap = true;
  private fast = false;
  private lastMove = Number.NEGATIVE_INFINITY;
  private attached = false;
  private listeners = new Set<() => void>();

  attach(): void {
    if (this.attached) return;
    this.attached = true;
    const passive = { passive: true } as const;
    window.addEventListener("pointermove", this.onMove, passive);
    window.addEventListener("pointerdown", this.onDown, passive);
    window.addEventListener("pointerup", this.onUp, passive);
    window.addEventListener("pointercancel", this.onUp, passive);
    window.addEventListener("blur", this.onLeave);
    document.addEventListener("pointerover", this.onOver, passive);
    document.documentElement.addEventListener("pointerleave", this.onLeave, passive);
  }

  detach(): void {
    if (!this.attached) return;
    this.attached = false;
    window.removeEventListener("pointermove", this.onMove);
    window.removeEventListener("pointerdown", this.onDown);
    window.removeEventListener("pointerup", this.onUp);
    window.removeEventListener("pointercancel", this.onUp);
    window.removeEventListener("blur", this.onLeave);
    document.removeEventListener("pointerover", this.onOver);
    document.documentElement.removeEventListener("pointerleave", this.onLeave);
    this.inside = false;
    this.pressed = false;
  }

  /** `useSyncExternalStore`-compatible subscription to `state` changes. */
  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getState = (): CursorState => this.state;

  /** Fire a click wave from code — keyboard activation, encore beats. */
  pulse(x: number, y: number, strength = 1): void {
    this.triggerClick(x, y, strength);
  }

  /** Advance the easing by `dt` seconds. Call once per frame. */
  update(dt: number): void {
    this.idleMs = performance.now() - this.lastMove;

    this.prevX = this.x;
    this.prevY = this.y;

    if (this.snap) {
      // First move, or re-entering the window: jump, never streak across.
      this.x = this.prevX = this.targetX;
      this.y = this.prevY = this.targetY;
      this.vx = this.vy = 0;
      this.snap = false;
    } else if (!this.interpolate || this.lag <= 0.01) {
      this.x = this.targetX;
      this.y = this.targetY;
    } else {
      const k = ease(dt, FOLLOW_TAU * this.lag);
      this.x += (this.targetX - this.x) * k;
      this.y += (this.targetY - this.y) * k;
      // Settle exactly, so a resting cursor sits on whole pixels (crisp SVG).
      if (Math.abs(this.targetX - this.x) < 0.02) this.x = this.targetX;
      if (Math.abs(this.targetY - this.y) < 0.02) this.y = this.targetY;
    }

    const kv = ease(dt, VELOCITY_TAU);
    const pvx = this.vx;
    const pvy = this.vy;
    this.vx += ((this.x - this.prevX) / dt - this.vx) * kv;
    this.vy += ((this.y - this.prevY) / dt - this.vy) * kv;
    if (Math.abs(this.vx) < 0.05) this.vx = 0;
    if (Math.abs(this.vy) < 0.05) this.vy = 0;
    this.ax = (this.vx - pvx) / dt;
    this.ay = (this.vy - pvy) / dt;
    this.speed = Math.hypot(this.vx, this.vy);
    if (this.speed > 8) this.direction = Math.atan2(this.vy, this.vx);

    const visible = this.inside && this.seen;
    const hovering = visible && isHoverZone(this.zone);
    this.hover += ((hovering ? 1 : 0) - this.hover) * ease(dt, HOVER_TAU);
    if (this.hover < 0.001 && !hovering) this.hover = 0;
    this.presence += ((visible ? 1 : 0) - this.presence) * ease(dt, PRESENCE_TAU);
    if (this.presence < 0.001 && !visible) this.presence = 0;
    this.click = Math.max(0, this.click - dt / CLICK_DURATION);

    if (this.fast) {
      if (this.speed < FAST_EXIT) this.fast = false;
    } else if (this.speed > FAST_ENTER) {
      this.fast = true;
    }

    let next: CursorState;
    if (this.click > 0) next = "CLICK";
    else if (hovering) next = "HOVER";
    else if (this.fast) next = "FAST_MOVEMENT";
    else if (!visible || this.idleMs > IDLE_REDUCE_MS) next = "IDLE";
    else next = "DEFAULT";

    if (next !== this.state) {
      this.state = next;
      this.listeners.forEach((listener) => listener());
    }
  }

  private onMove = (event: PointerEvent): void => {
    if (event.pointerType === "touch") return;
    this.targetX = event.clientX;
    this.targetY = event.clientY;
    if (!this.inside || !this.seen) this.snap = true;
    this.inside = true;
    this.seen = true;
    this.lastMove = performance.now();
  };

  private onDown = (event: PointerEvent): void => {
    if (event.pointerType === "touch") {
      // No cursor on touch screens, but a tap still blooms where it lands.
      this.triggerClick(event.clientX, event.clientY, 1);
      return;
    }
    if (event.button !== 0) return;
    this.pressed = true;
    this.lastMove = performance.now();
    const known = this.inside && this.seen;
    this.triggerClick(
      known ? this.x : event.clientX,
      known ? this.y : event.clientY,
      this.zone === "click" ? 1.5 : this.zone === "button" ? 1.25 : 1,
    );
  };

  private onUp = (): void => {
    this.pressed = false;
  };

  private onOver = (event: PointerEvent): void => {
    if (event.pointerType === "touch") return;
    const target = event.target instanceof Element ? event.target : null;
    // An embedded frame keeps the pointer's events to itself, so for this
    // page entering one is the same as leaving the window.
    if (target instanceof HTMLIFrameElement) {
      this.onLeave();
      return;
    }
    const match = target?.closest<HTMLElement>(INTERACTIVE) ?? null;
    if (!match) {
      this.zone = "none";
      return;
    }
    const declared = match.dataset.cursor as CursorZone | undefined;
    this.zone = declared && ZONES.includes(declared) ? declared : "hover";
  };

  private onLeave = (): void => {
    this.inside = false;
    this.pressed = false;
    this.zone = "none";
  };

  private triggerClick(x: number, y: number, strength: number): void {
    this.click = 1;
    this.clickX = x;
    this.clickY = y;
    this.clickStrength = strength;
    this.clickSerial++;
  }
}

/** Zones that raise `uHover`: the halo, the warmer palette, the denser trail. */
export function isHoverZone(zone: CursorZone): boolean {
  return zone === "hover" || zone === "click" || zone === "button";
}
