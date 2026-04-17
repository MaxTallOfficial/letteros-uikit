/**
 * Letteros Design Tokens — as-is из аудита сайта letteros.com (2026-03-26).
 *
 * Все значения извлечены из реального DOM/CSS через Chrome DevTools MCP.
 * Если на сайте два разных значения для похожей роли — оба здесь сохранены.
 * Ничего не нормализовано.
 */

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const colors = {
  text: {
    main: "#151515", // rgb(21,21,21) — основной текст, все страницы
    white: "#ffffff", // тёмные секции, кнопки
    placeholder: "#A9A9A9", // rgb(169,169,169) — placeholder, disabled, checkbox label
    inactive: "#BDBDBD", // rgb(189,189,189) — недоступные опции (pricing)
  },
  bg: {
    white: "#ffffff",
    alt: "#F8F8F8", // rgb(248,248,248) — footer, blog, серые секции
  },
  accent: {
    blue: "#3072ED", // rgb(0,29,255) — primary CTA, ссылки
    blueHover: "#0A51D7", // rgb(75,96,255) — hover для btn--blue
    /** Второй синий — используется ТОЛЬКО на /pricing-new/ */
    blueNew: "#3072ED", // rgb(48,114,237)
    blueNewHover: "#0A51D7", // rgb(10,81,215) — hover для btn--blue-new (темнее, не светлее)
  },
  border: {
    default: "#E1E1E1", // rgb(225,225,225) — карточки, инпуты, toggle, pricing card border
    blogCard: "#A9A9A9", // rgb(169,169,169) — blog card border
  },
  surface: {
    dark: "#151515", // rgb(21,21,21) — тёмные секции, btn--black
    activeBg: "#F1F1F1", // rgb(241,241,241) — active period toggle
  },
  green: "#2D8962", // rgb(45,137,98) — теги на /templates/
  overlay: "rgba(0, 0, 0, 0.2)", // mobile menu overlay
  cookie: "#F2F2F2", // rgb(242,242,242) — cookie banner bg
  cardCategoryDarker: "#0015BC", // rgb(0,21,188) — card__category:hover, card-s__title:hover
  gradient: {
    hows: "linear-gradient(90deg, #3072ED -30.81%, #8000FF 60.48%)",
  },
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const fontFamily = {
  base: "Raleway, -apple-system, BlinkMacSystemFont, Arial, sans-serif",
} as const;

/**
 * Типографические уровни — as-is.
 * Где значения расходятся между страницами, указано отдельно.
 */
export const typography = {
  h1Hero: { fontSize: "76px", fontWeight: 700, lineHeight: "76px", letterSpacing: "normal" },
  h1Pricing: { fontSize: "64px", fontWeight: 700, lineHeight: "64px", letterSpacing: "normal" },

  h2Sections: { fontSize: "64px", fontWeight: 700, lineHeight: "64px", letterSpacing: "normal" },
  h2PricingBanner: { fontSize: "56px", fontWeight: 700, lineHeight: "56px", letterSpacing: "normal" },
  h2PricingSection: { fontSize: "48px", fontWeight: 700, lineHeight: "28.8px", letterSpacing: "normal" },
  h2PricingFaq: { fontSize: "88px", fontWeight: 700, lineHeight: "88px", letterSpacing: "normal" },

  h3PricingFaqSub: { fontSize: "50px", fontWeight: 700, lineHeight: "52.5px", letterSpacing: "normal" },

  h4: { fontSize: "28px", fontWeight: 700, lineHeight: "30.8px", letterSpacing: "-0.1px" },
  h4PricingCard: { fontSize: "26px", fontWeight: 700, lineHeight: "31.2px", letterSpacing: "normal" },
  h4Accordion: { fontSize: "26px", fontWeight: 700, lineHeight: "31.2px", letterSpacing: "normal" },

  body: { fontSize: "18px", fontWeight: 400, lineHeight: "25.2px", letterSpacing: "-0.1px" },
  bodyPricing: { fontSize: "18px", fontWeight: 400, lineHeight: "27px", letterSpacing: "normal" },
  bodyFaqAnswer: { fontSize: "18px", fontWeight: 400, lineHeight: "23.4px", letterSpacing: "-0.2px" },

  nav: { fontSize: "14px", fontWeight: 400, lineHeight: "19.6px", letterSpacing: "normal" },
  footerNavTitle: { fontSize: "14px", fontWeight: 700, lineHeight: "19.6px", letterSpacing: "0.1px" },

  small: { fontSize: "14px", fontWeight: 400, lineHeight: "normal", letterSpacing: "-0.28px" },
  ui: { fontSize: "16px", fontWeight: 400, lineHeight: "normal", letterSpacing: "normal" },
  priceValue: { fontSize: "28px", fontWeight: 600, lineHeight: "39.2px", letterSpacing: "normal" },
  checkboxTiny: { fontSize: "10px", fontWeight: 400, lineHeight: "1.2", letterSpacing: "normal" },
  /** Large checkbox — /templates/ order form */
  checkboxLarge: { fontSize: "24px", fontWeight: 500, lineHeight: "normal", letterSpacing: "normal" },
  mobileMenu: { fontSize: "16px", fontWeight: 400, lineHeight: "22.4px", letterSpacing: "normal" },
} as const;

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

export const container = {
  maxWidth: "1280px",
  padding: "0 20px",
  paddingMobile: "0 10px",
} as const;

/** Реальные section padding-bottom с главной страницы — не нормализованы */
export const sectionPaddingBottom = {
  first: "40px",
  brands: "102px",
  video: "120px",
  differents: "118px",
  integrations: "120px",
  hows: "90px",
  faq: "100px",
  order: "120px",
} as const;

/** Реальные gap-значения из разных контекстов */
export const gaps = {
  headerNav: "40px",
  heroButtons: "28px",
  differentsCards: "30px",
  integrationsCards: "40px",
  pricingCards: "20px",
  pricingBannerBtns: "12px",
} as const;

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------

export const radius = {
  btnSS: "8px",
  btnS: "10px",
  btnM: "15px", // также form-input
  blogCard: "15px",
  card: "20px", // differents, integrations, faq, pricing
  howsCard: "40px",
  periodToggle: "32px",
  periodButton: "20px",
  dropdown: "15px",
  modal: "20px",
  socialIcon: "10px",
  featureIcon: "10px",
  templatesHero: "15px",
  selectFilter: "12px",
  categoryIcon: "7px",
  checkbox: "5px",
} as const;

// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------

export const shadows = {
  none: "none",
  /** Многослойная мягкая тень — differents__cart, integrations__cart, faq__item:hover/open */
  cardSoft:
    "rgba(63,63,63,0.02) 0px 2.12px 5.3px, rgba(63,63,63,0.03) 0px 10px 20.7px, rgba(63,63,63,0.05) 0px 26px 65px",
  /** Inset — btn--tr-blue:hover */
  btnInset: "inset 0 0 0 1px rgb(75,96,255)",
  /** Inset — btn--tr-blue-new:hover */
  btnInsetBlueNew: "inset 0 0 0 1px rgb(10,81,215)",
} as const;

// ---------------------------------------------------------------------------
// Motion / Transitions
// ---------------------------------------------------------------------------

export const motion = {
  btnAll: "all 0.25s",
  linkUnderline: "height 0.2s",
  checkboxBorder: "border-color 0.2s",
  inputBorder: "0.25s",
  placeholderOpacity: "opacity 0.3s",
  faqShadow: "box-shadow 0.25s",
  faqQuestion: "0.4s",
  transform02: "0.2s",
  transform04: "0.4s",
  opacity02: "0.2s",
  opacity03: "0.3s",
  swiperCubic: "opacity 0.3s cubic-bezier(0.39, 0.24, 0.21, 0.99)",
  loaderSpin: "1.2s infinite",
} as const;

// ---------------------------------------------------------------------------
// Opacity
// ---------------------------------------------------------------------------

export const opacity = {
  hidden: 0,
  btnOff: 0.3,
  swiperDisabled: 0.35,
  decorativeLine: 0.5,
  formSubmitDisabled: 0.5,
  videoPlay: 0.8,
} as const;

// ---------------------------------------------------------------------------
// Breakpoints
// ---------------------------------------------------------------------------

export const breakpoints = {
  laptop: "1299px",
  tablet: "991px",
  mobile: "767px",
  mobileS: "660px",
  mobileXS: "600px",
  mobileXXS: "500px",
  smallest: "376px",
} as const;

export const containerByBreakpoint = {
  default: "1280px",
  laptop: "992px",
  tablet: "768px",
} as const;

// ---------------------------------------------------------------------------
// Z-Index
// ---------------------------------------------------------------------------

export const zIndex = {
  header: 1040,
  cookie: 1000,
  mobileMenu: 100,
  dropdown: 10,
} as const;

// ---------------------------------------------------------------------------
// Buttons
// ---------------------------------------------------------------------------

export const buttonSizes = {
  ss: { height: "32px", padding: "0 14px", borderRadius: "8px", fontSize: undefined },
  s: { height: "34px", padding: "0 14px", borderRadius: "10px", fontSize: "14px" },
  m: { height: "54px", padding: "0 32px", borderRadius: "15px", fontSize: "18px" },
} as const;

export const buttonVariants = {
  white: {
    bg: "#ffffff", color: "#151515", border: "1px solid #ffffff",
    hoverBg: "#151515", hoverColor: "#ffffff",
  },
  blue: {
    bg: "#3072ED", color: "#ffffff", border: "none",
    hoverBg: "#0A51D7", hoverColor: "#ffffff",
  },
  blueNew: {
    bg: "#3072ED", color: "#ffffff", border: "none",
    hoverBg: "#0A51D7", hoverColor: "#ffffff",
  },
  black: {
    bg: "#151515", color: "#ffffff", border: "1px solid #151515",
    hoverBg: "#ffffff", hoverColor: "#151515",
  },
  transparentBlack: {
    bg: "transparent", color: "#151515", border: "1px solid #151515",
    hoverBg: "#151515", hoverColor: "#ffffff",
  },
  transparentWhite: {
    bg: "transparent", color: "#ffffff", border: "1px solid #ffffff",
    hoverBg: "#ffffff", hoverColor: "#151515",
  },
  transparentBlue: {
    bg: "transparent", color: "#3072ED", border: "1px solid #3072ED",
    hoverBg: "#0A51D7", hoverColor: "#ffffff",
  },
  transparentBlueNew: {
    bg: "transparent", color: "#3072ED", border: "1px solid #3072ED",
    hoverBg: "#0A51D7", hoverColor: "#ffffff",
  },
  green: {
    bg: "#2D8962", color: "#ffffff", border: "none",
    hoverBg: undefined, hoverColor: undefined,
  },
} as const;

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

export const cardStyles = {
  differents: {
    bg: "#ffffff",
    border: "none",
    borderRadius: "20px",
    shadow: shadows.cardSoft,
    padding: "40px",
  },
  hows: {
    bg: colors.gradient.hows,
    border: "none",
    borderRadius: "40px",
    shadow: "none",
    padding: "0",
  },
  integrations: {
    bg: "#ffffff",
    border: "none",
    borderRadius: "20px",
    shadow: shadows.cardSoft,
    padding: "15px 26px",
  },
  pricing: {
    bg: "transparent",
    border: "1px solid #E1E1E1",
    borderRadius: "20px",
    shadow: "none",
    padding: "30px 20px 26px",
  },
  blog: {
    bg: "#ffffff",
    border: "1px solid #A9A9A9",
    borderRadius: "15px",
    shadow: "none",
    padding: "22px 20px 25px",
  },
  faq: {
    bg: "#ffffff",
    border: "none",
    borderRadius: "20px",
    shadow: "none",
    shadowHover: shadows.cardSoft,
    padding: undefined,
  },
} as const;
