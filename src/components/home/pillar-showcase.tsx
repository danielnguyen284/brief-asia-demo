"use client";

import Link from "next/link";
import { CoverArt } from "@/components/cover-art";
import { type NavPillar, type PillarId } from "@/lib/data";
import type { ArticleView } from "@/lib/article-view";
import { useLang } from "@/lib/i18n";

export interface PillarShowcaseProps {
  /** CMS pillars, ordered by `order`. Drives which bands show and their order. */
  pillars: NavPillar[];
  /** Articles grouped by pillar slug, sorted newest first. Up to 4 per pillar. */
  byPillar: Partial<Record<PillarId, ReadonlyArray<ArticleView>>>;
}

type Teaser = {
  author: string;
  dek: string;
  href: string;
  id: string;
  readMin: number;
  section: string;
  title: string;
  heroImageUrl?: string | null;
  pillar?: string;
};

const preferredOrder: PillarId[] = [
  "finance",
  "technology",
  "real-estate",
  "sustainability",
  "travel-dining",
  "lifestyle",
  "perspectives",
  "asia",
];

const fallbackTeasers: Partial<Record<PillarId, Teaser[]>> = {
  finance: [
    {
      author: "Mei Lin Tan",
      dek: "A competitive process for one of Southeast Asia's last independent payments networks signals that the consolidation wave still has room to run.",
      href: "/finance",
      id: "finance-deals",
      readMin: 7,
      section: "Deals",
      title: "Temasek and KKR circle a $4B stake in regional payments champion",
    },
    {
      author: "Rahul Mehta",
      dek: "",
      href: "/finance",
      id: "finance-banking-dbs",
      readMin: 4,
      section: "Banking",
      title: "DBS posts record quarter as net interest margin holds",
    },
    {
      author: "Sofia Reyes",
      dek: "",
      href: "/finance",
      id: "finance-fintech-goto",
      readMin: 6,
      section: "Fintech",
      title: "GoTo and Grab edge toward profitability at last",
    },
    {
      author: "Lena Koh",
      dek: "",
      href: "/finance",
      id: "finance-markets-etf",
      readMin: 5,
      section: "Markets",
      title: "Why Japanese retail money is flooding into India ETFs",
    },
    {
      author: "Nguyen Minh",
      dek: "",
      href: "/finance",
      id: "finance-vinfast",
      readMin: 8,
      section: "Deals",
      title: "VinFast's debt restructuring tests investor patience",
    },
    {
      author: "Lena Koh",
      dek: "",
      href: "/finance",
      id: "finance-digital-banks",
      readMin: 4,
      section: "Banking",
      title: "Philippines' digital banks hit 10M accounts milestone",
    },
    {
      author: "Rahul Mehta",
      dek: "",
      href: "/finance",
      id: "finance-stablecoin",
      readMin: 5,
      section: "Fintech",
      title: "Stablecoin licensing arrives in Hong Kong and Singapore",
    },
  ],
  technology: [
    {
      author: "Lena Koh",
      dek: "Singapore and Indonesia commit to domestic compute as the region tries to avoid renting its AI future.",
      href: "/technology",
      id: "tech-ai-budget",
      readMin: 6,
      section: "AI",
      title: "Southeast Asia's sovereign-AI race finds its first real budgets",
    },
    {
      author: "Nguyen Minh",
      dek: "",
      href: "/technology",
      id: "tech-chip-engineers",
      readMin: 7,
      section: "Semiconductors",
      title: "Inside Vietnam's scramble to train 50,000 chip engineers",
    },
    {
      author: "Rahul Mehta",
      dek: "",
      href: "/technology",
      id: "tech-platforms",
      readMin: 5,
      section: "Platforms",
      title: "The super-app reset reaches its most painful phase",
    },
  ],
  perspectives: [
    { id: "p1", section: "OPINION", title: "“The yen is no longer a currency story. It is the single biggest variable in Asian capital allocation.”", author: "Kenji Watanabe", dek: "Japan Bureau Chief", href: "/perspectives", readMin: 5 },
    { id: "p2", section: "ANALYSIS", title: "“ASEAN keeps being described as the next China. It is something stranger and more interesting than that.”", author: "Sofia Reyes", dek: "ASEAN Correspondent", href: "/perspectives", readMin: 5 },
    { id: "p3", section: "FOUNDERS", title: "“Founders here have stopped copying the Valley. The best ideas are now flowing in the other direction.”", author: "Rahul Mehta", dek: "Founder, ex-Sequoia", href: "/perspectives", readMin: 5 },
  ],
  asia: [
    { id: "a1", section: "SINGAPORE", title: "Singapore doubles down on its role as Asia's wealth and capital hub", author: "", dek: "", href: "/asia", readMin: 0 },
    { id: "a2", section: "VIETNAM", title: "Vietnam's reform agenda enters its most consequential year", author: "", dek: "", href: "/asia", readMin: 0 },
    { id: "a3", section: "INDONESIA", title: "Indonesia's downstreaming bet enters its decisive phase", author: "", dek: "", href: "/asia", readMin: 0 },
    { id: "a4", section: "MALAYSIA", title: "Johor's SEZ turns Malaysia into the region's factory frontier", author: "", dek: "", href: "/asia", readMin: 0 },
    { id: "a5", section: "PHILIPPINES", title: "The Philippines' BPO sector pivots hard into AI services", author: "", dek: "", href: "/asia", readMin: 0 },
    { id: "a6", section: "THAILAND", title: "Thailand bets on EV manufacturing to revive its auto heartland", author: "", dek: "", href: "/asia", readMin: 0 },
    { id: "a7", section: "CHINA", title: "Reading Beijing's next move on consumer stimulus", author: "", dek: "", href: "/asia", readMin: 0 },
    { id: "a8", section: "JAPAN", title: "Why the yen is now the single biggest variable in Asian capital", author: "", dek: "", href: "/asia", readMin: 0 },
    { id: "a9", section: "SOUTH KOREA", title: "Korea's memory giants bet the cycle has turned", author: "", dek: "", href: "/asia", readMin: 0 },
    { id: "a10", section: "TAIWAN", title: "The quiet diversification of the island's supply chain", author: "", dek: "", href: "/asia", readMin: 0 },
    { id: "a11", section: "HONG KONG", title: "Hong Kong reclaims the IPO crown as listings surge 40%", author: "", dek: "", href: "/asia", readMin: 0 },
    { id: "a12", section: "INDIA", title: "Why global capability centres keep choosing Hyderabad", author: "", dek: "", href: "/asia", readMin: 0 },
  ],
};

