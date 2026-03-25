"use client";

import { InputHTMLAttributes, CSSProperties, useId } from "react";
import { colors } from "@/tokens";

type CheckboxVariant = "default" | "simple" | "tiny";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "style"> {
  label: string;
  variant?: CheckboxVariant;
}

/**
 * Checkbox Letteros — as-is:
 * Нативный input скрыт (opacity 0). Стилизован через label::before / ::after.
 *
 * default — color #A9A9A9, font-size 14px, padding-left 22px
 * simple — color #151515, padding-left 32px
 * tiny — font-size 10px, line-height 1.2
 *
 * ::before — 16x16px, border 1px solid #E1E1E1, radius 5px
 * :checked — border-color #151515, ::after opacity 1
 */
export function Checkbox({ label, variant = "default", className = "", ...props }: CheckboxProps) {
  const labelStyles: Record<CheckboxVariant, CSSProperties> = {
    default: {
      position: "relative",
      paddingLeft: "22px",
      color: colors.text.placeholder,
      fontFamily: "var(--l-font-family)",
      fontSize: "14px",
      cursor: "pointer",
      display: "inline-block",
      lineHeight: "normal",
    },
    simple: {
      position: "relative",
      paddingLeft: "32px",
      color: colors.text.main,
      fontFamily: "var(--l-font-family)",
      fontSize: "14px",
      cursor: "pointer",
      display: "inline-block",
      lineHeight: "normal",
    },
    tiny: {
      position: "relative",
      paddingLeft: "22px",
      color: colors.text.placeholder,
      fontFamily: "var(--l-font-family)",
      fontSize: "10px",
      lineHeight: "1.2",
      cursor: "pointer",
      display: "inline-block",
    },
  };

  const reactId = useId();
  const id = props.id ?? reactId;

  return (
    <div className={className} style={{ display: "flex", alignItems: "flex-start" }}>
      <style>{`
        .letteros-checkbox-input { opacity: 0; position: absolute; height: 0; width: 0; }
        .letteros-checkbox-label { position: relative; }
        .letteros-checkbox-label::before {
          content: "";
          position: absolute;
          top: 1px;
          left: 0;
          width: 16px;
          height: 16px;
          border: 1px solid ${colors.border.default};
          border-radius: 5px;
          background: ${colors.bg.white};
          transition: border-color 0.2s;
        }
        .letteros-checkbox-label::after {
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          width: 10px;
          height: 6px;
          border-left: 2px solid ${colors.text.main};
          border-bottom: 2px solid ${colors.text.main};
          transform: rotate(-45deg);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .letteros-checkbox-input:checked + .letteros-checkbox-label::before {
          border-color: ${colors.text.main};
        }
        .letteros-checkbox-input:checked + .letteros-checkbox-label::after {
          opacity: 1;
        }
      `}</style>
      <input
        type="checkbox"
        id={id}
        className="letteros-checkbox-input"
        {...props}
      />
      <label
        htmlFor={id}
        className="letteros-checkbox-label"
        style={labelStyles[variant]}
      >
        {label}
      </label>
    </div>
  );
}
