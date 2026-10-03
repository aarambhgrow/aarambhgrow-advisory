import type { GL } from "./gl-utils";

export const PARTICLE_TYPE = {
  dot: 0,
  spark: 1,
  diamond: 2,
  flower: 3,
  ring: 4,
} as const;

export type ParticleType = (typeof PARTICLE_TYPE)[keyof typeof PARTICLE_TYPE];

/**
 * Interleaved vertex layout, one vertex per particle (drawn as gl.POINTS).
 * `location` is the attribute slot shared with the vertex shader.
 */
export const PARTICLE_ATTRIBUTES = [
  { name: "aPosition", location: 0, size: 2 },
  { name: "aVelocity", location: 1, size: 2 },
  { name: "aSize", location: 2, size: 1 },
  { name: "aLife", location: 3, size: 2 },
  { name: "aRandom", location: 4, size: 4 },
  { name: "aRotation", location: 5, size: 1 },
  { name: "aType", location: 6, size: 1 },
] as const;

/** Floats per particle. */
export const STRIDE = PARTICLE_ATTRIBUTES.reduce((sum, a) => sum + a.size, 0);

const BYTES = Float32Array.BYTES_PER_ELEMENT;

/**
 * A fixed-size ring buffer of particle *births*. Spawning overwrites the
 * oldest slot; nothing is ever updated afterwards, because the vertex shader
 * derives each particle's whole life from the values written here.
 */
export class ParticlePool {
  readonly data: Float32Array;
  /** Time after which every particle in the pool is dead. */
  deadline = Number.NEGATIVE_INFINITY;

  private head = 0;
  private dirtyStart = 0;
  private dirtyCount = 0;

  constructor(readonly capacity: number) {
    this.data = new Float32Array(capacity * STRIDE);
    // Mark every slot as long dead. (A zeroed lifetime would divide by zero.)
    for (let i = 0; i < capacity; i++) {
      this.data[i * STRIDE + 5] = -1e4;
      this.data[i * STRIDE + 6] = 1;
    }
    this.dirtyCount = capacity;
  }

  spawn(
    x: number,
    y: number,
    vx: number,
    vy: number,
    size: number,
    birth: number,
    life: number,
    type: ParticleType,
    rotation: number,
  ): void {
    const d = this.data;
    const i = this.head * STRIDE;
    d[i] = x;
    d[i + 1] = y;
    d[i + 2] = vx;
    d[i + 3] = vy;
    d[i + 4] = size;
    d[i + 5] = birth;
    d[i + 6] = life;
    d[i + 7] = Math.random();
    d[i + 8] = Math.random();
    d[i + 9] = Math.random();
    d[i + 10] = Math.random();
    d[i + 11] = rotation;
    d[i + 12] = type;

    if (this.dirtyCount === 0) this.dirtyStart = this.head;
    if (this.dirtyCount < this.capacity) this.dirtyCount++;
    this.head = (this.head + 1) % this.capacity;
    if (birth + life > this.deadline) this.deadline = birth + life;
  }

  /** Send only the slots written since the last upload. Buffer must be bound. */
  upload(gl: GL): void {
    const count = this.dirtyCount;
    if (count === 0) return;
    this.dirtyCount = 0;

    if (count >= this.capacity) {
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.data);
      return;
    }
    const start = this.dirtyStart;
    const firstRun = Math.min(count, this.capacity - start);
    gl.bufferSubData(
      gl.ARRAY_BUFFER,
      start * STRIDE * BYTES,
      this.data.subarray(start * STRIDE, (start + firstRun) * STRIDE),
    );
    const wrapped = count - firstRun;
    if (wrapped > 0) {
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.data.subarray(0, wrapped * STRIDE));
    }
  }

  /** Force a full re-upload, e.g. after the GPU buffer was recreated. */
  markAllDirty(): void {
    this.dirtyCount = this.capacity;
  }

  /** Live particles at `time`. Only used by the debug overlay. */
  countAlive(time: number): number {
    if (time >= this.deadline) return 0;
    const d = this.data;
    let alive = 0;
    for (let i = 0; i < this.capacity; i++) {
      const age = time - d[i * STRIDE + 5];
      if (age >= 0 && age < d[i * STRIDE + 6]) alive++;
    }
    return alive;
  }
}
