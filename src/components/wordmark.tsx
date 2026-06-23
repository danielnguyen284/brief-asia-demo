/**
 * BriefAsia brand lockup: a navy BA monogram and restrained editorial wordmark.
 */
export function Wordmark({ size = 32, invert = false }: { size?: number; invert?: boolean }) {
  return (
    <svg
      height={size * 1.7}
      viewBox="0 18 252 64"
      aria-label="BriefAsia"
      role="img"
      style={{ display: "block", overflow: "visible" }}
    >
      <rect x="0" y="20" width="60" height="60" rx="6" fill={invert ? "var(--accent)" : "var(--navy)"} />
      <text x="30" y="60" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="24" letterSpacing="0" fill="var(--paper)">BA</text>
      <text x="76" y="52" fontFamily="'Newsreader', Georgia, serif" fontWeight="700" fontSize="31" letterSpacing="0" fill={invert ? "#FFFFFF" : "var(--accent)"}>BriefAsia</text>
      <text x="78" y="70" fontFamily="'IBM Plex Sans','Helvetica Neue',sans-serif" fontWeight="600" fontSize="10" letterSpacing=".13em" fill={invert ? "rgba(255, 255, 255, 0.5)" : "var(--muted)"}>ASIA INTELLIGENCE</text>
    </svg>
  );
}
