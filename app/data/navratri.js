/*
  Navratri seasonal layer — the one place to switch it on, off or re-date it.

  Navratri mode is ON when `enabled` is true AND any of:
    - today falls inside startDate…endDate
    - `forceNavratri` is true
    - the page was opened with ?navratri=true
  Otherwise the site is exactly the original: nothing extra loads or renders.
*/
export const NAVRATRI = {
  /* Master switch. `false` removes the whole feature, previews included. */
  enabled: true,

  /* Preview override: show Navratri even outside the dates below. */
  forceNavratri: true,

  /* First and last day, inclusive, as read on a clock in `timeZone`. */
  startDate: "2026-10-11",
  endDate: "2026-10-21",
  timeZone: "Asia/Kolkata",

  /* Navbar indicator and footer greeting (the ✦ marks are added around them). */
  label: "Navratri ’26",
  greeting: "शुभ नवरात्रि",

  /*
    The accent for each of the nine days, counted from startDate. It tints the
    animation only — shader, particles, the Dandiya's glow and ribbons, and
    the two ✦ marks. Brand colours are never touched. Days past the ninth
    (Dussehra) keep the animation's own palette.
  */
  days: [
    { name: "Orange", color: "#FF7A18" },
    { name: "White", color: "#FFF7E6" },
    { name: "Red", color: "#E5202E" },
    { name: "Royal Blue", color: "#2F5BFF" },
    { name: "Yellow", color: "#FFD21F" },
    { name: "Green", color: "#17A34A" },
    { name: "Grey", color: "#9AA3AF" },
    { name: "Purple", color: "#A855F7" },
    { name: "Peacock Green", color: "#0FA39A" },
  ],
};
