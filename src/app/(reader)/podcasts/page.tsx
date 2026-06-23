const shows = [
  ["The Morning Brief", "Weekday intelligence for Asia decision-makers.", "12:40", "Mei Lin Tan"],
  ["Capital Flows", "Markets, deals, banking, fintech, and where regional money is moving.", "31:22", "Jordan Chen"],
  ["The Asia Tech Show", "AI, startups, chips, infrastructure, platforms, and policy.", "38:11", "Ravi Kim"],
  ["Founders of the Region", "Founder stories and operating lessons from across Asia.", "44:50", "Arif Rahman"],
] as const;

export const metadata = {
  title: "Podcasts | BriefAsia",
  description: "BriefAsia audio shows and episodes.",
};

export default function PodcastsPage() {
  return (
    <main style={{ padding: "34px 0 64px" }}>
      <section style={{ background: "var(--banner)", color: "#fff", padding: 28, borderRadius: 6, marginBottom: 28 }}>
        <div className="kicker" style={{ color: "#f4c2cb" }}>Audio</div>
        <h1 className="serif" style={{ fontSize: "clamp(38px, 5vw, 60px)", lineHeight: 0.95, margin: "8px 0 10px" }}>
          Listen to the forces shaping Asia.
        </h1>
        <p style={{ maxWidth: 720, color: "#f4eef0", fontSize: 18 }}>
          BriefAsia podcasts turn the day's business, market, technology, and policy signals into focused conversations.
        </p>
      </section>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        {shows.map(([show, deck, duration, host], index) => (
          <article key={show} className="ba-card" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 6, padding: 18 }}>
            <div className="kicker" style={{ color: "var(--accent)" }}>Episode {String(index + 1).padStart(2, "0")}</div>
            <h2 className="serif" style={{ fontSize: 28, lineHeight: 1, margin: "8px 0" }}>{show}</h2>
            <p style={{ color: "var(--ink-soft)", minHeight: 72 }}>{deck}</p>
            <div className="mono" style={{ display: "flex", justifyContent: "space-between", color: "var(--muted)", borderTop: "1px solid var(--line)", paddingTop: 12 }}>
              <span>{duration}</span>
              <span>{host}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
