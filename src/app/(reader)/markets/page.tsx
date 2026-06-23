const markets = [
  ["Singapore", "STI", "3,887.12", 0.42, "Banks and industrials lifted the benchmark after a quiet open."],
  ["Japan", "Nikkei 225", "41,220.18", 0.81, "Exporters recovered as the yen softened in afternoon trade."],
  ["Hong Kong", "Hang Seng", "19,884.77", -0.36, "Property names weighed on the index despite firmer financials."],
  ["Indonesia", "JCI", "7,102.44", 0.25, "Energy and banking counters kept the market positive."],
  ["South Korea", "KOSPI", "2,918.56", 0.17, "Chip names stabilized after a volatile session."],
  ["Vietnam", "VN-Index", "1,301.09", -0.18, "Real estate and retail names traded mixed after recent gains."],
  ["Taiwan", "TAIEX", "22,604.31", 0.64, "Foundry and hardware exporters led the move."],
  ["Thailand", "SET", "1,384.40", -0.22, "Tourism-linked counters softened into the close."],
  ["Malaysia", "KLCI", "1,628.73", 0.31, "Banks and telcos kept the index in positive territory."],
  ["India", "Sensex", "78,228.01", 0.52, "Financials and industrials extended the regional bid."],
] as const;

export const metadata = {
  title: "Markets | BriefAsia",
  description: "Asian market snapshots with editorial context.",
};

export default function MarketsPage() {
  return (
    <main style={{ padding: "34px 0 64px" }}>
      <section style={{ borderBottom: "1px solid var(--line)", paddingBottom: 24, marginBottom: 28 }}>
        <div className="kicker" style={{ color: "var(--accent)" }}>Markets</div>
        <h1 className="serif" style={{ fontSize: "clamp(38px, 5vw, 62px)", lineHeight: 0.95, margin: "8px 0 12px" }}>
          Asia's trading day, made scannable.
        </h1>
        <p style={{ maxWidth: 720, color: "var(--ink-soft)", fontSize: 18 }}>
          Country and index snapshots with short newsroom context. Numbers are launch fixtures until live market feeds are connected.
        </p>
      </section>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
        {markets.map(([country, market, value, change, summary]) => {
          const up = change >= 0;
          return (
            <article key={market} className="ba-card" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 6, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div className="kicker" style={{ color: "var(--muted)" }}>{country}</div>
                  <h2 className="serif" style={{ margin: "5px 0 0", fontSize: 24 }}>{market}</h2>
                </div>
                <span className="mono" style={{ color: up ? "var(--up)" : "var(--down)", fontWeight: 700 }}>
                  {up ? "+" : ""}{change.toFixed(2)}%
                </span>
              </div>
              <div className="mono" style={{ fontSize: 28, marginTop: 18, color: "var(--ink)" }}>{value}</div>
              <p style={{ color: "var(--muted)", margin: "12px 0 0" }}>{summary}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
