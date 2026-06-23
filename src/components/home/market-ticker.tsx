import Link from "next/link";
import type { MarketSnapshot } from "@/lib/payload-server";

interface MarketTickerProps {
  snapshots: Pick<
    MarketSnapshot,
    "id" | "country" | "market" | "value" | "changePct" | "summary"
  >[];
}

export function MarketTicker({ snapshots }: MarketTickerProps) {
  const cards = snapshots.slice(0, 8);
  if (cards.length === 0) return null;

  return (
    <section
      data-testid="market-band"
      style={{
        background: "var(--navy)",
        borderTop: "1px solid #e3ddd6",
        color: "#fff",
        margin: "62px calc(50% - 50vw) 0",
        padding: "34px 0",
        width: "100vw",
      }}
    >
      <div className="container">
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 14,
            marginBottom: 22,
          }}
        >
          <div style={{ alignItems: "baseline", display: "flex", gap: 14 }}>
            <span
              className="lk"
              style={{
                color: "#fff",
                fontFamily: "var(--font-sans)",
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              Markets
            </span>
            <span
              style={{
                color: "#b9b1c9",
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Updated 02:58 SGT
            </span>
          </div>
          <div style={{ flex: 1, borderTop: "1px solid rgba(255, 255, 255, 0.16)" }} />
          <Link
            className="lk"
            href="/markets"
            style={{
              color: "#f0a9b5",
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ALL MARKETS →
          </Link>
        </div>

        <div
          className="market-ticker-grid"
          style={{
            background: "rgba(255,255,255,.16)",
            border: "1px solid rgba(255,255,255,.16)",
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {cards.map((m) => {
            const isUp = m.changePct >= 0;
            const changeColor = isUp ? "#75d6a2" : "#f0a9b5";
            const changeSign = isUp ? "+" : "";

            return (
              <Link
                className="ba-card"
                href="/markets"
                key={m.id}
                style={{
                  background: "var(--navy)",
                  boxSizing: "border-box",
                  color: "#fff",
                  height: 95,
                  padding: "15px 16px 17px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 9,
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {m.country}
                  </span>
                  <span
                    style={{
                      color: changeColor,
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {changeSign}
                    {m.changePct.toFixed(2)}%
                  </span>
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,.55)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 10,
                    fontWeight: 600,
                    marginBottom: 3,
                    textTransform: "uppercase",
                  }}
                >
                  {m.market}
                </div>
                <div
                  style={{
                    color: "#fff",
                    fontFamily: "var(--font-sans)",
                    fontSize: 19,
                    fontWeight: 600,
                  }}
                >
                  {m.value}
                </div>
              </Link>
            );
          })}
          {Array.from({ length: (4 - (cards.length % 4)) % 4 }).map((_, i) => (
            <div key={`empty-${i}`} style={{ background: "var(--navy)" }} />
          ))}
        </div>
      </div>

      <style>{`
        .ba-card {
          transition: background .15s ease;
        }
        .ba-card:hover {
          background: color-mix(in oklab, var(--navy) 88%, white) !important;
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
