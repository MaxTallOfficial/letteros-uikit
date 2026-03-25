"use client";

import { ReactNode, CSSProperties } from "react";
import { cardStyles, shadows } from "@/tokens";

type CardType = keyof typeof cardStyles;

interface CardProps {
  type: CardType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Карточки Letteros — каждый тип сохранён as-is, не склеен в один универсальный.
 *
 * differents — белая, radius 20px, мягкая тень, padding 40px
 * hows — градиентная, radius 40px, без тени
 * integrations — белая, radius 20px, мягкая тень, padding 15px 26px
 * pricing — прозрачная, border #E1E1E1, radius 20px
 * blog — белая, border #A9A9A9, radius 15px
 * faq — белая, radius 20px, тень появляется при hover
 */
export function Card({ type, children, className = "", style: extraStyle }: CardProps) {
  const c = cardStyles[type];

  const baseStyle: CSSProperties = {
    background: c.bg,
    border: c.border ?? "none",
    borderRadius: c.borderRadius,
    boxShadow: c.shadow ?? "none",
    padding: c.padding ?? undefined,
    transition: type === "faq" ? "box-shadow 0.25s" : undefined,
    ...extraStyle,
  };

  if (type === "faq") {
    return (
      <div
        className={className}
        style={baseStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = shadows.cardSoft;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={className} style={baseStyle}>
      {children}
    </div>
  );
}
