import { DIWALI } from "../data/diwali";

/*
  Diwali mode is decided by a tiny script in <head> that runs while the HTML is
  still being read, before anything is painted. It marks <html> with these
  attributes, and CSS (app/globals.css) shows or hides the Diwali pieces from
  them — so the page never flashes the normal site first, and nothing jumps
  when the offer bar appears.
*/
export const DIWALI_ATTR = "data-diwali";
export const INTRO_ATTR = "data-diwali-intro";

const PREVIEW_KEY = "diwali-preview";

/* The head script, with today's settings baked in. */
export function diwaliHeadScript() {
  const config = JSON.stringify({
    start: DIWALI.startDate,
    end: DIWALI.endDate,
    timeZone: DIWALI.timeZone,
    force: DIWALI.forceDiwali,
  });

  return `(function () {
  try {
    var c = ${config};
    var html = document.documentElement;
    var get = function (key) { try { return sessionStorage.getItem(key); } catch (e) { return null; } };
    var set = function (key, value) { try { sessionStorage.setItem(key, value); } catch (e) {} };

    var flag = new URLSearchParams(location.search).get("diwali");
    if (flag !== "true" && flag !== "false") flag = null;
    if (flag) set("${PREVIEW_KEY}", flag);
    var preview = flag || get("${PREVIEW_KEY}");

    var parts = {};
    new Intl.DateTimeFormat("en-US", { timeZone: c.timeZone, year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(new Date())
      .forEach(function (p) { parts[p.type] = p.value; });
    var today = parts.year + "-" + parts.month + "-" + parts.day;

    var on = preview ? preview === "true" : c.force || (today >= c.start && today <= c.end);
    if (!on) return;
    html.setAttribute("${DIWALI_ATTR}", "");

    /* The intro plays every time the home page is opened or reloaded. */
    if (location.pathname === "/") html.setAttribute("${INTRO_ATTR}", "");
  } catch (e) {}
})();`;
}
