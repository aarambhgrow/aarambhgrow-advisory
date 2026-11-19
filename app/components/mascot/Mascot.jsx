"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/*
  The chat mascot (copied from the Euroasia site; called Ankur in the code,
  visitors see MASCOT_NAME from ./config.js): a glossy sky-blue blob with a
  sprout on its head and two little arms. Drawn in code (SVG gradients give the 3D look), so it
  stays sharp at any size and needs no image files.

  <Mascot mood="idle" className="h-20 w-20" />
  <Mascot mood="idle" wave />   wave: react as if hovered (e.g. its button has keyboard focus)

  Moods: idle · hello · listening · thinking · confused · celebrate
  - idle: breathes, blinks and sways its arms. Its eyes follow the mouse and
    its body turns a little toward it, with the shine sliding the other way.
  - listening: looks at the form field that has focus.
  - Hover (mouse) or tap (touch): it smiles, hops and waves, and little hearts
    float up from its head and fade out.
  Visitors who prefer reduced motion get a still pose for each mood.
  It's decorative (aria-hidden); the form itself announces what happened.
*/

const NAVY = "#002152";
const SKY = "#82c8e5";
const LEAF = "#10B981";
const BLUSH = "#FF8FAB";

const BODY_PATH =
  "M60 25 C84 25 100 42 101 64 C102 86 92 106 60 106 C28 106 18 86 19 64 C20 42 36 25 60 25 Z";

// Arms hang from these points, tucked behind the body (viewBox units).
const SHOULDER = { left: [27, 76], right: [93, 76] };
const pivot = ([x, y]) => ({ originX: `${x}px`, originY: `${y}px` });

const SETTLE = { duration: 0.35, ease: "easeOut" };
const SPRING = { type: "spring", stiffness: 180, damping: 14 };
const breathe = (duration) => ({
  duration,
  repeat: Infinity,
  ease: "easeInOut",
});
const CELEBRATE_TIMING = {
  duration: 0.9,
  times: [0, 0.4, 0.72, 1],
  ease: "easeOut",
  repeat: Infinity,
  repeatDelay: 0.3,
};
const HOP_TIMING = { duration: 0.6, ease: "easeOut", times: [0, 0.2, 0.5, 0.8, 1] };

// Every pose sets all four values, so nothing stays stuck mid-loop on a switch.
const BODY = {
  idle: {
    y: 0,
    rotate: 0,
    scaleX: [1, 0.985, 1],
    scaleY: [1, 1.03, 1],
    transition: {
      y: SETTLE,
      rotate: SETTLE,
      scaleX: breathe(3.2),
      scaleY: breathe(3.2),
    },
  },
  hello: {
    y: [0, -14, 0, -5, 0],
    rotate: [0, -5, 4, -2, 0],
    scaleX: [1, 0.96, 1.06, 0.98, 1],
    scaleY: [1, 1.05, 0.92, 1.02, 1],
    transition: { duration: 1.1, ease: "easeOut", times: [0, 0.3, 0.55, 0.78, 1] },
  },
  // Hovered: a quick squash, hop and land.
  wave: {
    y: [0, 0, -8, 0, 0],
    rotate: 0,
    scaleX: [1, 1.06, 0.96, 1.04, 1],
    scaleY: [1, 0.92, 1.06, 0.95, 1],
    transition: HOP_TIMING,
  },
  listening: {
    y: 0,
    rotate: 5,
    scaleX: [1, 0.99, 1],
    scaleY: [1, 1.025, 1],
    transition: {
      y: SETTLE,
      rotate: SPRING,
      scaleX: breathe(2.4),
      scaleY: breathe(2.4),
    },
  },
  thinking: {
    y: [0, -3, 0],
    rotate: -5,
    scaleX: 1,
    scaleY: 1,
    transition: { y: breathe(1.3), rotate: SPRING, default: SETTLE },
  },
  confused: {
    y: 0,
    rotate: [0, -11, -5, -8],
    scaleX: 1,
    scaleY: 1,
    transition: { rotate: { duration: 0.7, ease: "easeOut" }, default: SETTLE },
  },
  celebrate: {
    y: [0, -16, 0, 0],
    rotate: [0, -6, 5, 0],
    scaleX: [1, 0.95, 1.08, 1],
    scaleY: [1, 1.06, 0.9, 1],
    transition: CELEBRATE_TIMING,
  },
};

