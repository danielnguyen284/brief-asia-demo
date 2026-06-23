"use client";

import Link from "next/link";
import { CoverArt } from "@/components/cover-art";
import type { ArticleView } from "@/lib/article-view";
import { localizedPillarLabel, useLang } from "@/lib/i18n";

export interface HomeHeroProps {
  lead: ArticleView;
  aside: ReadonlyArray<ArticleView>;
}

const liveUpdates = [
  "Bank Indonesia holds rate at 6.25% as rupiah stabilises",
  "GIC leads $1.2B round in Indonesian data-centre operator",
  "Vietnam Q2 GDP beats forecasts at 6.9% on export surge",
];

const takeaways = [
  "Capital rotates out of US/EU equities into hard ASEAN infrastructure.",
  "Data centres, power transmission and ports are the three priority lanes.",
  "Vietnam, Indonesia and the Philippines absorb the largest allocations.",
];

const tags = ["#Semiconductors", "#M&A", "#GreenFinance", "#DataCentres", "#ASEAN"];

function kicker(article: ArticleView, lang: string) {
  return `${localizedPillarLabel(article.pillar, lang as never)} · ${article.section}`.toUpperCase();
}

function SecondaryStory({ article, last }: { article: ArticleView; last: boolean }) {
  const { lang } = useLang();

  return (
    <Link href={`/article/${article.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
      <article
        style={{
          borderBottom: last ? "none" : "1px solid var(--line)",
          paddingBottom: last ? 0 : 18,
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
          {kicker(article, lang)}
        </div>
        <h2
          className="lk"
          style={{
            color: "var(--navy)",
            fontFamily: "var(--font-serif)",
            fontSize: 19,
            fontWeight: 600,
            lineHeight: 1.18,
            margin: "0 0 6px",
          }}
        >
          {article.title}
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-serif)",
            fontSize: 14,
            lineHeight: 1.45,
            margin: 0,
          }}
        >
          {article.dek}
        </p>
      </article>
    </Link>
  );
}

export function HomeHero({ lead, aside }: HomeHeroProps) {
  const { lang } = useLang();
  const secondary = aside.slice(0, 4);
  const mostRead = aside.slice(0, 6);

  return (
    <section className="ba-home-lead">
      <div className="ba-home-lead-main">
        <Link href={`/article/${lead.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
          <article>
            <CoverArt
              height={312}
              label=""
              pillar={lead.pillar}
              seed={lead.id}
              src={lead.heroImageUrl}
              variant={0}
            />
            <div
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 800,
                margin: "17px 0 11px",
                textTransform: "uppercase",
              }}
            >
              {kicker(lead, lang)}
            </div>
            <h1
              className="lk"
              style={{
                color: "var(--navy)",
                fontFamily: "var(--font-serif)",
                fontSize: 36,
                fontWeight: 600,
                lineHeight: 1.1,
                margin: "0 0 14px",
              }}
            >
              {lead.title}
            </h1>
            <p
              style={{
                color: "#544e57",
                fontFamily: "var(--font-serif)",
                fontSize: 17,
                lineHeight: 1.5,
                margin: "0 0 15px",
              }}
            >
              {lead.dek}
            </p>
            <div
              style={{
                background: "#fbf3f4",
                border: "1px solid #e9c8cf",
                marginBottom: 16,
                padding: "14px 17px",
              }}
            >
              <div
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 10,
                  textTransform: "uppercase",
                }}
              >
                KEY TAKEAWAYS
              </div>
              <ul
                style={{
                  color: "var(--ink-soft)",
                  display: "grid",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  gap: 8,
                  lineHeight: 1.42,
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                {takeaways.map((item) => (
                  <li key={item} style={{ display: "grid", gridTemplateColumns: "10px 1fr", gap: 8 }}>
                    <span style={{ color: "var(--accent)" }}>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                color: "#a8a39b",
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {lead.author} · {lead.readMin} min read
            </div>
          </article>
        </Link>

        <div className="ba-home-secondary">
          {secondary.map((article, index) => (
            <SecondaryStory
              article={article}
              key={article.id}
              last={index === secondary.length - 1}
            />
          ))}
        </div>
      </div>

      <aside className="ba-home-rail">
        <section
          style={{
            border: "1px solid var(--accent)",
            borderRadius: 2,
            marginBottom: 28,
            padding: "16px 18px",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 8, marginBottom: 16 }}>
            <span
              className="live-dot"
              style={{
                background: "var(--accent)",
                borderRadius: "50%",
                display: "inline-block",
                height: 8,
                width: 8,
              }}
            />
            <span
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.08em",
              }}
            >
              LIVE UPDATES
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {liveUpdates.map((item, index) => (
              <div
                className="lk"
                key={item}
                style={{
                  borderLeft: index === 0 ? "2px solid var(--accent)" : "1px solid var(--line)",
                  marginLeft: index === 0 ? 0 : 0.5,
                  paddingLeft: 14,
                  paddingBottom: index < liveUpdates.length - 1 ? 18 : 0,
                  color: "var(--navy)",
                  fontFamily: "var(--font-serif)",
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1.35,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section>
          <div
            style={{
              color: "var(--navy)",
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              paddingBottom: 10,
              borderBottom: "2px solid var(--navy)",
              marginBottom: 4,
            }}
          >
            MOST READ
          </div>
          <div>
            {mostRead.map((article, index) => (
              <Link
                href={`/article/${article.slug}`}
                key={article.id}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <div
                  className="lk"
                  style={{
                    borderBottom: index < mostRead.length - 1 ? "1px solid var(--line)" : "none",
                    color: "var(--navy)",
                    fontFamily: "var(--font-serif)",
                    fontSize: 15,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    padding: "14px 0",
                  }}
                >
                  {article.title}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 20,
          }}
        >
          {tags.map((tag) => (
            <span
              className="ba-chip"
              key={tag}
              style={{
                border: "1px solid #ecd3d9",
                color: "var(--accent)",
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 700,
                padding: "6px 10px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </aside>
    </section>
  );
}
