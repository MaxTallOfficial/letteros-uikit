"use client";

import { CSSProperties, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { AccordionItem } from "@/components/ui/Accordion";
import { Tag } from "@/components/ui/Tag";
import { FormInput } from "@/components/ui/FormInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { FileUpload } from "@/components/ui/FileUpload";
import { Radio } from "@/components/ui/Radio";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { Toggle } from "@/components/ui/Toggle";
import { PricingNav } from "@/components/ui/PricingNav";
import { Modal } from "@/components/ui/Modal";
import { Marquee } from "@/components/ui/Marquee";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { TelegramIcon, VkIcon } from "@/components/ui/icons";
import {
  colors,
  typography,
  fontFamily,
  buttonSizes,
  buttonVariants,
  radius,
  shadows,
  motion,
  opacity as opacityTokens,
  breakpoints,
  containerByBreakpoint,
  zIndex,
  gaps,
  sectionPaddingBottom,
  cardStyles,
} from "@/tokens";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      style={{
        fontFamily: fontFamily.base,
        fontSize: "40px",
        fontWeight: 700,
        lineHeight: "44px",
        color: colors.text.main,
        margin: "0 0 40px",
        paddingTop: "80px",
      }}
    >
      {children}
    </h2>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: fontFamily.base,
        fontSize: "24px",
        fontWeight: 700,
        lineHeight: "28px",
        color: colors.text.main,
        margin: "48px 0 20px",
      }}
    >
      {children}
    </h3>
  );
}

function Swatch({ color, label, note }: { color: string; label: string; note?: string }) {
  const isLight = color === "#ffffff" || color === "#F8F8F8" || color === "#F1F1F1" || color === "#F2F2F2" || color === "#E1E1E1";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "8px",
          background: color,
          border: isLight ? "1px solid #E1E1E1" : "none",
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontWeight: 600, fontSize: "14px", color: colors.text.main }}>{label}</div>
        <code style={{ fontSize: "13px", color: colors.text.placeholder }}>{color}</code>
        {note && <div style={{ fontSize: "12px", color: colors.text.placeholder, marginTop: "2px" }}>{note}</div>}
      </div>
    </div>
  );
}

