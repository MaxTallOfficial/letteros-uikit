"use client";

import { CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { AccordionItem } from "@/components/ui/Accordion";
import { Tag } from "@/components/ui/Tag";
import { FormInput } from "@/components/ui/FormInput";
import { Checkbox } from "@/components/ui/Checkbox";
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
  const isDark = color === "#151515" || color === "#A9A9A9" || color === "#BDBDBD" || color === "#2D8962" || color === "#001DFF" || color === "#4B60FF" || color === "#3072ED" || color === "#0A51D7";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "8px",
          background: color,
          border: color === "#ffffff" || color === "#F8F8F8" || color === "#F1F1F1" ? "1px solid #E1E1E1" : "none",
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

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Border Radius" },
  { id: "shadows", label: "Shadows" },
  { id: "motion", label: "Motion" },
  { id: "breakpoints", label: "Breakpoints" },
  { id: "zindex", label: "Z-Index" },
  { id: "buttons", label: "Buttons" },
  { id: "cards", label: "Cards" },
  { id: "accordion", label: "Accordion" },
  { id: "tags", label: "Tags" },
  { id: "forms", label: "Forms" },
  { id: "notes", label: "Notes" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function UIKitPage() {
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
        <SectionTitle id="overview">Overview</SectionTitle>
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
        <SectionTitle id="colors">Colors</SectionTitle>

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
          <Swatch color={colors.bg.alt} label="bg-alt" note="footer, blog, серые секции" />
        </div>

        <SubTitle>Акцент</SubTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          <Swatch color={colors.accent.blue} label="accent-blue" note="primary CTA, ссылки" />
          <Swatch color={colors.accent.blueHover} label="accent-blue-hover" note="hover для btn--blue" />
          <Swatch color={colors.accent.blueNew} label="accent-blue-new" note="ТОЛЬКО /pricing-new/" />
          <Swatch color={colors.accent.blueNewHover} label="accent-blue-new-hover" note="hover для btn--blue-new (темнее)" />
        </div>

        <SubTitle>Границы</SubTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          <Swatch color={colors.border.default} label="border-default" note="карточки, инпуты, toggle" />
          <Swatch color={colors.border.blogCard} label="border-blog-card" />
        </div>

        <SubTitle>Поверхности</SubTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          <Swatch color={colors.surface.dark} label="surface-dark" note="тёмные секции, btn--black" />
          <Swatch color={colors.surface.activeBg} label="surface-active-bg" note="active period toggle" />
          <Swatch color={colors.green} label="green" note="теги на /templates/" />
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
        <SectionTitle id="typography">Typography</SectionTitle>
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
        <SectionTitle id="spacing">Spacing & Container</SectionTitle>

        <SubTitle>Container</SubTitle>
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
        <TokenTable
          data={Object.entries(gaps)}
        />

        <SubTitle>Section padding-bottom (главная)</SubTitle>
        <TokenTable
          data={Object.entries(sectionPaddingBottom)}
        />

        {/* ================================================================= */}
        {/* BORDER RADIUS */}
        {/* ================================================================= */}
        <SectionTitle id="radius">Border Radius</SectionTitle>
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
        <SectionTitle id="shadows">Shadows</SectionTitle>
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
        <SectionTitle id="motion">Motion / Transitions</SectionTitle>
        <TokenTable data={Object.entries(motion)} />

        <SubTitle>Opacity</SubTitle>
        <TokenTable data={Object.entries(opacityTokens).map(([k, v]) => [k, String(v)])} />

        {/* ================================================================= */}
        {/* BREAKPOINTS */}
        {/* ================================================================= */}
        <SectionTitle id="breakpoints">Breakpoints</SectionTitle>
        <TokenTable data={Object.entries(breakpoints)} />

        {/* ================================================================= */}
        {/* Z-INDEX */}
        {/* ================================================================= */}
        <SectionTitle id="zindex">Z-Index</SectionTitle>
        <TokenTable data={Object.entries(zIndex).map(([k, v]) => [k, String(v)])} />

        {/* ================================================================= */}
        {/* BUTTONS */}
        {/* ================================================================= */}
        <SectionTitle id="buttons">Buttons</SectionTitle>

        <SubTitle>Размеры</SubTitle>
        {(Object.keys(buttonSizes) as (keyof typeof buttonSizes)[]).map((size) => (
          <ShowcaseRow key={size} label={`size="${size}" — h: ${buttonSizes[size].height}, r: ${buttonSizes[size].borderRadius}`}>
            <Button size={size} variant="blue">btn--blue {size}</Button>
            <Button size={size} variant="black">btn--black {size}</Button>
            <Button size={size} variant="transparentBlack">btn--tr-b {size}</Button>
          </ShowcaseRow>
        ))}

        <SubTitle>Все варианты (size=&quot;m&quot;)</SubTitle>
        <ShowcaseRow label="Светлый фон">
          <Button variant="blue">btn--blue</Button>
          <Button variant="blueNew">btn--blue-new</Button>
          <Button variant="black">btn--black</Button>
          <Button variant="transparentBlack">btn--tr-b</Button>
          <Button variant="transparentBlue">btn--tr-blue</Button>
          <Button variant="green">btn--green</Button>
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
        <SectionTitle id="cards">Cards</SectionTitle>

        <SubTitle>differents — Feature Card</SubTitle>
        <div style={{ maxWidth: "400px" }}>
          <Card type="differents">
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: colors.bg.alt, marginBottom: "16px" }} />
            <Typography level="h4" color={colors.text.main}>Заголовок карточки</Typography>
            <Typography level="body" color={colors.text.main} style={{ marginTop: "12px" }}>
              Описание фичи — текст внутри feature card. Radius 20px, padding 40px, мягкая тень.
            </Typography>
          </Card>
        </div>

        <SubTitle>hows — Gradient Card</SubTitle>
        <Card type="hows" style={{ display: "flex", padding: "40px", maxWidth: "700px" }}>
          <div style={{ flex: 1 }}>
            <Typography level="h4" color={colors.text.white}>Как это работает</Typography>
            <Typography level="body" color={colors.text.white} style={{ marginTop: "12px", opacity: 0.9 }}>
              Gradient card — radius 40px, от #001DFF до #8000FF. Текст белый.
            </Typography>
          </div>
        </Card>

        <SubTitle>integrations — Logo Card</SubTitle>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Card type="integrations" style={{ display: "flex", alignItems: "center", width: "295px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "6px", background: colors.bg.alt }} />
            <span style={{ marginLeft: "12px", fontSize: "16px", fontWeight: 500 }}>Integration Logo</span>
          </Card>
        </div>

        <SubTitle>pricing — Pricing Card</SubTitle>
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

        <SubTitle>blog — Blog Card</SubTitle>
        <Card type="blog" style={{ maxWidth: "360px" }}>
          <Tag variant="blue">Советы</Tag>
          <Typography level="h4" color={colors.text.main} style={{ marginTop: "12px" }}>
            Заголовок статьи
          </Typography>
          <Typography level="small" color={colors.text.placeholder} style={{ marginTop: "8px" }}>
            Краткое описание поста. Border #A9A9A9, radius 15px, padding 22px 20px 25px.
          </Typography>
        </Card>

        <SubTitle>faq — FAQ Item (hover-тень)</SubTitle>
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
        <SectionTitle id="accordion">Accordion / FAQ</SectionTitle>

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
        <SectionTitle id="tags">Tags / Badges</SectionTitle>
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
        <SectionTitle id="forms">Form Elements</SectionTitle>

        <SubTitle>Text Input — .form-input</SubTitle>
        <div style={{ maxWidth: "400px" }}>
          <FormInput placeholder="Email" />
          <p style={{ fontSize: "12px", color: colors.text.placeholder, marginTop: "8px" }}>
            Focus: border-color → #151515. Placeholder скрывается при focus.
          </p>
        </div>

        <SubTitle>Checkbox</SubTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
          <Checkbox label="Обычный checkbox — font-size 14px, color #A9A9A9" variant="default" />
          <Checkbox label="Simple checkbox — font-size 14px, color #151515" variant="simple" />
          <Checkbox label="Tiny — 10px, line-height 1.2" variant="tiny" />
          <Checkbox label="Checked по умолчанию" variant="default" defaultChecked />
        </div>

        <SubTitle>Subscribe Form Pattern</SubTitle>
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
            <Checkbox
              label="Я согласен получать рассылку"
              variant="tiny"
            />
          </div>
        </div>

        {/* ================================================================= */}
        {/* NOTES */}
        {/* ================================================================= */}
        <SectionTitle id="notes">Notes — зафиксированные различия</SectionTitle>
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
              Оба сохранены как отдельные токены.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>H1 на разных страницах различается:</strong> 76px (главная) vs 64px (pricing).
              Оба уровня присутствуют в typography.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>H2 имеет 4 разных размера:</strong> 88px, 64px, 56px, 48px —
              все сохранены как отдельные level (h2Sections, h2PricingBanner, h2PricingSection, h2PricingFaq).
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>line-height у body:</strong> 25.2px (главная) vs 27px (pricing) —
              оба варианта в typography (body, bodyPricing).
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Карточки имеют разные border-radius:</strong> 15px (blog), 20px (differents, pricing), 40px (hows) —
              не унифицированы, каждый тип сохранён отдельно.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Section padding снизу:</strong> от 40px до 120px без единой шкалы —
              все реальные значения зафиксированы в sectionPaddingBottom.
            </li>
            <li>
              <strong>hover btn--blue vs btn--blue-new:</strong> один становится светлее (#4B60FF),
              второй темнее (#0A51D7) — разная логика для разных вариантов.
            </li>
          </ul>
        </div>

      </Container>
      </main>
    </div>
  );
}
