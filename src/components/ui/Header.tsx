"use client";

import { CSSProperties, useState } from "react";
import { colors, zIndex, shadows } from "@/tokens";
import { LogoMark, LogoWordmark } from "./icons";

/**
 * Header Letteros — as-is:
 *
 * fixed, bg #151515, height 50px, z-index 1040, padding 0 24px
 * Logo: два img (иконка + wordmark), link to /
 * Nav: flex, column-gap 40px, links 14px/400/white
 * Dropdowns: "Сервисы" (6 items), "Компания" (4 items)
 *   bg #F8F8F8, radius 15px, padding 15px 22px 12px, shadow cardSoft
 * Lang: иконка глобуса, dropdown с Русский/English
 * Right: "Войти" (dropdown) + "Начать бесплатно" (btn--white btn--s-s)
 */

/* -- arrow SVG для dropdown toggle -- */
const ArrowDown = () => (
  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ marginLeft: "6px" }}>
    <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -- Globe icon для lang switcher -- */
const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.2" />
    <ellipse cx="10" cy="10" rx="4" ry="9" stroke="white" strokeWidth="1.2" />
    <line x1="1" y1="7" x2="19" y2="7" stroke="white" strokeWidth="1.2" />
    <line x1="1" y1="13" x2="19" y2="13" stroke="white" strokeWidth="1.2" />
  </svg>
);

/* ======================================================================== */

const headerStyle: CSSProperties = {
  position: "relative", // в демо relative; на реальном сайте fixed
  top: 0,
  left: 0,
  right: 0,
  height: "50px",
  zIndex: zIndex.header,
  fontFamily: "var(--l-font-family)",
};

const headerMainStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  height: "50px",
  padding: "0 24px",
  background: colors.surface.dark,
};

const logoStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: colors.text.white,
  fontSize: "16px",
  fontWeight: 700,
  letterSpacing: "1.5px",
  gap: "6px",
  flexShrink: 0,
};

const navStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  columnGap: "40px",
  marginLeft: "40px",
  flexGrow: 1,
};

const navLinkStyle: CSSProperties = {
  color: colors.text.white,
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "19.6px",
  textDecoration: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const dropdownToggleStyle: CSSProperties = {
  ...navLinkStyle,
  display: "flex",
  alignItems: "center",
  background: "none",
  border: "none",
  padding: 0,
  fontFamily: "inherit",
};

const dropdownListStyle: CSSProperties = {
  position: "absolute",
  top: "calc(100% + 10px)",
  left: "-15px",
  background: colors.bg.alt,
  borderRadius: "15px",
  padding: "15px 22px 12px",
  boxShadow: shadows.cardSoft,
  zIndex: zIndex.dropdown,
  listStyle: "none",
  margin: 0,
  minWidth: "160px",
  transition: "opacity 0.2s, visibility 0.2s",
};

const dropdownItemStyle: CSSProperties = {
  padding: "4px 0",
};

const dropdownLinkStyle: CSSProperties = {
  color: colors.text.main,
  fontSize: "14px",
  fontWeight: 400,
  textDecoration: "none",
  whiteSpace: "nowrap",
  display: "block",
};

const rightGroupStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  flexShrink: 0,
};

const langBtnStyle: CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  color: colors.text.white,
  position: "relative",
};

const loginToggleStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "34px",
  padding: "0 14px",
  borderRadius: "10px",
  background: "transparent",
  color: colors.text.white,
  fontSize: "14px",
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  marginRight: "10px",
  position: "relative",
};

const ctaBtnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "34px",
  padding: "0 14px",
  borderRadius: "10px",
  background: colors.bg.white,
  color: colors.text.main,
  fontSize: "14px",
  fontWeight: 700,
  border: `1px solid ${colors.bg.white}`,
  textDecoration: "none",
  whiteSpace: "nowrap",
  cursor: "pointer",
  transition: "all 0.25s",
};

