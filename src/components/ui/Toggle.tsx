"use client";

import { CSSProperties, useState } from "react";
import { colors } from "@/tokens";

interface ToggleProps {
  options?: string[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

/**
 * Toggle Letteros — as-is:
 * Container: border-radius 32px, bg white, inline-flex
 * Active: bg #F1F1F1, font-weight 700
 * Inactive: bg transparent, font-weight 400
 * На сайте: переключатель месяц/год на /pricing-new/
 */

const containerStyle: CSSProperties = {
  display: "inline-flex",
  borderRadius: "32px",
  background: colors.bg.white,
  border: `1px solid ${colors.border.default}`,
  padding: "4px",
  fontFamily: "var(--l-font-family)",
};

const optionBase: CSSProperties = {
  padding: "10px 24px",
  borderRadius: "20px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "all 0.25s",
  border: "none",
  background: "transparent",
  fontFamily: "inherit",
  color: colors.text.main,
};

export function Toggle({
  options = ["Месяц", "Год"],
  defaultIndex = 0,
  onChange,
}: ToggleProps) {
  const [active, setActive] = useState(defaultIndex);

  const handleClick = (i: number) => {
    setActive(i);
    onChange?.(i);
  };

  return (
    <div style={containerStyle}>
      {options.map((opt, i) => (
        <button
          key={i}
          style={{
            ...optionBase,
            background: active === i ? colors.surface.activeBg : "transparent",
            fontWeight: active === i ? 700 : 400,
          }}
          onClick={() => handleClick(i)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
