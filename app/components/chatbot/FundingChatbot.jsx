"use client";

import { useEffect } from "react";
import Script from "next/script";
import ChatPresence from "./ChatPresence";
import ChatLauncher from "./ChatLauncher";
import { openChat } from "./openChat";
import { chatFontVariables } from "./fonts";
import { CHAT_LAUNCHER_MASCOT, MASCOT_NAME } from "../mascot/config";

/*
  ARTHIQ, the AI funding assistant, the same one as on the Euroasia site. The
  widget itself lives on the chatbot server (one script, shared by every
  website that embeds it, from the ai-funding-consultant project); this
  component only loads it with the same look and settings.

  Change the server with NEXT_PUBLIC_CHATBOT_URL (defaults to production).
*/
const CHATBOT_URL = (process.env.NEXT_PUBLIC_CHATBOT_URL || "https://chatbot.euroasia.cloud").replace(/\/+$/, "");

/*
  The chatbot server tells browsers to keep chatbot.js for 10 years, so a browser
  that loaded an older copy never fetches a new one by itself. Change this
  whenever the widget changes, so every visitor downloads the current file.
*/
const WIDGET_VERSION = "2026-11-05";

const BOT_NAME = MASCOT_NAME;
// "Only AarambhGrow's team will call you"
const COMPANY = "AarambhGrow";
// Line under the name in the chat header. Keep it under ~22 characters or it gets cut off.
const SUBTITLE = `${COMPANY} · Schemes`;

export default function FundingChatbot() {
  useEffect(() => {
    const track = (name, params) => window.gtag?.("event", name, params);
    const onOpen = () => track("chatbot_open");
    const onLead = () => track("generate_lead", { method: "chatbot" });
    window.addEventListener("funding-chatbot:open", onOpen);
    window.addEventListener("funding-chatbot:lead", onLead);
    return () => {
      window.removeEventListener("funding-chatbot:open", onOpen);
      window.removeEventListener("funding-chatbot:lead", onLead);
    };
  }, []);

  // A link with ?chat=open opens the chat as soon as it loads, then tidies the address bar.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("chat") !== "open") return;
    url.searchParams.delete("chat");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    openChat({ timeoutMs: 15000 });
  }, []);

  return (
    // display: contents, so this wrapper only carries the font variables
    <div className={`${chatFontVariables} contents`}>
      <Script src={`${CHATBOT_URL}/widget/chatbot.js?v=${WIDGET_VERSION}`} strategy="lazyOnload" />
      <funding-chatbot
        api={`${CHATBOT_URL}/api/v1`}
        bot-name={BOT_NAME}
        avatar="ankur"
        company={COMPANY}
        subtitle={SUBTITLE}
        shadow="hard"
        greeting-repeat="always"
        font-body="var(--chat-font-body), 'Plus Jakarta Sans', system-ui, sans-serif"
        font-display="var(--chat-font-display), 'Plus Jakarta Sans', sans-serif"
        font-mono="var(--chat-font-mono), ui-monospace, monospace"
        /* Desktop and phones: no other floating buttons here, so the usual corner. Below lg the phone offsets apply. */
        offset-bottom="24px"
        offset-side="24px"
        offset-bottom-mobile="calc(16px + env(safe-area-inset-bottom))"
        offset-side-mobile="16px"
        mobile-breakpoint="1024"
        /* Under the Preloader and Diwali intro (9999) and the festival cursors (10000+) */
        z-index="9998"
      />
      {/* The mascot itself as the chat button, in place of the widget's round one */}
      {CHAT_LAUNCHER_MASCOT && <ChatLauncher botName={BOT_NAME} />}
      <ChatPresence botName={BOT_NAME} />
    </div>
  );
}
