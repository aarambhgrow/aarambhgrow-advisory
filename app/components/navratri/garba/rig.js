import { ARTWORK } from './artwork';

/* =========================================================================================
   Garba loop
   The paths in artwork.js are the untouched outlines from the Illustrator file. Nothing is redrawn:
   a small skeleton (shoulders, elbows, wrists, hips, knees, ankles, neck, plus soft chains
   for skirt / hair / turban tails) moves each path's own control points around real joints.
     data-bone="x"  -> the whole path rides one bone (a matrix transform)
     data-skin="x"  -> the path spans joints, so its points are re-posed every frame
   This is the script of the standalone animation (index.html), line for line. Only the STAGE
   section at the bottom differs: it draws into the <svg> it is handed and can be stopped.
   ========================================================================================= */

/* Fills `stage` (an empty <svg>) with the artwork and dances it; `still` holds the opening pose
   instead. Returns a function that stops the loop.                                            */
export function startGarba(stage, still) {
  stage.innerHTML = ARTWORK;

  const LOOP = 3.0;                         // seconds for one full phrase (4 counts)
  const RAD = Math.PI / 180, DEG = 180 / Math.PI;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const wrap = a => a - 2 * Math.PI * Math.round(a / (2 * Math.PI));
  const smooth = t => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

  /* ---------- affine matrices [a b c d e f]:  x' = ax + cy + e,  y' = bx + dy + f ---------- */
  const IDENT = [1, 0, 0, 1, 0, 0];
  const mul = (m, n) => [
    m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1],
    m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
    m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]];

  /* ======================================= SKELETON ======================================= */
  /* Every bone is described in the artwork's own coordinates: pivot (the joint it turns on)
     and tip. A bone's matrix maps rest-pose coordinates to posed coordinates, so at rest every
     matrix is the identity and the drawing is exactly the original illustration.            */
  const bones = [], B = {};
  function bone(name, parent, px, py, tx, ty, o = {}) {
    const len = Math.hypot(tx - px, ty - py);
    const b = {
      name, parent: parent ? B[parent] : null, kids: [], px, py, tx, ty, len,
      ux: (tx - px) / len, uy: (ty - py) / len, ang: Math.atan2(ty - py, tx - px),
      seg: o.seg || [px, py, tx, ty],               // segment used for "which bone is nearest"
      rot: 0, dx: 0, dy: 0, sx: 1, sy: 1,           // pose: degrees, offset, stretch along / across
      wr: 0, M: IDENT, jig: o.jig || null, radial: o.radial || null,
    };
    // The joint's blend zone: a half-plane through the pivot, facing down the limb.
    let jx = b.ux, jy = b.uy;
    if (o.axis) { const l = Math.hypot(o.axis[0], o.axis[1]); jx = o.axis[0] / l; jy = o.axis[1] / l; }
    else if (b.parent) {
      const qx = px - b.parent.px, qy = py - b.parent.py, q = Math.hypot(qx, qy);
      if (q > 4) { const sx = jx + qx / q, sy = jy + qy / q, s = Math.hypot(sx, sy); if (s > 0.2) { jx = sx / s; jy = sy / s; } }
    }
    b.jx = jx; b.jy = jy;
    b.jr = (o.r || 12) * Math.max(0.3, Math.abs(jx * b.ux + jy * b.uy));   // keeps the zone ±r along the limb even on folded joints
    if (b.jig) { const w = 2 * Math.PI * b.jig.f; b.jig.k = w * w; b.jig.c = 2 * b.jig.z * w; }
    if (b.parent) b.parent.kids.push(b);
    bones.push(b); B[name] = b;
  }

  // soft-body presets: f = natural frequency (Hz), z = damping, max = swing limit (deg), st = stretch limit
  const cloth = (f, z, max, st = 0, gain = 1) => ({ f, z, max, st, gain });

  /* ---- woman ---- */
  bone('w.root', null, 162, 262, 162, 232);
  bone('w.torso', 'w.root', 165, 254, 188, 198, { r: 16 });
  bone('w.head', 'w.torso', 190, 192, 188, 155, { r: 8 });
  bone('w.hair1', 'w.head', 207, 203, 226, 226, { r: 12, jig: cloth(2.1, 0.42, 14) });
  bone('w.hair2', 'w.hair1', 226, 226, 246, 251, { r: 10, jig: cloth(1.9, 0.36, 18) });
  bone('w.hair3', 'w.hair2', 246, 251, 262, 275, { r: 6, jig: cloth(1.8, 0.36, 24, 0, 0.8) });
  bone('w.armR.upper', 'w.torso', 193, 206, 146, 166, { r: 12 });          // raised arm
  bone('w.armR.fore', 'w.armR.upper', 146, 166, 124, 110, { r: 15 });
  bone('w.handR', 'w.armR.fore', 124, 110, 122, 95);
  bone('w.armL.upper', 'w.torso', 170, 199, 109, 219, { r: 12 });          // far arm (behind the head)
  bone('w.armL.fore', 'w.armL.upper', 109, 219, 155, 153, { r: 12 });
  bone('w.handL', 'w.armL.fore', 155, 153, 150, 150);
  bone('w.skirt1', 'w.root', 150, 262, 150, 325, { axis: [0, 1], r: 22, jig: cloth(0.95, 0.45, 9, 0.045, 1.7) });
  bone('w.skirt2', 'w.skirt1', 150, 325, 156, 395, { axis: [0, 1], r: 34, jig: cloth(0.8, 0.40, 11, 0.045, 1.4) });
  bone('w.sash1', 'w.root', 173, 259, 197, 266, { r: 8, jig: cloth(2.3, 0.35, 16) });
  bone('w.sash2', 'w.sash1', 197, 266, 221, 272, { r: 10, jig: cloth(2.0, 0.30, 22) });
  bone('w.thighF', 'w.root', 172, 266, 206, 332);                          // front (inner) leg
  bone('w.shinF', 'w.thighF', 206, 332, 181, 404);
  bone('w.footF', 'w.shinF', 181, 404, 203, 415, { r: 6 });
  bone('w.thighB', 'w.root', 150, 264, 86, 292);                           // back (outer) leg
  bone('w.shinB', 'w.thighB', 86, 292, 145, 350);
  bone('w.footB', 'w.shinB', 145, 350, 137, 381, { r: 5 });

  /* ---- man ---- */
  bone('m.root', null, 358, 264, 358, 234, { seg: [345, 262, 380, 262] });
  bone('m.torso', 'm.root', 352, 250, 324, 198, { r: 16 });
  bone('m.head', 'm.torso', 318, 195, 303, 160, { r: 8 });
  bone('m.tailA1', 'm.head', 289, 158, 268, 156, { r: 8, jig: cloth(2.3, 0.38, 16) });
  bone('m.tailA2', 'm.tailA1', 268, 156, 251, 170, { r: 8, jig: cloth(2.0, 0.38, 22, 0, 0.8) });
  bone('m.tailB1', 'm.head', 288, 167, 272, 181, { r: 8, jig: cloth(2.1, 0.38, 16) });
  bone('m.tailB2', 'm.tailB1', 272, 181, 276, 199, { r: 8, jig: cloth(1.8, 0.38, 22, 0, 0.8) });
  bone('m.armR.upper', 'm.torso', 336, 193, 359, 142, { r: 14 });          // raised arm
  bone('m.armR.fore', 'm.armR.upper', 359, 142, 357, 95, { r: 14 });
  bone('m.handR', 'm.armR.fore', 356, 91, 349, 70, { r: 5 });
  bone('m.armL.upper', 'm.torso', 320, 205, 276, 250, { r: 12 });          // bent arm
  bone('m.armL.fore', 'm.armL.upper', 276, 250, 330, 251, { r: 12 });
  bone('m.handL', 'm.armL.fore', 337, 248, 350, 243);
  bone('m.skirt1', 'm.root', 352, 262, 386, 300, { radial: [14, 62], jig: cloth(1.2, 0.40, 8, 0.04, 1.2) });
  bone('m.skirt2', 'm.skirt1', 352, 262, 402, 320, { radial: [56, 104], jig: cloth(1.0, 0.36, 9) });
  bone('m.thighL', 'm.root', 347, 268, 301, 348, { r: 14 });               // standing (inner) leg
  bone('m.shinL', 'm.thighL', 301, 348, 333, 402, { r: 14 });
  bone('m.footL', 'm.shinL', 333, 402, 296, 414, { r: 6 });
  bone('m.thighR', 'm.root', 378, 262, 438, 282, { r: 14 });               // lifted (outer) leg
  bone('m.shinR', 'm.thighR', 438, 282, 383, 345, { r: 14 });
  bone('m.footR', 'm.shinR', 383, 345, 385, 385, { r: 6 });

  /* How the merged outlines are split between bones. `seg` picks ranges of a path's original
     segments (several limbs live in one outline in the .ai file); `near` binds each point to its
     closest bone and blends across that joint; `walk` blends down a cloth / hair chain.       */
  const near = (...c) => ({ near: c }), walk = (...c) => ({ walk: c });
  const SKIN = {
    'm.armR': [near('m.armR.upper', 'm.armR.fore', 'm.handR')],
    'm.sleeveR': [near('m.torso', 'm.armR.upper', 'm.armR.fore')],
    'm.armL': [near('m.armL.upper', 'm.armL.fore')],
    'm.skirt': [walk('m.root', 'm.skirt1', 'm.skirt2')],
    'm.waist': [walk('m.root', 'm.torso')],
    'm.legL': [near('m.thighL', 'm.shinL')],
    'm.legR': [near('m.thighR', 'm.shinR')],
    'm.turban': [near('m.head', 'm.tailA1', 'm.tailA2', 'm.tailB1', 'm.tailB2')],
    'm.trousers': [
      { seg: [3, 5], walk: ['m.root', 'm.torso'] },
      { seg: [6, 21], near: ['m.root', 'm.thighL', 'm.shinL', 'm.footL'] },
      { near: ['m.root', 'm.thighR', 'm.shinR', 'm.footR'] }],
    'm.kurta': [
      { seg: [0, 0], near: ['m.torso', 'm.armL.upper', 'm.armL.fore'] },     // bent sleeve, outer edge
      { seg: [1, 3], near: ['m.armL.upper', 'm.armL.fore'] },                // forearm + cuff end
      { seg: [4, 4], near: ['m.torso', 'm.armL.upper', 'm.armL.fore'] },     // inner edge up to the armpit
      { seg: [5, 5], near: ['m.root', 'm.torso', 'm.armL.upper'] },          // chest, left side
      { seg: [6, 9], walk: ['m.root', 'm.skirt1', 'm.skirt2'] },             // flared skirt
      { seg: [10, 10], near: ['m.root', 'm.torso', 'm.armR.upper'] },        // chest, right side
      { seg: [11, 13], near: ['m.torso', 'm.armR.upper', 'm.armR.fore'] },   // raised sleeve
      { walk: ['m.torso'] }],
    'w.armR': [near('w.armR.upper', 'w.armR.fore')],
    'w.armL': [near('w.armL.upper', 'w.armL.fore')],
    'w.hair': [walk('w.head', 'w.hair1', 'w.hair2')],
    'w.tail': [walk('w.hair2', 'w.hair3')],
    'w.drape': [walk('w.root', 'w.torso')],
    'w.skirt': [walk('w.root', 'w.skirt1', 'w.skirt2')],
    'w.sash': [walk('w.root', 'w.sash1', 'w.sash2')],
    'w.body': [
      { seg: [3, 7], walk: ['w.root', 'w.torso'] },                          // torso and midriff
      { seg: [13, 18], near: ['w.shinF', 'w.footF'] },                       // front shin + foot, from the hem down
      { seg: [30, 36], near: ['w.shinB', 'w.footB'] },                       // back foot
      { walk: ['w.root', 'w.skirt1', 'w.skirt2'] }],                         // everything hidden by the skirt
  };

  /* ---------- bone maths ---------- */
  // A bone's own motion at strength w (0..1). Blending a joint = applying a fraction of the turn,
  // which keeps limbs the same thickness as they bend (no pinching at elbows and knees).
  function local(b, w) {
    const th = b.rot * w * RAD, c = Math.cos(th), s = Math.sin(th);
    let a = c, bb = s, cc = -s, d = c;
    if (b.sx !== 1 || b.sy !== 1) {
      const k1 = 1 + (b.sx - 1) * w, k2 = 1 + (b.sy - 1) * w, ux = b.ux, uy = b.uy;
      const a11 = ux * ux * k1 + uy * uy * k2, a12 = ux * uy * (k1 - k2), a22 = uy * uy * k1 + ux * ux * k2;
      a = c * a11 - s * a12; bb = s * a11 + c * a12; cc = c * a12 - s * a22; d = s * a12 + c * a22;
    }
    return [a, bb, cc, d, b.px - a * b.px - cc * b.py + b.dx * w, b.py - bb * b.px - d * b.py + b.dy * w];
  }
  const matFor = (b, w) => (w >= 1 ? b.M : w <= 0 ? b.parent.M : mul(b.parent.M, local(b, w)));

  function jointWeight(b, x, y) {
    if (b.radial) return smooth((Math.hypot(x - b.px, y - b.py) - b.radial[0]) / (b.radial[1] - b.radial[0]));
    return smooth(((x - b.px) * b.jx + (y - b.py) * b.jy) / b.jr * 0.5 + 0.5);
  }
  function segDist(s, x, y) {
    const vx = s[2] - s[0], vy = s[3] - s[1];
    const t = clamp(((x - s[0]) * vx + (y - s[1]) * vy) / (vx * vx + vy * vy), 0, 1);
    return Math.hypot(x - s[0] - vx * t, y - s[1] - vy * t);
  }
  function bind(rule, x, y) {                      // -> [bone, weight towards that bone (rest goes to its parent)]
    if (rule.walk) {
      let cur = B[rule.walk[0]], w = 1;
      for (let k = 1; k < rule.walk.length; k++) {
        const b = B[rule.walk[k]], wk = jointWeight(b, x, y);
        if (wk <= 0) break;
        cur = b; w = wk;
        if (wk < 1) break;
      }
      return [cur, w];
    }
    const set = rule.near.map(n => B[n]);
    let best = set[0], bd = Infinity;
    for (const b of set) { const d = segDist(b.seg, x, y); if (d < bd) { bd = d; best = b; } }
    if (set.includes(best.parent)) { const w = jointWeight(best, x, y); if (w < 1) return [best, w]; }
    let kid = null, kw = 0;
    for (const k of best.kids) if (set.includes(k)) { const w = jointWeight(k, x, y); if (w > kw) { kw = w; kid = k; } }
    return kid ? [kid, kw] : [best, 1];
  }

  /* ====================================== PATH BINDING ===================================== */
  const MAX_SEG = 8;                                // subdivide so curves bend smoothly through joints

  function parsePath(d) {                           // -> [{pts:[[p0,c1,c2,p3,segIndex]...], closed}]
    const tok = d.match(/[MLCZ]|-?[\d.]+(?:e-?\d+)?/g), subs = [];
    let i = 0, cur = null, start = null, sub = null, si = 0;
    const num = () => parseFloat(tok[i++]);
    while (i < tok.length) {
      const t = tok[i++];
      if (t === 'M') { cur = start = [num(), num()]; sub = { segs: [], closed: false }; subs.push(sub); }
      else if (t === 'L') { const p = [num(), num()]; sub.segs.push([cur, lerp2(cur, p, 1 / 3), lerp2(cur, p, 2 / 3), p, si++]); cur = p; }
      else if (t === 'C') { const c1 = [num(), num()], c2 = [num(), num()], p = [num(), num()]; sub.segs.push([cur, c1, c2, p, si++]); cur = p; }
      else if (t === 'Z') {
        if (Math.hypot(cur[0] - start[0], cur[1] - start[1]) > 0.01) sub.segs.push([cur, lerp2(cur, start, 1 / 3), lerp2(cur, start, 2 / 3), start, si++]);
        sub.closed = true; cur = start;
      }
    }
    return subs.filter(s => s.segs.length);
  }
  const lerp2 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  function splitCubic(s, t) {
    const [p0, p1, p2, p3] = s, a = lerp2(p0, p1, t), b = lerp2(p1, p2, t), c = lerp2(p2, p3, t);
    const d = lerp2(a, b, t), e = lerp2(b, c, t), f = lerp2(d, e, t);
    return [[p0, a, d, f, s[4]], [f, e, c, p3, s[4]]];
  }
  function subdivide(segs) {
    const out = [];
    for (let s of segs) {
      const len = Math.hypot(s[1][0] - s[0][0], s[1][1] - s[0][1]) + Math.hypot(s[2][0] - s[1][0], s[2][1] - s[1][1]) + Math.hypot(s[3][0] - s[2][0], s[3][1] - s[2][1]);
      for (let n = Math.ceil(len / MAX_SEG); n > 1; n--) { const [a, b] = splitCubic(s, 1 / n); out.push(a); s = b; }
      out.push(s);
    }
    return out;
  }

  const rigid = [], skinned = [];
  function bindArtwork(root) {
    root.querySelectorAll('[data-bone]').forEach(el => rigid.push({ el, bone: B[el.dataset.bone] }));
    root.querySelectorAll('[data-skin]').forEach(el => {
      const rules = SKIN[el.dataset.skin];
      const subs = parsePath(el.getAttribute('d')).map(sub => {
        const segs = subdivide(sub.segs), n = segs.length;
        // anchors: one per segment start (+ the final point of an open path). Handles ride their anchor.
        const A = segs.map(s => ({ p: s[0], seg: s[4] }));
        if (!sub.closed) A.push({ p: segs[n - 1][3], seg: segs[n - 1][4] });
        const m = A.length;
        const o = { n, m, closed: sub.closed, x: new Float32Array(m), y: new Float32Array(m), b: new Array(m), w: new Float32Array(m),
                    c1: new Float32Array(n * 2), c2: new Float32Array(n * 2) };
        A.forEach((a, k) => {
          const rule = rules.find(r => !r.seg || (a.seg >= r.seg[0] && a.seg <= r.seg[1]));
          const [b, w] = bind(rule, a.p[0], a.p[1]);
          o.x[k] = a.p[0]; o.y[k] = a.p[1]; o.b[k] = b; o.w[k] = w;
        });
        segs.forEach((s, k) => { o.c1[k * 2] = s[1][0]; o.c1[k * 2 + 1] = s[1][1]; o.c2[k * 2] = s[2][0]; o.c2[k * 2 + 1] = s[2][1]; });
        return o;
      });
      skinned.push({ el, subs });
    });
  }

  const r2 = v => Math.round(v * 100) / 100;
  function draw() {
    for (const { el, bone } of rigid) {
      const m = bone.M;
      el.setAttribute('transform', `matrix(${m[0].toFixed(5)} ${m[1].toFixed(5)} ${m[2].toFixed(5)} ${m[3].toFixed(5)} ${r2(m[4])} ${r2(m[5])})`);
    }
    for (const { el, subs } of skinned) {
      let d = '';
      for (const s of subs) {
        const { n, m, x, y, b, w, c1, c2 } = s;
        let M = matFor(b[0], w[0]);
        d += 'M' + r2(M[0] * x[0] + M[2] * y[0] + M[4]) + ' ' + r2(M[1] * x[0] + M[3] * y[0] + M[5]);
        for (let k = 0; k < n; k++) {
          const j = k + 1 < m ? k + 1 : 0, N = matFor(b[j], w[j]);
          const ax = c1[k * 2], ay = c1[k * 2 + 1], bx = c2[k * 2], by = c2[k * 2 + 1];
          d += 'C' + r2(M[0] * ax + M[2] * ay + M[4]) + ' ' + r2(M[1] * ax + M[3] * ay + M[5]) + ' '
                   + r2(N[0] * bx + N[2] * by + N[4]) + ' ' + r2(N[1] * bx + N[3] * by + N[5]) + ' '
                   + r2(N[0] * x[j] + N[2] * y[j] + N[4]) + ' ' + r2(N[1] * x[j] + N[3] * y[j] + N[5]);
          M = N;
        }
        if (s.closed) d += 'Z';
      }
      el.setAttribute('d', d);
    }
  }

  /* ======================================= ANIMATION ====================================== */
  /* A looping track through keys [phase 0..1, value, flag]. Curves ease in and out of every
     extreme and glide through in-between keys; nothing moves linearly.
     flag 'hit' = accelerate into the key and rebound out of it (stick strikes, foot plants). */
  function track(keys) {
    keys = keys.slice().sort((a, b) => a[0] - b[0]);
    const n = keys.length, U = keys.map(k => k[0]), V = keys.map(k => k[1]);
    const h = [], dl = [], mi = [], mo = [];
    for (let i = 0; i < n; i++) { const j = (i + 1) % n; h[i] = U[j] - U[i] + (j === 0 ? 1 : 0); dl[i] = (V[j] - V[i]) / h[i]; }
    for (let i = 0; i < n; i++) {
      const p = (i + n - 1) % n, d0 = dl[p], d1 = dl[i];
      let m = 0;
      if (d0 * d1 > 0) { const w1 = 2 * h[i] + h[p], w2 = h[i] + 2 * h[p]; m = (w1 + w2) / (w1 / d0 + w2 / d1); }
      mi[i] = mo[i] = m;
      if (keys[i][2] === 'hit') { mi[i] = 2 * d0; mo[i] = 2 * d1; }
    }
    return u => {
      u -= Math.floor(u);
      let i = n - 1;
      if (u >= U[0]) { i = 0; while (i + 1 < n && U[i + 1] <= u) i++; } else u += 1;
      const j = (i + 1) % n, t = (u - U[i]) / h[i], t2 = t * t, t3 = t2 * t;
      return (2 * t3 - 3 * t2 + 1) * V[i] + (t3 - 2 * t2 + t) * h[i] * mo[i] + (-2 * t3 + 3 * t2) * V[j] + (t3 - t2) * h[i] * mi[j];
    };
  }

  /* The phrase, in four counts (phase 0, .25, .5, .75):
       1  STRIKE  step in on the inner foot, lean together, sticks meet high between the two
       2  OPEN    rebound and rock back: the outer toe plants, weight shifts away, arms swing wide
       3  STRIKE  step in again, a lower and closer strike
       4  KICK    rock back with the outer leg kicked up, arms wound back, hop in -> count 1
     Angles are degrees away from the original illustrated pose, clockwise positive.
     The strike angles were solved so the two raised sticks genuinely cross at the contact point. */
  const HIT = 'hit';
  const STRIKE = { A: { w: [11.4, 46.6, 3.2], m: [-18.2, -6.3, -0.9] }, B: { w: [3.6, 42.4, 27], m: [-9.1, -13.2, -7] } };   // raised arm [shoulder, elbow, wrist]
  const SA = STRIKE.A, SB = STRIKE.B;
  const W = {
    x: track([[0, 3], [.26, -11], [.5, 3.5], [.76, -10]]),
    y: track([[0, 4, HIT], [.12, -3], [.25, 4], [.37, -4], [.5, 6, HIT], [.62, -3], [.75, 3], [.875, -5]]),
    lean: track([[0, 2], [.26, -3], [.5, 3], [.76, -2]]),
    torso: track([[.01, 5, HIT], [.07, 3.5], [.27, -5], [.5, 7, HIT], [.57, 5], [.77, -6]]),
    head: track([[.03, 3], [.1, 1], [.3, -5], [.53, 4], [.6, 2], [.8, -6]]),
    // raised arm: shoulder / elbow / wrist. The wrist trails on the way in and snaps through at the strike.
    rS: track([[0, SA.w[0], HIT], [.05, SA.w[0] - 4], [.26, -7], [.42, -3], [.5, SB.w[0], HIT], [.55, SB.w[0] - 3], [.77, -9], [.92, -2]]),
    rE: track([[0, SA.w[1], HIT], [.05, SA.w[1] - 12], [.27, -8], [.42, 24], [.5, SB.w[1], HIT], [.55, SB.w[1] - 12], [.78, -12], [.92, 18]]),
    rW: track([[0, SA.w[2], HIT], [.05, SA.w[2] - 14], [.29, -8], [.43, SB.w[2] - 24], [.5, SB.w[2], HIT], [.55, SB.w[2] - 14], [.8, -12], [.93, SA.w[2] - 24]]),
    // far arm counter-swings
    lS: track([[.02, 6], [.27, -6], [.52, 7], [.78, -7]]),
    lE: track([[.02, 10], [.28, -10], [.52, 12], [.79, -12]]),
    lW: track([[.04, 10], [.3, -10], [.54, 10], [.81, -10]]),
    // front (inner) foot: planted on the strikes, unweights and re-steps in between, hops into count 1
    fx: track([[0, 8], [.13, 8], [.27, -3], [.36, -3], [.5, 9], [.7, 9], [.84, 2], [.95, 8]]),
    fy: track([[0, 0], [.13, 0], [.2, -5], [.27, 0, HIT], [.36, 0], [.43, -6], [.5, 0, HIT], [.7, 0], [.83, -9], [.95, 0, HIT]]),
    fr: track([[0, 0], [.13, 0], [.2, 10], [.27, 0], [.36, 0], [.42, 14], [.49, -4], [.52, 0], [.7, 0], [.8, 16], [.92, -6], [.97, 0]]),
    // back (outer) foot: toe-plant behind on count 2, passes through on 3, kicks up on 4
    bx: track([[0, 0], [.24, -12], [.38, -12], [.5, -6], [.78, 4]]),
    by: track([[0, -3], [.24, 35, HIT], [.38, 35], [.5, 13], [.78, -10]]),
    br: track([[0, 0], [.24, 4], [.38, 4], [.52, -8], [.78, 8]]),
  };
  const M = {                                         // he leads her by a hair, so the two never move as one rigid block
    x: track([[.99, -4], [.25, 11], [.49, -4.5], [.75, 10]]),
    y: track([[.99, 4, HIT], [.11, -3], [.24, 4.5], [.36, -4], [.49, 6, HIT], [.61, -3], [.74, 3], [.865, -6]]),
    lean: track([[0, -2], [.25, 3], [.5, -3], [.75, 2]]),
    torso: track([[0, -6, HIT], [.06, -4], [.26, 5], [.5, -8, HIT], [.56, -6], [.76, 6]]),
    head: track([[.02, -3], [.09, -1], [.29, 5], [.52, -4], [.59, -2], [.79, 6]]),
    rS: track([[0, SA.m[0], HIT], [.05, SA.m[0] + 8], [.25, 10], [.41, 3], [.5, SB.m[0], HIT], [.55, SB.m[0] + 4], [.76, 13], [.91, -3]]),
    rE: track([[0, SA.m[1], HIT], [.05, SA.m[1] + 4], [.26, 8], [.41, -8], [.5, SB.m[1], HIT], [.55, SB.m[1] + 9], [.77, 11], [.91, -1]]),
    rW: track([[0, SA.m[2], HIT], [.05, SA.m[2] + 12], [.28, 18], [.43, SB.m[2] + 22], [.5, SB.m[2], HIT], [.55, SB.m[2] + 12], [.79, 24], [.93, SA.m[2] + 22]]),
    // bent arm pumps the low stick on the strikes
    lS: track([[0, 4], [.25, -5], [.5, 5], [.75, -5]]),
    lE: track([[0, -14, HIT], [.1, -4], [.25, 6], [.4, -2], [.5, -16, HIT], [.6, -5], [.75, 6], [.9, -2]]),
    lW: track([[.02, -12], [.14, 6], [.27, 10], [.52, -14], [.64, 6], [.77, 10]]),
    // standing (inner) foot
    fx: track([[0, -8], [.12, -8], [.26, 3], [.35, 3], [.49, -9], [.69, -9], [.83, -2], [.94, -8]]),
    fy: track([[0, 0], [.12, 0], [.19, -5], [.26, 0, HIT], [.35, 0], [.42, -6], [.49, 0, HIT], [.69, 0], [.82, -10], [.94, 0, HIT]]),
    fr: track([[0, 0], [.12, 0], [.19, -9], [.26, 0], [.35, 0], [.41, -12], [.48, 4], [.51, 0], [.69, 0], [.79, -15], [.91, 6], [.96, 0]]),
    // lifted (outer) foot
    bx: track([[0, 0], [.23, 13], [.37, 13], [.49, 7], [.77, -5]]),
    by: track([[0, -4], [.23, 26, HIT], [.37, 26], [.49, 9], [.77, -11]]),
    br: track([[0, 0], [.23, -6], [.37, -6], [.51, 8], [.77, -9]]),
  };

  // Two-bone leg: put the ankle on a target so planted feet stay planted while the body moves.
  function leg(root, thigh, shin, foot, ax, ay, footRot) {
    const R = local(root, 1);
    const hx = R[0] * thigh.px + R[2] * thigh.py + R[4], hy = R[1] * thigh.px + R[3] * thigh.py + R[5];
    const L1 = thigh.len, L2 = shin.len, base = Math.atan2(ay - hy, ax - hx);
    const d = clamp(Math.hypot(ax - hx, ay - hy), Math.abs(L1 - L2) + 1, L1 + L2 - 0.5);
    const a1 = base + thigh.bend * Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
    const kx = hx + L1 * Math.cos(a1), ky = hy + L1 * Math.sin(a1);
    const a2 = Math.atan2(hy + d * Math.sin(base) - ky, hx + d * Math.cos(base) - kx);
    const r1 = wrap(a1 - thigh.ang) * DEG, rr = wrap(a2 - shin.ang) * DEG;
    thigh.rot = r1 - root.rot; shin.rot = rr - r1; foot.rot = footRot - rr;
  }
  for (const t of ['w.thighF', 'w.thighB', 'm.thighL', 'm.thighR']) {      // remember which way each knee bends
    const th = B[t], sh = th.kids[0];
    th.bend = Math.sign(wrap(th.ang - Math.atan2(sh.ty - th.py, sh.tx - th.px))) || 1;
  }

  function raisedArm(p, s, e, w) {                    // the shoulder rides along with the arm
    const up = B[p + '.armR.upper'];
    up.rot = s; up.dx = (p === 'w' ? 0.08 : 0.06) * s; up.dy = (p === 'w' ? -0.12 : 0.1) * s;
    B[p + '.armR.fore'].rot = e; B[p + '.handR'].rot = w;
  }
  function choreograph(u) {
    let b;
    /* ---- woman ---- */
    b = B['w.root']; b.dx = W.x(u); b.dy = W.y(u); b.rot = W.lean(u);
    B['w.torso'].rot = W.torso(u);
    B['w.head'].rot = W.head(u);
    raisedArm('w', W.rS(u), W.rE(u), W.rW(u));
    const ls = W.lS(u);
    b = B['w.armL.upper']; b.rot = ls; b.dy = 0.15 * ls;
    B['w.armL.fore'].rot = W.lE(u);
    B['w.handL'].rot = W.lW(u);
    leg(B['w.root'], B['w.thighF'], B['w.shinF'], B['w.footF'], 181 + W.fx(u), 404 + W.fy(u), W.fr(u));
    leg(B['w.root'], B['w.thighB'], B['w.shinB'], B['w.footB'], 145 + W.bx(u), 350 + W.by(u), W.br(u));

    /* ---- man ---- */
    b = B['m.root']; b.dx = M.x(u); b.dy = M.y(u); b.rot = M.lean(u);
    B['m.torso'].rot = M.torso(u);
    B['m.head'].rot = M.head(u);
    raisedArm('m', M.rS(u), M.rE(u), M.rW(u));
    const ml = M.lS(u);
    b = B['m.armL.upper']; b.rot = ml; b.dy = -0.2 * ml;
    B['m.armL.fore'].rot = M.lE(u);
    B['m.handL'].rot = M.lW(u);
    leg(B['m.root'], B['m.thighL'], B['m.shinL'], B['m.footL'], 333 + M.fx(u), 402 + M.fy(u), M.fr(u));
    leg(B['m.root'], B['m.thighR'], B['m.shinR'], B['m.footR'], 383 + M.bx(u), 345 + M.by(u), M.br(u));
  }

  /* Follow-through. Skirt, hair, sash and turban tails are springy chains that chase where the
     body carries them, so they lag, overshoot and settle. The springs are run for a few loops
     up front and one steady loop is stored, which makes the result exactly periodic.        */
  const SAMPLES = 480;
  function solve(u, dt, rec) {
    for (const b of bones) {
      const P = b.parent ? b.parent.M : IDENT, j = b.jig;
      if (j) {
        if (dt) {
          const tx = P[0] * b.tx + P[2] * b.ty + P[4], ty = P[1] * b.tx + P[3] * b.ty + P[5];
          if (j.qx === undefined) { j.qx = tx; j.qy = ty; j.vx = j.vy = 0; j.rot = new Float32Array(SAMPLES); j.len = new Float32Array(SAMPLES); }
          j.vx += (j.k * (tx - j.qx) - j.c * j.vx) * dt; j.vy += (j.k * (ty - j.qy) - j.c * j.vy) * dt;
          j.qx += j.vx * dt; j.qy += j.vy * dt;
          const ox = P[0] * b.px + P[2] * b.py + P[4], oy = P[1] * b.px + P[3] * b.py + P[5];
          const rot = j.max * Math.tanh(wrap(Math.atan2(j.qy - oy, j.qx - ox) - b.ang - b.parent.wr * RAD) * DEG * j.gain / j.max);   // soft limit
          const len = j.st ? 1 + j.st * Math.tanh((Math.hypot(j.qx - ox, j.qy - oy) / b.len - 1) / j.st * 0.6) : 1;
          if (rec >= 0) { j.rot[rec] = rot; j.len[rec] = len; }
          b.rot = rot; b.sx = len; b.sy = 1 / len;
        } else {
          const f = u * SAMPLES, i0 = Math.floor(f) % SAMPLES, i1 = (i0 + 1) % SAMPLES, t = f - Math.floor(f);
          b.rot = j.rot[i0] + (j.rot[i1] - j.rot[i0]) * t;
          b.sx = j.len[i0] + (j.len[i1] - j.len[i0]) * t; b.sy = 1 / b.sx;
        }
      }
      b.wr = (b.parent ? b.parent.wr : 0) + b.rot;
      b.M = b.parent ? mul(P, local(b, 1)) : local(b, 1);
    }
  }
  function settle() {
    for (let lap = 0; lap < 4; lap++)
      for (let i = 0; i < SAMPLES; i++) { choreograph(i / SAMPLES); solve(0, LOOP / SAMPLES, lap === 3 ? i : -1); }
  }

  /* ========================================= STAGE ======================================== */
  const camera = stage.querySelector('#camera');
  const floorW = stage.querySelector('#shadow-woman'), floorM = stage.querySelector('#shadow-man');
  const pulse = track([[0, 1, HIT], [.25, 0], [.5, 1, HIT], [.75, 0]]);     // a breath of zoom on each strike

  function frame(u) {
    choreograph(u);
    solve(u, 0, -1);
    draw();
    const s = 1 + 0.009 * pulse(u);
    camera.setAttribute('transform', `translate(${r2(233.5 * (1 - s))} ${r2(300 * (1 - s))}) scale(${s.toFixed(5)})`);
    for (const [el, root, cx] of [[floorW, B['w.root'], 157.5], [floorM, B['m.root'], 336.5]]) {
      const k = 1 + root.dy * 0.012;                                   // pool tightens as the body rises
      el.setAttribute('cx', r2(cx + root.dx * 0.8)); el.setAttribute('rx', r2(92 * k)); el.setAttribute('opacity', r2(0.85 + root.dy * 0.03));
    }
  }

  bindArtwork(stage);
  settle();
  if (still) { frame(0); return () => {}; }

  let t0 = null, raf;
  const tick = now => { if (t0 === null) t0 = now; frame(((now - t0) / 1000 / LOOP) % 1); raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
