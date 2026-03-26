"use client";

import { CSSProperties } from "react";
import { colors, zIndex } from "@/tokens";
import { LogoMark, LogoWordmark, TelegramIcon, VkIcon } from "./icons";

/**
 * Mobile Menu Letteros — as-is:
 * full-width overlay, opens from LEFT
 * position fixed, inset 0, bg white, z-index 100
 * Logo + close btn top bar
 * Nav links: 16px/400, border-bottom dividers
 * Social links: 42x42px, radius 10px, bg #151515
 */

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: colors.bg.white,
  zIndex: zIndex.mobileMenu,
  overflowY: "auto",
  fontFamily: "var(--l-font-family)",
};

const topBarStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "50px",
  padding: "0 20px",
  borderBottom: `1px solid ${colors.border.default}`,
};

const logoStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  textDecoration: "none",
};

const closeBtnStyle: CSSProperties = {
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  color: colors.text.main,
  fontSize: "24px",
};

const linkStyle: CSSProperties = {
  display: "block",
  padding: "12px 20px",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "22.4px",
  color: colors.text.main,
  textDecoration: "none",
  borderBottom: `1px solid ${colors.border.default}`,
  transition: "color 0.2s",
  cursor: "pointer",
};

const socialRowStyle: CSSProperties = {
  display: "flex",
  gap: "10px",
  padding: "20px",
};

const socialIconStyle: CSSProperties = {
  width: "42px",
  height: "42px",
  borderRadius: "10px",
  background: colors.surface.dark,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
};

/* -- Nav items (as-is from real site mobile menu) -- */
const defaultNavItems = [
  { label: "Редактор", href: "/editor/" },
  { label: "Сокращение ссылок", href: "/shorturl/" },
  { label: "Сжатие HTML", href: "/shorthtml/" },
  { label: "Сжатие CSS", href: "/shortcss/" },
  { label: "Сжатие JS", href: "/shortjs/" },
  { label: "Типограф", href: "/typograf/" },
  { label: "GIF генератор", href: "/gifgenerator/" },
  { label: "Шаблоны", href: "/templates/" },
  { label: "Миграция", href: "/migration/" },
  { label: "Тестирование", href: "/testing-emails/" },
  { label: "Тарифы", href: "/pricing-new/" },
  { label: "Кейсы", href: "/projects/" },
  { label: "Блог", href: "/blog/" },
  { label: "Вакансии", href: "/vacancies/" },
  { label: "О\u00a0нас", href: "/contacts/" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items?: { label: string; href: string }[];
}

export function MobileMenu({ open, onClose, items = defaultNavItems }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div style={overlayStyle}>
      {/* Top bar: logo + close */}
      <div style={topBarStyle}>
        <a href="/" style={logoStyle}>
          <LogoMark size={28} color="#151515" />
          <LogoWordmark color="#151515" />
        </a>
        <button style={closeBtnStyle} onClick={onClose} aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href}
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.accent.blue;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.text.main;
          }}
        >
          {item.label}
        </a>
      ))}

      {/* Social */}
      <div style={socialRowStyle}>
        <a href="https://t.me/letteros" target="_blank" rel="noopener" style={socialIconStyle} title="Telegram">
          <TelegramIcon size={18} />
        </a>
        <a href="https://vk.com/letteroscom" target="_blank" rel="noopener" style={socialIconStyle} title="VK">
          <VkIcon size={18} />
        </a>
      </div>
    </div>
  );
}