/* -- Dropdown component -- */
function Dropdown({
  label,
  items,
  icon,
}: {
  label?: string;
  items: { text: string; href: string }[];
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button style={dropdownToggleStyle}>
        {icon ?? label}
        {!icon && <ArrowDown />}
      </button>
      <ul
        style={{
          ...dropdownListStyle,
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
        }}
      >
        {items.map((item, i) => (
          <li key={i} style={dropdownItemStyle}>
            <a href={item.href} style={dropdownLinkStyle}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -- Header component -- */
export function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header style={headerStyle}>
      <div style={headerMainStyle}>
        {/* Logo */}
        <a href="/" style={logoStyle}>
          <LogoMark size={28} />
          <LogoWordmark />
        </a>

        {/* Nav */}
        <nav style={navStyle}>
          <a href="/editor/" style={navLinkStyle}>Редактор</a>

          <Dropdown
            label="Сервисы"
            items={[
              { text: "Сокращение ссылок", href: "/shorturl/" },
              { text: "Сжатие HTML", href: "/shorthtml/" },
              { text: "Сжатие CSS", href: "/shortcss/" },
              { text: "Сжатие JS", href: "/shortjs/" },
              { text: "Типограф", href: "/typograf/" },
              { text: "GIF генератор", href: "/gifgenerator/" },
            ]}
          />

          <a href="/templates/" style={navLinkStyle}>Шаблоны</a>
          <a href="/migration/" style={navLinkStyle}>Миграция</a>
          <a href="/testing-emails/" style={navLinkStyle}>Тестирование</a>
          <a href="/pricing-new/" style={navLinkStyle}>Тарифы</a>

          <Dropdown
            label="Компания"
            items={[
              { text: "Кейсы", href: "/projects/" },
              { text: "Блог", href: "/blog/" },
              { text: "Вакансии", href: "/vacancies/" },
              { text: "О\u00a0нас", href: "/contacts/" },
            ]}
          />
        </nav>

        {/* Lang switcher */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setLangOpen(true)}
          onMouseLeave={() => setLangOpen(false)}
        >
          <button style={langBtnStyle}>
            <GlobeIcon />
          </button>
          <ul
            style={{
              ...dropdownListStyle,
              left: "auto",
              right: 0,
              padding: "15px 40px 12px 22px",
              opacity: langOpen ? 1 : 0,
              visibility: langOpen ? "visible" : "hidden",
            }}
          >
            <li style={dropdownItemStyle}>
              <span style={{ ...dropdownLinkStyle, color: colors.accent.blue, fontWeight: 500 }}>Русский</span>
            </li>
            <li style={dropdownItemStyle}>
              <a href="/en/" style={dropdownLinkStyle}>English</a>
            </li>
          </ul>
        </div>

        {/* Right buttons */}
        <div style={rightGroupStyle}>
          {/* Login dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setLoginOpen(true)}
            onMouseLeave={() => setLoginOpen(false)}
          >
            <button style={loginToggleStyle}>Войти</button>
            <ul
              style={{
                ...dropdownListStyle,
                left: "auto",
                right: 0,
                opacity: loginOpen ? 1 : 0,
                visibility: loginOpen ? "visible" : "hidden",
              }}
            >
              <li style={dropdownItemStyle}>
                <a href="https://app.letteros.com/" style={dropdownLinkStyle} target="_blank" rel="noopener">
                  Текущая версия
                </a>
              </li>
              <li style={dropdownItemStyle}>
                <a href="https://old.letteros.com" style={dropdownLinkStyle} target="_blank" rel="noopener">
                  Старая версия
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <a
            href="https://app.letteros.com/"
            style={ctaBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.surface.dark;
              e.currentTarget.style.color = colors.text.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.bg.white;
              e.currentTarget.style.color = colors.text.main;
            }}
          >
            Начать бесплатно
          </a>
        </div>
      </div>
    </header>
  );
}
