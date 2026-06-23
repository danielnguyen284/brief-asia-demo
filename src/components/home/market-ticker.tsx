import Link from "next/link";
import type { MarketSnapshot } from "@/lib/payload-server";

// Country name → flag emoji lookup (fallback to globe)
const COUNTRY_FLAGS: Record<string, string> = {
  Singapore: "🇸🇬",
  Japan: "🇯🇵",
  "Hong Kong": "🇭🇰",
  Indonesia: "🇮🇩",
  "South Korea": "🇰🇷",
  Vietnam: "🇻🇳",
  Taiwan: "🇹🇼",
  Thailand: "🇹🇭",
  Malaysia: "🇲🇾",
  India: "🇮🇳",
  Philippines: "🇵🇭",
  "China Watch": "🇨🇳",
  China: "🇨🇳",
  Australia: "🇦🇺",
};

interface MarketTickerProps {
  snapshots: Pick<MarketSnapshot, "id" | "country" | "market" | "value" | "changePct" | "summary">[];
}

export function MarketTicker({ snapshots }: MarketTickerProps) {
  const cards = snapshots.slice(0, 8);
  if (cards.length === 0) return null;

  return (
    <section style={{ marginBottom: 48 }}>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          borderTop: "3px solid var(--brand-navy)",
          paddingTop: 10,
          marginBottom: 18,
        }}
      >
        <div>
          <span
            className="mono upper"
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: ".14em",
              color: "var(--muted)",
            }}
          >
            Markets
          </span>
          <h2
            className="serif"
            style={{
              margin: "4px 0 0",
              fontSize: 22,
              fontWeight: 650,
              letterSpacing: "-0.015em",
            }}
          >
            Asia Market Snapshot
          </h2>
        </div>
        <Link
          href="/markets"
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--accent)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          All markets →
        </Link>
      </div>

      {/* 2×4 grid */}
      <div
        className="market-ticker-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        {cards.map((m) => {
          const isUp = m.changePct >= 0;
          const changeColor = isUp ? "#22c55e" : "#ef4444";
          const changeBg = isUp ? "rgba(34,197,94,.10)" : "rgba(239,68,68,.10)";
          const changeSign = isUp ? "+" : "";
          const flag = COUNTRY_FLAGS[m.country] ?? "🌏";

          return (
            <Link
              key={m.id}
              href="/markets"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                className="market-card"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--hair)",
                  borderRadius: 6,
                  padding: "14px 16px",
                  cursor: "pointer",
                  height: "100%",
                }}
              >
                {/* Country row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>
                    {flag}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div
                      className="mono"
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: ".1em",
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {m.country}
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m.market}
                    </div>
                  </div>
                </div>

                {/* Value + change badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      color: "var(--ink)",
                    }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: changeColor,
                      background: changeBg,
                      padding: "2px 7px",
                      borderRadius: 3,
                      flexShrink: 0,
                    }}
                  >
                    {changeSign}
                    {m.changePct.toFixed(2)}%
                  </span>
                </div>

                {/* Headline / summary */}
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    lineHeight: 1.45,
                    color: "var(--muted)",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {m.summary}
                </p>
              </article>
            </Link>
          );
        })}
      </div>

      <style>{`
        .market-card {
          transition: box-shadow .15s, border-color .15s;
        }
        .market-card:hover {
          box-shadow: 0 2px 12px rgba(0,0,0,.07);
          border-color: var(--hair-2, #d4d4d4);
        }
        @media (max-width: 960px) {
          .market-ticker-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 520px) {
          .market-ticker-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
