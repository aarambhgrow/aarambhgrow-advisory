import { NAVRATRI } from "../data/navratri";

export const NAVRATRI_OFF = { active: false, day: null };

const PREVIEW_KEY = "navratri-preview";

/* Whole days since the epoch for a YYYY-MM-DD string, so dates can be subtracted. */
function dayNumber(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return Date.UTC(year, month - 1, day) / 86_400_000;
}

/* Today as YYYY-MM-DD in the configured time zone, whatever the visitor's own clock says. */
function today(now) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: NAVRATRI.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type) => parts.find((entry) => entry.type === type).value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

/*
  Testing overrides from the URL: ?navratri=true shows the season,
  ?navratri=false hides it, and &day=1…9 picks that day's colour. The choice
  is kept for the tab, so it survives moving between pages.
*/
function readPreview() {
  let preview = {};
  try {
    preview = JSON.parse(sessionStorage.getItem(PREVIEW_KEY)) ?? {};
  } catch {
    /* Storage is blocked or holds junk: the URL alone decides. */
  }

  const params = new URLSearchParams(window.location.search);
  const flag = params.get("navratri");
  if (flag === "true" || flag === "false") preview = { on: flag === "true" };
  if (params.has("day")) {
    const day = Number(params.get("day"));
    preview = { ...preview, day: day >= 1 && day <= NAVRATRI.days.length ? Math.floor(day) : undefined };
  }

  try {
    sessionStorage.setItem(PREVIEW_KEY, JSON.stringify(preview));
  } catch {
    /* Without storage the override simply lasts for this page only. */
  }
  return preview;
}

/*
  Decide, in the browser, whether Navratri mode is on and which day it is.
  `day` is null outside the nine days (before the start when previewing, or on
  Dussehra), which leaves the animation in its own colours.
*/
export function resolveNavratri(now = new Date()) {
  if (!NAVRATRI.enabled) return NAVRATRI_OFF;

  const preview = readPreview();
  const date = today(now);
  const inSeason = date >= NAVRATRI.startDate && date <= NAVRATRI.endDate;
  if (!(preview.on ?? (inSeason || NAVRATRI.forceNavratri))) return NAVRATRI_OFF;

  const index = preview.day ? preview.day - 1 : dayNumber(date) - dayNumber(NAVRATRI.startDate);
  const day = NAVRATRI.days[index];
  return { active: true, day: day ? { number: index + 1, ...day } : null };
}
