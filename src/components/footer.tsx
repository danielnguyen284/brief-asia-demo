"use client";

import Link from "next/link";
import { Button } from "@briefasia/ui";
import { Icon, type IconName } from "@/components/icons";
import { Wordmark } from "@/components/wordmark";
import { useT, useLang } from "@/lib/i18n";

type FooterLink = readonly [label: string, href: string];

export function Footer() {
  const t = useT();
  const { lang, setLang } = useLang();

  const cols: ReadonlyArray<{ title: string; links: ReadonlyArray<FooterLink> }> = [
    {
      title: t("BriefAsia", "BriefAsia", "BriefAsia"),
      links: [
        [t("About", "Giới thiệu", "Tentang"), "/about"],
        [t("Newsroom", "Toà soạn", "Redaksi"), "/about/newsroom"],
        [t("Contact", "Liên hệ", "Kontak"), "/contact"],
        [t("Press inquiries", "Hỏi báo chí", "Pertanyaan pers"), "/press"],
      ],
    },
    {
      title: t("Editorial", "Biên tập", "Editorial"),
      links: [
        [t("Editorial Standards", "Tiêu chuẩn biên tập", "Standar Editorial"), "/trust/editorial"],
        [t("AI Disclosure", "Công bố AI", "Pengungkapan AI"), "/trust/ai"],
        [t("Corrections", "Đính chính", "Koreksi"), "/trust/corrections"],
        [t("Sponsored & Affiliate Policy", "Chính sách tài trợ & affiliate", "Kebijakan Sponsor & Afiliasi"), "/trust/sponsored"],
      ],
    },
    {
      title: t("Business", "Doanh nghiệp", "Bisnis"),
      links: [
        [t("Advertise", "Quảng cáo", "Iklan"), "/advertise"],
        [t("BriefAsia Studio", "BriefAsia Studio", "BriefAsia Studio"), "/studio"],
        [t("Awards", "Giải thưởng", "Penghargaan"), "/awards"],
        [t("Newsletters", "Bản tin", "Newsletter"), "/newsletters"],
      ],
    },
    {
      title: t("Legal", "Pháp lý", "Legal"),
      links: [
        [t("Privacy", "Quyền riêng tư", "Privasi"), "/legal/privacy"],
        [t("Terms", "Điều khoản", "Ketentuan"), "/legal/terms"],
        [t("Cookies", "Cookies", "Cookies"), "/legal/cookies"],
        [t("GDPR / PDPA", "GDPR / PDPA", "GDPR / PDPA"), "/legal/gdpr"],
      ],
    },
  ];

  const socials: ReadonlyArray<readonly [label: string, icon: IconName, href?: string]> = [
    ["X", "external"],
    ["LinkedIn", "external"],
    ["Instagram", "external"],
    ["Email", "mail", "mailto:info@briefasia.com"],
    ["RSS", "rss", "/rss.xml"],
  ];

  return (
    <footer
      style={{
        background: "var(--navy)",
        borderTop: "3px solid var(--navy)",
        marginTop: 60,
        color: "#FFFFFF",
      }}
    >
      {/* Newsletter strip */}
      <div style={{ background: "var(--accent)", borderBottom: "1px solid rgba(255, 255, 255, 0.15)" }}>
        <div
          className="container r-footer-news"
          style={{
            display: "grid",
            gap: 48,
            alignItems: "center",
            padding: "40px 24px",
          }}
        >
          <div>
            <div className="kicker" style={{ marginBottom: 8, color: "rgba(255, 255, 255, 0.8)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {t("Get the AM Brief", "Nhận bản tin buổi sáng", "Dapatkan AM Brief")}
            </div>
            <h3
              className="serif"
              style={{
                margin: "0 0 6px",
                fontSize: 24,
                fontWeight: 650,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                color: "#FFFFFF",
              }}
            >
              {t(
                "The 5-minute briefing on Asia's markets, power, technology and culture",
                "Bản tin 5 phút về công nghệ mỗi sáng, châu Á và thế giới.",
                "Ringkasan 5 menit teknologi setiap pagi, Asia dan dunia."
              )}
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.5 }}>
              {t(
                "Founders, operators, and policy people across Asia read it before the day starts. Double opt-in. No tracking pixels. Unsubscribe with one click.",
                "Các nhà sáng lập, quản lý và người làm chính sách khắp châu Á đọc trước khi ngày mới bắt đầu. Xác nhận kép. Không pixel theo dõi. Hủy đăng ký chỉ một cú nhấp.",
                "Para founder, operator, dan pembuat kebijakan di Asia membacanya sebelum hari dimulai. Konfirmasi ganda. Tanpa piksel pelacak. Berhenti berlangganan dengan satu klik."
              )}
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Confirmation email sent (demo)");
            }}
            style={{ display: "flex", gap: 8 }}
          >
            <input
              type="email"
              required
              placeholder={t("you@company.com", "ban@congty.com", "anda@perusahaan.com")}
              style={{
                flex: 1,
                padding: "12px 14px",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                borderRadius: 5,
                fontSize: 13,
                background: "rgba(255, 255, 255, 0.1)",
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
                fontWeight: 600,
                border: "1px solid #FFFFFF",
              }}
            >
              {t("Subscribe", "Đăng ký", "Berlangganan")}
            </Button>
          </form>
        </div>
      </div>

      {/* Cols */}
      <div
        className="container r-footer-cols"
        style={{
          padding: "48px 24px",
          display: "grid",
          gap: 32,
        }}
      >
        <div>
          <Wordmark size={26} invert={true} />
          <div
            className="mono"
            style={{ fontSize: 11, letterSpacing: ".08em", marginTop: 6, lineHeight: 1.5, color: "rgba(255, 255, 255, 0.5)" }}
          >
            Asia intelligence, briefed daily
          </div>
          <p
            style={{ fontSize: 12, lineHeight: 1.55, marginTop: 14, maxWidth: 280, color: "rgba(255, 255, 255, 0.7)" }}
          >
            {t(
              "An independent newsroom covering the people, capital, companies and policy shaping Asia.",
              "Một toà soạn độc lập đưa tin về nền kinh tế công nghệ châu Á, xuất bản từ Singapore.",
              "Ruang redaksi independen yang meliput ekonomi teknologi Asia, terbit dari Singapura."
            )}
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {socials.map(([k, ic, href]) => (
              <a
                key={k}
                title={k}
                href={href ?? "#"}
                style={{
                  width: 32,
                  height: 32,
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
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
                <Icon name={ic} size={13} color="#FFFFFF" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div
              className="upper"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: ".12em",
                marginBottom: 14,
                color: "#FFFFFF",
                textTransform: "uppercase",
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
                gap: 9,
              }}
            >
              {c.links.map(([l, p]) => (
                <li key={l}>
                  <Link
                    href={p}
                    style={{
                      fontSize: 12,
                      color: "rgba(255, 255, 255, 0.7)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
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
      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", background: "color-mix(in oklab, var(--navy) 88%, #000)" }}>
        <div
          className="container"
          style={{
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div className="mono" style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.5)" }}>
            © 2026 BriefAsia · Singapore · Member, Trust Project
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 11 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255, 255, 255, 0.5)" }}>
              <Icon name="globe" size={12} color="rgba(255, 255, 255, 0.4)" />
              <span>Asia Edition</span>
            </div>
            <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>|</span>
            <div style={{ display: "flex", gap: 8 }}>
              {(["en", "vi", "id"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: lang === l ? 700 : 400,
                    color: lang === l ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    padding: "2px 4px",
                    borderRadius: 2,
                    outline: "none",
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
