"use client";

import { useEffect, useState } from "react";
import { Button } from "@briefasia/ui";
import { Icon } from "@/components/icons";
import { useT } from "@/lib/i18n";

const STORAGE_KEY = "briefasia-cookies";

export function CookieBanner() {
  const t = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // ignore
    }
    const id = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(id);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  if (!open) return null;

  return (
    <div
      className="cookie-banner"
      style={{
        position: "fixed",
        bottom: 14,
        left: 14,
        right: 14,
        zIndex: 50,
        maxWidth: 760,
        margin: "0 auto",
        background: "var(--banner)",
        color: "#FCFBF8",
        padding: "10px 12px",
        borderRadius: 6,
        boxShadow: "0 18px 42px -22px rgba(36,26,51,.65)",
        border: "1px solid rgba(252,251,248,0.12)",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        className="cookie-banner__label"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingRight: 12,
          borderRight: "1px solid rgba(252,251,248,0.16)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 4,
            background: "color-mix(in oklab, var(--accent) 16%, transparent)",
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="info" size={16} color="var(--accent)" stroke={2.2} />
        </div>
        <div
          className="upper"
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: ".14em",
            color: "var(--accent)",
            whiteSpace: "nowrap",
            textTransform: "uppercase",
          }}
        >
          {t("Cookies", "Cookies", "Cookies")}
        </div>
      </div>

      <p
        className="cookie-banner__copy"
        style={{
          margin: 0,
          fontSize: 12,
          lineHeight: 1.35,
          color: "rgba(252,251,248,0.82)",
          flex: 1,
          minWidth: 0,
        }}
      >
        {t(
          "We use cookies to remember your login and improve the site. No ads, no tracking, no data sale.",
          "Chúng tôi dùng cookies để giữ bạn đăng nhập và cải thiện trang. Không quảng cáo, không theo dõi, không bán dữ liệu.",
          "Kami menggunakan cookies untuk mengingat login Anda dan meningkatkan situs. Tanpa iklan, tanpa pelacak, tanpa jual data."
        )}
      </p>

      <div className="cookie-banner__actions" style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          onClick={dismiss}
          style={{
            background: "transparent",
            border: "1px solid rgba(252,251,248,0.28)",
            color: "#FCFBF8",
            padding: "7px 12px",
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {t("Decline", "Từ chối", "Tolak")}
        </button>
        <Button
          variant="accent"
          size="md"
          onClick={dismiss}
          style={{ padding: "7px 16px", whiteSpace: "nowrap" }}
        >
          {t("Accept", "Đồng ý", "Setuju")}
        </Button>
      </div>
      <style>{`
        @media (max-width: 560px) {
          .cookie-banner {
            left: 16px !important;
            right: 16px !important;
            bottom: 16px !important;
            align-items: flex-start !important;
            gap: 10px !important;
            padding: 10px !important;
          }
          .cookie-banner__label {
            border-right: 0 !important;
            padding-right: 0 !important;
          }
          .cookie-banner__copy {
            flex-basis: 100% !important;
            order: 2 !important;
          }
          .cookie-banner__actions {
            margin-left: auto !important;
            order: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
