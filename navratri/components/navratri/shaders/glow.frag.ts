import { COMMON, FRAGMENT_PRECISION, glsl } from "./common.glsl";

/**
 * Everything that is "light" rather than "object", drawn additively over the
 * background: the light trail, the cursor's glow and hover halo, the click
 * waves and the warmth around the diya. All of it is analytic falloff — no
 * blur passes.
 */
export const glowFrag = glsl`
${FRAGMENT_PRECISION}

varying vec2 vUv;

uniform sampler2D uTrail;
uniform float uTrailOn;
uniform vec2 uResolution;   // CSS px
uniform float uTime;
uniform vec2 uMouse;        // CSS px, y down
uniform float uSpeed;
uniform float uHover;
uniform float uPresence;    // 0..1 — is the cursor on screen
uniform float uGlow;        // glow amount; 0 when glow is switched off
uniform vec3 uHalo;         // x: radius (CSS px), y: dash amount, z: strength
uniform vec4 uWaves[3];     // xy: centre, z: progress 0..1, w: strength (0 = unused)
uniform vec4 uDiya[2];      // per lamp — xy: flame centre, z: flame size (CSS px), w: intensity (0 = unused)

${COMMON}

// The trail cools as it fades: white-gold while fresh, then orange, then a
// pink and finally purple ember. Driven purely by how much energy is left.
vec3 trailRamp(float energy) {
  vec3 color = mix(PURPLE, PINK, smoothstep(0.03, 0.17, energy));
  color = mix(color, ORANGE, smoothstep(0.13, 0.38, energy));
  color = mix(color, GOLD, smoothstep(0.32, 0.66, energy));
  return mix(color, mix(GOLD, WHITE, 0.8), smoothstep(0.72, 1.0, energy));
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uResolution;
  vec3 color = vec3(0.0);

  // — Light trail —
  if (uTrailOn > 0.5) {
    vec2 trail = texture2D(uTrail, vUv).rg;
    float core = trail.r;
    float halo = trail.g;
    vec3 ramp = trailRamp(core);
    ramp = mix(ramp, mix(ORANGE, PINK, 0.6), uHover * 0.35 * (1.0 - core));
    color += ramp * pow(core, 1.3) * 1.15;
    vec3 haloColor = mix(mix(PINK, ORANGE, 0.6), GOLD, smoothstep(0.15, 0.7, halo));
    color += haloColor * halo * halo * 0.5 * uGlow;
  }

  // — Cursor: a small warm glow, and a halo while hovering —
  vec2 fromMouse = p - uMouse;
  float mouseDist = length(fromMouse);
  if (uPresence > 0.0) {
    float rush = clamp(uSpeed / 1800.0, 0.0, 1.0);
    float tight = exp(-mouseDist * mouseDist / (44.0 * 44.0));
    float wide = exp(-mouseDist / 150.0);
    vec3 cursorColor = mix(mix(GOLD, ORANGE, 0.3), mix(ORANGE, PINK, 0.45), uHover * 0.7);
    color += cursorColor * (tight * (0.085 + 0.06 * uHover + 0.05 * rush) + wide * 0.022)
           * uPresence * uGlow;

    if (uHalo.z > 0.001) {
      float ringDist = mouseDist - uHalo.x;
      float line = exp(-ringDist * ringDist / 1.3);
      float angle = atan(fromMouse.y, fromMouse.x);
      float dash = mix(1.0, smoothstep(-0.25, 0.25, sin(angle * 14.0 + uTime * 1.6)), uHalo.y);
      float bloom = exp(-ringDist * ringDist / 110.0) * 0.2 * uGlow;
      color += mix(GOLD, PINK, 0.42) * (line * dash * 0.7 + bloom) * uHalo.z * uPresence;
    }
  }

  // — Click: radial waves —
  for (int i = 0; i < 3; i++) {
    vec4 wave = uWaves[i];
    if (wave.w > 0.0) {
      float progress = wave.z;
      float eased = 1.0 - pow(1.0 - progress, 3.0);
      float waveRadius = WAVE_RADIUS * wave.w * eased;
      vec2 fromWave = p - wave.xy;
      float distanceFromWave = length(fromWave);
      float fade = (1.0 - progress) * (1.0 - progress);

      float front = distanceFromWave - waveRadius;
      float line = exp(-front * front / 2.2);
      float width = mix(8.0, 30.0, progress);
      float bloom = exp(-front * front / (width * width)) * 0.3 * uGlow;

      // A fainter inner ring and a circle of beads, lagging behind the front
      // like the echo of a struck stick — and a nod to the mandala.
      float echoDist = distanceFromWave - waveRadius * 0.62;
      float echo = exp(-echoDist * echoDist / 3.0) * 0.32;
      float angle = atan(fromWave.y, fromWave.x);
      float beadDist = distanceFromWave - waveRadius * 0.82;
      float beads = pow(0.5 + 0.5 * cos(angle * 16.0), 8.0)
                  * exp(-beadDist * beadDist / 7.0) * 0.6;

      float flash = exp(-distanceFromWave * distanceFromWave / (64.0 * 64.0))
                  * pow(1.0 - progress, 5.0) * 0.45;

      vec3 lineColor = mix(WHITE, GOLD, smoothstep(0.0, 0.4, progress));
      lineColor = mix(lineColor, PINK, smoothstep(0.5, 1.0, progress) * 0.6);
      color += (lineColor * (line + echo + beads)
              + mix(ORANGE, PINK, progress) * bloom
              + WHITE * flash * (0.5 + 0.5 * uGlow)) * fade;
    }
  }

  // — Diyas: each lamp warms the air around its flame —
  for (int i = 0; i < 2; i++) {
    vec4 diya = uDiya[i];
    if (diya.w > 0.0) {
      vec2 fromFlame = (p - diya.xy) / diya.z;
      fromFlame.y *= 0.85;
      float flameDist = length(fromFlame);
      // Past eight lamp-widths the light is below one 8-bit step: skip it.
      if (flameDist < 8.0) {
        // A second lamp flickers to its own rhythm rather than in step.
        float lamp = float(i);
        float flicker = 0.84 + 0.16 * noise(vec2(uTime * 4.6, 2.3 + 7.1 * lamp))
                      + 0.05 * sin(uTime * 13.0 + 2.0 * lamp);
        float inner = exp(-flameDist * flameDist * 1.6) * 0.34;
        float outer = exp(-flameDist * 0.75) * 0.10;
        color += (mix(ORANGE, GOLD, 0.55) * inner + mix(ORANGE, PINK, 0.12) * outer)
               * flicker * diya.w * (0.35 + 0.65 * min(uGlow, 1.5));
      }
    }
  }

  // Half an LSB of dither where there is light, so soft falloffs never band.
  float lit = step(0.0005, max(color.r, max(color.g, color.b)));
  color += (grain(gl_FragCoord.xy + fract(uTime) * 97.0) - 0.5) * (1.5 / 255.0) * lit;

  // Alpha is the light's own strength: an opaque canvas ignores it, and a
  // see-through one uses it to compose the light over the page behind.
  color = max(color, 0.0);
  gl_FragColor = vec4(color, max(color.r, max(color.g, color.b)));
}
`;
