import { COMMON, glsl } from "./common.glsl";

/**
 * Stateless GPU particles. JavaScript only writes a particle's *birth*
 * (position, velocity, timing, seeds); every frame this shader re-derives
 * where it is now, how big, how bright and what colour — so nothing is
 * uploaded for a particle after it spawns.
 */
export const particlesVert = glsl`
precision highp float;

attribute vec2 aPosition;   // spawn position, CSS px (y down)
attribute vec2 aVelocity;   // spawn velocity, CSS px / s
attribute float aSize;      // sprite diameter, CSS px
attribute vec2 aLife;       // x: birth time (s), y: lifetime (s)
attribute vec4 aRandom;     // four seeds in 0..1
attribute float aRotation;  // radians
attribute float aType;      // 0 dot · 1 spark · 2 diamond · 3 flower · 4 ring

uniform vec2 uMouse;
uniform vec2 uPreviousMouse;
uniform vec2 uVelocity;
uniform float uTime;
uniform float uSpeed;
uniform float uHover;
uniform float uClick;
uniform vec2 uClickPos;
uniform float uClickStrength;
uniform vec2 uResolution;
uniform float uPixelRatio;
uniform float uMotion;
uniform float uMaxPointSize;

varying vec3 vColor;
varying vec4 vShape;  // x: type, y: life 0..1, z: seed, w: sprite size (device px)
varying vec3 vSpin;   // x: cos, y: sin, z: alpha

${COMMON}

void main() {
  float age = uTime - aLife.x;
  float life = age / aLife.y;

  // Not born yet, or already gone: park it outside the clip volume.
  if (age < 0.0 || life >= 1.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    vColor = vec3(0.0);
    vShape = vec4(0.0);
    vSpin = vec3(1.0, 0.0, 0.0);
    return;
  }

  float isSpark = step(0.5, aType) * step(aType, 1.5);
  float isDiamond = step(1.5, aType) * step(aType, 2.5);
  float isFlower = step(2.5, aType) * step(aType, 3.5);
  float isRing = step(3.5, aType);

  // 1 · Thrown off the Dandiya, then slowed by drag (closed-form integral).
  float drag = mix(2.4, 4.8, aRandom.x);
  vec2 pos = aPosition + aVelocity * (1.0 - exp(-drag * age)) / drag;

  // 2 · Embers rise; petals sink and sway.
  float lift = mix(10.0, 30.0, aRandom.y);
  pos.y += mix(-lift, lift * 1.5, isFlower) * age * uMotion;
  pos.x += isFlower * sin(age * 2.6 + aRandom.z * TAU) * 7.0 * uMotion;

  // 3 · Carried by the flow field the light trail is advected through, so the
  //     powder and the ribbon curl the same way.
  float settle = 1.0 - exp(-age * 1.8);
  pos += flowAt(pos, uTime) * 24.0 * settle * (0.6 + age) * uMotion;

  // 4 · A little individual wander from value noise. Kept small: soft, not chaotic.
  float n = noise(pos * 0.012 + vec2(uTime * 0.25, aRandom.z * 40.0));
  float wander = n * TAU * 2.0 + aRandom.w * TAU;
  pos += vec2(sin(wander + uTime * 1.7), cos(wander + uTime * 1.3))
       * (1.5 + 3.5 * aRandom.x) * settle * uMotion;

  // 5 · Mouse influence: the cursor drags the air along its velocity and
  //     parts the field around itself, so older powder bends around its path.
  //     Distance is measured to the stretch travelled this frame
  //     (uPreviousMouse → uMouse), so a fast cursor cannot skip over anything.
  vec2 travel = uMouse - uPreviousMouse;
  float along = clamp(dot(pos - uPreviousMouse, travel) / max(dot(travel, travel), 0.0001), 0.0, 1.0);
  vec2 fromMouse = pos - (uPreviousMouse + travel * along);
  float mouseDist = length(fromMouse);
  float nearMouse = exp(-mouseDist * mouseDist / (120.0 * 120.0)) * smoothstep(0.15, 0.6, age);
  pos += uVelocity * 0.03 * nearMouse * uMotion;
  pos += (fromMouse / max(mouseDist, 1.0)) * nearMouse * min(8.0 + uSpeed * 0.012, 30.0) * uMotion;

  // 6 · Click: a radial wave that shoves and brightens whatever it passes.
  float wave = 0.0;
  if (uClick > 0.0) {
    float progress = 1.0 - uClick;
    float waveRadius = WAVE_RADIUS * uClickStrength * (1.0 - pow(1.0 - progress, 3.0));
    vec2 fromClick = pos - uClickPos;
    float distanceFromClick = length(fromClick);
    float width = 34.0;
    // A band around the wave front: soft ahead of it, longer behind.
    // (Written as 1 - smoothstep(a, b, x) because GLSL leaves smoothstep
    // undefined when its edges are given in descending order.)
    wave = (1.0 - smoothstep(waveRadius, waveRadius + width, distanceFromClick))
         * smoothstep(waveRadius - width * 2.5, waveRadius, distanceFromClick)
         * uClick;
    pos += (fromClick / max(distanceFromClick, 1.0)) * wave * 26.0;
  }

  // Size: ease in (no popping), ease out. Rings open up instead.
  float appear = smoothstep(0.0, 0.10, life);
  float sizeOverLife = appear * (1.0 - 0.5 * smoothstep(0.5, 1.0, life));
  sizeOverLife = mix(sizeOverLife, 0.3 + 0.7 * (1.0 - pow(1.0 - life, 3.0)), isRing);
  float size = aSize * sizeOverLife * (1.0 + 0.2 * uHover + 0.7 * wave) * uPixelRatio;
  // Sub-pixel sprites shimmer; hold them at 2px and fade them instead.
  float visible = clamp(size * 0.5, 0.0, 1.0);
  size = clamp(size, 2.0, uMaxPointSize);

  // Opacity: quick in, long soft out, with a twinkle for sparks and diamonds.
  float fadeIn = smoothstep(0.0, 0.07, life);
  float fadeOut = 1.0 - smoothstep(0.3, 1.0, life);
  fadeOut *= fadeOut;
  float twinkleDepth = mix(0.18, 0.55, max(isSpark, isDiamond));
  float twinkle = 1.0 - twinkleDepth
    * (0.5 + 0.5 * sin(uTime * mix(5.0, 13.0, aRandom.z) + aRandom.w * TAU));
  float alpha = fadeIn * fadeOut * twinkle * visible;
  alpha *= 1.0 + 0.35 * uHover + 1.2 * wave;
  // Rings stay delicate; oversized dots are dim, out-of-focus motes.
  alpha *= mix(1.0, 0.42, isRing);
  alpha *= mix(1.0, 0.16, (1.0 - step(0.5, aType)) * smoothstep(20.0, 30.0, aSize));

  // Colour follows the lifecycle: white-hot at birth, gold→orange in flight,
  // and roughly one in six cools into pink or purple as it dies.
  vec3 warm = mix(GOLD, ORANGE, aRandom.y);
  warm = mix(warm, mix(ORANGE, PINK, aRandom.y), isFlower * 0.7);
  float accent = step(0.82, aRandom.z);
  vec3 ember = mix(mix(warm, ORANGE, 0.65), mix(PINK, PURPLE, aRandom.w), accent);
  vec3 color = mix(mix(WHITE, GOLD, isFlower), warm, smoothstep(0.0, 0.22, life));
  color = mix(color, ember, smoothstep(0.42, 0.95, life));
  // Hover shifts gold toward warm orange and pink.
  color = mix(color, mix(ORANGE, PINK, 0.35 + 0.4 * aRandom.w), uHover * 0.5);

  float spin = (aRandom.x - 0.5) * mix(1.2, 5.0, isFlower);
  float angle = aRotation + spin * age * uMotion;

  vColor = color;
  vShape = vec4(aType, life, aRandom.z, size);
  vSpin = vec3(cos(angle), sin(angle), alpha);

  vec2 clip = pos / uResolution * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = size;
}
`;
