import {
  CLICK_DURATION,
  MAX_TRAIL_TEXELS,
  OVERLAY_MANDALA_GAIN,
  PALETTE,
  QUALITY,
  type NavratriSettings,
  type QualityTier,
} from "../config";
import type { PointerTracker } from "../runtime/pointer";
import type { DiyaAnchor, MandalaBand } from "../runtime/runtime";
import { fullscreenVert } from "../shaders/fullscreen.vert";
import { glowFrag } from "../shaders/glow.frag";
import { mandalaFrag } from "../shaders/mandala.frag";
import { particlesFrag } from "../shaders/particles.frag";
import { particlesVert } from "../shaders/particles.vert";
import { trailFrag } from "../shaders/trail.frag";
import { Emitter } from "./emitter";
import { createProgram, describeRenderer, hexToRgb, type GL, type Program } from "./gl-utils";
import { PARTICLE_ATTRIBUTES, ParticlePool, STRIDE } from "./particle-pool";

export interface RendererOptions {
  /**
   * Leave the canvas see-through instead of painting the dark stage: only the
   * light and the mandala's ink are drawn, premultiplied, so the layer
   * composes over a host page. Fixed for the life of the GL context.
   */
  transparent?: boolean;
}

export interface RenderFrame {
  /** Simulated seconds, and the step since the previous frame. */
  time: number;
  dt: number;
  pointer: PointerTracker;
  settings: NavratriSettings;
  diyas: readonly DiyaAnchor[];
  /** Rows the mandala may be drawn in on a see-through canvas; `null` = all. */
  mandalaBand: MandalaBand | null;
  reducedMotion: boolean;
  coarsePointer: boolean;
}

interface TrailFormat {
  internalFormat: number;
  format: number;
  type: number;
  /** Float targets fade smoothly; 8-bit ones need an extra nudge to reach 0. */
  float: boolean;
  label: string;
}

interface TrailTarget {
  texture: WebGLTexture;
  framebuffer: WebGLFramebuffer;
}

interface Wave {
  x: number;
  y: number;
  start: number;
  strength: number;
}

const MAX_WAVES = 3;
const MAX_DIYAS = 2;
const BYTES = Float32Array.BYTES_PER_ELEMENT;
const FULLSCREEN_ATTRIBUTES = { aPosition: 0 };
const PARTICLE_LOCATIONS: Record<string, number> = Object.fromEntries(
  PARTICLE_ATTRIBUTES.map((attribute) => [attribute.name, attribute.location]),
);

/** Radians per second. Slow enough that you sense it more than see it. */
const MANDALA_SPIN = 0.015;
/** The frozen moment drawn under reduced motion. */
const STILL_TIME = 20;
const STILL_ROTATION = 0.2;

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

/**
 * A small raw-WebGL renderer — four programs, no dependencies:
 *
 *   trail      feedback buffer: advect, fade and stamp the cursor's path
 *   background atmosphere + mandala (opaque; mandala only when transparent)
 *   glow       light trail, cursor halo, click waves, diya (additive)
 *   particles  GPU point sprites (additive)
 *
 * Shaders are GLSL ES 1.00, which both WebGL 1 and WebGL 2 contexts accept.
 */
export class NavratriRenderer {
  readonly api: string;
  readonly rendererName: string;
  trailLabel = "off";
  /**
   * Whether the last frame's background had anything moving in it. Always so
   * on the stage; on a see-through canvas only while the mandala is in view.
   */
  backgroundMoving = true;

  private readonly gl: GL;
  private readonly webgl2: boolean;
  private readonly transparent: boolean;
  private maxPointSize = 64;

  private background: Program | null = null;
  private glow: Program | null = null;
  private trail: Program | null = null;
  private particles: Program | null = null;
  private triangle: WebGLBuffer | null = null;
  private particleBuffer: WebGLBuffer | null = null;
  /** 1×1 black: bound in place of the trail so the sampler is never empty. */
  private blackTexture: WebGLTexture | null = null;

  private tier: QualityTier;
  private pool: ParticlePool;
  private emitter: Emitter;

