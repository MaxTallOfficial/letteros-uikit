"use client";

import { CSSProperties, ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Длительность одного цикла анимации */
  duration?: string;
}

/**
 * Marquee / Brand Logos Letteros — as-is:
 * Container: flex, ~5254px wide
 * 35+ логотипов различных размеров
 * CSS animation — бесконечная горизонтальная прокрутка
 */

const wrapperStyle: CSSProperties = {
  overflow: "hidden",
  width: "100%",
};

const trackStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "40px",
  width: "max-content",
};

export function Marquee({ children, duration = "30s" }: MarqueeProps) {
  return (
    <div style={wrapperStyle}>
      <style>{`
        @keyframes letteros-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .letteros-marquee-track {
          animation: letteros-marquee ${duration} linear infinite;
        }
      `}</style>
      <div className="letteros-marquee-track" style={trackStyle}>
        {children}
        {/* Дублируем для бесшовной прокрутки */}
        {children}
      </div>
    </div>
  );
}