const SPROUT = {
  idle: { rotate: [-4, 4, -4], transition: breathe(4) },
  hello: {
    rotate: [0, -20, 16, -8, 0],
    transition: { duration: 1.1, ease: "easeOut" },
  },
  wave: { rotate: [0, -14, 12, -5, 0], transition: { duration: 0.8, ease: "easeOut" } },
  listening: { rotate: -6, transition: SPRING },
  thinking: { rotate: [-3, 3, -3], transition: breathe(1.3) },
  confused: { rotate: 14, transition: SPRING },
  celebrate: { rotate: [0, -16, 14, 0], transition: CELEBRATE_TIMING },
};

const SHADOW = {
  hello: {
    scaleX: [1, 0.7, 1, 0.85, 1],
    transition: BODY.hello.transition,
  },
  wave: { scaleX: [1, 1.05, 0.78, 1.04, 1], transition: HOP_TIMING },
  celebrate: { scaleX: [1, 0.62, 1.05, 1], transition: CELEBRATE_TIMING },
};

/*
  Arms: a pose (how far each arm is raised, in degrees; 0 = hanging straight
  down) plus a loop played on top of it (a wave, a cheer, a sway). Two layers,
  so raising an arm eases in instead of snapping to the loop's first frame.
*/
const ARM_POSE = {
  idle: [38, -38],
  hello: [34, -128],
  wave: [32, -128],
  listening: [30, -30],
  thinking: [20, -20],
  confused: [100, -100], // shrug
  celebrate: [128, -128],
};
const WAVE_LOOP = {
  rotate: [0, -16, 12, -16, 12, 0],
  transition: { duration: 1.2, ease: "easeInOut", repeat: Infinity },
};
const ARM_LOOP = {
  idle: [
    { rotate: [0, 5, 0], transition: breathe(3.2) },
    { rotate: [0, -5, 0], transition: breathe(3.2) },
  ],
  hello: [null, WAVE_LOOP],
  wave: [null, WAVE_LOOP],
  celebrate: [
    { rotate: [0, 14, -6, 0], transition: CELEBRATE_TIMING },
    { rotate: [0, -14, 6, 0], transition: CELEBRATE_TIMING },
  ],
};
const ARM_REST = { rotate: 0, transition: SETTLE };

// Reduced motion: a still pose per mood.
const STILL_TILT = { listening: 4, thinking: -4, confused: -8 };

// Where the eyes look when they aren't following something (viewBox units).
const FIXED_GAZE = {
  thinking: { x: 3, y: -4.5 },
  confused: { x: -1.5, y: 0.5 },
  celebrate: { x: 0, y: 0 },
};
// How far the face slides toward what it's looking at.
const GAZE_REACH = 6;

const CONFETTI_COLOURS = [SKY, LEAF, "#F59E0B", BLUSH, "#2a9bc7"];
const CONFETTI = Array.from({ length: 10 }, (_, i) => {
  const angle = ((-170 + (i * 160) / 9) * Math.PI) / 180;
  const distance = 44 + (i % 3) * 8;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    spin: (i % 2 ? 1 : -1) * (200 + i * 18),
    colour: CONFETTI_COLOURS[i % CONFETTI_COLOURS.length],
    delay: (i % 4) * 0.05,
  };
});

// Hearts that float up and fade while it's hovered: where each starts and
// ends (viewBox units), how big it gets, and when it sets off.
const HEART_PATH =
  "M0 4 C-1.2 3 -5.6 0.2 -5.6 -2.6 C-5.6 -4.7 -4 -6 -2.5 -6 C-1.3 -6 -0.4 -5.3 0 -4.4 C0.4 -5.3 1.3 -6 2.5 -6 C4 -6 5.6 -4.7 5.6 -2.6 C5.6 0.2 1.2 3 0 4 Z";
