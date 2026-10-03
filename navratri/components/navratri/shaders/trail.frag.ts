import { COMMON, FRAGMENT_PRECISION, glsl } from "./common.glsl";

/**
 * The light trail is a feedback buffer — the "light painting" part.
 * Every frame the previous frame is (1) carried a little way along the flow
 * field, (2) dimmed, and (3) stamped with the newest stretch of the cursor's
 * path. Two channels are kept: R is the thin bright core, G a wide soft halo.
 */
export const trailFrag = glsl`
${FRAGMENT_PRECISION}

varying vec2 vUv;

uniform sampler2D uPrevious;
uniform vec2 uResolution;      // CSS px
uniform vec2 uMouse;           // CSS px, y down
uniform vec2 uPreviousMouse;
uniform float uTime;
uniform float uDeltaTime;
uniform vec2 uDecay;           // per-frame multiplier  (core, halo)
uniform vec2 uDeposit;         // brightness to stamp   (core, halo)
uniform vec2 uBrush;           // brush radius, CSS px  (core, halo)
uniform float uFlow;           // advection speed, CSS px / s
uniform float uFloor;          // extra fade for 8-bit buffers

${COMMON}

float segmentDistance(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.0001), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uResolution;

  // 1 · Advect: look upstream to find the light that has flowed to here.
  vec2 flow = flowAt(p, uTime) * uFlow;
  flow.y -= uFlow * 0.4;                       // light drifts gently upward
  vec2 source = p - flow * uDeltaTime;
  vec2 sourceUv = vec2(source.x, uResolution.y - source.y) / uResolution;

  // 2 · Fade. 8-bit targets also subtract a hair, or rounding would leave a
  //     ghost of the trail that never quite reaches black.
  vec2 trail = max(texture2D(uPrevious, sourceUv).rg * uDecay - uFloor, 0.0);

  // 3 · Stamp the path travelled since last frame as a soft capsule. max()
  //     rather than add: overlapping stamps must not bead at the joints.
  //     The brush reaches exactly zero at 1.6 radii — a Gaussian's long skirt
  //     would leave a wide haze behind once the bright core has faded.
  float d = segmentDistance(p, uPreviousMouse, uMouse);
  vec2 q = d / uBrush;
  vec2 brush = clamp(1.0 - q * q / 2.56, 0.0, 1.0);
  trail = max(trail, brush * brush * uDeposit);

  gl_FragColor = vec4(trail, 0.0, 1.0);
}
`;
