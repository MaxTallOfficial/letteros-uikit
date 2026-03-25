"use client";

import { ReactNode, useState, CSSProperties } from "react";
import { shadows, colors } from "@/tokens";

type AccordionVariant = "faq" | "pricing";

interface AccordionItemProps {
  question: ReactNode;
  answer: ReactNode;
  variant?: AccordionVariant;
  defaultOpen?: boolean;
}

/**
 * Аккордеон Letteros — два варианта as-is:
 *
 * faq — .faq__item: карточка с radius 20px, тень при open/hover, padding 32px 90px 32px 40px
 * pricing — .pricing-v1-accordeon__item: border-bottom 1px solid #E1E1E1, padding 26px 90px 26px 0
 */
export function AccordionItem({
  question,
  answer,
  variant = "faq",
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  const isFaq = variant === "faq";

  const wrapperStyle: CSSProperties = isFaq
    ? {
        background: colors.bg.white,
        borderRadius: "20px",
        marginBottom: "20px",
        boxShadow: open ? shadows.cardSoft : "none",
        transition: "box-shadow 0.25s",
      }
    : {
        borderBottom: `1px solid ${colors.border.default}`,
      };

  const questionStyle: CSSProperties = isFaq
    ? {
        padding: "32px 90px 32px 40px",
        letterSpacing: "-0.1px",
        cursor: "pointer",
        transition: "0.4s",
        fontFamily: "var(--l-font-family)",
        fontSize: "26px",
        fontWeight: 700,
        lineHeight: "31.2px",
        position: "relative",
      }
    : {
        padding: "26px 90px 26px 0",
        cursor: "pointer",
        fontFamily: "var(--l-font-family)",
        fontSize: "26px",
        fontWeight: 700,
        lineHeight: "31.2px",
        position: "relative",
      };

  const answerStyle: CSSProperties = isFaq
    ? {
        padding: open ? "0 100px 30px 40px" : "0 100px 0 40px",
        maxHeight: open ? "500px" : "0",
        overflow: "hidden",
        transition: "max-height 0.4s, padding 0.4s",
        fontFamily: "var(--l-font-family)",
        fontSize: "18px",
        fontWeight: 400,
        lineHeight: "23.4px",
        letterSpacing: "-0.2px",
      }
    : {
        padding: open ? "0 90px 26px 0" : "0 90px 0 0",
        maxHeight: open ? "500px" : "0",
        overflow: "hidden",
        transition: "max-height 0.4s, padding 0.4s",
        fontFamily: "var(--l-font-family)",
        fontSize: "18px",
        fontWeight: 400,
        lineHeight: "23.4px",
      };

  const arrowStyle: CSSProperties = {
    position: "absolute",
    right: isFaq ? "40px" : "0",
    top: "50%",
    transform: `translateY(-50%) ${open ? "scale(1, -1)" : "scale(1, 1)"}`,
    transition: "transform 0.3s",
    width: "20px",
    height: "20px",
  };

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={
        isFaq ? (e) => { e.currentTarget.style.boxShadow = shadows.cardSoft; } : undefined
      }
      onMouseLeave={
        isFaq ? (e) => { if (!open) e.currentTarget.style.boxShadow = "none"; } : undefined
      }
    >
      <div style={questionStyle} onClick={() => setOpen(!open)}>
        {question}
        <svg
          style={arrowStyle}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 8L10 13L15 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div style={answerStyle}>{answer}</div>
    </div>
  );
}
