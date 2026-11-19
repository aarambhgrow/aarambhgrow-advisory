import { Bricolage_Grotesque, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";

/*
  The chat's fonts, the same ones it uses on the Euroasia site (the rest of
  this site uses Geist). Self-hosted by next/font and not preloaded, so they
  only download once the chat shows up and don't slow the page down.
*/
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--chat-font-body",
  display: "swap",
  preload: false,
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--chat-font-display",
  display: "swap",
  preload: false,
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--chat-font-mono",
  display: "swap",
  preload: false,
});

// Class names that define the three CSS variables above
export const chatFontVariables = `${body.variable} ${display.variable} ${mono.variable}`;
