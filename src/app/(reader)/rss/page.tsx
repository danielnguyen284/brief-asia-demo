const feeds = [
  ["All stories", "https://briefasia.com/feed.xml"],
  ["Finance", "https://briefasia.com/finance/feed.xml"],
  ["Technology", "https://briefasia.com/technology/feed.xml"],
  ["Real Estate", "https://briefasia.com/real-estate/feed.xml"],
  ["Sustainability", "https://briefasia.com/sustainability/feed.xml"],
  ["Perspectives", "https://briefasia.com/perspectives/feed.xml"],
] as const;

export const metadata = {
  title: "RSS | BriefAsia",
  description: "BriefAsia RSS feeds.",
};

export default function RssPage() {
  return (
    <main style={{ padding: "34px 0 64px" }}>
      <div className="kicker" style={{ color: "var(--accent)" }}>RSS</div>
      <h1 className="serif" style={{ fontSize: "clamp(38px, 5vw, 60px)", lineHeight: 0.95, margin: "8px 0 12px" }}>
        Every BriefAsia article, the moment it publishes.
      </h1>
      <p style={{ maxWidth: 720, color: "var(--ink-soft)", fontSize: 18 }}>
        Add these feeds to Feedly, Inoreader, NetNewsWire, Reeder, The Old Reader, or any standards-based reader.
      </p>
      <section style={{ display: "grid", gap: 12, marginTop: 28 }}>
        {feeds.map(([label, url]) => (
          <div key={url} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 12, alignItems: "center", border: "1px solid var(--line)", background: "#fff", borderRadius: 6, padding: 14 }}>
            <strong>{label}</strong>
            <input readOnly value={url} className="mono" style={{ width: "100%", border: "1px solid var(--line-strong)", borderRadius: 4, padding: "10px 12px", color: "var(--ink)", background: "var(--paper)" }} />
          </div>
        ))}
      </section>
    </main>
  );
}
