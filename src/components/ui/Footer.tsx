"use client";

import { CSSProperties } from "react";
import { colors } from "@/tokens";
import { Checkbox } from "./Checkbox";
import { LogoMarkGrey, LogoWordmarkGrey, TelegramIcon, VkIcon } from "./icons";

/**
 * Footer Letteros — as-is:
 *
 * bg #F8F8F8
 * .footer__main: padding 58px 0 47px
 * .footer__row: flex, space-between, wrap
 *   5 nav-колонок + divider + subscribe block
 *
 * Nav title: 14px/700/#151515, letter-spacing 0.1px, mb 16px
 * Nav links: 14px/400/#151515, li mb 8px, hover → #3072ED + underline
 * Social: 32x32px, radius 10px, bg #151515
 *
 * Subscribe: 260px, input 54px + btn--black btn--s-m 54px (width 100%)
 * Checkboxes: tiny (10px/#A9A9A9)
 * Recaptcha: 10px/#A9A9A9, line-height 12px
 *
 * .footer__bottom: padding 20px 0, border-top 1px solid #E1E1E1
 *   Logo (серый) + copyright + "Сделано в Grids"
 */

/* -- Styles -- */

const footerStyle: CSSProperties = {
  background: colors.bg.alt,
  fontFamily: "var(--l-font-family)",
};

const mainStyle: CSSProperties = {
  padding: "58px 0 47px",
};

const containerStyle: CSSProperties = {
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "0 20px",
};

const rowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "20px",
};

const navColStyle: CSSProperties = {
  flexShrink: 1,
  flexGrow: 0,
};

const titleStyle: CSSProperties = {
  fontSize: "14px",
  fontWeight: 700,
  color: colors.text.main,
  marginBottom: "16px",
  letterSpacing: "0.1px",
  lineHeight: "19.6px",
};

const navItemStyle: CSSProperties = {
  marginBottom: "8px",
  listStyle: "none",
};

const navLinkStyle: CSSProperties = {
  color: colors.text.main,
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "19.6px",
  textDecoration: "none",
  transition: "color 0.2s",
  cursor: "pointer",
};

const socItemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  borderRadius: "10px",
  background: colors.surface.dark,
  color: colors.text.white,
  textDecoration: "none",
};

const subscribeContainerStyle: CSSProperties = {
  width: "260px",
  flexShrink: 0,
};

const inputStyle: CSSProperties = {
  width: "100%",
  height: "54px",
  padding: "0 18px",
  fontSize: "16px",
  fontFamily: "inherit",
  border: `1px solid ${colors.border.default}`,
  borderRadius: "15px",
  background: colors.bg.white,
  color: colors.text.main,
  outline: "none",
  transition: "0.25s",
  boxSizing: "border-box",
};

const submitBtnStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "54px",
  padding: "0 24px",
  fontSize: "18px",
  fontWeight: 700,
  fontFamily: "inherit",
  borderRadius: "15px",
  background: colors.surface.dark,
  color: colors.text.white,
  border: `1px solid ${colors.surface.dark}`,
  cursor: "pointer",
  transition: "all 0.25s",
  marginTop: "10px",
};

const recaptchaStyle: CSSProperties = {
  fontSize: "12px",
  color: colors.text.placeholder,
  lineHeight: "14.4px",
  marginTop: "12px",
};

const recaptchaLinkStyle: CSSProperties = {
  color: colors.text.placeholder,
  textDecoration: "underline",
};

const bottomStyle: CSSProperties = {
  borderTop: `1px solid ${colors.border.default}`,
  padding: "20px 0",
};

const bottomRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "12px",
};

const bottomTextStyle: CSSProperties = {
  fontSize: "14px",
  color: colors.text.placeholder,
};


/* -- Nav link with hover -- */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li style={navItemStyle}>
      <a
        href={href}
        style={navLinkStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = colors.accent.blue;
          e.currentTarget.style.textDecoration = "underline";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = colors.text.main;
          e.currentTarget.style.textDecoration = "none";
        }}
      >
        {children}
      </a>
    </li>
  );
}

