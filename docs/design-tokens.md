# Дизайн-токены

Источник: `src/tokens/index.ts`. Все значения извлечены из production-сайта letteros.com.
CSS-переменные: `src/app/globals.css` (префикс `--l-*`).

## Цвета

### Текст

| Токен | Значение | Использование |
|---|---|---|
| `text.main` | `#151515` | Основной текст |
| `text.white` | `#ffffff` | Тёмные секции, кнопки |
| `text.placeholder` | `#A9A9A9` | Placeholder, disabled, мелкие лейблы |
| `text.inactive` | `#BDBDBD` | Недоступные опции (pricing) |

### Фон

| Токен | Значение | Использование |
|---|---|---|
| `bg.white` | `#ffffff` | Основной фон |
| `bg.alt` | `#F8F8F8` | Footer, blog, серые секции, dropdown |

### Акцент — основная система

| Токен | Значение | Роль |
|---|---|---|
| `accent.blue` | `#001DFF` | CTA-кнопки, ссылки, категории, radio |
| `accent.blueHover` | `#4B60FF` | Hover для btn--blue (**светлеет**) |

### Акцент — pricing-new (отдельная система)

| Токен | Значение | Роль |
|---|---|---|
| `accent.blueNew` | `#3072ED` | Кнопки и UI только на /pricing-new/ |
| `accent.blueNewHover` | `#0A51D7` | Hover для btn--blue-new (**темнеет**) |

> Два синих — параллельные системы, не алиасы. Направления hover противоположны.

### Границы, поверхности, прочее

| Токен | Значение | Использование |
|---|---|---|
| `border.default` | `#E1E1E1` | Карточки, инпуты, toggle |
| `border.blogCard` | `#A9A9A9` | Blog card, file upload dashed |
| `surface.dark` | `#151515` | Header, тёмные секции, btn--black |
| `surface.activeBg` | `#F1F1F1` | Toggle active bg |
| `green` | `#2D8962` | Теги на /templates/ |
| `overlay` | `rgba(0,0,0,0.2)` | Mobile menu overlay |
| `cookie` | `#F2F2F2` | Cookie banner bg |
| `cardCategoryDarker` | `#0015BC` | card__category:hover |
| `gradient.hows` | `linear-gradient(90deg, #001DFF, #8000FF)` | Градиентные карточки |

## Типографика

Шрифт: **Raleway** (`fontFamily.base`). Веса: 400/500/600/700.

Уровни сохранены as-is, включая page-specific варианты:

| Уровень | fontSize | weight | lineHeight | Контекст |
|---|---|---|---|---|
| `h1Hero` | 76px | 700 | 76px | Главная |
| `h1Pricing` | 64px | 700 | 64px | Pricing |
| `h2Sections` | 64px | 700 | 64px | Главная |
| `h2PricingBanner` | 56px | 700 | 56px | Pricing |
| `h2PricingSection` | 48px | 700 | 28.8px | Pricing |
| `h2PricingFaq` | 88px | 700 | 88px | Pricing FAQ |
| `h3PricingFaqSub` | 50px | 700 | 52.5px | Pricing FAQ |
| `h4` | 28px | 700 | 30.8px | Общий |
| `h4PricingCard` | 26px | 700 | 31.2px | Pricing card |
| `body` | 18px | 400 | 25.2px | Главная |
| `bodyPricing` | 18px | 400 | 27px | Pricing |
| `bodyFaqAnswer` | 18px | 400 | 23.4px | FAQ |
| `nav` | 14px | 400 | 19.6px | Header |
| `small` | 14px | 400 | normal | Meta |
| `priceValue` | 28px | 600 | 39.2px | Pricing |
| `checkboxTiny` | 10px | 400 | 1.2 | Legal |
| `checkboxLarge` | 24px | 500 | normal | /templates/ |
| `mobileMenu` | 16px | 400 | 22.4px | Mobile menu |

## Spacing

### Container

| Breakpoint | max-width | padding |
|---|---|---|
| >1299px | 1280px | 0 20px |
| ≤1299px | 992px | 0 20px |
| ≤991px | 768px | 0 20px |
| ≤767px | — | 0 10px |

### Gap-паттерны

Контекстно-зависимые: headerNav 40px, heroButtons 28px, differentsCards 30px, integrationsCards 40px, pricingCards 20px, pricingBannerBtns 12px.

### Section padding-bottom

Не подчиняется шкале: от 40px до 120px. Значения в `sectionPaddingBottom`.

## Border-radius

| Токен | Значение | Элементы |
|---|---|---|
| `btnSS` | 8px | Кнопка ss |
| `btnS` | 10px | Кнопка s |
| `btnM` | 15px | Кнопка m, form-input |
| `blogCard` | 15px | Blog card |
| `card` | 20px | Feature, pricing, faq cards |
| `howsCard` | 40px | Gradient card |
| `periodToggle` | 32px | Toggle container |
| `dropdown` | 15px | Dropdown |
| `modal` | 20px | Modal |
| `socialIcon` | 10px | Social icons |
| `checkbox` | 5px | Checkbox ::before |

## Тени

| Токен | Использование |
|---|---|
| `none` | Большинство элементов (flat-дизайн) |
| `cardSoft` | Многослойная мягкая — feature/integration cards, faq hover |
| `btnInset` | Inset 1px — transparent blue hover |
| `btnInsetBlueNew` | Inset 1px — transparent blue-new hover |

## Motion / Transitions

Основные: `all 0.25s` (кнопки), `height 0.2s` (link underline), `border-color 0.2s` (checkbox), `opacity 0.3s` (placeholder). Полный список — `motion` в tokens.

## Opacity

0.3 (btn--off), 0.35 (disabled swiper), 0.5 (form-submit:disabled), 0.8 (video play).

## Breakpoints

| Токен | Значение | Описание |
|---|---|---|
| `laptop` | 1299px | Container → 992px |
| `tablet` | 991px | Container → 768px |
| `mobile` | 767px | Padding → 10px, hamburger |
| `mobileS`–`smallest` | 660–376px | Мелкие экраны |

## Z-Index

| Слой | Значение | Элемент |
|---|---|---|
| `header` | 1040 | Header (fixed) |
| `cookie` | 1000 | Cookie banner (fixed) |
| `mobileMenu` | 100 | Mobile menu (fixed) |
| `dropdown` | 10 | Dropdown (absolute) |
