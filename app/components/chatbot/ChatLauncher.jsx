"use client";

import { useEffect, useRef, useState } from "react";
import Mascot from "../mascot/Mascot";

/*
  The mascot on its own (no round button around it) as the chat button, in
  place of the widget's launcher. Rendered by FundingChatbot; positioned by
  .chat-launcher in app/globals.css; turn off with CHAT_LAUNCHER_MASCOT in
  app/components/mascot/config.js.

  The widget draws inside an open shadow root. Once it has loaded, this adds a
  small stylesheet there that hides its own button and lifts the greeting
  bubble and the chat panel clear of the taller mascot. If the widget ever
  changes shape (no .root found), nothing is touched and its own button stays.
*/
const TAG = "funding-chatbot";
const WIDGET_CSS = `
.launcher { display: none !important; }
.greeting { bottom: calc(var(--bottom) + 96px); }
@media (min-width: 641px) {
  .panel {
    bottom: calc(var(--bottom) + 96px);
    height: min(660px, calc(100dvh - var(--bottom) - 120px));
  }
}`;
const GREET_MS = 2600;

export default function ChatLauncher({ botName }) {
  const buttonRef = useRef(null);
  const [widget, setWidget] = useState(null);
  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const [focusWave, setFocusWave] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let observer;
    let greetTimer;
    let wasOpen = false;
    let greetingShown = false;

    const greet = () => {
      setGreeting(true);
      clearTimeout(greetTimer);
      greetTimer = setTimeout(() => setGreeting(false), GREET_MS);
    };

    customElements.whenDefined(TAG).then(() => {
      if (cancelled) return;
      const el = document.querySelector(TAG);
      const shadow = el?.shadowRoot;
      const root = shadow?.querySelector(".root");
      if (!root) return;

      if (!shadow.querySelector("style[data-mascot-launcher]")) {
        const style = document.createElement("style");
        style.setAttribute("data-mascot-launcher", "");
        style.textContent = WIDGET_CSS;
        shadow.append(style);
      }

      const bubble = shadow.querySelector(".greeting");
      const sync = () => {
        const isOpen = root.hasAttribute("data-open");
        setOpen(isOpen);
        // Closed from inside the panel: the widget tries to focus its own
        // (hidden) button, so hand focus to this one instead.
        if (wasOpen && !isOpen) {
          const active = document.activeElement;
          if (!active || active === document.body || active === el) {
            buttonRef.current?.focus({ preventScroll: true });
          }
        }
        wasOpen = isOpen;
        // Wave along when the widget's greeting bubble pops up
        const showing = Boolean(bubble && !bubble.hidden);
        if (showing && !greetingShown) greet();
        greetingShown = showing;
      };
      sync();
      observer = new MutationObserver(sync);
      observer.observe(root, {
        subtree: true,
        attributes: true,
        attributeFilter: ["data-open", "hidden"],
      });
      setWidget(el);
      greet();
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      clearTimeout(greetTimer);
    };
  }, []);

  if (!widget) return null;

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={open ? "Close chat" : `Open chat with ${botName}`}
      aria-expanded={open}
      onClick={() => (open ? widget.close() : widget.open())}
      onFocus={(event) => setFocusWave(event.currentTarget.matches(":focus-visible"))}
      onBlur={() => setFocusWave(false)}
      className="chat-launcher fixed z-[9998] h-[88px] w-[88px] cursor-pointer rounded-full border-0 bg-transparent p-0 outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-4 focus-visible:ring-[#82c8e5]/70"
    >
      <Mascot
        mood={greeting && !open ? "hello" : "idle"}
        wave={focusWave}
        className="h-full w-full"
      />
    </button>
  );
}
