import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Navratri — A little Garba, in every movement",
  description:
    "An interactive Navratri experiment: a Dandiya cursor that paints with light, built with WebGL and GLSL.",
};

export const viewport: Viewport = {
  themeColor: "#050304",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
      // Keep route changes instant even though in-page links scroll smoothly.
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