  private trailFormat: TrailFormat | null = null;
  private trailTargets: [TrailTarget, TrailTarget] | null = null;
  private trailWidth = 0;
  private trailHeight = 0;
  /** CPU-side estimate of the brightest light left in the trail buffer. */
  private trailEnergy = 0;
  /** The buffer has been drawn into since it was last cleared. */
  private trailUsed = false;

  private readonly waves: Wave[] = [];
  private readonly waveData = new Float32Array(MAX_WAVES * 4);
  private readonly diyaData = new Float32Array(MAX_DIYAS * 4);
  private lastClickSerial: number;

  /** Viewport in CSS px, and the canvas pixel ratio. */
  private width = 1;
  private height = 1;
  private dpr = 1;

  private rotation = 0;
  private atmosphereTime = 0;
  private haloRadius = 30;
  private haloDash = 0;
  private contextLost = false;

  /** The accent uniforms, and the hex they were last parsed from. */
  private readonly accent = hexToRgb(PALETTE.pink);
  private readonly accentDeep = hexToRgb(PALETTE.purple);
  private accentHex: string = PALETTE.pink;
  private accentDeepHex: string = PALETTE.purple;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    tier: QualityTier,
    pointer: PointerTracker,
    options: RendererOptions = {},
  ) {
    this.transparent = options.transparent ?? false;
    const attributes: WebGLContextAttributes = {
      alpha: this.transparent,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    };
    const gl =
      (canvas.getContext("webgl2", attributes) as WebGL2RenderingContext | null) ??
      (canvas.getContext("webgl", attributes) as WebGLRenderingContext | null);
    if (!gl) throw new Error("WebGL is not available");
    if (gl.isContextLost()) throw new Error("WebGL context is lost");

    this.gl = gl;
    this.webgl2 =
      typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
    this.api = this.webgl2 ? "WebGL 2" : "WebGL 1";
    this.rendererName = describeRenderer(gl);

    this.tier = tier;
    this.pool = new ParticlePool(QUALITY[tier].particles);
    this.emitter = new Emitter(this.pool);
    // Clicks made before this renderer existed should not replay.
    this.lastClickSerial = pointer.clickSerial;

    try {
      this.createResources();
    } catch (error) {
      this.dispose();
      throw error;
    }
  }

  get capacity(): number {
    return this.pool.capacity;
  }

  get pixelRatio(): number {
    return this.dpr;
  }

  aliveCount(time: number): number {
    return this.pool.countAlive(time);
  }

  /** True while something is still animating besides the background. */
  isBusy(time: number): boolean {
    return time < this.pool.deadline || this.trailEnergy > 0 || this.waves.length > 0;
  }

  /** Switch particle budget and trail resolution. Live particles are dropped. */
  setTier(tier: QualityTier): void {
    if (tier === this.tier) return;
    this.tier = tier;
    this.pool = new ParticlePool(QUALITY[tier].particles);
    this.emitter = new Emitter(this.pool);
    this.allocateParticleBuffer();
    this.allocateTrail();
  }

  /** Match the drawing buffer to the canvas' CSS size at the given ratio. */
  resize(cssWidth: number, cssHeight: number, dpr: number): void {
    this.width = Math.max(1, cssWidth);
    this.height = Math.max(1, cssHeight);
    this.dpr = dpr;
    const width = Math.max(1, Math.round(this.width * dpr));
    const height = Math.max(1, Math.round(this.height * dpr));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    this.allocateTrail();
  }

  handleContextLost(): void {
    this.contextLost = true;
    // The browser has already freed everything; just forget our handles.
    this.background = this.glow = this.trail = this.particles = null;
    this.triangle = this.particleBuffer = null;
    this.blackTexture = null;
    this.trailTargets = null;
    this.trailEnergy = 0;
    this.trailUsed = false;
    this.waves.length = 0;
  }

  handleContextRestored(): void {
    this.contextLost = false;
    this.trailWidth = this.trailHeight = 0;
    this.createResources();
    this.allocateTrail();
  }

  /** Forget input that arrived while nothing was drawn, so it does not replay. */
  catchUp(pointer: PointerTracker): void {
    this.lastClickSerial = pointer.clickSerial;
  }

  render(frame: RenderFrame): void {
    if (this.contextLost) return;
    const gl = this.gl;
    const { pointer, settings, dt } = frame;
    const animated = !frame.reducedMotion;
    const time = animated ? frame.time : STILL_TIME;

    if (animated) {
      // Touch devices get a much slower background.
      const pace = (frame.coarsePointer ? 0.35 : 1) * settings.motion;
      this.rotation += dt * MANDALA_SPIN * pace;
      this.atmosphereTime += dt * (frame.coarsePointer ? 0.35 : 1);
      this.updateHalo(frame);
      this.updateWaves(frame);
      this.emitter.update({
        time,
        dt,
        pointer,
        settings,
        width: this.width,
        height: this.height,
        coarsePointer: frame.coarsePointer,
        haloRadius: this.haloRadius,
      });
    } else {
      // A still frame: drop anything mid-animation rather than freezing it,
      // and do not replay clicks if motion is switched back on later.
      this.waves.length = 0;
      this.waveData.fill(0);
      this.lastClickSerial = pointer.clickSerial;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.particleBuffer);
    this.pool.upload(gl);

    const trailWanted = animated && settings.trail;
    const trailActive = trailWanted && this.updateTrail(frame, time);
    // Switched off mid-stroke: wipe it, so no stale light returns later.
    if (!trailWanted && this.trailUsed) this.clearTrail();

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.disable(gl.BLEND);
    this.backgroundMoving = this.paintBackground(frame, animated);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    this.drawGlow(frame, time, animated, trailActive);
    if (animated && settings.particles && time < this.pool.deadline) {
      this.drawParticles(frame, time);
    }
    gl.disable(gl.BLEND);
  }

  /** Delete every GPU object this renderer created. */
  dispose(): void {
    const gl = this.gl;
    this.deleteTrail();
    for (const program of [this.background, this.glow, this.trail, this.particles]) {
      if (program) gl.deleteProgram(program.program);
    }
    if (this.triangle) gl.deleteBuffer(this.triangle);
    if (this.particleBuffer) gl.deleteBuffer(this.particleBuffer);
    if (this.blackTexture) gl.deleteTexture(this.blackTexture);
    this.background = this.glow = this.trail = this.particles = null;
    this.triangle = this.particleBuffer = null;
    this.blackTexture = null;
    this.waves.length = 0;
  }

  /**
   * Hand the GPU context itself back to the browser. A lost context cannot be
   * revived on the same canvas, so only call this once the canvas is gone.
   */
  releaseContext(): void {
    this.gl.getExtension("WEBGL_lose_context")?.loseContext();
  }

  // ---------------------------------------------------------------- setup

  private createResources(): void {
    const gl = this.gl;

    this.background = createProgram(gl, fullscreenVert, mandalaFrag, FULLSCREEN_ATTRIBUTES);
    this.glow = createProgram(gl, fullscreenVert, glowFrag, FULLSCREEN_ATTRIBUTES);
    this.trail = createProgram(gl, fullscreenVert, trailFrag, FULLSCREEN_ATTRIBUTES);
    this.particles = createProgram(gl, particlesVert, particlesFrag, PARTICLE_LOCATIONS);

    this.triangle = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.triangle);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    this.particleBuffer = gl.createBuffer();
    this.allocateParticleBuffer();

    this.blackTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.blackTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    gl.bindTexture(gl.TEXTURE_2D, null);

    const range = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array | null;
    this.maxPointSize = range ? range[1] : 64;
    this.trailFormat = this.pickTrailFormat();

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    // A see-through canvas clears to nothing rather than to black.
    gl.clearColor(0, 0, 0, this.transparent ? 0 : 1);
  }

  private allocateParticleBuffer(): void {
    const gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.particleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.pool.data.byteLength, gl.DYNAMIC_DRAW);
    this.pool.markAllDirty();
  }

  /**
   * Prefer a half-float target for the trail: 8 bits cannot represent the
   * last, dimmest steps of a slow fade. Each candidate is verified by
   * actually attaching it to a framebuffer.
   */
  private pickTrailFormat(): TrailFormat | null {
    const gl = this.gl;
    const candidates: TrailFormat[] = [];

    if (this.webgl2) {
      const gl2 = gl as WebGL2RenderingContext;
      if (gl.getExtension("EXT_color_buffer_float") || gl.getExtension("EXT_color_buffer_half_float")) {
        candidates.push(
          { internalFormat: gl2.RG16F, format: gl2.RG, type: gl2.HALF_FLOAT, float: true, label: "rg16f" },
          { internalFormat: gl2.RGBA16F, format: gl.RGBA, type: gl2.HALF_FLOAT, float: true, label: "rgba16f" },
        );
      }
      candidates.push({ internalFormat: gl2.RGBA8, format: gl.RGBA, type: gl.UNSIGNED_BYTE, float: false, label: "rgba8" });
    } else {
      const halfFloat = gl.getExtension("OES_texture_half_float");
      const filterable = gl.getExtension("OES_texture_half_float_linear");
      gl.getExtension("EXT_color_buffer_half_float");
      if (halfFloat && filterable) {
        candidates.push({ internalFormat: gl.RGBA, format: gl.RGBA, type: halfFloat.HALF_FLOAT_OES, float: true, label: "rgba16f" });
      }
      candidates.push({ internalFormat: gl.RGBA, format: gl.RGBA, type: gl.UNSIGNED_BYTE, float: false, label: "rgba8" });
    }

    for (const candidate of candidates) {
      const probe = this.createTrailTarget(candidate, 4, 4);
      if (probe) {
        gl.deleteFramebuffer(probe.framebuffer);
        gl.deleteTexture(probe.texture);
        return candidate;
      }
    }
    return null;
  }

  private createTrailTarget(format: TrailFormat, width: number, height: number): TrailTarget | null {
    const gl = this.gl;
    const texture = gl.createTexture();
    const framebuffer = gl.createFramebuffer();
    if (!texture || !framebuffer) return null;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, format.internalFormat, width, height, 0, format.format, format.type, null);

    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    const complete = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    if (complete) {
      gl.viewport(0, 0, width, height);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

    if (!complete) {
      gl.deleteFramebuffer(framebuffer);
      gl.deleteTexture(texture);
      return null;
    }
    return { texture, framebuffer };
  }

  private allocateTrail(): void {
    const format = this.trailFormat;
    if (!format || this.contextLost) {
      this.trailLabel = "unsupported";
      return;
    }

    const resolution = QUALITY[this.tier].trailRes;
    let width = this.width * resolution;
    let height = this.height * resolution;
    const texels = width * height;
    if (texels > MAX_TRAIL_TEXELS) {
      const scale = Math.sqrt(MAX_TRAIL_TEXELS / texels);
      width *= scale;
      height *= scale;
    }
    width = Math.max(2, Math.round(width));
    height = Math.max(2, Math.round(height));
    if (this.trailTargets && width === this.trailWidth && height === this.trailHeight) return;

    this.deleteTrail();
    const a = this.createTrailTarget(format, width, height);
    const b = this.createTrailTarget(format, width, height);
    if (!a || !b) {
      for (const target of [a, b]) {
        if (!target) continue;
        this.gl.deleteFramebuffer(target.framebuffer);
        this.gl.deleteTexture(target.texture);
      }
      this.trailLabel = "unsupported";
      return;
    }
    this.trailTargets = [a, b];
    this.trailWidth = width;
    this.trailHeight = height;
    this.trailEnergy = 0;
    this.trailUsed = false;
    this.trailLabel = `${format.label} ${width}×${height}`;
  }

  private deleteTrail(): void {
    if (!this.trailTargets) return;
    for (const target of this.trailTargets) {
      this.gl.deleteFramebuffer(target.framebuffer);
      this.gl.deleteTexture(target.texture);
    }
    this.trailTargets = null;
  }

  // ----------------------------------------------------------- simulation

  private updateHalo(frame: RenderFrame): void {
    const { pointer, settings, dt } = frame;
    const zone = pointer.zone;
    // Each zone has its own halo: a wide dashed ring invites a click, a
    // tighter solid one hugs a button.
    const radius = (zone === "click" ? 38 : zone === "button" ? 26 : 30) * settings.cursorSize;
    const k = 1 - Math.exp(-dt / 0.12);
    // While the halo is invisible, snap; otherwise it would slide in from
    // the previous zone's size.
    if (pointer.hover < 0.02) {
      this.haloRadius = radius * 0.6;
      this.haloDash = zone === "click" ? 1 : 0;
    } else {
      this.haloRadius += (radius - this.haloRadius) * k;
      this.haloDash += ((zone === "click" ? 1 : 0) - this.haloDash) * k;
    }
  }

  private updateWaves(frame: RenderFrame): void {
    const { pointer, settings, time } = frame;

    if (pointer.clickSerial !== this.lastClickSerial) {
      this.lastClickSerial = pointer.clickSerial;
      if (settings.clickBurst) {
        if (this.waves.length >= MAX_WAVES) this.waves.shift();
        this.waves.push({
          x: pointer.clickX,
          y: pointer.clickY,
          start: time,
          strength: pointer.clickStrength,
        });
        this.emitter.burst(pointer.clickX, pointer.clickY, time, pointer.clickStrength, settings);
      }
    }

    while (this.waves.length > 0 && time - this.waves[0].start >= CLICK_DURATION) {
      this.waves.shift();
    }
    this.waveData.fill(0);
    for (let i = 0; i < this.waves.length; i++) {
      const wave = this.waves[i];
      this.waveData[i * 4] = wave.x;
      this.waveData[i * 4 + 1] = wave.y;
      this.waveData[i * 4 + 2] = Math.min((time - wave.start) / CLICK_DURATION, 1);
      this.waveData[i * 4 + 3] = wave.strength;
    }
  }

  /** Advance the light-trail feedback buffer. Returns whether it holds light. */
  private updateTrail(frame: RenderFrame, time: number): boolean {
    const targets = this.trailTargets;
    const program = this.trail;
    const format = this.trailFormat;
    if (!targets || !program || !format) return false;

    const gl = this.gl;
    const { pointer, settings, dt } = frame;
    const rush = Math.min(pointer.speed / 1800, 1);
    const painting = pointer.presence > 0.5 && !frame.coarsePointer;

    // Slow strokes leave a faint thread; fast ones a bright ribbon and a halo.
    const depositCore = painting
      ? 0.14 * smoothstep(4, 40, pointer.speed) + 0.86 * smoothstep(20, 420, pointer.speed)
      : 0;
    const depositHalo = painting && settings.glow ? 0.7 * smoothstep(60, 900, pointer.speed) : 0;

    // FAST_MOVEMENT stretches the trail; so does the "move" card.
    const length = settings.trailLength * (1 + 0.6 * rush) * (pointer.zone === "move" ? 1.35 : 1);
    // The halo dies quickly so only the fresh stroke glows; the thin core
    // outlives it and cools into a fine ember thread.
    const decayCore = Math.exp(-dt / (0.4 * length));
    const decayHalo = Math.exp(-dt / (0.2 * length));
    const floor = format.float ? 0 : 0.6 / 255;

    this.trailEnergy = Math.max(
      this.trailEnergy * Math.max(decayCore, decayHalo) - floor,
      depositCore,
      depositHalo,
    );
    if (this.trailEnergy < 0.004) {
      // Nothing left worth drawing: skip the pass until the cursor moves.
      this.trailEnergy = 0;
      return false;
    }

    const [read, write] = targets;
    gl.bindFramebuffer(gl.FRAMEBUFFER, write.framebuffer);
    gl.viewport(0, 0, this.trailWidth, this.trailHeight);
    gl.disable(gl.BLEND);
    gl.useProgram(program.program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, read.texture);

    const u = program.uniforms;
    gl.uniform1i(u.uPrevious ?? null, 0);
    gl.uniform2f(u.uResolution ?? null, this.width, this.height);
    gl.uniform2f(u.uMouse ?? null, pointer.x, pointer.y);
    gl.uniform2f(u.uPreviousMouse ?? null, pointer.prevX, pointer.prevY);
    gl.uniform1f(u.uTime ?? null, time);
    gl.uniform1f(u.uDeltaTime ?? null, dt);
    gl.uniform2f(u.uDecay ?? null, decayCore, decayHalo);
    gl.uniform2f(u.uDeposit ?? null, depositCore, depositHalo);
    gl.uniform2f(u.uBrush ?? null, 3 + 2.4 * rush, 14 + 14 * rush);
    gl.uniform1f(u.uFlow ?? null, 28 * settings.motion);
    gl.uniform1f(u.uFloor ?? null, floor);
    this.drawTriangle();

    this.trailTargets = [write, read];
    this.trailUsed = true;
    return true;
  }

  private clearTrail(): void {
    const gl = this.gl;
    this.trailUsed = false;
    this.trailEnergy = 0;
    if (!this.trailTargets) return;
    for (const target of this.trailTargets) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
      gl.viewport(0, 0, this.trailWidth, this.trailHeight);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  // ------------------------------------------------------------- drawing

  private drawTriangle(): void {
    const gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.triangle);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  /** Feed the palette's accents to the bound program; hex is parsed only when it changes. */
  private setAccents(program: Program, settings: NavratriSettings): void {
    if (settings.accent !== this.accentHex) {
      this.accentHex = settings.accent;
      hexToRgb(settings.accent, this.accent);
    }
    if (settings.accentDeep !== this.accentDeepHex) {
      this.accentDeepHex = settings.accentDeep;
      hexToRgb(settings.accentDeep, this.accentDeep);
    }
    const gl = this.gl;
    gl.uniform3fv(program.uniforms.uAccent ?? null, this.accent);
    gl.uniform3fv(program.uniforms.uAccentDeep ?? null, this.accentDeep);
  }

  /**
   * The stage — or, on a see-through canvas, just the mandala's ink, kept to
   * the band it is allowed. Returns whether anything that moves was drawn.
   */
  private paintBackground(frame: RenderFrame, animated: boolean): boolean {
    if (!this.transparent) {
      this.drawBackground(frame, animated);
      return true;
    }

    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (!frame.settings.mandala) return false;

    const band = frame.mandalaBand;
    if (!band) {
      this.drawBackground(frame, animated);
      return true;
    }

    const height = this.canvas.height;
    const top = Math.min(Math.max(Math.round(band.top * this.dpr), 0), height);
    const bottom = Math.min(Math.max(Math.round(band.bottom * this.dpr), 0), height);
    if (bottom <= top) return false;

    // The scissor box is measured from the bottom of the canvas.
    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(0, height - bottom, this.canvas.width, bottom - top);
    this.drawBackground(frame, animated);
    gl.disable(gl.SCISSOR_TEST);
    return true;
  }

  private drawBackground(frame: RenderFrame, animated: boolean): void {
    const program = this.background;
    if (!program) return;
    const gl = this.gl;
    const { pointer, settings } = frame;
    const u = program.uniforms;

    gl.useProgram(program.program);
    gl.uniform2f(u.uResolution ?? null, this.width, this.height);
    gl.uniform1f(u.uTime ?? null, animated ? this.atmosphereTime : STILL_TIME);
    gl.uniform2f(u.uMouse ?? null, pointer.x, pointer.y);
    gl.uniform1f(u.uPresence ?? null, animated && !frame.coarsePointer ? pointer.presence : 0);
    gl.uniform2f(u.uCenter ?? null, this.width * 0.5, this.height * 0.47);
    gl.uniform1f(
      u.uRadius ?? null,
      Math.min(Math.max(Math.min(this.width, this.height) * 0.6, 260), 760),
    );
    gl.uniform1f(u.uRotation ?? null, animated ? this.rotation : STILL_ROTATION);
    gl.uniform1f(
      u.uMandala ?? null,
      settings.mandala ? (this.transparent ? OVERLAY_MANDALA_GAIN : 1) : 0,
    );
    gl.uniform1f(u.uBackdrop ?? null, this.transparent ? 0 : 1);
    this.setAccents(program, settings);
    this.drawTriangle();
  }

  private drawGlow(frame: RenderFrame, time: number, animated: boolean, trailActive: boolean): void {
    const program = this.glow;
    if (!program) return;
    const { pointer, settings } = frame;

    const presence = animated && !frame.coarsePointer ? pointer.presence : 0;
    // The lamps to light: those that are mounted, as many as the shader takes.
    const lamps = this.diyaData;
    lamps.fill(0);
    let lit = 0;
    if (settings.diya) {
      for (const diya of frame.diyas) {
        if (lit === MAX_DIYAS) break;
        if (diya.size <= 0) continue;
        lamps[lit * 4] = diya.x;
        lamps[lit * 4 + 1] = diya.y;
        lamps[lit * 4 + 2] = Math.max(diya.size, 1);
        lamps[lit * 4 + 3] = diya.intensity;
        lit++;
      }
    }
    // Skip the whole pass when there is no light to add.
    if (!trailActive && presence <= 0 && this.waves.length === 0 && lit === 0) return;

    const gl = this.gl;
    const u = program.uniforms;
    gl.useProgram(program.program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(
      gl.TEXTURE_2D,
      trailActive && this.trailTargets ? this.trailTargets[0].texture : this.blackTexture,
    );
    gl.uniform1i(u.uTrail ?? null, 0);
    gl.uniform1f(u.uTrailOn ?? null, trailActive ? 1 : 0);
    gl.uniform2f(u.uResolution ?? null, this.width, this.height);
    gl.uniform1f(u.uTime ?? null, time);
    gl.uniform2f(u.uMouse ?? null, pointer.x, pointer.y);
    gl.uniform1f(u.uSpeed ?? null, pointer.speed);
    gl.uniform1f(u.uHover ?? null, pointer.hover);
    gl.uniform1f(u.uPresence ?? null, presence);
    gl.uniform1f(u.uGlow ?? null, settings.glow ? settings.glowAmount : 0);
    gl.uniform3f(u.uHalo ?? null, this.haloRadius, this.haloDash, pointer.hover);
    gl.uniform4fv(u.uWaves ?? null, this.waveData);
    gl.uniform4fv(u.uDiya ?? null, lamps);
    this.setAccents(program, settings);
    this.drawTriangle();
  }

  private drawParticles(frame: RenderFrame, time: number): void {
    const program = this.particles;
    if (!program) return;
    const gl = this.gl;
    const { pointer, settings } = frame;
    const u = program.uniforms;

    gl.useProgram(program.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.particleBuffer);
    let offset = 0;
    for (const attribute of PARTICLE_ATTRIBUTES) {
      gl.enableVertexAttribArray(attribute.location);
      gl.vertexAttribPointer(attribute.location, attribute.size, gl.FLOAT, false, STRIDE * BYTES, offset * BYTES);
      offset += attribute.size;
    }

    gl.uniform2f(u.uMouse ?? null, pointer.x, pointer.y);
    gl.uniform2f(u.uPreviousMouse ?? null, pointer.prevX, pointer.prevY);
    gl.uniform2f(u.uVelocity ?? null, pointer.vx, pointer.vy);
    gl.uniform1f(u.uTime ?? null, time);
    gl.uniform1f(u.uSpeed ?? null, pointer.speed);
    gl.uniform1f(u.uHover ?? null, pointer.hover);
    gl.uniform1f(u.uClick ?? null, settings.clickBurst ? pointer.click : 0);
    gl.uniform2f(u.uClickPos ?? null, pointer.clickX, pointer.clickY);
    gl.uniform1f(u.uClickStrength ?? null, pointer.clickStrength);
    gl.uniform2f(u.uResolution ?? null, this.width, this.height);
    gl.uniform1f(u.uPixelRatio ?? null, this.dpr);
    gl.uniform1f(u.uMotion ?? null, settings.motion);
    gl.uniform1f(u.uMaxPointSize ?? null, this.maxPointSize);
    gl.uniform1f(u.uGlow ?? null, settings.glow ? settings.glowAmount : 0);
    this.setAccents(program, settings);

    gl.drawArrays(gl.POINTS, 0, this.pool.capacity);

    // Slot 0 is shared with the fullscreen triangle; release the rest.
    for (const attribute of PARTICLE_ATTRIBUTES) {
      if (attribute.location !== 0) gl.disableVertexAttribArray(attribute.location);
    }
  }
}
