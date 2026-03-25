"use client";

import { InputHTMLAttributes, CSSProperties } from "react";
import { colors } from "@/tokens";

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "style"> {
  className?: string;
}

/**
 * Text input Letteros — .form-input as-is:
 * height 54px, padding 0 18px, font-size 16px, border 1px solid #E1E1E1,
 * border-radius 15px, bg white, transition 0.25s.
 *
 * :focus → border-color: #151515
 * ::placeholder → color: #A9A9A9, при focus opacity 0
 */
export function FormInput({ className = "", ...props }: FormInputProps) {
  const style: CSSProperties = {
    width: "100%",
    height: "54px",
    padding: "0 18px",
    fontFamily: "var(--l-font-family)",
    fontSize: "16px",
    fontWeight: 400,
    color: colors.text.main,
    background: colors.bg.white,
    border: `1px solid ${colors.border.default}`,
    borderRadius: "15px",
    transition: "var(--l-transition-input, 0.25s)",
    outline: "none",
  };

  return (
    <input
      className={className}
      style={style}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = colors.text.main;
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = colors.border.default;
      }}
      {...props}
    />
  );
}