const genericFallbacks: Teaser[] = [
  {
    author: "BriefAsia Newsroom",
    dek: "The latest reporting from across Asia, selected by the editors.",
    href: "/asia",
    id: "generic-lead",
    readMin: 5,
    section: "Analysis",
    title: "Asia's next cycle is being priced in faster than expected",
  },
  {
    author: "BriefAsia Newsroom",
    dek: "",
    href: "/asia",
    id: "generic-1",
    readMin: 4,
    section: "Briefing",
    title: "The signals regional executives are watching this week",
  },
  {
    author: "BriefAsia Newsroom",
    dek: "",
    href: "/asia",
    id: "generic-2",
    readMin: 5,
    section: "Markets",
    title: "Capital flows rotate toward resilient domestic demand",
  },
  {
    author: "BriefAsia Newsroom",
    dek: "",
    href: "/asia",
    id: "generic-3",
    readMin: 6,
    section: "Policy",
    title: "New rules reshape the operating map for regional firms",
  },
  {
    author: "BriefAsia Newsroom",
    dek: "",
    href: "/asia",
    id: "generic-4",
    readMin: 4,
    section: "Deals",
    title: "Regional M&A activity picks up as valuation gaps narrow",
  },
  {
    author: "BriefAsia Newsroom",
    dek: "",
    href: "/asia",
    id: "generic-5",
    readMin: 5,
    section: "Economy",
    title: "Supply chain shifts accelerate foreign direct investment",
  },
  {
    author: "BriefAsia Newsroom",
    dek: "",
    href: "/asia",
    id: "generic-6",
    readMin: 6,
    section: "Energy",
    title: "Green transition drives record infrastructure spending",
  },
];

