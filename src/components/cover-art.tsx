import type { CSSProperties } from "react";
import type { PillarId } from "@/lib/data";

// ============================================================================
// Editorial cover art.
// The BriefAsia prototype uses subject-revealing editorial imagery. Uploaded
// CMS images win; otherwise we fall back to deterministic editorial photos.
// ============================================================================

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h * 31) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

type Palette = [string, string, string, string];

const EDITORIAL_IMAGES: Record<PillarId, ReadonlyArray<string>> = {
  asia: [
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=1400&q=80",
  ],
  finance: [
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1400&q=80",
  ],
  technology: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
  ],
  "real-estate": [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
  ],
  "travel-dining": [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
  ],
  lifestyle: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
  ],
  sustainability: [
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80",
  ],
  perspectives: [
    "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
  ],
};

function editorialImageFor(pillar: string, seed: string): string | null {
  const key = (pillar as PillarId) in EDITORIAL_IMAGES ? (pillar as PillarId) : "asia";
  const images = EDITORIAL_IMAGES[key];
  return images[hashStr(seed) % images.length] ?? null;
}

const ART_PALETTES: Record<PillarId, ReadonlyArray<Palette>> = {
  asia: [
    ["#2E2147", "#A60F2D", "#F4EEF0", "#FCFBF8"],
    ["#4a4150", "#A60F2D", "#ddd5cf", "#FFFFFF"],
  ],
  finance: [
    ["#153A2A", "#1f8a5b", "#BFE6D1", "#FFFFFF"],
    ["#1F332C", "#1f8a5b", "#F4EEF0", "#FCFBF8"],
  ],
  technology: [
    ["#1E1B4B", "#3A4E8C", "#C4B5FD", "#FCFBF8"],
    ["#0F172A", "#3A4E8C", "#F4EEF0", "#FFFFFF"],
  ],
  "real-estate": [
    ["#451A03", "#8F7238", "#F4E2BF", "#FFFFFF"],
    ["#2E2147", "#8F7238", "#ddd5cf", "#FCFBF8"],
  ],
  "travel-dining": [
    ["#3B1D2A", "#9B4B62", "#F4EEF0", "#FFFFFF"],
    ["#2E2147", "#9B4B62", "#F4E1E7", "#FCFBF8"],
  ],
  lifestyle: [
    ["#2E2147", "#6F4E7C", "#E6D7EE", "#FFFFFF"],
    ["#3B2448", "#A60F2D", "#F4EEF0", "#FCFBF8"],
  ],
  sustainability: [
    ["#052E16", "#46735C", "#CFE8DB", "#FFFFFF"],
    ["#153A2A", "#1f8a5b", "#F4EEF0", "#FCFBF8"],
  ],
  perspectives: [
    ["#241a33", "#2E2147", "#ddd5cf", "#FCFBF8"],
    ["#111827", "#A60F2D", "#F4EEF0", "#FFFFFF"],
  ],
};

function pickPalette(pillar: string, seed: number): Palette {
  const list = ART_PALETTES[(pillar as PillarId) in ART_PALETTES ? (pillar as PillarId) : "asia"];
  return list[seed % list.length]!;
}

export interface CoverArtProps {
  pillar?: PillarId | string;
  seed?: string;
  label?: string;
  height?: number | string;
  /** Force a specific composition (0–5). When omitted, picks from the seed hash. */
  variant?: number;
  style?: CSSProperties;
  /** Real uploaded image URL. When set, the photo is shown instead of the
   *  generative SVG (which becomes the fallback for articles without a hero). */
  src?: string | null;
}

