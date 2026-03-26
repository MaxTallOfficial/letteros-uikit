"use client";

import { SelectHTMLAttributes, CSSProperties } from "react";
import { colors } from "@/tokens";

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "style"> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

/**
 * Select Letteros — as-is:
 * На сайте используется Select2 (сторонняя библиотека).
 * Этот компонент воспроизводит визуальные параметры:
 * height 56px, border-radius 15px, border 1px solid #E1E1E1
 * :focus — border-color #151515
 */
export function Select({ options, placeholder, className = "", ...props }: SelectProps) {
  const style: CSSProperties = {
    width: "100%",
    height: "56px",
    padding: "0 18px",
    fontFamily: "var(--l-font-family)",
    fontSize: "16px",
    color: colors.text.main,
    background: colors.bg.white,
    border: `1px solid ${colors.border.default}`,
    borderRadius: "15px",
    outline: "none",
    transition: "0.25s",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23151515' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 18px center",
    cursor: "pointer",
  };

  return (
    <select
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
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