const HEARTS = [
  { from: [86, 30], to: [97, 0], sway: 6, size: 1.55, delay: 0 },
  { from: [34, 32], to: [23, 4], sway: -5, size: 1.25, delay: 0.45 },
  { from: [64, 20], to: [70, -10], sway: 4, size: 1.05, delay: 0.9 },
];

const isHappy = (face) => face === "hello" || face === "celebrate";

function useBlink(enabled) {
  const [shut, setShut] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    let closeTimer;
    let openTimer;
    const schedule = () => {
      closeTimer = setTimeout(() => {
        setShut(true);
        openTimer = setTimeout(() => {
          setShut(false);
          schedule();
        }, 120);
      }, 2200 + Math.random() * 3400);
    };
    schedule();
    return () => {
      clearTimeout(closeTimer);
      clearTimeout(openTimer);
      setShut(false);
    };
  }, [enabled]);

  return shut;
}

function Eye({ x, y, face, shut, squint, uid }) {
  if (isHappy(face)) {
    return (
      <path
        d={`M${x - 6} ${y + 3} Q${x} ${y - 6} ${x + 6} ${y + 3}`}
        fill="none"
        stroke={NAVY}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    );
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g
        initial={false}
        animate={{ scaleY: shut ? 0.1 : squint ? 0.55 : 1 }}
        transition={{ duration: shut ? 0.06 : 0.12 }}
      >
        <rect x="-5.2" y="-9.5" width="10.4" height="19" rx="5.2" fill={`url(#${uid}-eye)`} />
        <circle cx="1.7" cy="-4.4" r="2.3" fill="#fff" />
        <circle cx="-1.7" cy="4.4" r="1.1" fill="#fff" opacity="0.55" />
      </motion.g>
    </g>
  );
}