export function CoverArt({
  pillar = "asia",
  seed = "x",
  label,
  height = 240,
  variant,
  style = {},
  src,
}: CoverArtProps) {
  const editorialSrc = src ?? editorialImageFor(pillar, seed);

  if (editorialSrc) {
    return (
      <div style={{ position: "relative", height, overflow: "hidden", background: "var(--ph)", ...style }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={editorialSrc}
          alt={label ?? ""}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "saturate(.96) contrast(1.02)",
          }}
        />
      </div>
    );
  }

  const h = hashStr(String(seed));
  const v = variant != null ? variant : h % 6;
  const [c1, c2, c3, c4] = pickPalette(pillar, h);

  const w = 800;
  const hh = 480;
  let body: React.ReactNode = null;

  if (v === 0) {
    // Stacked tilted bars
    body = (
      <>
        <rect x={0} y={0} width={w} height={hh} fill={c1} />
        <g transform={`translate(${80 + (h % 60)} 60) rotate(-8)`}>
          <rect x={0} y={0} width={520} height={64} fill={c3} opacity={0.9} />
          <rect x={0} y={84} width={420} height={64} fill={c2} />
          <rect x={0} y={168} width={580} height={64} fill={c4} opacity={0.85} />
          <rect x={0} y={252} width={360} height={64} fill={c2} opacity={0.6} />
        </g>
        <circle cx={w - 100} cy={hh - 90} r={70} fill={c2} opacity={0.6} />
      </>
    );
  } else if (v === 1) {
    // Concentric circles
    body = (
      <>
        <rect x={0} y={0} width={w} height={hh} fill={c4} />
        <g transform={`translate(${w / 2} ${hh / 2})`}>
          {[220, 160, 110, 70, 40].map((r, i) => (
            <circle
              key={i}
              r={r}
              fill="none"
              stroke={i % 2 ? c2 : c1}
              strokeWidth={i === 0 ? 2 : 8}
              opacity={0.85 - i * 0.1}
            />
          ))}
          <circle r={20} fill={c2} />
        </g>
        <rect x={0} y={hh - 12} width={w} height={12} fill={c1} />
      </>
    );
  } else if (v === 2) {
    // Asymmetric grid blocks
    body = (
      <>
        <rect x={0} y={0} width={w} height={hh} fill={c4} />
        <rect x={0} y={0} width={w * 0.55} height={hh * 0.55} fill={c1} />
        <rect x={w * 0.55} y={0} width={w * 0.45} height={hh * 0.3} fill={c2} />
        <rect x={w * 0.55} y={hh * 0.3} width={w * 0.45} height={hh * 0.25} fill={c3} />
        <rect x={0} y={hh * 0.55} width={w * 0.35} height={hh * 0.45} fill={c2} opacity={0.7} />
        <rect x={w * 0.35} y={hh * 0.55} width={w * 0.65} height={hh * 0.45} fill={c3} opacity={0.55} />
        <circle cx={w * 0.35} cy={hh * 0.55} r={58} fill={c4} />
      </>
    );
  } else if (v === 3) {
    // Halftone gradient grid — round all derived floats to 2 decimals so
    // Math.hypot precision differences (Node vs browser libm) don't produce
    // diverging SVG attribute strings between SSR and hydration.
    const round2 = (n: number) => Math.round(n * 100) / 100;
    body = (
      <>
        <rect x={0} y={0} width={w} height={hh} fill={c1} />
        {Array.from({ length: 8 }).flatMap((_, r) =>
          Array.from({ length: 14 }).map((__, col) => {
            const cx = 30 + col * 55;
            const cy = 40 + r * 55;
            const dist = Math.hypot(cx - w * 0.7, cy - hh * 0.5);
            const rad = round2(Math.max(2, 22 - dist * 0.03));
            const opacity = round2(0.85 - dist * 0.001);
            return (
              <circle
                key={`${r}_${col}`}
                cx={cx}
                cy={cy}
                r={rad}
                fill={c3}
                opacity={opacity}
              />
            );
          })
        )}
        <rect x={w * 0.05} y={hh * 0.7} width={w * 0.5} height={3} fill={c2} />
      </>
    );
  } else if (v === 4) {
    // Data-viz feel.
    // Math.sin/Math.cos can return last-bit different values between Node V8
    // (SSR) and browser V8 (hydration) → SVG path attribute mismatch. Round
    // to 2 decimals so server and client produce byte-identical path strings.
    const round2 = (n: number) => Math.round(n * 100) / 100;
    const seriesA = Array.from({ length: 24 }).map(
      (_, i) => round2(30 + Math.sin(i * 0.7 + h * 0.01) * 60 + i * 8)
    );
    const seriesB = Array.from({ length: 24 }).map(
      (_, i) => round2(60 + Math.cos(i * 0.5 + h * 0.02) * 40 + i * 6)
    );
    const toPath = (s: number[]) =>
      "M " + s.map((y, i) => `${i * 32 + 30},${round2(hh - 80 - y)}`).join(" L ");
    body = (
      <>
        <rect x={0} y={0} width={w} height={hh} fill={c4} />
        <g>
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={i}
              x1={30}
              x2={w - 30}
              y1={80 + i * 70}
              y2={80 + i * 70}
              stroke={c1}
              strokeOpacity={0.1}
            />
          ))}
        </g>
        <path d={toPath(seriesA)} fill="none" stroke={c2} strokeWidth={4} strokeLinecap="round" />
        <path
          d={toPath(seriesB)}
          fill="none"
          stroke={c1}
          strokeWidth={2.5}
          strokeDasharray="6 6"
        />
        <rect x={w - 220} y={40} width={180} height={60} fill={c1} />
        <text
          x={w - 200}
          y={80}
          fill={c4}
          fontFamily="var(--font-mono)"
          fontSize={22}
          fontWeight={600}
        >
          +14.2%
        </text>
        <text
          x={w - 200}
          y={115}
          fill={c1}
          fontFamily="var(--font-mono)"
          fontSize={11}
        >
          vs prev. 30d
        </text>
      </>
    );
  } else {
    // Big typographic mark
    const glyph = String(label || pillar).slice(0, 2).toUpperCase();
    body = (
      <>
        <rect x={0} y={0} width={w} height={hh} fill={c1} />
        <rect x={0} y={0} width={w * 0.18} height={hh} fill={c2} />
        <rect
          x={w * 0.18}
          y={hh * 0.7}
          width={w * 0.82}
          height={hh * 0.3}
          fill={c3}
          opacity={0.8}
        />
        <text
          x={w * 0.22}
          y={hh * 0.62}
          fill={c4}
          fontFamily="var(--font-serif)"
          fontWeight={700}
          fontSize={280}
          letterSpacing={-18}
        >
          {glyph}
        </text>
        <line
          x1={w * 0.18}
          y1={hh * 0.7}
          x2={w}
          y2={hh * 0.7}
          stroke={c4}
          strokeWidth={2}
        />
      </>
    );
  }

  return (
    <div style={{ position: "relative", height, overflow: "hidden", ...style }}>
      <svg
        viewBox={`0 0 ${w} ${hh}`}
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ display: "block" }}
        role={label ? "img" : "presentation"}
        aria-label={label || undefined}
        aria-hidden={label ? undefined : true}
      >
        {body}
      </svg>
    </div>
  );
}

