"use client";

import { TextareaHTMLAttributes, CSSProperties } from "react";
import { colors } from "@/tokens";

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "style"> {
  /** Высота textarea — 144px на /demo/, варьируется */
  height?: string;
}

/**
 * Textarea Letteros — as-is:
 * border-radius 15px, padding 17px 15px, border 1px solid #E1E1E1
 * :focus — border-color #151515
 * ::placeholder — color #A9A9A9, opacity 0 при focus
 */
export function Textarea({ height = "144px", className = "", ...props }: TextareaProps) {
  const style: CSSProperties = {
    width: "100%",
    height,
    padding: "17px 15px",
    fontFamily: "var(--l-font-family)",
    fontSize: "16px",
    color: colors.text.main,
    background: colors.bg.white,
    border: `1px solid ${colors.border.default}`,
    borderRadius: "15px",
    outline: "none",
    transition: "0.25s",
    resize: "vertical",
  };

  return (
    <textarea
      className={className}
      style={style}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = colors.text.main;
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = colors.border.default;
        props.onBlur?.(e);
      }}
      {...props}
    />
  );
}