function Mouth({ face }) {
  const line = {
    fill: "none",
    stroke: NAVY,
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (isHappy(face)) {
    return (
      <g>
        <path d="M52 77 Q60 78 68 77 Q67 90 60 90 Q53 90 52 77 Z" fill={NAVY} />
        <path
          d="M55.5 86 Q60 82.5 64.5 86 Q62.5 89 60 89 Q57.5 89 55.5 86 Z"
          fill={BLUSH}
        />
      </g>
    );
  }
  if (face === "thinking") return <path d="M57 81 Q61 79.5 64 81" {...line} />;
  if (face === "confused") {
    return <path d="M53 82 Q56.5 78.5 60 82 T67 82" {...line} />;
  }
  return <path d="M54 79 Q60 85 66 79" {...line} />;
}

// One arm: a soft capsule hanging from the shoulder, behind the body.
function Arm({ side, pose, loop, uid }) {
  const [sx, sy] = SHOULDER[side];
  return (
    <motion.g style={pivot(SHOULDER[side])} initial={false} animate={pose}>
      <motion.g style={pivot(SHOULDER[side])} initial={false} animate={loop}>
        <rect
          x={sx - 6.5}
          y={sy - 6.5}
          width="13"
          height="31"
          rx="6.5"
          fill={`url(#${uid}-arm)`}
        />
      </motion.g>
    </motion.g>
  );
}

function Heart({ from, to, sway, size, delay, still, uid }) {
  const shape = (
    <>
      <path d={HEART_PATH} fill={`url(#${uid}-heart)`} />
      <ellipse
        cx="-2.6"
        cy="-3.6"
        rx="1.5"
        ry="1"
        transform="rotate(-30 -2.6 -3.6)"
        fill="#fff"
        opacity="0.8"
      />
    </>
  );
  // Reduced motion: the heart just sits above the head.
  if (still) {
    return <g transform={`translate(${to[0]} ${to[1] + 12}) scale(${size})`}>{shape}</g>;
  }
  return (
    <motion.g
      initial={{ x: from[0], y: from[1], scale: 0.3, opacity: 0 }}
      animate={{
        x: [from[0], (from[0] + to[0]) / 2 + sway, to[0]],
        y: [from[1], (from[1] + to[1]) / 2, to[1]],
        scale: [0.3, size, size * 0.85],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 1.4,
        times: [0, 0.35, 1],
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: 0.25,
        delay,
      }}
    >
      {shape}
    </motion.g>
  );
}

export default function Mascot({ mood = "idle", wave = false, className = "" }) {
  const reduce = useReducedMotion();
  const svgRef = useRef(null);
  const pokeTimer = useRef(null);
  // SVG ids must be plain characters for url(#...) to work
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [hovered, setHovered] = useState(false);

  // Hovering (or a tap on touch screens) makes it smile and wave, except while
  // it's already celebrating.
  const waving = (wave || hovered) && mood !== "celebrate";
  const pose = waving ? "wave" : mood;
  const face = waving ? "hello" : mood;
  const shut = useBlink(!reduce && !isHappy(face));

  const gazeX = useSpring(0, { stiffness: 220, damping: 20 });
  const gazeY = useSpring(0, { stiffness: 220, damping: 20 });
  // 3D: features nearer the front slide further than ones near the edge,
  // the body turns toward the gaze, and the shine moves the other way.
  const mouthX = useTransform(gazeX, (v) => v * 0.75);
  const mouthY = useTransform(gazeY, (v) => v * 0.6);
  const cheekX = useTransform(gazeX, (v) => v * 0.6);
  const cheekY = useTransform(gazeY, (v) => v * 0.5);
  const glossX = useTransform(gazeX, (v) => v * -0.45);
  const glossY = useTransform(gazeY, (v) => v * -0.45);
  const turn = useTransform(gazeX, (v) => v * 0.9);

  useEffect(() => {
    const look = (x, y) => {
      if (reduce) {
        gazeX.jump(x);
        gazeY.jump(y);
      } else {
        gazeX.set(x);
        gazeY.set(y);
      }
    };

    const fixed = FIXED_GAZE[mood];
    if (fixed) return look(fixed.x, fixed.y);
    if (reduce) return look(0, 0);

    const lookAt = (px, py) => {
      const box = svgRef.current?.getBoundingClientRect();
      if (!box?.width) return;
      const dx = px - (box.left + box.width / 2);
      const dy = py - (box.top + box.height * 0.55);
      const distance = Math.hypot(dx, dy) || 1;
      const reach = Math.min(distance / 140, 1) * GAZE_REACH;
      look((dx / distance) * reach, (dy / distance) * reach * 0.8);
    };

    // Listening: watch the field being filled in.
    if (mood === "listening") {
      const lookAtFocus = () => {
        const el = document.activeElement;
        if (!el || el === document.body) return look(0, 0);
        const r = el.getBoundingClientRect();
        lookAt(r.left + r.width * 0.3, r.top + r.height / 2);
      };
      lookAtFocus();
      document.addEventListener("focusin", lookAtFocus);
      return () => document.removeEventListener("focusin", lookAtFocus);
    }

    // Otherwise follow the mouse (not on touch screens: there's no hover there).
    if (!window.matchMedia?.("(pointer: fine)").matches) return look(0, 0);
    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => lookAt(event.clientX, event.clientY));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [mood, reduce, gazeX, gazeY]);

  useEffect(() => () => clearTimeout(pokeTimer.current), []);

  const onPointerEnter = (event) => {
    if (event.pointerType === "mouse") setHovered(true);
  };
  const onPointerLeave = (event) => {
    if (event.pointerType === "mouse") setHovered(false);
  };
  // Touch has no hover: a tap gets a short wave instead.
  const onPointerDown = (event) => {
    if (event.pointerType === "mouse") return;
    setHovered(true);
    clearTimeout(pokeTimer.current);
    pokeTimer.current = setTimeout(() => setHovered(false), 1600);
  };

  const still = { duration: 0 };
  const body = reduce
    ? { y: 0, rotate: STILL_TILT[mood] ?? 0, scaleX: 1, scaleY: 1, transition: still }
    : BODY[pose] ?? BODY.idle;
  const sprout = reduce
    ? { rotate: mood === "confused" ? 12 : 0, transition: still }
    : SPROUT[pose] ?? SPROUT.idle;
  const shadow = reduce
    ? { scaleX: 1, transition: still }
    : SHADOW[pose] ?? { scaleX: 1, transition: SETTLE };
  const [poseLeft, poseRight] = ARM_POSE[pose] ?? ARM_POSE.idle;
  const armTransition = reduce ? still : SPRING;
  const loops = (!reduce && ARM_LOOP[pose]) || [];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 120"
      className={className}
      style={{ overflow: "visible" }}
      aria-hidden="true"
      focusable="false"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
    >
      <defs>
        {/* Lit from the top left: bright front, deeper blue toward the edges */}
        <radialGradient id={`${uid}-skin`} cx="0.42" cy="0.34" r="0.78" fx="0.36" fy="0.26">
          <stop offset="0" stopColor="#F4FCFF" />
          <stop offset="0.18" stopColor="#C9EBF8" />
          <stop offset="0.5" stopColor="#8CCFEA" />
          <stop offset="0.82" stopColor="#4FAAD5" />
          <stop offset="1" stopColor="#2E83B5" />
        </radialGradient>
        {/* Shade toward the bottom, where the body curves away from the light */}
        <linearGradient id={`${uid}-shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.5" stopColor={NAVY} stopOpacity="0" />
          <stop offset="1" stopColor={NAVY} stopOpacity="0.24" />
        </linearGradient>
        {/* Light bouncing back onto the lower right edge */}
        <linearGradient id={`${uid}-rim`} x1="0.1" y1="0.1" x2="0.9" y2="0.95">
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={`${uid}-arm`} cx="0.5" cy="0.72" r="0.75">
          <stop offset="0" stopColor="#D4F1FC" />
          <stop offset="0.5" stopColor="#8FD1EA" />
          <stop offset="1" stopColor="#3F98C6" />
        </radialGradient>
        <linearGradient id={`${uid}-leaf`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6EE7B7" />
          <stop offset="0.5" stopColor={LEAF} />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
        <linearGradient id={`${uid}-eye`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1C4384" />
          <stop offset="0.55" stopColor={NAVY} />
          <stop offset="1" stopColor="#000E26" />
        </linearGradient>
        <radialGradient id={`${uid}-cheek`}>
          <stop offset="0" stopColor={BLUSH} stopOpacity="0.8" />
          <stop offset="1" stopColor={BLUSH} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-heart`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FFD3DE" />
          <stop offset="0.45" stopColor="#FF7A9C" />
          <stop offset="1" stopColor="#E23D6A" />
        </radialGradient>
        <radialGradient id={`${uid}-ground`}>
          <stop offset="0" stopColor={NAVY} stopOpacity="0.32" />
          <stop offset="1" stopColor={NAVY} stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-soft`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <clipPath id={`${uid}-body`}>
          <path d={BODY_PATH} />
        </clipPath>
      </defs>

      {/* Soft shadow on the ground */}
      <motion.ellipse
        cx="60"
        cy="110"
        rx="34"
        ry="6"
        fill={`url(#${uid}-ground)`}
        animate={shadow}
      />

      <motion.g style={{ originX: 0.5, originY: 1 }} animate={body}>
        <motion.g style={{ rotate: turn, ...pivot([60, 106]) }}>
          <motion.g style={{ originX: 0.5, originY: 1 }} animate={sprout}>
            <path
              d="M60 32 C60 24 60 18 61 12"
              fill="none"
              stroke="#0E9F6E"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
            <path
              d="M61 14 C55 6 46 5 41 9 C45 16 54 18 61 14 Z"
              fill={`url(#${uid}-leaf)`}
            />
            <path
              d="M61 12 C64 3 73 0 79 3 C77 11 68 15 61 12 Z"
              fill={`url(#${uid}-leaf)`}
            />
            <path
              d="M59.5 13.2 C54 10.5 48 9.2 43.5 9.6 M62.5 11.2 C66 6.8 71 4.3 76.5 3.8"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.45"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </motion.g>

          <Arm
            side="left"
            uid={uid}
            pose={{ rotate: poseLeft, transition: armTransition }}
            loop={loops[0] ?? ARM_REST}
          />
          <Arm
            side="right"
            uid={uid}
            pose={{ rotate: poseRight, transition: armTransition }}
            loop={loops[1] ?? ARM_REST}
          />

          <path d={BODY_PATH} fill={`url(#${uid}-skin)`} />
          <path d={BODY_PATH} fill={`url(#${uid}-shade)`} />
          <path
            d={BODY_PATH}
            fill="none"
            stroke={`url(#${uid}-rim)`}
            strokeWidth="5"
            clipPath={`url(#${uid}-body)`}
          />

          <motion.g style={{ x: cheekX, y: cheekY }}>
            <ellipse cx="33" cy="75" rx="8.5" ry="5.5" fill={`url(#${uid}-cheek)`} />
            <ellipse cx="87" cy="75" rx="8.5" ry="5.5" fill={`url(#${uid}-cheek)`} />
          </motion.g>
          <motion.g style={{ x: gazeX, y: gazeY }}>
            <Eye x={47} y={62} face={face} shut={shut} uid={uid} />
            <Eye
              x={73}
              y={62}
              face={face}
              shut={shut}
              squint={face === "confused"}
              uid={uid}
            />
          </motion.g>
          <motion.g style={{ x: mouthX, y: mouthY }}>
            <Mouth face={face} />
          </motion.g>

          {/* Shine */}
          <motion.g style={{ x: glossX, y: glossY }} clipPath={`url(#${uid}-body)`}>
            <ellipse
              cx="42"
              cy="44"
              rx="13"
              ry="7.5"
              transform="rotate(-38 42 44)"
              fill="#fff"
              opacity="0.55"
              filter={`url(#${uid}-soft)`}
            />
            <ellipse
              cx="38"
              cy="40.5"
              rx="5"
              ry="2.8"
              transform="rotate(-38 38 40.5)"
              fill="#fff"
              opacity="0.95"
            />
            <circle cx="48.5" cy="35.5" r="1.6" fill="#fff" opacity="0.85" />
          </motion.g>
        </motion.g>
      </motion.g>

      <AnimatePresence>
        {waving && (
          <motion.g
            key="hearts"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            {(reduce ? HEARTS.slice(0, 1) : HEARTS).map((heart) => (
              <Heart key={heart.delay} {...heart} still={reduce} uid={uid} />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {mood === "thinking" &&
        [
          [92, 26, 2.5],
          [99, 18, 3.2],
          [108, 9, 4],
        ].map(([cx, cy, r], i) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy={cy}
            r={r}
            fill="#fff"
            stroke={NAVY}
            strokeWidth="2"
            initial={{ opacity: reduce ? 1 : 0.2 }}
            animate={
              reduce
                ? { opacity: 1 }
                : {
                    opacity: [0.2, 1, 0.2],
                    transition: { duration: 1.2, repeat: Infinity, delay: i * 0.2 },
                  }
            }
          />
        ))}

      {mood === "confused" && (
        <motion.text
          x="96"
          y="34"
          fontSize="24"
          fontWeight="800"
          fill={SKY}
          stroke={NAVY}
          strokeWidth="2.5"
          paintOrder="stroke"
          style={{ originX: 0.5, originY: 1 }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={
            reduce
              ? { opacity: 1, transition: still }
              : { opacity: 1, rotate: [0, 14, -8, 0], transition: { duration: 0.7 } }
          }
        >
          ?
        </motion.text>
      )}

      {mood === "celebrate" &&
        !reduce &&
        CONFETTI.map((piece, i) => (
          <motion.rect
            key={i}
            x="58"
            y="36"
            width="4"
            height="7"
            rx="1"
            fill={piece.colour}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              x: [0, piece.x * 0.85, piece.x],
              y: [0, piece.y, piece.y + 16],
              rotate: [0, piece.spin * 0.6, piece.spin],
              opacity: [0, 1, 0],
              scale: [0.4, 1, 0.8],
            }}
            transition={{
              duration: 1.1,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 0.1,
              delay: piece.delay,
            }}
          />
        ))}
    </svg>
  );
}