/* -- Footer component -- */
export function Footer() {
  return (
    <footer style={footerStyle}>
      <style>{`
        @media (max-width: 767px) {
          .footer-row {
            flex-wrap: wrap !important;
          }
          .footer-nav-col {
            flex-basis: calc(50% - 10px);
            flex-shrink: 0 !important;
            flex-grow: 0 !important;
          }
          .footer-subscribe {
            width: 100% !important;
            flex-basis: 100%;
          }
        }
      `}</style>
      {/* Main */}
      <div style={mainStyle}>
        <div style={containerStyle}>
          <div style={rowStyle} className="footer-row">
            {/* Col 1 — Продукт */}
            <div style={navColStyle} className="footer-nav-col">
              <div style={titleStyle}>Продукт</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                <NavLink href="https://app.letteros.com/">Конструктор</NavLink>
                <NavLink href="/editor/">Редактор</NavLink>
                <NavLink href="/templates/">Шаблоны</NavLink>
                <NavLink href="/migration/">Миграция</NavLink>
                <NavLink href="/testing-emails/">Тестирование</NavLink>
                <NavLink href="/pricing-new/">Тарифы</NavLink>
                <NavLink href="/on-premise/">On premise</NavLink>
                <NavLink href="/releases/">История обновлений</NavLink>
              </ul>
            </div>

            {/* Col 2 — Бесплатные сервисы */}
            <div style={navColStyle} className="footer-nav-col">
              <div style={titleStyle}>Бесплатные сервисы</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                <NavLink href="/shorturl/">Сокращение ссылок</NavLink>
                <NavLink href="/shorthtml/">Сжатие HTML</NavLink>
                <NavLink href="/shortcss/">Сжатие CSS</NavLink>
                <NavLink href="/shortjs/">Сжатие JS</NavLink>
                <NavLink href="/typograf/">Типограф</NavLink>
                <NavLink href="/gifgenerator/">GIF генератор</NavLink>
              </ul>
            </div>

            {/* Col 3 — Компания */}
            <div style={navColStyle} className="footer-nav-col">
              <div style={titleStyle}>Компания</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                <NavLink href="/projects/">Кейсы</NavLink>
                <NavLink href="/blog/">Блог</NavLink>
                <NavLink href="/vacancies/">Вакансии</NavLink>
                <NavLink href="/contacts/">О{"\u00a0"}нас</NavLink>
              </ul>
            </div>

            {/* Col 4 — Документы */}
            <div style={navColStyle} className="footer-nav-col">
              <div style={titleStyle}>Документы</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                <NavLink href="/privacy-policy-old/">Политика обработки данных</NavLink>
                <NavLink href="/terms/">Пользовательское соглашение</NavLink>
              </ul>
            </div>

            {/* Col 5 — Контакты */}
            <div style={navColStyle} className="footer-nav-col">
              <div style={titleStyle}>Контакты</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <a href="https://t.me/letteros" target="_blank" rel="noopener" style={socItemStyle} title="Telegram">
                  <TelegramIcon size={16} />
                </a>
                <a href="https://vk.com/letteroscom" target="_blank" rel="noopener" style={socItemStyle} title="VK">
                  <VkIcon size={16} />
                </a>
              </div>
            </div>

            {/* Subscribe */}
            <div style={subscribeContainerStyle} className="footer-subscribe">
              <div style={titleStyle}>Только польза</div>
              <p style={{ fontSize: "14px", color: colors.text.main, lineHeight: "16.8px", marginBottom: "20px", marginTop: 0 }}>
                Дайджесты о новых фичах продукта и доступ к нашему курсу по верстке писем.
              </p>

              <input
                type="text"
                placeholder="Email"
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = colors.text.main; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = colors.border.default; }}
              />

              <button
                style={submitBtnStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.bg.white;
                  e.currentTarget.style.color = colors.text.main;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.surface.dark;
                  e.currentTarget.style.color = colors.text.white;
                }}
              >
                Подписаться
              </button>

              <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <Checkbox
                  variant="tiny"
                  label="Даю согласие на обработку персональных данных и соглашаюсь с Политикой конфиденциальности"
                />
                <Checkbox
                  variant="tiny"
                  label="Даю согласие на получение рекламных сообщений посредством рассылки"
                />
              </div>

              <p style={recaptchaStyle}>
                Сайт защищен reCAPTCHA и{" "}
                <a href="https://policies.google.com/privacy" style={recaptchaLinkStyle} target="_blank" rel="noopener">
                  Политикой безопасности
                </a>{" "}
                и{" "}
                <a href="https://policies.google.com/terms" style={recaptchaLinkStyle} target="_blank" rel="noopener">
                  Условиями использования
                </a>{" "}
                Google
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={bottomStyle}>
        <div style={containerStyle}>
          <div style={bottomRowStyle}>
            {/* Logo grey */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <LogoMarkGrey size={20} />
              <LogoWordmarkGrey />
            </div>

            {/* Copyright */}
            <span style={bottomTextStyle}>
              Платформа автоматизации дизайна и вёрстки писем ООО «Леттерос», 2026
            </span>

            {/* Made in */}
            <span style={bottomTextStyle}>
              Сделано в{" "}
              <a
                href="https://grids.team"
                target="_blank"
                rel="noopener"
                style={{ ...bottomTextStyle, textDecoration: "underline" }}
              >
                Grids
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
