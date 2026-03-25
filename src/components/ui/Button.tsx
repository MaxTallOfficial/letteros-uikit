"use client";

import { ReactNode, CSSProperties } from "react";
import { buttonSizes, buttonVariants } from "@/tokens";

type ButtonSize = keyof typeof buttonSizes;
type ButtonVariant = keyof typeof buttonVariants;

interface ButtonProps {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  off?: boolean;
  full?: boolean;
  href?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Кнопка Letteros — все модификаторы as-is из аудита.
 *
 * Размер: ss / s / m
 * Вариант: white / blue / blueNew / black / transparentBlack / transparentWhite / transparentBlue / green
 * Состояния: disabled, off, full
 */
export function Button({
  children,
  size = "m",
  variant = "blue",
  disabled = false,
  off = false,
  full = false,
  href,
  className = "",
  onClick,
}: ButtonProps) {
  const s = buttonSizes[size];
  const v = buttonVariants[variant];

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--l-font-family)",
    fontWeight: 700,
    whiteSpace: "nowrap",
    cursor: disabled || off ? "default" : "pointer",
    transition: "var(--l-transition-btn, all 0.25s)",
    height: s.height,
    padding: s.padding,
    borderRadius: s.borderRadius,
    fontSize: s.fontSize ?? "inherit",
    background: disabled ? "#A9A9A9" : v.bg,
    color: v.color,
    border: v.border ?? "none",
    width: full ? "100%" : undefined,
    pointerEvents: disabled || off ? "none" : undefined,
    opacity: off ? 0.3 : undefined,
  };

  const hoverHandlers =
    !disabled && !off && v.hoverBg
      ? {
          onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
            const el = e.currentTarget;
            el.style.background = v.hoverBg!;
            el.style.color = v.hoverColor!;
            if (variant === "transparentBlue") {
              el.style.boxShadow = "inset 0 0 0 1px rgb(75,96,255)";
            }
          },
          onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
            const el = e.currentTarget;
            el.style.background = v.bg;
            el.style.color = v.color;
            el.style.boxShadow = "";
          },
        }
      : {};

  if (href && !disabled && !off) {
    return (
      <a href={href} className={className} style={style} {...hoverHandlers}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={className}
      style={style}
      disabled={disabled}
      onClick={onClick}
      {...hoverHandlers}
    >
      {children}
    </button>
  );
}