// ============================================================================
// Avatar – monogram on tinted background
// ============================================================================

export interface AvatarProps {
  name: string;
  size?: number;
  color?: string;
}

export function Avatar({ name, size = 36, color }: AvatarProps) {
  const initials = name.split(" ").map((s) => s[0] ?? "").slice(0, 2).join("").toUpperCase();
  const palette = ["#B0512E", "#3E6E80", "#3A4E8C", "#46735C", "#8F7238", "#475569"];
  const h = hashStr(name);
  const bg = color ?? palette[h % palette.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-serif)",
        fontWeight: 650,
        fontSize: size * 0.4,
        flexShrink: 0,
        letterSpacing: "-0.02em",
      }}
    >
      {initials}
    </div>
  );
}

// ============================================================================
// BrandMark – typographic sponsor lozenge
// ============================================================================

export interface BrandMarkProps {
  name: string;
  size?: number;
  monospace?: boolean;
  bg?: string;
  fg?: string;
}

export function BrandMark({
  name,
  size = 18,
  monospace = true,
  bg,
  fg,
}: BrandMarkProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 4,
        background: bg ?? "var(--ink)",
        color: fg ?? "var(--paper)",
        fontFamily: monospace ? "var(--font-mono)" : "var(--font-serif)",
        fontSize: size * 0.65,
        fontWeight: 600,
        letterSpacing: ".02em",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          background: fg ?? "var(--paper)",
          borderRadius: 1,
          opacity: 0.8,
        }}
      />
      {name}
    </span>
  );
}

// ============================================================================
// CityChip – typographic 2-letter city marker
// ============================================================================

const CITY_COLOR: Record<string, string> = {
  Singapore: "#B0512E",
  Seoul: "#3A4E8C",
  Jakarta: "#3E6E80",
  Hanoi: "#46735C",
  "Ho Chi Minh City": "#46735C",
  Tokyo: "#475569",
  Taipei: "#8F7238",
  Bengaluru: "#3E6E80",
  Shenzhen: "#7C2D12",
  Manila: "#8F7238",
  "Hong Kong": "#475569",
  Bangkok: "#3A4E8C",
};

export interface CityChipProps {
  city: string;
  size?: number;
}

export function CityChip({ city, size = 11 }: CityChipProps) {
  const c = CITY_COLOR[city] ?? "var(--muted)";
  return (
    <span
      className="mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: size,
        fontWeight: 600,
        color: "var(--ink)",
        textTransform: "uppercase",
        letterSpacing: ".08em",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          background: c,
          borderRadius: 99,
          display: "inline-block",
        }}
      />
      {city}
    </span>
  );
}
