"use client";

import Link from "next/link";
import { Button } from "@briefasia/ui";
import { Icon, type IconName } from "@/components/icons";
import { Wordmark } from "@/components/wordmark";
import { useLang } from "@/lib/i18n";

type FooterLink = readonly [label: string, href: string];

export function Footer() {
  const { lang, setLang } = useLang();

  const cols: ReadonlyArray<{ title: string; links: ReadonlyArray<FooterLink> }> = [
    {
      title: "VERTICALS",
      links: [
        ["Asia", "/asia"],
        ["Finance", "/finance"],
        ["Technology", "/technology"],
        ["Real Estate", "/real-estate"],
        ["Sustainability", "/sustainability"],
        ["Lifestyle", "/lifestyle"],
        ["Perspectives", "/perspectives"],
      ],
    },
    {
      title: "COMPANY",
      links: [
        ["About", "/about"],
        ["Editorial Standards", "/trust/editorial"],
        ["Corrections", "/trust/corrections"],
        ["Advertise", "/advertise"],
        ["Contact", "/contact"],
      ],
    },
    {
      title: "PRODUCTS",
      links: [
        ["Newsletters", "/newsletters"],
        ["Morning Brief", "/newsletters/morning-brief"],
        ["Podcast", "/podcast"],
        ["RSS", "/rss.xml"],
      ],
    },
  ];

  const socials: ReadonlyArray<readonly [label: string, icon: IconName, href?: string]> = [
    ["LinkedIn", "linkedin", "https://linkedin.com"],
    ["WhatsApp", "whatsapp", "https://whatsapp.com"],
    ["Facebook", "facebook", "https://facebook.com"],
    ["Instagram", "instagram", "https://instagram.com"],
    ["Email", "mail", "mailto:info@briefasia.com"],
  ];

  return (
    <footer
      style={{
        background: "var(--navy)",
        marginTop: 60,
        color: "#FFFFFF",
      }}
    >
      {/* Newsletter strip */}
      <div style={{ background: "var(--accent)" }}>
        <div
          className="container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 40,
            alignItems: "center",
            justifyContent: "space-between",
            padding: "48px 24px",
          }}
        >
          <div style={{ maxWidth: 500 }}>
            <div className="kicker" style={{ marginBottom: 12, color: "rgba(255, 255, 255, 0.9)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              THE MORNING BRIEF · WEEKDAYS 7AM
            </div>
            <h3
              className="serif"
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                color: "#FFFFFF",
              }}
            >
              Asia’s overnight moves, distilled into a five-minute read.
            </h3>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Confirmation email sent (demo)");
            }}
            style={{ display: "flex", gap: 12, alignItems: "center" }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              style={{
                width: 280,
                padding: "14px 20px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 30,
                fontSize: 14,
                background: "rgba(255, 255, 255, 0.15)",
                color: "#FFFFFF",
                fontFamily: "var(--font-sans)",
                outline: "none",
              }}
            />
            <Button
              variant="accent"
              size="lg"
              type="submit"
              style={{
                background: "#FFFFFF",
                color: "var(--accent)",
                fontWeight: 700,
                border: "none",
                borderRadius: 30,
                padding: "14px 28px",
                fontSize: 14,
              }}
            >
              Subscribe free
            </Button>
          </form>
        </div>
      </div>

      {/* Cols */}
      <div
        className="container"
        style={{
          padding: "64px 24px 80px",
          display: "grid",
          gridTemplateColumns: "minmax(300px, 1.5fr) 1fr 1fr 1fr",
          gap: 48,
        }}
      >
        <div>
          <Wordmark size={32} invert={true} />
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              marginTop: 20,
              marginBottom: 32,
              maxWidth: 320,
              color: "rgba(255, 255, 255, 0.65)",
              fontFamily: "var(--font-serif)"
            }}
          >
            All of Asia. An independent newsroom covering the business, finance, technology and culture shaping the region, and the forces moving it next.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {socials.map(([k, ic, href]) => (
              <a
                key={k}
                title={k}
                href={href ?? "#"}
                style={{
                  width: 36,
                  height: 36,
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 18,
                  cursor: "pointer",
                  color: "#FFFFFF",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon name={ic} size={14} color="#FFFFFF" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".08em",
                marginBottom: 20,
                color: "rgba(255, 255, 255, 0.7)",
                textTransform: "uppercase",
                fontFamily: "var(--font-sans)"
              }}
            >
              {c.title}
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {c.links.map(([l, p]) => (
                <li key={l}>
                  <Link
                    href={p}
                    style={{
                      fontSize: 13,
                      color: "rgba(255, 255, 255, 0.8)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      fontFamily: "var(--font-sans)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                    }}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Trust band */}
      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div
          className="container"
          style={{
            padding: "24px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.5)", fontFamily: "var(--font-sans)" }}>
            © 2026 BriefAsia Pte. Ltd. - Singapore · Editorial Standards · Privacy · Terms · PDPA
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 11 }}>
            <span style={{ color: "rgba(255, 255, 255, 0.5)", letterSpacing: "0.05em" }}>EDITION</span>
            <div style={{ display: "flex", gap: 8 }}>
              {(["EN", "繁", "日", "ID", "VI"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l.toLowerCase() as any)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 10,
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.7)",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 14,
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