function sortPillars(pillars: NavPillar[]) {
  return [...pillars]
    .filter((p) => preferredOrder.includes(p.slug as PillarId))
    .sort((a, b) => {
      const ai = preferredOrder.indexOf(a.slug as PillarId);
      const bi = preferredOrder.indexOf(b.slug as PillarId);
      return ai - bi;
    });
}

function toTeaser(article: ArticleView): Teaser {
  return {
    author: article.author,
    dek: article.dek,
    href: `/article/${article.slug}`,
    id: article.id,
    readMin: article.readMin,
    section: article.section,
    title: article.title,
    heroImageUrl: article.heroImageUrl,
    pillar: article.pillar,
  };
}

function teasersFor(slug: PillarId, articles: ReadonlyArray<ArticleView>, limit = 7) {
  const real = articles.map(toTeaser);
  const specificFallback = fallbackTeasers[slug] ?? [];
  const combinedFallbacks = [...specificFallback, ...genericFallbacks];
  const seen = new Set(real.map((item) => item.title));
  
  const filled = [
    ...real,
    ...combinedFallbacks
      .filter((item) => {
        if (seen.has(item.title)) return false;
        seen.add(item.title); // prevent duplicates from generic
        return true;
      })
      .map((item) => ({ ...item, href: item.href === "/asia" ? `/${slug}` : item.href })),
  ];
  return filled.slice(0, limit);
}

function StoryRow({ article, last }: { article: Teaser; last: boolean }) {
  return (
    <Link href={article.href} style={{ color: "inherit", textDecoration: "none" }}>
      <article
        className="lk"
        style={{
          borderTop: "1px solid var(--line)",
          padding: "16px 0",
        }}
      >
        <div
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-sans)",
            fontSize: 10,
            fontWeight: 800,
            marginBottom: 7,
            textTransform: "uppercase",
          }}
        >
          {article.section}
        </div>
        <h4
          style={{
            color: "var(--navy)",
            fontFamily: "var(--font-serif)",
            fontSize: 17,
            fontWeight: 600,
            lineHeight: 1.2,
            margin: "0 0 6px",
          }}
        >
          {article.title}
        </h4>
        <div
          style={{
            color: "#a8a39b",
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          {article.author} · {article.readMin} min
        </div>
      </article>
    </Link>
  );
}

