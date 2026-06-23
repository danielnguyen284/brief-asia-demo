// Pillar registry. Matches the 6 Y1 pillars used by the design and the spec.
// Adding a pillar in production is a CMS write (invariant #8) — this list is
// the static fallback used during scaffold + tests + when CMS is unreachable.

export type PillarId = "asia" | "finance" | "technology" | "real-estate" | "travel-dining" | "lifestyle" | "sustainability" | "perspectives";

export interface Pillar {
  id: PillarId;
  label: string;
  /** CSS variable name in --pillar style. The actual color is set in globals.css. */
  cssVar: string;
}

export const PILLARS: ReadonlyArray<Pillar> = [
  { id: "asia", label: "Asia", cssVar: "--asia" },
  { id: "finance", label: "Finance", cssVar: "--finance" },
  { id: "technology", label: "Technology", cssVar: "--technology" },
  { id: "real-estate", label: "Real Estate", cssVar: "--real-estate" },
  { id: "travel-dining", label: "Travel & Dining", cssVar: "--travel-dining" },
  { id: "lifestyle", label: "Lifestyle", cssVar: "--lifestyle" },
  { id: "sustainability", label: "Sustainability", cssVar: "--sustainability" },
  { id: "perspectives", label: "Perspectives", cssVar: "--perspectives" },
];

export function pillarOf(id: string): Pillar {
  return PILLARS.find((p) => p.id === id) ?? PILLARS[0]!;
}
