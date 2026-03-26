"use client";

import { InputHTMLAttributes, CSSProperties } from "react";
import { colors } from "@/tokens";

interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "style"> {
  label?: string;
}

/**
 * File Upload Letteros — as-is:
 * border: 1px dashed #A9A9A9, border-radius 15px, padding 24px, height 106px
 * Найден на /templates/ и /demo/
 */
export function FileUpload({ label = "Загрузить файл", className = "", ...props }: FileUploadProps) {
  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "106px",
    padding: "24px",
    border: `1px dashed ${colors.text.placeholder}`,
    borderRadius: "15px",
    background: colors.bg.white,
    fontFamily: "var(--l-font-family)",
    fontSize: "14px",
    color: colors.text.placeholder,
    cursor: "pointer",
    transition: "0.25s",
  };

  return (
    <label className={className} style={style}>
      <span>{label}</span>
      <input
        type="file"
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        {...props}
      />
    </label>
  );
}
