import { COMMON, FRAGMENT_PRECISION, glsl } from "./common.glsl";

/**
 * Draws each point sprite as one of five mathematical shapes. No textures and
 * no font glyphs: every edge is a distance function, anti-aliased against the
 * sprite's real size in device pixels.
 */
export const particlesFrag = glsl`
${FRAGMENT_PRECISION}

varying vec3 vColor;
varying vec4 vShape;  // x: type, y: life 0..1, z: seed, w: sprite size (device px)
varying vec3 vSpin;   // x: cos, y: sin, z: alpha

uniform float uGlow;

${COMMON}

// Soft mathematical falloff — a neon-like halo with no blur pass.
float softGlow(float dist, float radius) {
  float glow = 1.0 - smoothstep(0.0, radius, dist);
  return glow * glow;
}

// Type 1 — a four-point star. The product |x|·|y| is zero along both axes,
// so its reciprocal gives four tapering arms with concave flanks.
float spark(vec2 p, float px) {
  vec2 a = abs(p);
  float sharpness = 0.010 + px * 0.045;   // arms never thinner than a pixel
  float arms = sharpness / (a.x * a.y + sharpness);
  float reach = 1.0 - smoothstep(0.0, 0.92, length(p));
  return arms * reach * reach;
}

// Type 2 — a diamond: a rotated square, slightly taller than wide.
float diamond(vec2 p, float px) {
  vec2 a = abs(p);
  float d = a.x * 1.2 + a.y * 0.84;
  float fill = 1.0 - smoothstep(0.46 - px * 1.2, 0.46 + px * 1.2, d);
  float facet = 1.0 - smoothstep(0.0, 0.46, d);
  return fill * (0.5 + 0.7 * facet * facet);
}

// Type 3 — a tiny Garba flower in polar coordinates. cos(angle · n) is 1
// along each petal and 0 between them; it shapes the silhouette's radius.
float flower(vec2 p, float petals, float px, out float heart) {
  float angle = atan(p.y, p.x);
  float radius = length(p);
  float lobe = 0.5 + 0.5 * cos(angle * petals);
  float edge = mix(0.20, 0.70, pow(lobe, 0.55));
  float fill = 1.0 - smoothstep(edge - px * 1.5, edge + px * 1.5, radius);
  // Petals brighten toward their tips, with a faint crease between them.
  float shade = mix(0.42, 1.0, smoothstep(0.08, 0.62, radius))
              * mix(0.55, 1.0, smoothstep(0.0, 0.35, lobe));
  heart = 1.0 - smoothstep(0.10 - px, 0.10 + px * 2.0, radius);
  return fill * shade * (1.0 - heart * 0.5);
}

// Type 4 — a thin ring; the vertex shader grows the sprite as it ages.
float ring(float radius, float px) {
  float d = abs(radius - 0.66);
  float halfWidth = max(0.016, px * 0.6);
  float line = 1.0 - smoothstep(halfWidth, halfWidth + px * 1.5, d);
  return line + exp(-d * d / 0.012) * 0.25;
}

void main() {
  float alpha = vSpin.z;
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float radius = length(p);
  // Sprites are discs: nothing is ever drawn into the corners of the quad.
  if (alpha <= 0.001 || radius >= 1.0) discard;

  vec2 q = vec2(vSpin.x * p.x + vSpin.y * p.y, vSpin.x * p.y - vSpin.y * p.x);
  float px = 2.0 / max(vShape.w, 1.0);   // one device pixel, in sprite units
  float type = vShape.x;

  float shape = 0.0;      // the crisp body, tinted by vColor
  float hot = 0.0;        // white-hot centre
  float halo = 0.0;       // how much soft glow surrounds it

  if (type < 0.5) {
    // Type 0 — soft dot
    shape = exp(-radius * radius * 18.0);
    hot = exp(-radius * radius * 60.0) * 0.8;
    halo = 0.38;
  } else if (type < 1.5) {
    shape = spark(q, px);
    hot = exp(-radius * radius * 90.0);
    halo = 0.22;
  } else if (type < 2.5) {
    shape = diamond(q, px);
    hot = exp(-radius * radius * 120.0) * 0.5;
    halo = 0.26;
  } else if (type < 3.5) {
    float heart;
    float petals = vShape.z < 0.5 ? 6.0 : (vShape.z < 0.8 ? 4.0 : 8.0);
    shape = flower(q, petals, px, heart);
    hot = heart;
    halo = 0.2;
  } else {
    shape = ring(radius, px);
  }

  float glow = softGlow(radius, 1.0) * halo * uGlow;
  vec3 color = vColor * (shape + glow) + WHITE * hot * 0.9;

  // Guarantee a clean fade to nothing before the sprite's rim.
  float rim = 1.0 - smoothstep(0.82, 1.0, radius);
  // Alpha follows the light, as in the glow pass, for see-through canvases.
  vec3 light = color * alpha * rim;
  gl_FragColor = vec4(light, max(light.r, max(light.g, light.b)));
}
`;
