import { useId } from "react";
import { PALETTE } from "./config";

/**
 * Geometry of the artwork, in viewBox units (0‥100). The cursor animates the
 * sticks about `cross`, and the tassels about `tassel`, so these are shared.
 */
export const DANDIYA = {
  /** Where the sticks cross — the cursor's hotspot. */
  cross: { x: 50, y: 44 },
  /** Each stick leans this many degrees away from vertical at rest. */
  halfAngle: 32,
  /** Where a tassel hangs from, in its stick's own (unrotated) frame. */
  tassel: { x: 50, y: 81 },
} as const;

const STICK_OUTLINE =
  "M47.8 10 C47.8 8 48.8 7 50 7 C51.2 7 52.2 8 52.2 10 L53 79 C53 80.4 51.7 81 50 81 C48.3 81 47 80.4 47 79 Z";

interface StickProps {
  id: string;
  part: "a" | "b";
  /** Clockwise lean in degrees. */
  angle: number;
  band: string;
  grip: string;
}

/**
 * One stick, drawn upright and then rotated about the crossing point. The
 * tassel is counter-rotated so it always hangs straight down.
 */
function Stick({ id, part, angle, band, grip }: StickProps) {
  const { cross, tassel } = DANDIYA;
  return (
    <g data-part={`stick-${part}`} transform={`rotate(${angle} ${cross.x} ${cross.y})`}>
      <g clipPath={`url(#${id}-body)`}>
        <rect x="46" y="6" width="8" height="76" fill={`url(#${id}-wood)`} />

        {/* Bands near the tip */}
        <rect x="46" y="14" width="8" height="2.5" fill={band} />
        <rect x="46" y="17.6" width="8" height="1" fill={PALETTE.white} opacity="0.9" />
        <rect x="46" y="19.7" width="8" height="2.5" fill={grip} />

        {/* Wrapped grip with a spiral of thread */}
        <rect x="46" y="57" width="8" height="17" fill={grip} />
        <path
          d="M45 61.2 L55 58.2 M45 65 L55 62 M45 68.8 L55 65.8 M45 72.6 L55 69.6"
          stroke={PALETTE.white}
          strokeWidth="0.9"
          opacity="0.78"
        />
        <rect x="46" y="55.8" width="8" height="1.2" fill={PALETTE.white} opacity="0.9" />
        <rect x="46" y="74" width="8" height="1.2" fill={PALETTE.white} opacity="0.9" />
        <rect x="46" y="76.6" width="8" height="5" fill="#D98A1B" />

        {/* Contact shadow where the front stick rests on this one. The front
            stick lies 2·angle away, so the shadow is turned to match it. */}
        {part === "a" && (
          <ellipse
            cx="50"
            cy="44.6"
            rx="7.5"
            ry="4.2"
            transform={`rotate(${90 - 2 * angle} ${cross.x} ${cross.y})`}
            fill={`url(#${id}-contact)`}
          />
        )}

        {/* Cylinder shading: dark edges, one soft highlight */}
        <rect x="46" y="6" width="8" height="76" fill={`url(#${id}-round)`} />
      </g>

      <circle cx="50" cy="6.8" r="2.5" fill={`url(#${id}-bead)`} />

      <g
        data-part={`tassel-${part}`}
        transform={`rotate(${-angle} ${tassel.x} ${tassel.y})`}
      >
        <g data-swing="">
          <path d="M50 81 L50 85.6" stroke={PALETTE.gold} strokeWidth="0.9" strokeLinecap="round" />
          <circle cx="50" cy="86.4" r="1.6" fill={PALETTE.gold} />
          <path
            d="M50 87.6 C47.6 90.4 46.9 94 47.2 98.6 L52.8 98.6 C53.1 94 52.4 90.4 50 87.6 Z"
            fill={band}
          />
          <path
            d="M48.7 92.4 L48.4 98.6 M50 91.4 L50 98.6 M51.3 92.4 L51.6 98.6"
            stroke="#000"
            strokeWidth="0.45"
            opacity="0.22"
          />
          <rect x="48.4" y="89.5" width="3.2" height="0.95" rx="0.4" fill={PALETTE.white} opacity="0.85" />
        </g>
      </g>
    </g>
  );
}

export interface DandiyaArtProps {
  className?: string;
  /**
   * Re-tint the ribbons (bands, grips, tassels) and the aura — a host's colour
   * of the day. Left out, the artwork keeps the palette's pink, purple and orange.
   */
  accent?: string;
  accentDeep?: string;
}

/**
 * Two crossed Dandiya sticks as crisp SVG: a warm gold-to-orange body with a
 * rounded highlight, decorative bands, a wrapped grip, a tassel and a faint
 * aura. Parts carry `data-part` so the cursor can animate them directly.
 */
export default function DandiyaArt({ className, accent, accentDeep = accent }: DandiyaArtProps) {
  const id = `dandiya-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const { cross, halfAngle } = DANDIYA;
  const ribbon = accent ?? PALETTE.pink;
  const ribbonDeep = accentDeep ?? PALETTE.purple;
  const aura = accent ?? PALETTE.orange;

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={`${id}-body`}>
          <path d={STICK_OUTLINE} />
        </clipPath>
        <linearGradient id={`${id}-wood`} gradientUnits="userSpaceOnUse" x1="0" y1="7" x2="0" y2="81">
          <stop offset="0" stopColor="#FFD271" />
          <stop offset="0.45" stopColor={PALETTE.gold} />
          <stop offset="1" stopColor={PALETTE.orange} />
        </linearGradient>
        <linearGradient id={`${id}-round`} gradientUnits="userSpaceOnUse" x1="46.8" y1="0" x2="53.2" y2="0">
          <stop offset="0" stopColor="#5A1E00" stopOpacity="0.55" />
          <stop offset="0.28" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.42" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="0.56" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#460F00" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id={`${id}-bead`} cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor={PALETTE.white} />
          <stop offset="0.45" stopColor={PALETTE.gold} />
          <stop offset="1" stopColor="#B96A12" />
        </radialGradient>
        <radialGradient id={`${id}-contact`}>
          <stop offset="0" stopColor="#1A0600" stopOpacity="0.55" />
          <stop offset="1" stopColor="#1A0600" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-aura`}>
          <stop offset="0" stopColor={PALETTE.gold} stopOpacity="0.36" />
          <stop offset="0.45" stopColor={aura} stopOpacity="0.12" />
          <stop offset="1" stopColor={aura} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle data-part="aura" cx={cross.x} cy={cross.y} r="40" fill={`url(#${id}-aura)`} />
      <Stick id={id} part="a" angle={halfAngle} band={ribbon} grip={ribbonDeep} />
      <Stick id={id} part="b" angle={-halfAngle} band={ribbonDeep} grip={ribbon} />
    </svg>
  );
}
