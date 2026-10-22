"use client";

import { useEffect, useRef } from "react";

import styles from "./diwali.module.css";

/* Warm sparks, deep enough to show on the white pages as well as the navy ones. */
const COLORS = ["#FFF3C2", "#FFE07A", "#FFB52E", "#FF8C1A", "#F26522"];
const MAX_SPARKS = 140;
const GRAVITY = 520; // px/s²
const TRAIL_SPACING = 9; // px of mouse travel per spark
const IDLE_SPARK_MS = 2500; // keeps fizzing this long after the mouse stops, then rests
const IDLE_RATE = 20; // sparks per second while fizzing

/* Typing targets keep the normal text cursor; the sparkler steps aside over them. */
const FIELD =
  'input:not([type="button"], [type="submit"], [type="reset"], [type="checkbox"], [type="radio"], [type="range"], [type="color"], [type="file"], [type="image"]), textarea, select, [contenteditable=""], [contenteditable="true"]';
const CLICKABLE = 'a[href], button, [role="button"], summary, label, input[type="submit"], input[type="button"]';

/*
  A small phuljhadi in place of the mouse pointer, with a light trail of sparks
  and a little burst on click. Mouse only; the parent (DiwaliLayer) skips it on
  touch screens and for visitors who ask for reduced motion.

  The stick follows the mouse directly; the sparks are drawn on one canvas, and
  the drawing loop runs only while there are sparks to draw.
*/
export default function DiwaliSparkler() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!cursor || !ctx) return;

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const sparks = [];
    let x = 0;
    let y = 0;
    let shown = false;
    let lastTarget = null;
    let overField = false;
    let lastMove = 0;
    let trail = 0;
    let idle = 0;
    let frame = 0;
    let lastTime = 0;

    const spawn = (count, minSpeed, maxSpeed) => {
      for (let i = 0; i < count && sparks.length < MAX_SPARKS; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 40,
          age: 0,
          life: 0.22 + Math.random() * 0.38,
          color: COLORS[(Math.random() * COLORS.length) | 0],
        });
      }
    };

    const draw = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const fizzing = shown && now - lastMove < IDLE_SPARK_MS;
      if (fizzing) {
        idle += dt * IDLE_RATE;
        const count = Math.floor(idle);
        idle -= count;
        spawn(count, 40, 130);
      }

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      const drag = Math.exp(-3 * dt);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.age += dt;
        if (s.age >= s.life) {
          sparks[i] = sparks[sparks.length - 1];
          sparks.pop();
          continue;
        }
        s.vx *= drag;
        s.vy = s.vy * drag + GRAVITY * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        // Each spark is a short streak along its path, fading as it cools.
        const heat = 1 - s.age / s.life;
        ctx.globalAlpha = heat;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 0.6 + heat * 1.2;
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * 0.03, s.y - s.vy * 0.03);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      frame = sparks.length > 0 || fizzing ? requestAnimationFrame(draw) : 0;
    };

    const wake = () => {
      if (frame) return;
      lastTime = performance.now();
      frame = requestAnimationFrame(draw);
    };

    // While the sparkler is on screen, the normal pointer is hidden (app/globals.css).
    const show = (on) => {
      if (on === shown) return;
      shown = on;
      cursor.classList.toggle(styles.shown, on);
      html.toggleAttribute("data-sparkler", on);
    };

    const onMove = (event) => {
      if (event.pointerType === "touch") return show(false);

      if (event.target !== lastTarget) {
        lastTarget = event.target;
        const element = event.target instanceof Element ? event.target : null;
        overField = Boolean(element?.closest(FIELD));
        cursor.classList.toggle(styles.hot, Boolean(element?.closest(CLICKABLE)));
      }

      const dx = event.clientX - x;
      const dy = event.clientY - y;
      x = event.clientX;
      y = event.clientY;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      if (overField) return show(false);
      if (shown) {
        trail = Math.min(trail + Math.hypot(dx, dy) / TRAIL_SPACING, 6);
        const count = Math.floor(trail);
        trail -= count;
        spawn(count, 50, 170);
      }
      show(true);
      lastMove = performance.now();
      wake();
    };

    const onDown = (event) => {
      if (event.pointerType === "touch" || event.button !== 0 || !shown) return;
      spawn(18, 140, 340);
      lastMove = performance.now();
      wake();
    };

    // Off the page, or into an embedded map or video: step aside.
    const onOut = (event) => {
      if (!event.relatedTarget) show(false);
    };
    const hide = () => show(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("blur", hide);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", hide);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
      html.removeAttribute("data-sparkler");
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.sparks} aria-hidden="true" />
      <div ref={cursorRef} className={styles.sparkler} aria-hidden="true">
        <svg className={styles.stick} width="32" height="40" viewBox="-2 -2 32 40" fill="none">
          {/* Light edge so the stick reads on dark sections too */}
          <path d="M0 0 L15.3 30.3" stroke="rgba(255,255,255,0.55)" strokeWidth="4.2" strokeLinecap="round" />
          {/* Bare wire handle */}
          <path d="M9 17.8 L15.3 30.3" stroke="#9AA1AA" strokeWidth="1.4" strokeLinecap="round" />
          {/* Coated part */}
          <path d="M1 2 L9 17.8" stroke="#5B5048" strokeWidth="3" strokeLinecap="round" />
          {/* Burning end */}
          <path d="M0.3 0.6 L2.4 4.8" stroke="#FF7A1A" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
        <span className={styles.ember} />
      </div>
    </>
  );
}
