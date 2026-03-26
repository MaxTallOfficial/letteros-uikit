"use client";

import { CSSProperties } from "react";
import { colors, zIndex } from "@/tokens";

interface CookieBannerProps {
  text?: string;
  buttonText?: string;
  onAccept?: () => void;
  visible?: boolean;
}

/**
 * Cookie Banner Letteros — as-is:
 * fixed, bottom 0, z-index 1000, bg #F2F2F2, dual box-shadow
 * Кнопка: btn--s-s btn--blue, font-size 12px
 */

const bannerStyle: CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: colors.cookie,
  zIndex: zIndex.cookie,
  boxShadow: "0 -2px 10px rgba(0,0,0,0.05), 0 2px 10px rgba(0,0,0,0.05)",
  padding: "16px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  fontFamily: "var(--l-font-family)",
};

const textStyle: CSSProperties = {
  fontSize: "14px",
  fontWeight: 400,
  color: colors.text.main,
};

const btnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "34px",
  padding: "0 14px",
  borderRadius: "10px",
  background: colors.accent.blue,
  color: colors.text.white,
  fontSize: "12px",
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  transition: "all 0.25s",
  whiteSpace: "nowrap",
};

export function CookieBanner({
  text = "Мы используем файлы cookies",
  buttonText = "Принять",
  onAccept,
  visible = true,
}: CookieBannerProps) {
  if (!visible) return null;

  return (
    <div style={bannerStyle}>
      <span style={textStyle}>{text}</span>
      <button
        style={btnStyle}
        onClick={onAccept}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = colors.accent.blueHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = colors.accent.blue;
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
