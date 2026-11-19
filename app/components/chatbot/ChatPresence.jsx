"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

/*
  "N people chatting with ARTHIQ" pill, stuck beside the chat button on every
  page (rendered by FundingChatbot, positioned by .chat-presence in
  app/globals.css). Same as on the Euroasia site.

  The number is simulated (it follows the time of day in IST), not a real count
  from the chatbot server. Set PREVIEW to false to hide the pill.
*/
const PREVIEW = true;
const TAG = "funding-chatbot";
const DISMISSED = "chat-presence:dismissed";

// Expected chats at this time of day (IST): busy late morning and afternoon, quiet at night
function expectedNow(date = new Date()) {
  const h = (date.getUTCHours() + date.getUTCMinutes() / 60 + 5.5) % 24;
  const hump = (centre, width) => Math.exp(-((h - centre) ** 2) / (2 * width * width));
  return Math.round(50 + 24 * hump(11.5, 2.2) + 20 * hump(16, 2.5) + 7 * hump(21, 1.8));
}

// One step of 1 to 3, slowly pulled back toward the expected level
function nextCount(current) {
  if (current === null) {
    return Math.max(3, expectedNow() + Math.round((Math.random() - 0.5) * 4));
  }

  const pull = Math.random() < 0.3 ? Math.sign(expectedNow() - current) : 0;

  const change = Math.floor(Math.random() * 3) + 1;
  const direction = pull || (Math.random() < 0.5 ? 1 : -1);

  return Math.max(3, current + direction * change);
}

const wasDismissed = () => {
  try {
    return sessionStorage.getItem(DISMISSED) === "1";
  } catch {
    return false;
  }
};

export default function ChatPresence({ botName }) {
  const reduceMotion = useReducedMotion();
  // The count, and which way it last moved (the number rolls up or down)
  const [{ count, dir }, setTally] = useState({ count: null, dir: 1 });
  const [widgetReady, setWidgetReady] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  // Read once on the client; nothing renders before the count arrives, so
  // the server's "false" can't cause a mismatch
  const [dismissed, setDismissed] = useState(wasDismissed);

  // Simulated count: shows up a moment after load, then drifts every 4–9s
  useEffect(() => {
    if (!PREVIEW || dismissed) return undefined;
    let timer;
    const tick = () => {
      setTally(({ count: current, dir: lastDir }) => {
        const next = nextCount(current);
        const moved = current !== null && next !== current;
        return { count: next, dir: moved ? (next > current ? 1 : -1) : lastDir };
      });
      timer = setTimeout(tick, 4000 + Math.random() * 5000);
    };
    timer = setTimeout(tick, 2500);
    return () => clearTimeout(timer);
  }, [dismissed]);

  // Only beside a loaded chat button, and out of the way while the chat is open
  // (the widget has no close event, so check its state)
  useEffect(() => {
    if (!PREVIEW) return undefined;
    const check = () => {
      const bot = document.querySelector(TAG);
      setWidgetReady(typeof bot?.open === "function");
      setChatOpen(Boolean(bot?.isOpen));
    };
    check();
    const id = setInterval(check, 400);
    return () => clearInterval(id);
  }, []);

  const show = count !== null && widgetReady && !chatOpen && !dismissed;
  const shift = reduceMotion ? 0 : dir * 100;

  const openChat = () => document.querySelector(TAG)?.open?.();
  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISSED, "1");
    } catch {
      /* private mode: it just comes back on the next page load */
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="chat-presence"
          initial={{ opacity: 0, x: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: reduceMotion ? 0 : 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="chat-presence fixed z-[9990] flex h-10 items-center rounded-full border-[1.5px] border-[#002152] bg-white text-sm text-[#002152] shadow-[4px_4px_0_0_#002152]"
        >
          <button
            type="button"
            onClick={openChat}
            className="flex h-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-l-full pl-3.5 pr-1.5"
          >
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0" aria-hidden="true">
              <span className="live-pulse absolute inset-0 rounded-full bg-[#10B981]" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-[#10B981]" />
            </span>
            <span>
              <span className="relative inline-flex h-5 min-w-[2ch] justify-end overflow-hidden align-top font-bold leading-5 tabular-nums">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={count}
                    initial={{ y: `${shift}%`, opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: `${-shift}%`, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              <span className="hidden sm:inline">people </span>chatting with {botName}
            </span>
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Hide"
            className="mr-1.5 grid h-7 w-7 cursor-pointer place-items-center rounded-full text-[#4B5563] transition-colors duration-150 hover:bg-[#F4F7FC] hover:text-[#002152]"
          >
            <X aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
