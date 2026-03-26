"use client";

import { InputHTMLAttributes, CSSProperties, useId } from "react";
import { colors } from "@/tokens";

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "style"> {
  label: string;
}

/**
 * Radio Letteros — as-is:
 * :checked — border-color rgb(0,29,255), ::after opacity 1, transform scale(1)
 * Indicator: кружок с точкой внутри
 */
export function Radio({ label, className = "", ...props }: RadioProps) {
  const reactId = useId();
  const id = props.id ?? reactId;

  const wrapperStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontFamily: "var(--l-font-family)",
    fontSize: "14px",
    color: colors.text.main,
    cursor: "pointer",
  };

  return (
    <div className={className} style={wrapperStyle}>
      <style>{`
        .letteros-radio-input { position: absolute; opacity: 0; width: 0; height: 0; }
        .letteros-radio-indicator {
          position: relative;
          width: 18px;
          height: 18px;
          border: 1px solid ${colors.border.default};
          border-radius: 50%;
          background: ${colors.bg.white};
          transition: border-color 0.2s;
          flex-shrink: 0;
        }
        .letteros-radio-indicator::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          background: ${colors.accent.blue};
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
        }
        .letteros-radio-input:checked + .letteros-radio-label .letteros-radio-indicator {
          border-color: ${colors.accent.blue};
        }
        .letteros-radio-input:checked + .letteros-radio-label .letteros-radio-indicator::after {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      `}</style>
      <input
        type="radio"
        id={id}
        className="letteros-radio-input"
        {...props}
      />
      <label htmlFor={id} className="letteros-radio-label" style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <span className="letteros-radio-indicator" />
        {label}
      </label>
    </div>
  );
}
