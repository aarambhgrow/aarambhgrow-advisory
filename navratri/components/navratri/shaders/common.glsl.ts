/**
 * Identity template tag. It exists so editors can highlight the GLSL inside
 * (e.g. the "glsl-literal" extension) and so chunks can be `${included}`.
 */
export function glsl(
  strings: TemplateStringsArray,
  ...values: Array<string | number>
): string {
  let source = strings[0];
  for (let i = 0; i < values.length; i++) {
    source += String(values[i]) + strings[i + 1];
  }
  return source;
}

/** Fragment shaders want highp for time-driven maths, where it exists. */
export const FRAGMENT_PRECISION = glsl`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`;

/**
 * Shared by every program: the palette, lightweight procedural noise and the
 * flow field that both the particles and the light trail are carried by.
 */
export const COMMON = glsl`
#define PI 3.141592653589793
#define TAU 6.283185307179586

// Navratri palette — keep in sync with PALETTE in config.ts
const vec3 GOLD   = vec3(0.961, 0.725, 0.259); // #F5B942
const vec3 ORANGE = vec3(1.000, 0.478, 0.094); // #FF7A18
const vec3 WHITE  = vec3(1.000, 0.969, 0.902); // #FFF7E6

// The two accents are uniforms so a host can re-tint them; they are fed from
// settings.accent / settings.accentDeep, which default to #FF3D81 and #A855F7.
// The explicit precision keeps the declaration identical in the vertex and
// fragment shaders that share this chunk.
uniform mediump vec3 uAccent;
uniform mediump vec3 uAccentDeep;
#define PINK uAccent
#define PURPLE uAccentDeep

// Furthest a click wave travels, in CSS px (scaled by the click's strength).
const float WAVE_RADIUS = 210.0;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// Value noise: four hashes and a smooth blend. Plenty for soft motion.
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Trig-free hash for per-pixel dither; stays well distributed at large inputs.
float grain(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// A divergence-free flow: two travelling vortex lattices, the second rotated
// 45 degrees so the swirls never line up into a visible grid. Being
// divergence-free is what makes it read as liquid rather than as jitter.
vec2 flowField(vec2 p, float t) {
  vec2 a = p + vec2(t * 0.31, -t * 0.19);
  vec2 v = vec2(-sin(a.x) * sin(a.y), -cos(a.x) * cos(a.y));
  vec2 b = vec2(p.x + p.y, p.x - p.y) * 1.31 + vec2(-t * 0.27, t * 0.37);
  vec2 w = vec2(-sin(b.x) * sin(b.y), -cos(b.x) * cos(b.y));
  return v + vec2(w.x + w.y, w.x - w.y) * 0.5;
}

// The same field, addressed in CSS pixels and seconds.
vec2 flowAt(vec2 px, float time) {
  return flowField(px * 0.006, time * 0.5);
}
`;
