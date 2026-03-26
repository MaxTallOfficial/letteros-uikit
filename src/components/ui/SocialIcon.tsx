"use client";

import { CSSProperties } from "react";
import { colors } from "@/tokens";

interface SocialIconProps {
  label: string;
  href: string;
  bg: string;
  icon?: React.ReactNode;
}

/**
 * Social Icon Letteros — as-is:
 * 42x42px, border-radius 10px, bg варьируется по сервису
 * Используется в footer и mobile menu
 */

export function SocialIcon({ label, href, bg, icon }: SocialIconProps) {
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    background: bg,
    color: colors.text.white,
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 700,
    fontFamily: "var(--l-font-family)",
  };

  return (
    <a href={href} style={style} title={label}>
      {icon ?? label.charAt(0).toUpperCase()}
    </a>
  );
}
