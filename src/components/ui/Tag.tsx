import { ReactNode, CSSProperties } from "react";
import { colors } from "@/tokens";

type TagVariant = "green" | "blue";

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}

/**
 * Тег / Badge Letteros — два варианта из аудита:
 *
 * green — btn--tag btn--green: bg #2D8962, текст белый (страница /templates/)
 * blue — категория блога: цвет #3072ED, без фона
 */
export function Tag({ children, variant = "green", className = "" }: TagProps) {
  const style: CSSProperties =
    variant === "green"
      ? {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.green,
          color: colors.text.white,
          fontFamily: "var(--l-font-family)",
          fontWeight: 700,
          fontSize: "14px",
          padding: "0 14px",
          height: "34px",
          borderRadius: "10px",
          border: "none",
          whiteSpace: "nowrap",
        }
      : {
          display: "inline-block",
          color: colors.accent.blue,
          fontFamily: "var(--l-font-family)",
          fontSize: "16px",
          fontWeight: 400,
          background: "none",
          border: "none",
          padding: 0,
        };

  return (
    <span className={className} style={style}>
      {children}
    </span>
  );
}
