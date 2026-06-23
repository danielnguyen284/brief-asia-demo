import Link from "next/link";
import { notFound } from "next/navigation";

const countries = {
  singapore: ["Singapore", "Southeast Asia", "Financial, technology, property, and policy hub for Southeast Asia."],
  vietnam: ["Vietnam", "Southeast Asia", "Manufacturing, fintech, infrastructure, consumer, travel, and energy-transition coverage."],
  indonesia: ["Indonesia", "Southeast Asia", "Capital flows, platforms, mining, mobility, policy, and the region's largest consumer market."],
  malaysia: ["Malaysia", "Southeast Asia", "Chips, data centers, property, energy, logistics, and cross-border investment."],
  philippines: ["Philippines", "Southeast Asia", "Banks, remittances, consumer platforms, real estate, and infrastructure."],
  thailand: ["Thailand", "Southeast Asia", "Tourism, manufacturing, retail, mobility, sustainability, and capital markets."],
  china: ["China", "East Asia", "Industrial policy, capital markets, technology platforms, trade, and consumer shifts."],
  japan: ["Japan", "East Asia", "Markets, corporate reform, chips, travel, consumer, and sustainability coverage."],
  "south-korea": ["South Korea", "East Asia", "Semiconductors, entertainment, AI, mobility, finance, and consumer exports."],
  taiwan: ["Taiwan", "East Asia", "Chips, hardware supply chains, export controls, and capital markets."],
  "hong-kong": ["Hong Kong", "East Asia", "Listings, banks, wealth, property, and regional capital flows."],
  india: ["India", "South Asia", "Founders, capital markets, payments, policy, infrastructure, and energy transition."],
  bangladesh: ["Bangladesh", "South Asia", "Manufacturing, climate, finance, infrastructure, and consumer shifts."],
  "sri-lanka": ["Sri Lanka", "South Asia", "Tourism, debt, logistics, real estate, and energy coverage."],
  pakistan: ["Pakistan", "South Asia", "Payments, startups, trade, policy, manufacturing, and infrastructure."],
} as const;

export function generateStaticParams() {
  return Object.keys(countries).map((slug) => ({ slug }));
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = countries[slug as keyof typeof countries];
  if (!country) notFound();
  const [name, region, description] = country;
  return (
    <main style={{ padding: "34px 0 64px" }}>
      <div className="kicker" style={{ color: "var(--accent)" }}>{region}</div>
      <h1 className="serif" style={{ fontSize: "clamp(40px, 6vw, 66px)", lineHeight: 0.95, margin: "8px 0 12px" }}>{name}</h1>
      <p style={{ maxWidth: 720, color: "var(--ink-soft)", fontSize: 18 }}>{description}</p>
      <section style={{ marginTop: 30, display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(220px, 1fr)", gap: 18 }}>
        <article style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 6, padding: 22 }}>
          <div className="kicker" style={{ color: "var(--accent)" }}>Lead story</div>
          <h2 className="serif" style={{ fontSize: 34, lineHeight: 1, margin: "8px 0" }}>What to watch next in {name}</h2>
          <p style={{ color: "var(--muted)" }}>Country pages are wired into the BriefAsia taxonomy so articles can surface by geography as the CMS archive grows.</p>
          <Link className="ba-uline" href="/asia" style={{ color: "var(--accent)", fontWeight: 700 }}>Browse Asia coverage</Link>
        </article>
        <aside style={{ border: "1px solid var(--line)", borderRadius: 6, padding: 18 }}>
          <div className="kicker">Coverage lanes</div>
          <p>Business · Finance · Policy · Technology · Real Estate · Energy · Travel</p>
        </aside>
      </section>
    </main>
  );
}
