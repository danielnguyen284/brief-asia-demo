import type { Metadata } from "next";
import {
  Archivo_Black,
  Be_Vietnam_Pro,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Newsreader,
} from "next/font/google";
import "./globals.css";

// Reader chrome (header, footer, providers, modals) lives in (reader)/layout.tsx
// so /admin (Payload) renders without it. The root layout owns html, body, and
// font preloads only.

// Prototype typography: Newsreader is the editorial voice.
// The --font-serif token name is kept for backward-compat across components.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif-loaded",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  display: "swap",
  weight: ["400", "500", "600"],
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-vietnam-loaded",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "BriefAsia",
  description: "What just happened in Asia, why it matters, and what to watch next.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} ${beVietnam.variable} ${archivoBlack.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
