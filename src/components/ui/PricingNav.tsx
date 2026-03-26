"use client";

import { CSSProperties, useState } from "react";
import { colors } from "@/tokens";

interface PricingNavProps {
  plans?: string[];
  defaultActive?: number;
  onChange?: (index: number) => void;
}

/**
 * Pricing Nav Letteros — as-is:
 * Горизонтальная навигация по тарифным планам
 * Active item: color #3072ED, визуальное выделение
 * CTA button: btn--blue-new btn--s-m — «Выбрать»
 * Привязан к pricing table, не standalone
 */

const navStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0",
  borderBottom: `1px solid ${colors.border.default}`,
  fontFamily: "var(--l-font-family)",
};

const itemBase: CSSProperties = {
  padding: "16px 24px",
  fontSize: "16px",
  fontWeight: 400,
  color: colors.text.main,
  cursor: "pointer",
  transition: "color 0.25s",
  border: "none",
  background: "transparent",
  fontFamily: "inherit",
  borderBottom: "2px solid transparent",
  marginBottom: "-1px",
};

export function PricingNav({
  plans = ["Free", "Start", "Growth", "Pro", "Enterprise"],
  defaultActive = 2,
  onChange,
}: PricingNavProps) {
  const [active, setActive] = useState(defaultActive);

  return (
    <nav style={navStyle}>
      {plans.map((plan, i) => (
        <button
          key={i}
          style={{
            ...itemBase,
            color: active === i ? colors.accent.blueNew : colors.text.main,
            fontWeight: active === i ? 700 : 400,
            borderBottomColor: active === i ? colors.accent.blueNew : "transparent",
          }}
          onClick={() => {
            setActive(i);
            onChange?.(i);
          }}
        >
          {plan}
        </button>
      ))}
    </nav>
  );
}
