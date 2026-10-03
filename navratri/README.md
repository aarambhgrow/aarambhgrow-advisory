# Navratri — Dandiya cursor

An interactive Navratri experiment: the cursor becomes a pair of Dandiya sticks
that paint with light. The sticks are crisp SVG; everything luminous around
them — the trail, the powder, the click waves, the mandala — is GLSL running in
a small raw-WebGL renderer (no Three.js).

```bash
npm install
npm run dev        # http://localhost:3000/navratri-demo
```

`npm run build && npm run start` serves the production build.
`npm run lint` and `npx tsc --noEmit` should both be clean.

## Trying it

| Do this                         | And you get                                              |
| ------------------------------- | -------------------------------------------------------- |
| Move                            | A light trail and powder; faster strokes are longer      |
| Stop                            | Powder thins after 1 s, stops after 2.5 s                |
| Hover a card or button          | A halo, warmer colours, sparks orbiting the ring         |
| Click                           | The sticks strike; a radial wave and a burst             |
| Sweep past the diya             | The flame bends in the draught                           |
| Press <kbd>D</kbd>              | Developer panel: toggles, sliders, quality               |

Any element can opt into a cursor behaviour with `data-cursor="move" | "hover" |
"click" | "button"`. Links, buttons and form controls default to `hover`.

In development the panel also has a **Debug stats** switch (FPS, particle
count, DPR, WebGL renderer). To have it on from the start, set `DEBUG = true`
in `components/navratri/config.ts`. It never renders in a production build.

## How it is put together

```
app/navratri-demo/page.tsx      route (server component)
components/navratri/
  NavratriDemo.tsx              page composition and settings state
  DandiyaCursor.tsx             SVG cursor: lean, strike, tassel swing
  DandiyaArt.tsx                the stick artwork
  NavratriWebGL.tsx             canvas lifecycle, adaptive quality, cleanup
  Diya.tsx                      lamp; tells the shader where its flame is
  CssTrail.tsx                  particle trail used when WebGL is unavailable
  DevPanel.tsx / DebugOverlay.tsx / StateReadout.tsx
  config.ts                     DEBUG, QUALITY tiers, palette, defaults
  runtime/
    ticker.ts                   the single requestAnimationFrame loop
    pointer.ts                  target → eased position, velocity, states
    quality.ts                  device tier + frame-time governor
    runtime.ts                  what React hands to the imperative side
  webgl/
    renderer.ts                 programs, buffers, passes
    emitter.ts                  when and where particles are born
    particle-pool.ts            ring buffer of particle births
  shaders/
    particles.vert / .frag      motion, size, colour; the five shapes
    trail.frag                  feedback buffer for the light trail
    glow.frag                   trail, halo, click waves, diya light
    mandala.frag                atmosphere and mandala
    common.glsl                 palette, noise, flow field
```

React renders the page once. Everything that changes per frame is driven by
`NavratriRuntime` from one ticker, so moving the mouse never re-renders a
component.

Each frame:

1. **Pointer** — raw events only record a target; the eased position, velocity
   and state are computed once per frame, so the shader always sees a smooth
   cursor.
2. **Light trail** — a half-float feedback buffer. The previous frame is
   advected along a divergence-free flow field, faded, and stamped with the
   stretch of path just travelled.
3. **Background** — near-black with a warm core, plus the mandala in hairlines
   at 2.5–7 % opacity. Each pixel evaluates only its own radial band.
4. **Glow** — additive: the trail, cursor glow, hover halo, click waves and the
   diya's light, all analytic falloff with no blur passes.
5. **Particles** — up to 800 point sprites, stateless: JavaScript writes a
   particle's birth once and the vertex shader derives the rest of its life.

## Performance and fallbacks

- Quality starts from a device guess (800 / 400 / 180 particles) and a
  governor lowers it if the frame rate cannot be held: device-pixel-ratio
  first, then the particle budget. DPR never exceeds 2.
- Passes are skipped when they have nothing to draw, and an idle scene renders
  at half rate.
- **Touch devices** get no custom cursor: a Dandiya sways in the hero, the
  background slows, a sparse field of motes drifts, and a tap still blooms.
- **`prefers-reduced-motion`** renders one still frame; the Dandiya follows the
  pointer directly with no easing, lean, trail or burst.
- **No WebGL** (or a shader that fails to compile) falls back to the SVG cursor
  with a small CSS particle trail over a CSS background.
- Unmounting cancels the frame loop, removes listeners, deletes every GL
  object and releases the context.

## Tuning

Most of the look lives in a few places:

- `webgl/emitter.ts` — particle mix, sizes, lifetimes, density per pixel.
- `webgl/renderer.ts` (`updateTrail`) — trail length, brush width, flow speed.
- `shaders/glow.frag.ts` (`trailRamp`) — how the trail cools through the palette.
- `shaders/mandala.frag.ts` — the mandala's five bands and its opacity.
- `DandiyaCursor.tsx` — lean angle, strike spring, tassel pendulums.
