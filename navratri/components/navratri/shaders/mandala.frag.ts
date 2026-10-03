import { COMMON, FRAGMENT_PRECISION, glsl } from "./common.glsl";

/**
 * The opaque background: a near-black field with a warm golden core, and a
 * mandala drawn in hairlines so faint it only shows when you look for it.
 * Nothing here is an image — the mandala is polar-coordinate maths.
 */
export const mandalaFrag = glsl`
${FRAGMENT_PRECISION}

varying vec2 vUv;

uniform vec2 uResolution;   // CSS px
uniform float uTime;
uniform vec2 uMouse;        // CSS px, y down
uniform float uPresence;
uniform vec2 uCenter;       // mandala centre, CSS px
uniform float uRadius;      // mandala radius, CSS px
uniform float uRotation;    // radians; integrated in JS so it can be frozen
uniform float uMandala;     // 0 = off, 1 = on
uniform float uBackdrop;    // 1 = paint the dark stage, 0 = see-through: ink only

${COMMON}

// A hairline: 1 on the curve d = 0, feathered over 'feather'.
float stroke(float d, float halfWidth, float feather) {
  return 1.0 - smoothstep(halfWidth, halfWidth + feather, abs(d));
}

float bead(vec2 p, float radius, float feather) {
  return 1.0 - smoothstep(radius, radius + feather, length(p));
}

// Fold the plane into one of n identical sectors around the +x axis, so one
// petal drawn there is repeated all the way round.
vec2 fold(float radius, float angle, float n) {
  float sector = TAU / n;
  float a = mod(angle + 0.5 * sector, sector) - 0.5 * sector;
  return vec2(cos(a), sin(a)) * radius;
}

// Signed distance to a lotus petal (a vesica: two arcs meeting in points)
// lying along x, centred on the origin.
float petal(vec2 p, float halfLength, float halfWidth) {
  float offset = 0.5 * (halfLength * halfLength / halfWidth - halfWidth);
  float arcRadius = offset + halfWidth;
  p = abs(p);
  return ((p.x - halfLength) * offset > p.y * halfLength)
    ? length(p - vec2(halfLength, 0.0))
    : length(p - vec2(0.0, -offset)) - arcRadius;
}

// p is normalised so the mandala's rim sits at |p| = 1.
//
// The design is five concentric bands. Each pixel only evaluates the band it
// is in (the ranges overlap by a hair so strokes on a boundary are whole),
// which keeps this to one atan and two or three folds per pixel instead of
// evaluating every motif everywhere.
float mandala(vec2 p, float css) {
  float r = length(p);
  float angle = atan(p.y, p.x);
  float w = css * 0.35;       // hairline half-width
  float f = css * 0.9;        // feather
  float m = 0.0;
  vec2 q;

  // Heart: an eight-petalled rosette inside a beaded ring.
  if (r < 0.19) {
    float a0 = angle + uRotation * 1.6;
    q = fold(r, a0, 8.0);
    m += stroke(petal(q - vec2(0.092, 0.0), 0.052, 0.022), w, f);
    m += bead(p, 0.010, f);
    m += stroke(r - 0.034, w, f);
    m += stroke(r - 0.150, w, f);
    q = fold(r, a0, 24.0);
    m += bead(q - vec2(0.166, 0.0), 0.0042, f);
    m += stroke(r - 0.182, w, f);
  }

  // First lotus: twelve petals, each with a smaller echo inside it.
  if (r > 0.176 && r < 0.392) {
    float a1 = angle - uRotation;
    q = fold(r, a1, 12.0);
    float lotus = stroke(petal(q - vec2(0.268, 0.0), 0.086, 0.052), w, f);
    lotus += stroke(petal(q - vec2(0.250, 0.0), 0.052, 0.026), w, f) * 0.7;
    m += lotus * step(0.182, r);
    q = fold(r, a1 + PI / 12.0, 12.0);
    m += bead(q - vec2(0.338, 0.0), 0.0048, f);
    m += stroke(r - 0.372, w, f);
    m += stroke(r - 0.384, w, f);
  }

  // Second lotus: twenty slim petals, each with a vein, then a dotted ring.
  if (r > 0.378 && r < 0.618) {
    float a2 = angle + uRotation * 0.7;
    q = fold(r, a2, 20.0);
    float slim = stroke(petal(q - vec2(0.474, 0.0), 0.090, 0.040), w, f);
    slim += stroke(q.y, w * 0.8, f) * step(0.415, q.x) * step(q.x, 0.520) * 0.6;
    m += slim * step(0.384, r);
    m += stroke(r - 0.578, w, f);
    q = fold(r, a2, 60.0);
    m += bead(q - vec2(0.594, 0.0), 0.0036, f);
    m += stroke(r - 0.610, w, f);
  }

  // Geometric band: a zig-zag between two rings, edged with scallops.
  // Dividing by the slope turns the radial offset into a true distance, so
  // the zig-zag keeps the same line weight as everything else.
  if (r > 0.612 && r < 0.724) {
    float a3 = angle - uRotation * 0.5;
    float teeth = 36.0;
    float height = 0.052;
    float zig = abs(fract(a3 * teeth / TAU) * 2.0 - 1.0);
    float slope = height * teeth / (PI * r);
    m += stroke((r - (0.622 + height * zig)) / sqrt(1.0 + slope * slope), w, f);
    m += stroke(r - 0.686, w, f);
    q = fold(r, a3, teeth);
    m += stroke(length(q - vec2(0.686, 0.0)) - 0.030, w, f) * step(0.686, r);
  }

  // Lace: a last ring of wide petals and beads, dissolving toward the rim.
  if (r > 0.712) {
    float a4 = angle + uRotation * 0.4;
    q = fold(r, a4, 16.0);
    m += stroke(petal(q - vec2(0.835, 0.0), 0.105, 0.085), w, f) * step(0.716, r) * 0.8;
    q = fold(r, a4 + PI / 16.0, 16.0);
    m += bead(q - vec2(0.800, 0.0), 0.0055, f);
    m += stroke(r - 0.955, w, f) * 0.6;
  }

  return min(m, 1.0);
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uResolution;
  float minSide = min(uResolution.x, uResolution.y);

  // Atmosphere: a warm golden glow at the centre, almost black at the edges.
  vec2 c = (p - uCenter) / minSide;
  float d = length(c * vec2(0.78, 1.0));
  float glow = exp(-d * d * 3.4);
  vec3 darkColor = vec3(0.010, 0.007, 0.011);
  vec3 warmColor = vec3(0.145, 0.078, 0.026);
  vec3 color = mix(darkColor, warmColor, glow);
  color += vec3(0.034, 0.013, 0.020) * exp(-d * d * 0.85);   // long plum falloff

  // Slow, uneven "air", so the glow is never a perfect digital gradient.
  float air = noise(c * 3.1 + vec2(uTime * 0.012, -uTime * 0.008));
  color *= 0.86 + 0.28 * air;
  color *= uBackdrop;

  // Mandala. Opacity stays within 0.025–0.07: it breathes very slowly, and
  // the cursor's light brings out the engraving nearest to it.
  if (uMandala > 0.0) {
    vec2 mp = (p - uCenter) / uRadius;
    float mr = length(mp);
    if (mr < 1.0) {
      float lines = mandala(mp, 1.0 / uRadius);
      vec2 toMouse = p - uMouse;
      float reveal = uPresence * exp(-dot(toMouse, toMouse) / (300.0 * 300.0));
      float breath = 0.9 + 0.1 * sin(uTime * 0.35);
      float opacity = mix(0.032, 0.07, reveal) * breath;
      vec3 ink = mix(GOLD, mix(ORANGE, PINK, 0.4), smoothstep(0.25, 1.0, mr));
      float rim = 1.0 - smoothstep(0.72, 1.0, mr);
      color += ink * lines * opacity * rim * uMandala;
    }
  }

  // Vignette, then triangular film grain to break up 8-bit banding.
  vec2 e = (vUv - 0.5) * vec2(1.0, 1.12);
  color *= 1.0 - 0.5 * smoothstep(0.38, 0.92, length(e));
  float t = fract(uTime * 3.1);
  float g = grain(gl_FragCoord.xy + t * 113.0) + grain(gl_FragCoord.xy * 1.37 + 71.0 + t * 59.0) - 1.0;
  color += g * 0.010 * uBackdrop;

  // The stage is opaque. Without it, alpha is the ink's own strength, so the
  // mandala composes (premultiplied) over whatever page lies behind.
  color = max(color, 0.0);
  gl_FragColor = vec4(color, mix(max(color.r, max(color.g, color.b)), 1.0, uBackdrop));
}
`;
