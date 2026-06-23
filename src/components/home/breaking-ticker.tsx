"use client";

import { useEffect, useState } from "react";

const breakingNews = [
  {
    time: "14:32",
    title: "Bank Indonesia holds rate at 6.25% as rupiah stabilises",
  },
  {
    time: "13:05",
    title: "GIC leads $1.2B round in Indonesian data-centre operator",
  },
  {
    time: "11:48",
    title: "TSMC Arizona yields now match Taiwan fabs, sources say",
  },
];

export function BreakingTicker() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      data-testid="breaking-ticker"
      style={{
        alignItems: "center",
        background: "var(--accent)",
        color: "#fff",
        display: "flex",
        height: 42,
        marginBottom: 28,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        className="container"
        style={{
          alignItems: "center",
          display: "flex",
          gap: 16,
          height: "100%",
          overflow: "hidden",
          padding: "0 28px",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "1.1px",
            lineHeight: 1,
          }}
        >
          BREAKING
        </span>
        <div
          className="ba-ticker-mask"
          style={{
            flex: 1,
            height: 20,
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <div
            className="ba-ticker-track"
            style={{
              alignItems: "center",
              animation: "briefasia-ticker 30s linear infinite",
              display: "inline-flex",
              gap: 26,
              whiteSpace: "nowrap",
            }}
          >
            {breakingNews.concat(breakingNews, breakingNews).map((news, idx) => (
              <span
                className="ba-ticker-item"
                key={`${news.time}-${idx}`}
                style={{
                  color: "#fff",
                  fontFamily: "var(--font-serif)",
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: 800,
                    marginRight: 8,
                  }}
                >
                  {news.time}
                </span>
                <span>{news.title}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes briefasia-ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .ba-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