function PerspectivesPillar({ p, items }: { p: NavPillar; items: Teaser[] }) {
  const voices = items.slice(0, 3);
  return (
    <section
      data-testid="vertical-perspectives"
      style={{
        background: "var(--navy)",
        margin: "0 calc(50% - 50vw)",
        padding: "48px 0 64px",
        width: "100vw",
        color: "var(--paper)"
      }}
    >
      <div className="container">
        <div style={{ alignItems: "center", display: "flex", gap: 14, marginBottom: 40 }}>
          <h2 className="lk" style={{ color: "var(--paper)", fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 700, margin: 0 }}>
            {p.title.en || "Perspectives"}
          </h2>
          <div style={{ flex: 1, borderTop: "1px solid rgba(255,255,255,0.2)" }} />
          <Link className="lk" href={`/${p.slug}`} style={{ color: "#f0a9b5", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            ALL VOICES →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
          {voices.map(article => (
            <Link key={article.id} href={article.href} style={{ color: "inherit", textDecoration: "none" }}>
              <article className="lk" style={{ borderTop: "2px solid var(--accent)", paddingTop: 16 }}>
                <div style={{ color: "#f0a9b5", fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 800, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {article.section}
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 21, fontWeight: 600, lineHeight: 1.3, margin: "0 0 24px" }}>
                  {article.title}
                </h3>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700 }}>
                  {article.author}
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                  {article.dek}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AsiaPillar({ p, items }: { p: NavPillar; items: Teaser[] }) {
  const gridItems = items.slice(0, 12);
  
  return (
    <section
      data-testid="vertical-asia"
      style={{
        background: "#fff",
        margin: "0 calc(50% - 50vw)",
        padding: "48px 0 64px",
        width: "100vw",
        borderTop: "1px solid var(--line)"
      }}
    >
      <div className="container">
        <div style={{ alignItems: "center", display: "flex", gap: 14, marginBottom: 40 }}>
          <h2 className="lk" style={{ color: "var(--navy)", fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 700, margin: 0 }}>
            Across Asia
          </h2>
          <div style={{ flex: 1, borderTop: "1px solid var(--navy)" }} />
          <Link className="lk" href={`/${p.slug}`} style={{ color: "var(--accent)", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            COUNTRY BY COUNTRY →
          </Link>
        </div>

        <div className="r-grid-4" style={{ display: "grid", gap: "24px 34px" }}>
          {gridItems.map((article, i) => {
            const row = Math.floor(i / 4);
            return (
              <Link key={article.id} href={article.href} style={{ color: "inherit", textDecoration: "none" }}>
                <article className="lk" style={{ borderTop: row > 0 ? "1px solid var(--line)" : "none", paddingTop: row > 0 ? 16 : 0, height: "100%" }}>
                  <div style={{ color: "var(--accent)", fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 800, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {article.section}
                  </div>
                  <h4 style={{ color: "var(--navy)", fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
                    {article.title}
                  </h4>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}

function CompactStoryRow({ article }: { article: Teaser }) {
  return (
    <Link href={article.href} style={{ color: "inherit", textDecoration: "none" }}>
      <article
        className="lk"
        style={{
          borderTop: "1px solid var(--line)",
          padding: "16px 0",
        }}
      >
        <h4
          style={{
            color: "var(--navy)",
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            fontWeight: 600,
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {article.title}
        </h4>
      </article>
    </Link>
  );
}

function HalfWidthPillar({ p, items, lang }: { p: NavPillar; items: Teaser[]; lang: "en" }) {
  const lead = items[0];
  if (!lead) return null;
  const listItems = items.slice(1, 5); // 4 items

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <h2
          className="lk"
          style={{
            color: "var(--navy)",
            fontFamily: "var(--font-sans)",
            fontSize: 18,
            fontWeight: 900,
            margin: 0,
          }}
        >
          {p.title[lang] ?? p.title.en}
        </h2>
        <div style={{ flex: 1, borderTop: "1px solid var(--navy)" }} />
        <Link
          className="lk"
          href={`/${p.slug}`}
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          MORE →
        </Link>
      </div>

      <Link href={lead.href} style={{ color: "inherit", textDecoration: "none" }}>
        <article style={{ marginBottom: 20 }}>
          <CoverArt
            height={180}
            label=""
            pillar={(lead.pillar ?? p.slug) as PillarId}
            seed={lead.id}
            src={lead.heroImageUrl ?? null}
            variant={0}
          />
          <div
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              fontWeight: 800,
              margin: "12px 0 6px",
              textTransform: "uppercase",
            }}
          >
            {lead.section}
          </div>
          <h3
            className="lk"
            style={{
              color: "var(--navy)",
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {lead.title}
          </h3>
        </article>
      </Link>

      <div>
        {listItems.map((article) => (
          <CompactStoryRow key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export function PillarShowcase({ pillars, byPillar }: PillarShowcaseProps) {
  const { lang } = useLang();
  const ordered = sortPillars(pillars);

  return (
    <>
      {ordered.map((p, sectionIndex) => {
        if (p.slug === "perspectives") {
          const items = teasersFor(p.slug as PillarId, byPillar[p.slug as PillarId] ?? [], 3);
          return <PerspectivesPillar key={p.slug} p={p} items={items} />;
        }
        if (p.slug === "asia") {
          const items = teasersFor(p.slug as PillarId, byPillar[p.slug as PillarId] ?? [], 12);
          return <AsiaPillar key={p.slug} p={p} items={items} />;
        }

        if (p.slug === "lifestyle") return null;

        const items = teasersFor(p.slug as PillarId, byPillar[p.slug as PillarId] ?? []);
        const lead = items[0];
        if (!lead) return null;

        if (p.slug === "travel-dining") {
          const companionSlug = "lifestyle";
          const companionPillar = ordered.find((o) => o.slug === companionSlug);
          const companionItems = companionPillar
            ? teasersFor(companionPillar.slug as PillarId, byPillar[companionPillar.slug as PillarId] ?? [])
            : [];
            
          return (
            <section
              data-testid={`half-width-${p.slug}`}
              key={p.slug}
              style={{
                background: "#fff",
                borderTop: "1px solid #e3ddd6",
                margin: "0 calc(50% - 50vw)",
                padding: "38px 0",
                width: "100vw",
              }}
            >
              <div
                className="container"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: 40,
                }}
              >
                <HalfWidthPillar p={p} items={items} lang={lang as any} />
                {companionPillar && companionItems.length > 0 && (
                  <HalfWidthPillar p={companionPillar} items={companionItems} lang={lang as any} />
                )}
              </div>
            </section>
          );
        }

        const isTinted = sectionIndex % 2 === 1;
        const gridClass = isTinted ? "ba-vertical-grid-4" : "ba-vertical-grid";
        
        const col1 = isTinted ? items.slice(1, 3) : items.slice(1, 4);
        const col2 = isTinted ? items.slice(3, 5) : items.slice(4, 7);
        const col3 = isTinted ? items.slice(5, 7) : [];

        return (
          <section
            data-testid={`vertical-${p.slug}`}
            key={p.slug}
            style={{
              background: isTinted ? "var(--paper)" : "#fff",
              borderTop: "1px solid #e3ddd6",
              margin: "0 calc(50% - 50vw)",
              padding: "38px 0",
              width: "100vw",
            }}
          >
            <div className="container">
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  gap: 14,
                  marginBottom: 26,
                }}
              >
                <h2
                  className="lk"
                  style={{
                    color: "var(--navy)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 22,
                    fontWeight: 900,
                    margin: 0,
                  }}
                >
                  {p.title[lang] ?? p.title.en}
                </h2>
                <div style={{ flex: 1, borderTop: "1px solid var(--navy)" }} />
                <Link
                  className="lk"
                  href={`/${p.slug}`}
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  SEE ALL →
                </Link>
              </div>

              <div className={gridClass}>
                <Link
                  href={lead.href}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <article>
                    <CoverArt
                      height={200}
                      label=""
                      pillar={(lead.pillar ?? p.slug) as PillarId}
                      seed={lead.id}
                      src={lead.heroImageUrl ?? null}
                      variant={0}
                    />
                    <div
                      style={{
                        color: "var(--accent)",
                        fontFamily: "var(--font-sans)",
                        fontSize: 11,
                        fontWeight: 800,
                        margin: "16px 0 9px",
                        textTransform: "uppercase",
                      }}
                    >
                      {lead.section}
                    </div>
                    <h3
                      className="lk"
                      style={{
                        color: "var(--navy)",
                        fontFamily: "var(--font-serif)",
                        fontSize: 26,
                        fontWeight: 600,
                        lineHeight: 1.14,
                        margin: "0 0 11px",
                      }}
                    >
                      {lead.title}
                    </h3>
                    <p
                      style={{
                        color: "#544e57",
                        fontFamily: "var(--font-serif)",
                        fontSize: 16,
                        lineHeight: 1.5,
                        margin: "0 0 11px",
                      }}
                    >
                      {lead.dek}
                    </p>
                    <div
                      style={{
                        color: "#a8a39b",
                        fontFamily: "var(--font-sans)",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {lead.author} · {lead.readMin} min
                    </div>
                  </article>
                </Link>

                <div>
                  {col1.map((article, index) => (
                    <StoryRow
                      article={article}
                      key={article.id}
                      last={index === col1.length - 1}
                    />
                  ))}
                </div>

                <div>
                  {col2.map((article, index) => (
                    <StoryRow
                      article={article}
                      key={article.id}
                      last={index === col2.length - 1}
                    />
                  ))}
                </div>

                {col3.length > 0 && (
                  <div>
                    {col3.map((article, index) => (
                      <StoryRow
                        article={article}
                        key={article.id}
                        last={index === col3.length - 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
