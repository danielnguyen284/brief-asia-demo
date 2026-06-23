"use client";

import { useT } from "@/lib/i18n";
import { useEffect, useState } from "react";

const breakingNews = [
  "MAS clears DBS for digital-asset custody services in Singapore.",
  "TSMC announces $12B advanced packaging facility expansion.",
  "UPI-Vietnam payment connection goes live for cross-border merchants.",
  "VNG Corp reports 34% revenue growth in latest quarterly statement.",
  "Straits Times Index hits 3-year high amid financial sector surge.",
];

export function BreakingTicker() {
  const t = useT();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        background: "#8B0000",
        color: "#ffffff",
        height: "36px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        fontSize: "13px",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        marginBottom: "24px",
      }}
    >
      {/* Label Badge */}
      <div
        style={{
          background: "#FFD700",
          color: "#8B0000",
          fontWeight: 700,
          padding: "0 16px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          zIndex: 10,
          boxShadow: "4px 0 10px rgba(0,0,0,0.15)",
        }}
      >
        {t("BREAKING", "TIN NÓNG", "BREAKING")}
      </div>

      {/* Marquee Wrapper */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="marquee-content"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            gap: "48px",
            paddingLeft: "24px",
            animation: "marquee 25s linear infinite",
          }}
        >
          {breakingNews.concat(breakingNews).map((news, idx) => (
            <span key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>✦</span>
              <span>{news}</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
