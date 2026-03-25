import { ReactNode, CSSProperties, ElementType } from "react";
import { typography, fontFamily } from "@/tokens";

type TypographyLevel = keyof typeof typography;

interface TypographyProps {
  level: TypographyLevel;
  as?: ElementType;
  children: ReactNode;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Типографика Letteros — as-is.
 * Каждый level соответствует реальному уровню из аудита.
 * Если на сайте H2 используется с 4 разными размерами, здесь 4 разных level.
 */
export function Typography({
  level,
  as,
  children,
  color,
  className = "",
  style: extraStyle,
}: TypographyProps) {
  const t = typography[level];

  const defaultTag = (): ElementType => {
    if (level.startsWith("h1")) return "h1";
    if (level.startsWith("h2")) return "h2";
    if (level.startsWith("h3")) return "h3";
    if (level.startsWith("h4")) return "h4";
    return "p";
  };

  const Tag = as ?? defaultTag();

  const mergedStyle: CSSProperties = {
    fontFamily: fontFamily.base,
    fontSize: t.fontSize,
    fontWeight: t.fontWeight,
    lineHeight: t.lineHeight,
    letterSpacing: t.letterSpacing,
    color: color ?? undefined,
    margin: 0,
    ...extraStyle,
  };

  return (
    <Tag className={className} style={mergedStyle}>
      {children}
    </Tag>
  );
}