function TokenTable({ data }: { data: [string, string][] }) {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "14px", fontFamily: fontFamily.base }}>
      <tbody>
        {data.map(([name, value], i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${colors.border.default}` }}>
            <td style={{ padding: "8px 16px 8px 0", fontWeight: 500, color: colors.text.main, whiteSpace: "nowrap" }}>{name}</td>
            <td style={{ padding: "8px 0" }}>
              <code style={{ fontSize: "13px", color: colors.text.placeholder }}>{value}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ShowcaseRow({ children, label, dark }: { children: React.ReactNode; label?: string; dark?: boolean }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <div style={{ fontSize: "12px", fontWeight: 500, color: colors.text.placeholder, marginBottom: "8px", fontFamily: fontFamily.base }}>
          {label}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
          padding: "20px",
          borderRadius: "12px",
          background: dark ? colors.surface.dark : colors.bg.alt,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ShowcaseBox({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <div style={{ fontSize: "12px", fontWeight: 500, color: colors.text.placeholder, marginBottom: "8px", fontFamily: fontFamily.base }}>
          {label}
        </div>
      )}
      <div
        style={{
          padding: "20px",
          borderRadius: "12px",
          background: colors.bg.alt,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { id: "overview", label: "Обзор" },
  { id: "colors", label: "Палитра цветов" },
  { id: "typography", label: "Типографика" },
  { id: "spacing", label: "Отступы и сетка" },
  { id: "radius", label: "Скругления" },
  { id: "shadows", label: "Тени" },
  { id: "motion", label: "Анимации" },
  { id: "breakpoints", label: "Брейкпоинты" },
  { id: "zindex", label: "Z-Index" },
  { id: "buttons", label: "Кнопки" },
  { id: "cards", label: "Карточки" },
  { id: "accordion", label: "Аккордеон" },
  { id: "tags", label: "Теги и бейджи" },
  { id: "forms", label: "Поля ввода" },
  { id: "toggle", label: "Тогл" },
  { id: "pricing-nav", label: "Навигация тарифов" },
  { id: "header", label: "Хедер" },
  { id: "footer", label: "Футер" },
  { id: "mobile-menu", label: "Мобильное меню" },
  { id: "cookie", label: "Cookie-Баннер" },
  { id: "modal", label: "Модальное окно" },
  { id: "marquee", label: "Бегущая строка" },
  { id: "social", label: "Иконки соцсетей" },
  { id: "notes", label: "Примечания" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function UIKitPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);

  return (
    <div style={{ fontFamily: fontFamily.base, color: colors.text.main, background: colors.bg.white, display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          borderRight: `1px solid ${colors.border.default}`,
          background: colors.bg.white,
          padding: "24px 0",
        }}
      >
        <div style={{ padding: "0 20px", marginBottom: "24px" }}>
          <a href="/" style={{ fontWeight: 700, fontSize: "16px", color: colors.text.main, textDecoration: "none" }}>
            Letteros UI Kit
          </a>
        </div>
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                display: "block",
                padding: "6px 20px",
                fontSize: "14px",
                color: colors.text.placeholder,
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = colors.text.main; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = colors.text.placeholder; }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, minWidth: 0 }}>
      <Container>
        {/* ================================================================= */}
        {/* OVERVIEW */}
        {/* ================================================================= */}
        <SectionTitle id="overview">Обзор</SectionTitle>
        <div style={{ maxWidth: "720px", fontSize: "18px", lineHeight: "27px", color: colors.text.main }}>
          <p style={{ margin: "0 0 16px" }}>
            UI kit для сайта <strong>letteros.com</strong>. Собран as-is на основе
            аудита реального DOM и CSS через Chrome DevTools MCP (2026-03-26).
          </p>
          <p style={{ margin: "0 0 16px" }}>
            Все значения извлечены из production-сайта. Если на разных страницах
            используются разные размеры для одного и того же тега — оба варианта
            сохранены честно.
          </p>
          <p style={{ margin: 0 }}>
            Этот UI kit — source of truth для создания новых страниц Letteros.
          </p>
        </div>

        {/* ================================================================= */}
        {/* COLORS */}
        {/* ================================================================= */}
        <SectionTitle id="colors">Палитра цветов</SectionTitle>

        <SubTitle>Текст</SubTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          <Swatch color={colors.text.main} label="text-main" note="основной текст, все страницы" />
          <Swatch color={colors.text.white} label="text-white" note="тёмные секции, кнопки" />
          <Swatch color={colors.text.placeholder} label="text-placeholder" note="placeholder, disabled, checkbox label" />
          <Swatch color={colors.text.inactive} label="text-inactive" note="недоступные опции (pricing)" />
        </div>

        <SubTitle>Фон</SubTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          <Swatch color={colors.bg.white} label="bg-white" />
          <Swatch color={colors.bg.alt} label="bg-alt" note="footer, blog, серые секции, dropdown" />
        </div>

        <SubTitle>Акцент — #001DFF (основная система)</SubTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          <Swatch color={colors.accent.blue} label="accent-blue" note="CTA-кнопки, ссылки, категории, radio, декор" />
          <Swatch color={colors.accent.blueHover} label="accent-blue-hover" note="hover для btn--blue (светлее)" />
        </div>
        <p style={{ fontSize: "12px", color: colors.text.placeholder, margin: "8px 0 0" }}>
          Используется повсеместно: кнопки .btn--blue, hover footer/dropdown/menu/card, .card__category, .radio:checked, gradient .text-gr, .hows__cart
        </p>

        <SubTitle>Акцент — #3072ED (ТОЛЬКО /pricing-new/)</SubTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          <Swatch color={colors.accent.blueNew} label="accent-blue-new" note="кнопки .btn--blue-new, pricing nav/table" />
          <Swatch color={colors.accent.blueNewHover} label="accent-blue-new-hover" note="hover для btn--blue-new (темнее)" />
        </div>
        <p style={{ fontSize: "12px", color: colors.text.placeholder, margin: "8px 0 0" }}>
          Параллельная система: классы с суффиксом -new. Hover темнеет (противоположно основному).
        </p>

        <SubTitle>Границы и поверхности</SubTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          <Swatch color={colors.border.default} label="border-default" note="карточки, инпуты, toggle, accordion" />
          <Swatch color={colors.border.blogCard} label="border-blog-card" note="blog card, file upload dashed" />
          <Swatch color={colors.surface.dark} label="surface-dark" note="header, тёмные секции, btn--black" />
          <Swatch color={colors.surface.activeBg} label="surface-active-bg" note="toggle active bg" />
          <Swatch color={colors.cookie} label="cookie-bg" note="cookie banner" />
          <Swatch color={colors.green} label="green" note="теги на /templates/" />
          <Swatch color={colors.cardCategoryDarker} label="card-category-darker" note=".card__category:hover" />
        </div>

        <SubTitle>Градиент</SubTitle>
        <div
          style={{
            background: colors.gradient.hows,
            borderRadius: "12px",
            padding: "24px",
            color: colors.text.white,
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {colors.gradient.hows}
        </div>

        {/* ================================================================= */}
        {/* TYPOGRAPHY */}
        {/* ================================================================= */}
        <SectionTitle id="typography">Типографика</SectionTitle>
        <p style={{ fontSize: "14px", color: colors.text.placeholder, margin: "0 0 24px" }}>
          Шрифт: {fontFamily.base}. Загружены веса: 500, 600, 700, 800. Фактически используются: 400, 500, 600, 700.
        </p>

        {(Object.keys(typography) as (keyof typeof typography)[]).map((level) => {
          const t = typography[level];
          return (
            <div key={level} style={{ marginBottom: "24px", borderBottom: `1px solid ${colors.border.default}`, paddingBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: colors.text.placeholder, marginBottom: "4px", fontWeight: 500 }}>
                {level} — {t.fontSize} / {t.fontWeight} / {t.lineHeight}
                {t.letterSpacing !== "normal" ? ` / ls: ${t.letterSpacing}` : ""}
              </div>
              <Typography level={level} color={colors.text.main}>
                {level.startsWith("h") ? `Заголовок ${level}` : `Текст ${level} — пример`}
              </Typography>
            </div>
          );
        })}

        {/* ================================================================= */}
        {/* SPACING */}
        {/* ================================================================= */}
        <SectionTitle id="spacing">Отступы и сетка</SectionTitle>

        <SubTitle>Контейнер</SubTitle>
        <TokenTable
          data={[
            ["max-width (default)", containerByBreakpoint.default],
            ["max-width (≤1299px)", containerByBreakpoint.laptop],
            ["max-width (≤991px)", containerByBreakpoint.tablet],
            ["padding", "0 20px"],
            ["padding (≤767px)", "0 10px"],
          ]}
        />

        <SubTitle>Gap-паттерны</SubTitle>
        <TokenTable data={Object.entries(gaps)} />

        <SubTitle>Отступы секций снизу (главная)</SubTitle>
        <TokenTable data={Object.entries(sectionPaddingBottom)} />

        {/* ================================================================= */}
        {/* BORDER RADIUS */}
        {/* ================================================================= */}
        <SectionTitle id="radius">Скругления</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "flex-end" }}>
          {Object.entries(radius).map(([name, value]) => (
            <div key={name} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: value,
                  border: `2px solid ${colors.accent.blue}`,
                  background: colors.bg.alt,
                }}
              />
              <div style={{ fontSize: "12px", fontWeight: 600, marginTop: "6px" }}>{name}</div>
              <div style={{ fontSize: "11px", color: colors.text.placeholder }}>{value}</div>
            </div>
          ))}
        </div>

        {/* ================================================================= */}
        {/* SHADOWS */}
        {/* ================================================================= */}
        <SectionTitle id="shadows">Тени</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
          {Object.entries(shadows).map(([name, value]) => (
            <div key={name} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "120px",
                  height: "80px",
                  borderRadius: "12px",
                  background: colors.bg.white,
                  boxShadow: value,
                  border: value === "none" ? `1px solid ${colors.border.default}` : "none",
                }}
              />
              <div style={{ fontSize: "12px", fontWeight: 600, marginTop: "8px" }}>{name}</div>
            </div>
          ))}
        </div>

        {/* ================================================================= */}
        {/* MOTION */}
        {/* ================================================================= */}
        <SectionTitle id="motion">Анимации и переходы</SectionTitle>
        <TokenTable data={Object.entries(motion)} />

        <SubTitle>Opacity</SubTitle>
        <TokenTable data={Object.entries(opacityTokens).map(([k, v]) => [k, String(v)])} />

        {/* ================================================================= */}
        {/* BREAKPOINTS */}
        {/* ================================================================= */}
        <SectionTitle id="breakpoints">Брейкпоинты</SectionTitle>
        <TokenTable data={Object.entries(breakpoints)} />

        {/* ================================================================= */}
        {/* Z-INDEX */}
        {/* ================================================================= */}
        <SectionTitle id="zindex">Z-Index слои</SectionTitle>
        <TokenTable data={Object.entries(zIndex).map(([k, v]) => [k, String(v)])} />

        {/* ================================================================= */}
        {/* BUTTONS */}
        {/* ================================================================= */}
        <SectionTitle id="buttons">Кнопки</SectionTitle>

        <SubTitle>Размеры</SubTitle>
        {(Object.keys(buttonSizes) as (keyof typeof buttonSizes)[]).map((size) => (
          <ShowcaseRow key={size} label={`size="${size}" — h: ${buttonSizes[size].height}, r: ${buttonSizes[size].borderRadius}`}>
            <Button size={size} variant="blue">btn--blue {size}</Button>
            <Button size={size} variant="black">btn--black {size}</Button>
            <Button size={size} variant="transparentBlack">btn--tr-b {size}</Button>
          </ShowcaseRow>
        ))}

        <SubTitle>Все варианты (size=&quot;m&quot;)</SubTitle>
        <ShowcaseRow label="Светлый фон — основная система (#001DFF)">
          <Button variant="blue">btn--blue</Button>
          <Button variant="black">btn--black</Button>
          <Button variant="transparentBlack">btn--tr-b</Button>
          <Button variant="transparentBlue">btn--tr-blue</Button>
          <Button variant="green">btn--green</Button>
        </ShowcaseRow>
        <ShowcaseRow label="Светлый фон — pricing-new система (#3072ED)">
          <Button variant="blueNew">btn--blue-new</Button>
          <Button variant="transparentBlueNew">btn--tr-blue-new</Button>
        </ShowcaseRow>
        <ShowcaseRow label="Тёмный фон" dark>
          <Button variant="white">btn--white</Button>
          <Button variant="transparentWhite">btn--tr-w</Button>
        </ShowcaseRow>

        <SubTitle>Состояния</SubTitle>
        <ShowcaseRow label="disabled / off / full">
          <Button variant="blue" disabled>disabled</Button>
          <Button variant="blue" off>off (opacity 0.3)</Button>
          <Button variant="black" full>full width</Button>
        </ShowcaseRow>

        <p style={{ fontSize: "13px", color: colors.text.placeholder, margin: "12px 0 0" }}>
          Hover-состояния интерактивны — наведите мышь на кнопки выше.
        </p>

        {/* ================================================================= */}
        {/* CARDS */}
        {/* ================================================================= */}
        <SectionTitle id="cards">Карточки</SectionTitle>

        <SubTitle>differents — Карточка фичи</SubTitle>
        <div style={{ maxWidth: "400px" }}>
          <Card type="differents">
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: colors.bg.alt, marginBottom: "16px" }} />
            <Typography level="h4" color={colors.text.main}>Заголовок карточки</Typography>
            <Typography level="body" color={colors.text.main} style={{ marginTop: "12px" }}>
              Описание фичи — текст внутри feature card. Radius 20px, padding 40px, мягкая тень.
            </Typography>
          </Card>
        </div>

        <SubTitle>hows — Градиентная карточка</SubTitle>
        <Card type="hows" style={{ display: "flex", padding: "40px", maxWidth: "700px" }}>
          <div style={{ flex: 1 }}>
            <Typography level="h4" color={colors.text.white}>Как это работает</Typography>
            <Typography level="body" color={colors.text.white} style={{ marginTop: "12px", opacity: 0.9 }}>
              Gradient card — radius 40px, от #001DFF до #8000FF. Текст белый.
            </Typography>
          </div>
        </Card>

        <SubTitle>integrations — Карточка интеграции</SubTitle>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Card type="integrations" style={{ display: "flex", alignItems: "center", width: "295px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "6px", background: colors.bg.alt }} />
            <span style={{ marginLeft: "12px", fontSize: "16px", fontWeight: 500 }}>Integration Logo</span>
          </Card>
        </div>

        <SubTitle>pricing — Карточка тарифа</SubTitle>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Card type="pricing" style={{ width: "244px" }}>
            <Typography level="h4" color={colors.text.main}>Старт</Typography>
            <div style={{ fontSize: "28px", fontWeight: 600, lineHeight: "39.2px", margin: "12px 0 20px" }}>
              1 800 ₽ <span style={{ fontSize: "14px", fontWeight: 400, color: colors.text.placeholder }}>в месяц</span>
            </div>
            <div style={{ fontSize: "14px", color: colors.text.main, marginBottom: "6px", display: "flex", justifyContent: "space-between" }}>
              <span>Хранилище писем</span><span>30</span>
            </div>
            <div style={{ fontSize: "14px", color: colors.text.inactive, marginBottom: "20px", display: "flex", justifyContent: "space-between", letterSpacing: "-0.28px" }}>
              <span>Рендеринг</span><span>—</span>
            </div>
            <Button variant="transparentBlack" size="m" full>Выбрать</Button>
          </Card>
        </div>

        <SubTitle>blog — Карточка блога</SubTitle>
        <Card type="blog" style={{ maxWidth: "360px" }}>
          <Tag variant="blue">Советы</Tag>
          <Typography level="h4" color={colors.text.main} style={{ marginTop: "12px" }}>
            Заголовок статьи
          </Typography>
          <Typography level="small" color={colors.text.placeholder} style={{ marginTop: "8px" }}>
            Краткое описание поста. Border #A9A9A9, radius 15px, padding 22px 20px 25px.
          </Typography>
        </Card>

        <SubTitle>faq — Элемент FAQ (hover-тень)</SubTitle>
        <div style={{ maxWidth: "700px" }}>
          <Card type="faq" style={{ padding: "32px 40px" }}>
            <Typography level="h4Accordion" color={colors.text.main}>
              Наведите мышь — появится мягкая тень
            </Typography>
          </Card>
        </div>

        {/* ================================================================= */}
        {/* ACCORDION */}
        {/* ================================================================= */}
        <SectionTitle id="accordion">Аккордеон / FAQ</SectionTitle>

        <SubTitle>Вариант faq — с карточкой и тенью</SubTitle>
        <div style={{ maxWidth: "700px" }}>
          <AccordionItem
            variant="faq"
            question="Что входит в бесплатный тариф?"
            answer="Создание и экспорт до 10 писем, 3 места в хранилище, 1 пользователь, аналитика, тестирование до 10 отправок."
          />
          <AccordionItem
            variant="faq"
            question="Можно ли перейти на другой тариф?"
            answer="Да, переход между тарифами возможен в любой момент. Остаток средств пересчитывается автоматически."
            defaultOpen
          />
        </div>

        <SubTitle>Вариант pricing — с border-bottom</SubTitle>
        <div style={{ maxWidth: "700px" }}>
          <AccordionItem
            variant="pricing"
            question="Есть ли скидка при оплате за год?"
            answer="Да, при годовой оплате скидка составляет 30%."
          />
          <AccordionItem
            variant="pricing"
            question="Как работает тестирование писем?"
            answer="Вы можете отправить тестовое письмо на указанный адрес, чтобы проверить отображение."
          />
        </div>

        {/* ================================================================= */}
        {/* TAGS */}
        {/* ================================================================= */}
        <SectionTitle id="tags">Теги и бейджи</SectionTitle>
        <ShowcaseRow label="green — btn--tag btn--green (/templates/)">
          <Tag variant="green">Бесплатно</Tag>
          <Tag variant="green">Верстка мастер-шаблона</Tag>
        </ShowcaseRow>
        <ShowcaseRow label="blue — .card__category (/blog/)">
          <Tag variant="blue">Советы</Tag>
          <Tag variant="blue">Маркетинг</Tag>
        </ShowcaseRow>

        {/* ================================================================= */}
        {/* FORMS */}
        {/* ================================================================= */}
        <SectionTitle id="forms">Поля ввода</SectionTitle>

        <SubTitle>Текстовое поле — .form-input</SubTitle>
        <div style={{ maxWidth: "400px" }}>
          <FormInput placeholder="Email" />
          <p style={{ fontSize: "12px", color: colors.text.placeholder, marginTop: "8px" }}>
            54px height, radius 15px. Focus: border-color → #151515. Placeholder скрывается при focus.
          </p>
        </div>

        <SubTitle>Select</SubTitle>
        <div style={{ maxWidth: "400px" }}>
          <Select
            placeholder="Выберите тип"
            options={[
              { value: "html", label: "Вёрстка HTML" },
              { value: "design", label: "Дизайн" },
              { value: "template", label: "Мастер-шаблон" },
            ]}
          />
          <p style={{ fontSize: "12px", color: colors.text.placeholder, marginTop: "8px" }}>
            56px height, radius 15px. На сайте: Select2.
          </p>
        </div>

        <SubTitle>Textarea</SubTitle>
        <div style={{ maxWidth: "400px" }}>
          <Textarea placeholder="Комментарий к заказу" />
          <p style={{ fontSize: "12px", color: colors.text.placeholder, marginTop: "8px" }}>
            Radius 15px, padding 17px 15px. Height варьируется (144px на /demo/).
          </p>
        </div>

        <SubTitle>Загрузка файла</SubTitle>
        <div style={{ maxWidth: "400px" }}>
          <FileUpload label="Загрузить файл" />
          <p style={{ fontSize: "12px", color: colors.text.placeholder, marginTop: "8px" }}>
            Border 1px dashed #A9A9A9, radius 15px, height 106px. На /templates/ и /demo/.
          </p>
        </div>

        <SubTitle>Radio</SubTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>
          <Radio label="Вариант A" name="demo-radio" defaultChecked />
          <Radio label="Вариант B" name="demo-radio" />
          <Radio label="Вариант C" name="demo-radio" />
          <p style={{ fontSize: "12px", color: colors.text.placeholder, marginTop: "4px" }}>
            :checked — border-color #001DFF, точка внутри.
          </p>
        </div>

        <SubTitle>Checkbox — все варианты</SubTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "500px" }}>
          <Checkbox label="default — 14px, color #A9A9A9, padding-left 22px" variant="default" />
          <Checkbox label="simple — 14px, color #151515, padding-left 32px" variant="simple" />
          <Checkbox label="tiny — 10px, line-height 1.2" variant="tiny" />
          <Checkbox label="large — 24px / 500, padding-left 49px (/templates/)" variant="large" />
          <Checkbox label="Checked по умолчанию" variant="default" defaultChecked />
        </div>

        <SubTitle>Паттерн формы подписки</SubTitle>
        <div
          style={{
            maxWidth: "280px",
            padding: "24px",
            background: colors.bg.alt,
            borderRadius: "12px",
          }}
        >
          <FormInput placeholder="Email" />
          <div style={{ marginTop: "12px" }}>
            <Button variant="black" size="m" full>Подписаться</Button>
          </div>
          <div style={{ marginTop: "12px" }}>
            <Checkbox label="Я согласен получать рассылку" variant="tiny" />
          </div>
        </div>

        {/* ================================================================= */}
        {/* TOGGLE */}
        {/* ================================================================= */}
        <SectionTitle id="toggle">Тогл</SectionTitle>
        <p style={{ fontSize: "14px", color: colors.text.placeholder, margin: "0 0 20px" }}>
          Переключатель опций. На сайте: месяц/год на /pricing-new/.
          Container radius 32px, active bg #F1F1F1 + weight 700.
        </p>
        <ShowcaseBox label="2 опции (как на /pricing-new/)">
          <Toggle options={["Месяц", "Год"]} />
        </ShowcaseBox>
        <ShowcaseBox label="3 опции">
          <Toggle options={["Месяц", "Квартал", "Год"]} defaultIndex={1} />
        </ShowcaseBox>

        {/* ================================================================= */}
        {/* PRICING NAV */}
        {/* ================================================================= */}
        <SectionTitle id="pricing-nav">Навигация тарифов</SectionTitle>
        <p style={{ fontSize: "14px", color: colors.text.placeholder, margin: "0 0 20px" }}>
          Навигация по тарифным планам внутри таблицы сравнения на /pricing-new/.
          Active: color #3072ED, border-bottom выделение. Привязан к pricing table.
        </p>
        <ShowcaseBox>
          <PricingNav plans={["Free", "Start", "Growth", "Pro", "Enterprise"]} defaultActive={2} />
        </ShowcaseBox>

        {/* ================================================================= */}
        {/* HEADER */}
        {/* ================================================================= */}
        <SectionTitle id="header">Хедер</SectionTitle>
        <p style={{ fontSize: "14px", color: colors.text.placeholder, margin: "0 0 20px" }}>
          Fixed, bg #151515, height 50px, z-index 1040, padding 0 24px.
          Реальный layout: logo + nav (7 пунктов + 2 dropdown) + lang switcher + Войти (dropdown) + CTA btn--white.
          Dropdown: bg #F8F8F8, radius 15px, padding 15px 22px 12px, shadow cardSoft.
          В демо position: relative.
        </p>
        <Header />

        {/* ================================================================= */}
        {/* FOOTER */}
        {/* ================================================================= */}
        <SectionTitle id="footer">Футер</SectionTitle>
        <p style={{ fontSize: "14px", color: colors.text.placeholder, margin: "0 0 20px" }}>
          Bg #F8F8F8, .footer__main padding 58px 0 47px, flex space-between wrap.
          5 колонок: Продукт, Бесплатные сервисы, Компания, Документы, Контакты (social 32x32 bg #151515).
          Subscribe block: 260px, input 54px + btn--black 54px + 2 checkbox tiny + recaptcha.
          Bottom: border-top #E1E1E1, logo grey + copyright + «Сделано в Grids».
        </p>
      </Container>
      <Footer />
      <Container>

        {/* ================================================================= */}
        {/* MOBILE MENU */}
        {/* ================================================================= */}
        <SectionTitle id="mobile-menu">Мобильное меню</SectionTitle>
        <p style={{ fontSize: "14px", color: colors.text.placeholder, margin: "0 0 20px" }}>
          Fixed, z-index 100, inner 260px, overlay rgba(0,0,0,0.2).
          Dividers border-bottom. Social links 42x42px.
        </p>
        <button
          onClick={() => setMobileMenuOpen(true)}
          style={{
            padding: "10px 20px",
            background: colors.surface.dark,
            color: colors.text.white,
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontFamily: fontFamily.base,
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          Открыть Mobile Menu
        </button>
        <MobileMenu
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* ================================================================= */}
        {/* COOKIE BANNER */}
        {/* ================================================================= */}
        <SectionTitle id="cookie">Cookie-Баннер</SectionTitle>
        <p style={{ fontSize: "14px", color: colors.text.placeholder, margin: "0 0 20px" }}>
          Fixed, bottom 0, z-index 1000, bg #F2F2F2, dual box-shadow.
          Кнопка: btn--s-s btn--blue, font-size 12px.
        </p>
        <button
          onClick={() => setCookieVisible(true)}
          style={{
            padding: "10px 20px",
            background: colors.accent.blue,
            color: colors.text.white,
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontFamily: fontFamily.base,
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          Показать Cookie Banner
        </button>
        <CookieBanner
          visible={cookieVisible}
          onAccept={() => setCookieVisible(false)}
        />

        {/* ================================================================= */}
        {/* MODAL */}
        {/* ================================================================= */}
        <SectionTitle id="modal">Модальное окно</SectionTitle>
        <p style={{ fontSize: "14px", color: colors.text.placeholder, margin: "0 0 20px" }}>
          modal--v1: bg white, radius 20px, padding 40px. Overlay + close button.
          На /pricing-new/: содержит форму заказа.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            padding: "10px 20px",
            background: colors.accent.blue,
            color: colors.text.white,
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontFamily: fontFamily.base,
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          Открыть Modal
        </button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Typography level="h4" color={colors.text.main}>Заголовок модального окна</Typography>
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <FormInput placeholder="Имя" />
            <FormInput placeholder="Email" />
            <Textarea placeholder="Комментарий" height="100px" />
            <Button variant="blueNew" size="m" full>Отправить заявку</Button>
          </div>
        </Modal>

        {/* ================================================================= */}
        {/* MARQUEE */}
        {/* ================================================================= */}
        <SectionTitle id="marquee">Бегущая строка</SectionTitle>
        <p style={{ fontSize: "14px", color: colors.text.placeholder, margin: "0 0 20px" }}>
          Бегущая строка логотипов клиентов. Container flex ~5254px, CSS animation infinite scroll.
          35+ логотипов на сайте.
        </p>
        <ShowcaseBox>
          <Marquee duration="20s">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: "120px",
                  height: "40px",
                  borderRadius: "8px",
                  background: colors.bg.white,
                  border: `1px solid ${colors.border.default}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: colors.text.placeholder,
                  flexShrink: 0,
                }}
              >
                Logo {i + 1}
              </div>
            ))}
          </Marquee>
        </ShowcaseBox>

        {/* ================================================================= */}
        {/* SOCIAL ICONS */}
        {/* ================================================================= */}
        <SectionTitle id="social">Иконки соцсетей</SectionTitle>
        <p style={{ fontSize: "14px", color: colors.text.placeholder, margin: "0 0 20px" }}>
          42x42px (mobile menu) / 32x32px (footer), border-radius 10px, bg #151515.
          На сайте используются только Telegram и VK.
        </p>
        <ShowcaseRow label="42×42 — mobile menu">
          <SocialIcon label="Telegram" href="#" bg="#151515" icon={<TelegramIcon size={20} />} />
          <SocialIcon label="VK" href="#" bg="#151515" icon={<VkIcon size={20} />} />
        </ShowcaseRow>
        <ShowcaseRow label="32×32 — footer">
          <SocialIcon label="Telegram" href="#" bg="#151515" icon={<TelegramIcon size={16} />} />
          <SocialIcon label="VK" href="#" bg="#151515" icon={<VkIcon size={16} />} />
        </ShowcaseRow>

        {/* ================================================================= */}
        {/* NOTES */}
        {/* ================================================================= */}
        <SectionTitle id="notes">Примечания — зафиксированные различия</SectionTitle>
        <div
          style={{
            maxWidth: "720px",
            fontSize: "14px",
            lineHeight: "22px",
            padding: "24px",
            background: colors.bg.alt,
            borderRadius: "12px",
            marginBottom: "80px",
          }}
        >
          <p style={{ margin: "0 0 12px", fontWeight: 700 }}>
            Этот UI kit собран as-is. Ниже — места, где нельзя делать поспешные обобщения:
          </p>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li style={{ marginBottom: "8px" }}>
              <strong>Два разных синих акцента:</strong> #001DFF (основные страницы) и #3072ED (только /pricing-new/).
              Разные hover-направления: #001DFF светлеет → #4B60FF, #3072ED темнеет → #0A51D7.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>H1 на разных страницах различается:</strong> 76px (главная) vs 64px (pricing).
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>H2 имеет 4 разных размера:</strong> 88px, 64px, 56px, 48px —
              все сохранены как отдельные level.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>line-height у body:</strong> 25.2px (главная) vs 27px (pricing) vs 23.4px (faq answer).
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Карточки имеют разные border-radius:</strong> 15px (blog), 20px (differents, pricing), 40px (hows).
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Section padding снизу:</strong> от 40px до 120px без единой шкалы.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Input font-size:</strong> 18px (/templates/) vs 16px (footer) — два варианта.
              Input height: 54px (основные) vs ~40px (footer).
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Checkbox:</strong> 4 варианта (default, simple, tiny, large) — large на /templates/ (24px/500).
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Link hover механизмы различаются:</strong> header/dropdown — кастомный ::before pseudo-underline,
              footer — text-decoration: underline + color change, content links — только color change.
            </li>
            <li>
              <strong>Toggle vs Pricing Nav:</strong> toggle — переключатель двух состояний (radius 32px),
              pricing nav — навигация планов с border-bottom. Разные паттерны, не объединять.
            </li>
          </ul>
        </div>

      </Container>
      </main>
    </div>
  );
}
