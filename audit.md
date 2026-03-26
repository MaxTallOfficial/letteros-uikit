# Аудит интерфейсной системы Letteros.com

**Дата:** 2026-03-26
**Источник данных:** DOM, computed styles, CSS stylesheet rules через Chrome DevTools MCP
**Страницы:** главная, /pricing-new/, /templates/, /blog/, /demo/

---

## 1. Summary

Сайт работает на WordPress 6.8.5, кастомная тема `letteros-new`. Единый CSS-файл `styles-v1.css`, архитектура BEM. Визуальная система минималистичная: почти чёрный текст на белом фоне, один ярко-синий акцент, flat-дизайн без теней на большинстве элементов. Типографика строится на одном шрифте — Raleway.

**Что уже выглядит как система:**
- BEM-именование последовательно
- Шрифтовая семья единая
- Кнопочная система с модификаторами цвета и размера логична
- Container max-width и padding устойчивы
- Transition-значения повторяются (0.25s на кнопках, 0.2s на ссылках)
- Z-index слои явные и непересекающиеся

**Что выглядит несистемно:** — см. раздел 8.

---

## 2. Design Tokens

### Цвета

#### Синие акценты — детальная карта использования

На сайте используются **два параллельных синих цвета**, которые не смешиваются:

**`#001DFF` / `rgb(0, 29, 255)` — основной акцент всего сайта:**

| CSS-свойство | Контекст | Примеры |
|---|---|---|
| `background-color` | CTA-кнопки (`.btn--blue`) | «Начать бесплатно», «Заказать шаблон», cookie «Принять» |
| `background-color` | Декор | swiper-bullet active, outreach icon, popup category |
| `color` | Ссылки при hover | footer nav, dropdown items, mobile menu, checkbox links |
| `color` | Категории (нормальное) | `.card__category`, `.card-s__category`, `.post__category` |
| `color` | UI-элементы | active language, pricing period, video play icon |
| `color` | Карточка hover | `.card__title:hover` |
| `box-shadow inset` | Обводка кнопки | `.btn--tr-blue` (transparent blue) |
| `border-color` | Radio checked | `.radio__indicator:checked` |
| `linear-gradient` | Градиент-текст | `.text-gr` (#001DFF → rgb(128,0,255)) |
| `linear-gradient` | Градиент-карточки | `.hows__cart` (#001DFF → #8000FF) |

Hover-состояние `#001DFF`: → `rgb(75, 96, 255)` / `#4B60FF` (светлее)

**`#3072ED` / `rgb(48, 114, 237)` — вторичный акцент, ТОЛЬКО /pricing-new/:**

| CSS-свойство | Контекст | Примеры |
|---|---|---|
| `background-color` | CTA-кнопки (`.btn--blue-new`) | «Выбрать» в тарифах, «Нужен дизайн», «Отправить заявку» |
| `color` | UI-элементы pricing | опции корзины `i`, active dropdown item, active nav item |
| `color` | Таблица сравнения | SVG-галочки `td svg` |
| `box-shadow inset` | Обводка кнопки | `.btn--tr-blue-new` |
| `background-color` | Декор timeline | `.release__date::after` (точка на таймлайне) |

Hover-состояние `#3072ED`: → `rgb(10, 81, 215)` / `#0A51D7` (темнее — противоположное направление)

> Два цвета существуют параллельно: `#001DFF` — основная система, `#3072ED` — pricing-new (классы с суффиксом `-new`). Направление hover тоже разное: основной светлеет, pricing темнеет.

#### Полная палитра

| Роль | Значение | Откуда |
|---|---|---|
| Основной текст | `rgb(21, 21, 21)` = `#151515` | computed, все страницы |
| Фон (белый) | `#ffffff` | computed |
| Фон (серый alt) | `rgb(248, 248, 248)` = `#F8F8F8` | footer, blog, секции, dropdown |
| Акцент / primary CTA | `rgb(0, 29, 255)` = `#001DFF` | кнопки, ссылки, категории (см. выше) |
| Акцент hover | `rgb(75, 96, 255)` = `#4B60FF` | CSS :hover правило |
| Второй синий (pricing) | `rgb(48, 114, 237)` = `#3072ED` | только /pricing-new/ (см. выше) |
| Второй синий hover | `rgb(10, 81, 215)` = `#0A51D7` | :hover на pricing |
| Граница / divider | `rgb(225, 225, 225)` = `#E1E1E1` | карточки, инпуты, toggle, accordion |
| Disabled / placeholder | `rgb(169, 169, 169)` = `#A9A9A9` | кнопки disabled, placeholder, чекбокс-лейблы, upload border |
| Inactive text (pricing) | `rgb(189, 189, 189)` = `#BDBDBD` | недоступные опции тарифов |
| Active bg (toggle) | `rgb(241, 241, 241)` = `#F1F1F1` | активный период в toggle |
| Dark surface | `rgb(21, 21, 21)` = `#151515` | header, тёмные секции, btn--black |
| Green (tag) | `rgb(45, 137, 98)` = `#2D8962` | теги на /templates/ |
| Cookie bg | `rgb(242, 242, 242)` = `#F2F2F2` | cookie banner |
| Overlay | `rgba(0, 0, 0, 0.2)` | mobile menu overlay |
| Card category darker | `rgb(0, 21, 188)` = `#0015BC` | `.card__category:hover`, `.card-s__title:hover` |

> Кастомных CSS-переменных для цветов нет. Все значения захардкожены в правилах.

---

### Типографика

**Шрифт:** Raleway (Google Fonts), загружены веса: 500, 600, 700, 800. Фактически используются: 400, 500, 600, 700.

| Уровень | font-size | font-weight | line-height | letter-spacing | Страница |
|---|---|---|---|---|---|
| H1 (hero) | `76px` | 700 | `76px` | normal | главная |
| H1 (pricing) | `64px` | 700 | `64px` | normal | pricing |
| H2 (sections) | `64px` | 700 | `64px` | normal | главная |
| H2 (pricing banner) | `56px` | 700 | `56px` | — | pricing |
| H2 (pricing section) | `48px` | 700 | `28.8px` | — | pricing |
| H2 (pricing FAQ) | `88px` | 700 | `88px` | — | pricing |
| H3 (pricing FAQ sub) | `50px` | 700 | `52.5px` | — | pricing |
| H4 | `28px` | 700 | `30.8px` | `-0.1px` | главная |
| H4 (pricing card) | `26px` | 700 | `31.2px` | — | pricing |
| Body | `18px` | 400 | `25.2px` | `-0.1px` | главная |
| Body (pricing) | `18px` | 400 | `27px` | — | pricing |
| Body (faq answer) | `18px` | 400 | `23.4px` | `-0.2px` | FAQ |
| Small / meta | `14px` | 400 | normal | `-0.28px` | pricing options |
| Nav header | `14px` | 400–500 | normal | normal | header, dropdown |
| Nav / UI | `16px` | 400–700 | — | — | nav, toggle |
| Price value | `28px` | 600 | `39.2px` | — | pricing card |
| Tiny (legal) | `10px` | 400 | `1.2` | — | footer recaptcha, checkbox tiny |
| Checkbox large | `24px` | 500 | normal | — | /templates/ order form |

---

### Кнопки — полная система

**Base `.btn`:** `display: flex`, `align-items: center`, `justify-content: center`, `font-weight: 700`, `font-family: Raleway`, `transition: all 0.25s`, `cursor: pointer`, `white-space: nowrap`

**Размерные модификаторы:**

| Класс | height | padding | border-radius | font-size |
|---|---|---|---|---|
| `.btn--s-ss` | `32px` | `0 14px` | `8px` | — |
| `.btn--s-s` | `34px` | `0 14px` | `10px` | `14px` |
| `.btn--s-m` | `54px` | `0 32px` | `15px` | `18px` |

**Цветовые модификаторы:**

| Класс | background | color | border |
|---|---|---|---|
| `.btn--white` | `#ffffff` | `rgb(21,21,21)` | `1px solid #ffffff` |
| `.btn--blue` | `rgb(0,29,255)` | `#ffffff` | none |
| `.btn--blue-new` | `rgb(48,114,237)` | `#ffffff` | none |
| `.btn--black` | `rgb(21,21,21)` | `#ffffff` | `1px solid rgb(21,21,21)` |
| `.btn--tr-b` | `transparent` | `rgb(21,21,21)` | `1px solid rgb(21,21,21)` |
| `.btn--tr-w` | `transparent` | `#ffffff` | `1px solid #ffffff` |
| `.btn--tr-blue` | `transparent` | `rgb(0,29,255)` | `1px solid rgb(0,29,255)` |
| `.btn--tr-blue-new` | `transparent` | `rgb(48,114,237)` | `1px solid rgb(48,114,237)` |
| `.btn--green` | `rgb(45,137,98)` | `#ffffff` | none |

**Hover-состояния (из CSS rules):**

| Кнопка | hover background | hover color |
|---|---|---|
| `.btn--white:hover` | `rgb(21,21,21)` | `#ffffff` |
| `.btn--blue:hover` | `rgb(75,96,255)` | `#ffffff` |
| `.btn--blue-new:hover` | `rgb(10,81,215)` | `#ffffff` |
| `.btn--black:hover` | `#ffffff` | `rgb(21,21,21)` |
| `.btn--tr-b:hover` | `rgb(21,21,21)` | `#ffffff` |
| `.btn--tr-w:hover` | `#ffffff` | `rgb(21,21,21)` |
| `.btn--tr-blue:hover` | `rgb(75,96,255)` + inset box-shadow | `#ffffff` |
| `.btn--tr-blue-new:hover` | `rgb(10,81,215)` + inset box-shadow | `#ffffff` |

**State-модификаторы:**

| Класс | Эффект |
|---|---|
| `.btn--disabled` | `pointer-events: none`, `background: rgb(169,169,169)` |
| `.btn--off` | `pointer-events: none`, `opacity: 0.3` |
| `.btn--full` | `width: 100%` |
| `.btn-loader` | spinner animation, 1.2s infinite |

---

### Spacing

**Container:**

| Breakpoint | max-width | padding |
|---|---|---|
| > 1299px | `1280px` | `0 20px` |
| ≤ 1299px | `992px` | `0 20px` |
| ≤ 991px | `768px` | `0 20px` |
| ≤ 767px | — | `0 10px` |

**Section padding (главная):**

| Секция | padding-top | padding-bottom | background |
|---|---|---|---|
| `.first` (hero) | `60px` | `40px` | transparent |
| `.brands` | `0` | `102px` | transparent |
| `.video` | `0` | `120px` | transparent |
| `.differents` | `0` | `118px` | transparent |
| `.integrations` | `0` | `120px` | transparent |
| `.hows` | `0` | `90px` | transparent |
| `.p-home__faq` | `0` | `100px` | transparent |
| `.order` | `0` | `120px` | transparent |
| `footer` | `0` | `0` | `#F8F8F8` |

**Gap паттерны:**

| Контекст | gap |
|---|---|
| `header__nav` | `column-gap: 40px` |
| `first__btns` | `gap: 28px` |
| `differents__carts` | `gap: 30px` |
| `integrations__carts` | `gap: 40px` |
| `pricing-v1__carts` | `gap: 20px` |
| `pricing-v1-banner__btns` | `gap: 12px` |

---

### Border-radius

| Элемент | radius |
|---|---|
| `.btn--s-ss` | `8px` |
| `.btn--s-s` | `10px` |
| `.btn--s-m`, `.form-input`, `.form-select` | `15px` |
| Blog card `.card` | `15px` |
| `.differents__cart`, `.integrations__cart`, `.faq__item`, pricing card | `20px` |
| `.dropdown__list` | `15px` |
| `.modal--v1` | `20px` |
| `.hows__cart` (gradient card) | `40px` |
| Period toggle container | `32px` |
| Period toggle buttons | `20px` |
| Select фильтры (blog) | `12px` |
| Checkbox `::before` | `5px` |
| Category icon (blog) | `7px` |
| Social icon | `10px` |
| Feature icon container | `10px` |
| Templates hero image | `15px` |

---

### Тени

Flat-дизайн: `box-shadow: none` на большинстве элементов.

**Многослойная мягкая тень** — используется на `.differents__cart`, `.integrations__cart`, `.faq__item:hover`, `.faq__item.open`:
```
rgba(63,63,63,0.02) 0px 2.12px 5.3px,
rgba(63,63,63,0.03) 0px 10px 20.7px,
rgba(63,63,63,0.05) 0px 26px 65px
```

**Cookie banner dual shadow:**
```
box-shadow (верхний и нижний)
```

**Inset box-shadow** — только `.btn--tr-blue:hover`: `inset 0 0 0 1px rgb(75,96,255)`.

---

### Переходы и анимации

| Элемент | transition / animation |
|---|---|
| `.btn` | `all 0.25s` |
| `.link::before` | `height 0.2s` |
| `checkbox-label::before` | `border-color 0.2s` |
| transform (меню, слайдеры) | `0.2s`, `0.4s` |
| opacity | `0.2s`, `0.3s` |
| swiper-pagination | `opacity 0.3s` |
| кастомная кубическая | `opacity 0.3s cubic-bezier(0.39, 0.24, 0.21, 0.99)` |
| `.btn-loader` | `1.2s infinite` |
| `.card__title` | `color 0.25s` |
| dropdown opacity | `opacity 0.2s–0.3s` |

Поддержка `prefers-reduced-motion: reduce` — присутствует в stylesheet.

---

### Opacity паттерны

| Значение | Использование |
|---|---|
| `0` | Скрытые элементы (dropdown, video, form-success, checkbox input) |
| `0.3` | `.btn--off`, декоративные SVG |
| `0.35` | Disabled Swiper navigation |
| `0.5` | Полупрозрачные SVG линии, form-submit:disabled |
| `0.8` | Video play button, SVG rect |

---

### Z-index

| Элемент | position | z-index |
|---|---|---|
| `header` | fixed | `1040` |
| `.cookie` (banner) | fixed | `1000` |
| `.menu` (mobile) | fixed | `100` |
| `.dropdown__list` | absolute | `10` |

---

### Breakpoints

| Значение | Тип |
|---|---|
| `≤ 1299px` | Laptop (container → 992px) |
| `≤ 991px` | Tablet (container → 768px, H1 → 48px) |
| `≤ 767px` | Mobile (padding → 10px, pricing cards → 100%, header nav → hamburger) |
| `≤ 660px` | Mobile S (22 правила) |
| `≤ 600px` | Mobile XS |
| `≤ 500px` | Mobile XXS |
| `≤ 376px` | Smallest |
| `767–991px` | Tablet range (7 правил) |

---

## 3. Components Inventory

### Глобальные

| Компонент | Классы | Описание |
|---|---|---|
| **Header** | `.header` | fixed, bg #151515, height 50px, z-index 1040, logo SVG 119x14 + nav + dropdown + CTA |
| **Mobile Menu** | `.menu`, `.header__menu` | fixed, z-index 100, inner 260px, overlay rgba(0,0,0,0.2), border-bottom dividers |
| **Dropdown** | `.dropdown__list` | absolute, z-index 10, bg #F8F8F8, radius 15px, padding 15px 22px 12px, opacity 0→1, shadow cardSoft |
| **Footer** | `.footer` | bg #F8F8F8, padding-top 60px, 5-колоночный layout + subscribe form + social icons |
| **Cookie Banner** | `.cookie.cookie--banner` | fixed, bottom 0, z-index 1000, bg #F2F2F2, dual box-shadow, btn--s-s btn--blue 12px |

### Главная страница

| Компонент | Классы | Описание |
|---|---|---|
| **Hero Section** | `.first` | заголовок + subtext + 2 CTA + SVG иллюстрации |
| **Brands Marquee** | `.brands`, `.marquee__list` | бегущая строка, 35+ логотипов, container 5254px, CSS animation |
| **Video Block** | `.video` | mp4 демо, opacity 0 по умолчанию |
| **Feature Card (Swiper)** | `.differents__cart.swiper-slide` | 6 карточек, gap 30px |
| **How-it-works Card** | `.hows__cart` | 4 шага с нумерацией, gradient bg |
| **Integration Card** | `.integrations__cart` | логотипы партнёров, gap 40px |
| **FAQ / Accordion** | `.faq__item.accordeon--single` | 8 вопросов |
| **CTA Section** | `.order` | заголовок + Swiper шаблонов |
| **Subscribe Form** | `.footer__subscribe-form` | email + 2 чекбокса + submit |

### Страница /pricing-new/

| Компонент | Классы | Описание |
|---|---|---|
| **Pricing Card** | `.pricing-v1-cart` | 5 планов, border 1px solid #E1E1E1, radius 20px, padding 30px 20px |
| **Period Toggle** | `.pricing-v1__periods` | border-radius 32px, bg white, active bg #F1F1F1, active font-weight 700 |
| **Pricing Nav** | `.pricing-v1-nav` | горизонтальная навигация планов, active item выделен, btn--blue-new «Выбрать» |
| **Comparison Table** | `.pricing-v1-table` | 1300px wide, nav header с табами планов, active column, SVG checkmarks 10-18px |
| **Pricing FAQ** | `.pricing-v1-accordeon` | border-bottom стиль, без карточек |
| **Modal** | `.modal--v1` | bg white, radius 20px, padding 40px, overlay + close button, содержит форму |

### Страница /templates/

| Компонент | Классы | Описание |
|---|---|---|
| **Tag / Badge** | `.btn--tag.btn--green` | bg rgb(45,137,98), текст белый |
| **Order Form** | `.order-form` | форма заказа: text/tel/email inputs, Select2, textarea, file upload, table опций |

### Страница /demo/

| Компонент | Классы | Описание |
|---|---|---|
| **Demo Form** | — | promo code input (padding-right 225px для inline button), textarea 144px, file upload |

### Страница /blog/

| Компонент | Классы | Описание |
|---|---|---|
| **Blog Card** | `.card` | bg white, `border: 1px solid #A9A9A9`, `border-radius: 15px`, `padding: 22px 20px 25px` |
| **Category Label** | `.card__category` | цвет `#001DFF`, font-size 16px, border-radius 0 |
| **Category Filter** | `.blog__filter-select` | Select2-based, border-radius 12px |

### Кнопка как система

Две оси модификаторов:
- **Размер:** `btn--s-ss` / `btn--s-s` / `btn--s-m`
- **Цвет/вариант:** `btn--white` / `btn--blue` / `btn--blue-new` / `btn--black` / `btn--tr-b` / `btn--tr-w` / `btn--tr-blue` / `btn--tr-blue-new` / `btn--green` / `btn--tag`

---

## 4. Link Styles по контекстам

### Header nav links (`.header__nav-link.link`)

| Свойство | Normal | Hover |
|---|---|---|
| color | `rgb(255, 255, 255)` (белый) | без изменений |
| font-size | `14px` | — |
| font-weight | `400` | — |
| text-decoration | `none` | кастомное `::before` pseudo-underline |
| механизм hover | — | `.link::before { height: 0 → 1px }`, `transition: height 0.2s`, цвет = `currentColor` |

> Не стандартное `text-decoration`, а анимированный `::before`-псевдоэлемент высотой 1px.

### Dropdown links (`.dropdown__item a.link`)

| Свойство | Normal | Hover |
|---|---|---|
| color | `rgb(21, 21, 21)` | без изменений (тот же `::before` механизм) |
| font-size | `14px` | — |
| font-weight | `400` | — |
| text-decoration | `none` | `::before` pseudo-underline 1px тёмный |

**Dropdown button items** (`.dropdown__item-btn`): hover меняет `color → rgb(0, 29, 255)` (#001DFF).

**Active language** (`.current-lang`): `color: rgb(0, 29, 255)` — всегда синий.

### Footer nav links (`.footer__nav-item`)

| Свойство | Normal | Hover |
|---|---|---|
| color | `rgb(21, 21, 21)` | `rgb(0, 29, 255)` (#001DFF) |
| font-size | `14px` | — |
| font-weight | `400` | — |
| text-decoration | `none` | `underline` (добавляется) |

> Hover применён к родительскому `li` (`.footer__nav-item:hover`), а не к тегу `<a>`.

### Footer legal links (recaptcha-блок)

| Свойство | Normal | Hover |
|---|---|---|
| color | `rgb(169, 169, 169)` (#A9A9A9) | `rgb(0, 29, 255)` |
| font-size | `10px` | — |
| text-decoration | `underline` (уже в normal) | `underline` сохраняется |

### Content links (ссылки в тексте)

Встречаются в чекбокс-лейблах, текстах статей, формах.

| Свойство | Normal | Hover |
|---|---|---|
| color | `rgb(21, 21, 21)` | `rgb(0, 29, 255)` |
| text-decoration | `underline` (в normal) | `underline` сохраняется |

Примеры: `.checkbox-label a`, `.post__content a`, `.project__text a`.

### Card title links

| Элемент | Normal color | Hover color | Transition |
|---|---|---|---|
| `.card__title` | наследует (тёмный) | `rgb(0, 29, 255)` | `color 0.25s` |
| `.card__category` | `rgb(0, 29, 255)` (уже синий) | `rgb(0, 21, 188)` (темнее) | — |
| `.card-s__title` | наследует | `rgb(0, 21, 188)` | — |

### Mobile menu links (`.menu__link`)

| Свойство | Normal | Hover |
|---|---|---|
| color | `rgb(21, 21, 21)` | `rgb(0, 29, 255)` |
| `.menu__icon` | — | `color: rgb(0, 29, 255)` (иконка тоже) |

### Сводная таблица

| Контекст | Normal color | Hover color | Hover decoration | Механизм |
|---|---|---|---|---|
| Header nav | `#fff` | `#fff` | pseudo-underline 1px | `.link::before` height 0→1px |
| Dropdown links | `#151515` | `#151515` | pseudo-underline 1px | `.link::before` height 0→1px |
| Dropdown buttons | `#151515` | `#001DFF` | — | color change |
| Footer nav | `#151515` | `#001DFF` | `text-decoration: underline` | color + underline |
| Footer legal | `#A9A9A9` | `#001DFF` | underline (уже есть) | color change |
| Content links | `#151515` | `#001DFF` | underline (уже есть) | color change |
| Card title | inherit | `#001DFF` | — | color 0.25s |
| Card category | `#001DFF` | `#0015BC` | — | color darkens |
| Mobile menu | `#151515` | `#001DFF` | — | color change |

---

## 5. States & Responsive

### Состояния кнопок

| Кнопка | hover bg | hover color | примечание |
|---|---|---|---|
| `.btn--blue` | `rgb(75,96,255)` | `#ffffff` | светлее |
| `.btn--blue-new` | `rgb(10,81,215)` | `#ffffff` | темнее (противоположное направление) |
| `.btn--white` | `rgb(21,21,21)` | `#ffffff` | инверсия |
| `.btn--black` | `#ffffff` | `rgb(21,21,21)` | инверсия |
| `.btn--tr-b` | `rgb(21,21,21)` | `#ffffff` | заполняется |
| `.btn--tr-w` | `#ffffff` | `rgb(21,21,21)` | заполняется |
| `.btn--tr-blue` | `rgb(75,96,255)` + inset box-shadow | `#ffffff` | заполняется + обводка |
| `.btn--tr-blue-new` | `rgb(10,81,215)` + inset box-shadow | `#ffffff` | заполняется + обводка |
| `.btn--disabled` | — | — | `pointer-events: none`, `bg: #A9A9A9` |
| `.btn--off` | — | — | `pointer-events: none`, `opacity: 0.3` |
| `.form-submit:disabled` | — | — | `pointer-events: none`, `opacity: 0.5` |

### Состояния карточек и интерактивных блоков

| Элемент | hover / open |
|---|---|
| `.card` (blog) | `border-color: rgb(21,21,21)` |
| `.faq__item` | появляется многослойная тень |
| `.faq__item.open` | та же тень сохраняется |
| `.integration__logo` | `opacity: 1` (в покое приглушён) |
| `.swiper-pagination-bullet` | `background: rgb(0,29,255); transform: scale(1.5)` |

### Состояния форм

| Элемент | состояние | эффект |
|---|---|---|
| `.form-input` | default | `border: 1px solid #E1E1E1` |
| `.form-input:focus` | focus | `border-color: rgb(21,21,21)` |
| `.form-input::placeholder` | default | `color: #A9A9A9`, `transition: opacity 0.3s` |
| `.form-input:focus::placeholder` | focus | `opacity: 0` |
| `.checkbox-label::before` | default | `border: 1px solid #E1E1E1`, `border-radius: 5px`, bg white |
| `.checkbox-input:checked + .checkbox-label::before` | checked | `border-color: rgb(21,21,21)` |
| `.checkbox-input:checked + .checkbox-label::after` | checked | `opacity: 1` (чекмарк появляется) |
| `.radio__indicator` | checked | `border-color: rgb(0,29,255)`, `::after opacity: 1` |
| `.accordeon.open .accordeon-content` | open | `display: block` |

### Состояния pricing

| Элемент | состояние | эффект |
|---|---|---|
| `.pricing-v1__period.active` | active | `bg: #F1F1F1`, `font-weight: 700` |
| `.pricing-v1__period` (inactive) | normal | `bg: transparent`, `font-weight: 400` |
| `.pricing-v1-nav__item.active` | active | выделен, цвет `#3072ED` |
| `.pricing-v1-table` active column | active | визуальное выделение активного плана |
| `.modal--v1` | open | overlay + visible, содержит форму |

### Dropdown / Mobile Menu / Modal — open/close

| Элемент | Closed | Open |
|---|---|---|
| `.dropdown__list` | `visibility: hidden; opacity: 0` | `.dropdown--active`: `visibility: visible; opacity: 1` |
| `.menu` (mobile) | скрыто | `fixed, z-index 100, overlay rgba(0,0,0,0.2)` |
| `.modal--v1` | скрыто | overlay + bg white, radius 20px, padding 40px |

### Адаптивное поведение

| Элемент | Desktop (>1299px) | Tablet (≤991px) | Mobile (≤767px) |
|---|---|---|---|
| container | max-width 1280px | max-width 768px | padding 0 10px |
| H1 | 76px | 48px | — |
| Pricing cards | `calc(20% - 16px)` | `calc(33% - 13px)` | `100%` |
| Header nav | горизонтальный | скрыт, hamburger | скрыт, hamburger |

---

## 6. Form Elements

### `.form-input` (text input)

**Основная форма** (/templates/, /demo/, /pricing-new/ modal):

| Свойство | Значение |
|---|---|
| height | `54px` |
| padding | `0 18px` |
| font-size | `18px` (на /templates/) / `16px` (в других контекстах) |
| font-family | `Raleway` (явно объявлено) |
| border | `1px solid rgb(225,225,225)` |
| border-radius | `15px` |
| background | `#ffffff` |
| color | `rgb(21,21,21)` |
| transition | `0.25s` |
| :focus | `border-color: rgb(21,21,21)` |
| ::placeholder | `color: #A9A9A9`, `transition: opacity 0.3s` |
| :focus::placeholder | `opacity: 0` |

**Footer subscribe form** (меньший вариант):

| Свойство | Значение |
|---|---|
| font-size | `16px` |
| height | ~40px (компактнее) |
| остальное | аналогично основной форме |

**Promo code input** (/demo/):

| Свойство | Значение |
|---|---|
| padding-right | `225px` (место для inline-кнопки) |
| остальное | аналогично основной форме |

### Select (Select2)

Найден на /templates/ и /blog/.

| Свойство | Значение |
|---|---|
| height | `56px` |
| border-radius | `15px` |
| стилизация | Select2 dropdown с кастомными стилями |

### Textarea

| Свойство | Значение |
|---|---|
| border-radius | `15px` |
| padding | `17px 15px` |
| height | `144px` (/demo/), варьируется |
| остальное | аналогично `.form-input` |

### File Upload

| Свойство | Значение |
|---|---|
| border | `1px dashed #A9A9A9` |
| border-radius | `15px` |
| padding | `24px` |
| height | `106px` |
| страницы | /templates/, /demo/ |

### Checkbox

Нативный `<input type="checkbox">` скрыт (`opacity: 0`, `height: 0`, `position: absolute`). Стилизован через `<label>`.

| Вариант | padding-left | color | font-size | line-height |
|---|---|---|---|---|
| default | `22px` | `#A9A9A9` | `14px` | normal |
| simple | `32px` | `#151515` | `14px` | normal |
| tiny | `22px` | `#A9A9A9` | `10px` | `1.2` |
| large (/templates/) | `49px` | `#151515` | `24px` / weight 500 | normal |

Общее для всех:

| Элемент | Свойство | Значение |
|---|---|---|
| `::before` (box) | size | `16×16px` |
| `::before` | border | `1px solid #E1E1E1` |
| `::before` | border-radius | `5px` |
| `::before` | transition | `border-color 0.2s` |
| при `:checked` | border-color | `rgb(21,21,21)` |
| при `:checked` `::after` | opacity | `0 → 1` (чекмарк) |

### Radio

| Элемент | при `:checked` |
|---|---|
| `.radio__indicator` | `border-color: rgb(0,29,255)` |
| `.radio__indicator::after` | `opacity: 1; transform: scale(1)` |

---

## 7. Card Patterns

| Карточка | bg | border | radius | shadow | padding |
|---|---|---|---|---|---|
| `.differents__cart` | `#ffffff` | none | `20px` | многослойная мягкая | `40px` |
| `.hows__cart` | `linear-gradient(90deg, #001DFF -30.81%, #8000FF 60.48%)` | none | `40px` | none | внутри `.hows__cart-content` |
| `.integrations__cart` | `#ffffff` | none | `20px` | многослойная мягкая | `15px 26px` |
| `.pricing-v1-cart` | transparent | `1px solid #E1E1E1` | `20px` | none | `30px 20px 26px` |
| `.card` (blog) | `#ffffff` | `1px solid #A9A9A9` | `15px` | none | `22px 20px 25px` |
| `.faq__item` | `#ffffff` | none | `20px` | none → появляется при hover/open | — |

### Внутренняя типографика карточек

| Карточка | Элемент | font-size | weight | color |
|---|---|---|---|---|
| `.differents__cart` | `h4.differents__cart-title` | `28px` | 700 | `rgb(21,21,21)` |
| `.differents__cart` | `p.differents__cart-text` | `18px` | 400 | `rgb(21,21,21)` |
| `.hows__cart` | все дочерние | унаследован | — | `#ffffff` (через родителя) |
| `.pricing-v1-cart` | `h4.pricing-v1-cart__title` | `28px` | 700 | `rgb(21,21,21)` |
| `.pricing-v1-cart` | `.pricing-v1-cart__price` | `28px` | 600 | `rgb(21,21,21)` |
| `.pricing-v1-cart` | `.pricing-v1-cart__option` | `14px` | 400 | `letter-spacing: -0.28px` |
| `.pricing-v1-cart` | `.pricing-v1-cart__option.inactive` | `14px` | 400 | `rgb(189,189,189)` |

### Accordion / FAQ — точные стили

**`.faq__item`:**
- `border-radius: 20px`, `background: #ffffff`, `margin-bottom: 20px`
- `transition: box-shadow 0.25s`

**`.faq__item-question`:**
- `padding: 32px 90px 32px 40px`
- `letter-spacing: -0.1px`, `transition: 0.4s`, `cursor: pointer`

**`.faq__item-answer`:**
- `display: none` по умолчанию → `display: block` при `.open`
- `padding: 0 100px 30px 40px`
- `line-height: 1.3`, `letter-spacing: -0.2px`
- `font-size: 18px`, `line-height: 23.4px` (computed)

**`.pricing-v1-accordeon__item`:** `border-bottom: 1px solid #E1E1E1` (без карточечного контейнера)

**`.pricing-v1-accordeon__question`:** `padding: 26px 90px 26px 0`

**Стрелка:** SVG трансформируется `scale(1, -1)` при `.open`

---

## 8. Pricing Toggle & Pricing Nav (отдельные паттерны)

### Period Toggle (`.pricing-v1__periods`)

| Свойство | Значение |
|---|---|
| Контейнер | `border-radius: 32px`, bg white, inline-flex |
| Элемент (`.pricing-v1__period`) | `border-radius: 20px`, padding, cursor pointer |
| Active | `background: #F1F1F1`, `font-weight: 700` |
| Inactive | `background: transparent`, `font-weight: 400` |
| Transition | плавное переключение |

Этот паттерн — **переключатель двух состояний** (месяц/год). Не tab-навигация, а toggle.

### Pricing Nav (`.pricing-v1-nav`)

| Свойство | Значение |
|---|---|
| Layout | горизонтальный, выравнивание по планам |
| Active item | `color: #3072ED`, визуальное выделение |
| CTA button | `.btn--blue-new btn--s-m` — «Выбрать» |
| Dropdown | `.dropdown--v1` — сменить план, active item `color: #3072ED` |

Этот паттерн — **навигация по тарифным планам** внутри таблицы сравнения. Привязан к pricing table, не standalone.

---

## 9. Header & Navigation — детали

### Header (`.header`)

| Свойство | Значение |
|---|---|
| position | `fixed` |
| background | `rgb(21, 21, 21)` = `#151515` |
| height | `50px` |
| z-index | `1040` |
| Logo | SVG, 119x14px |

### Header Nav

| Свойство | Значение |
|---|---|
| Layout | flex, `column-gap: 40px` |
| Link style | 14px / 400 / white / `.link` class |
| CTA кнопка | `.btn--s-s .btn--blue` (справа) |
| Breakpoint | скрывается ≤767px → hamburger |

### Dropdown (`.dropdown__list`)

| Свойство | Значение |
|---|---|
| background | `rgb(248, 248, 248)` = `#F8F8F8` |
| border-radius | `15px` |
| padding | `15px 22px 12px` |
| box-shadow | cardSoft (многослойная мягкая) |
| z-index | `10` |
| visibility | `hidden` → `visible` при `.dropdown--active` |
| opacity | `0` → `1` при `.dropdown--active` |

### Mobile Menu

| Свойство | Значение |
|---|---|
| position | `fixed` |
| z-index | `100` |
| Inner width | `260px` |
| Overlay | `rgba(0, 0, 0, 0.2)` |
| Dividers | `border-bottom` между секциями |
| Social links | `42×42px`, `border-radius: 10px` |

---

## 10. Footer — детали

| Свойство | Значение |
|---|---|
| background | `rgb(248, 248, 248)` = `#F8F8F8` |
| padding-top | `60px` |
| Layout | 5-колоночный (nav columns) |
| Link style | 14px / 400 / #151515, hover: #001DFF + underline |
| Subscribe form | email input (16px, меньший) + button |
| Social icons | `42×42px`, `border-radius: 10px`, bg варьируется по сервису |
| Legal text | 10px / #A9A9A9 / underline |

---

## 11. Cookie Banner

| Свойство | Значение |
|---|---|
| position | `fixed`, `bottom: 0` |
| z-index | `1000` |
| background | `rgb(242, 242, 242)` = `#F2F2F2` |
| box-shadow | dual (верхний и нижний) |
| Кнопка | `.btn--s-s .btn--blue`, `font-size: 12px` |

---

## 12. Modal

| Свойство | Значение |
|---|---|
| Класс | `.modal--v1` |
| background | `#ffffff` |
| border-radius | `20px` |
| padding | `40px` |
| Содержимое | форма (inputs + textarea + file upload) |
| Overlay | полупрозрачный |
| Close button | есть |

---

## 13. Marquee / Brand Logos

| Свойство | Значение |
|---|---|
| Класс | `.brands`, `.marquee__list` |
| Container width | `5254px` (flex) |
| Количество | 35+ логотипов |
| Анимация | CSS animation (бесконечная прокрутка) |
| Размеры логотипов | варьируются |

---

## 14. Social Icons

| Свойство | Значение |
|---|---|
| Size | `42×42px` |
| border-radius | `10px` |
| Background | варьируется по сервису (telegram, vk и т.д.) |
| Расположение | footer, mobile menu |

---

## 15. Media Patterns (справочно — usage reference)

> Не декоративная галерея. Фиксация паттернов использования медиа в интерфейсе.

### Hero SVG иллюстрации

| Свойство | Значение |
|---|---|
| Роль | декоративные иллюстрации рядом с hero-текстом |
| Размеры | 759×706px, 805×856px |
| Позиционирование | `position: absolute` |
| Формат | inline SVG |
| Контейнер | `.first` (hero section) |

### Feature icons

| Свойство | Значение |
|---|---|
| Роль | иконки в карточках «Отличия» |
| Размеры | 100×100px |
| border-radius | `10px` |
| Формат | SVG |
| Путь | `/assets/img/v1/features/` |
| Контейнер | `.differents__cart` |

### How-it-works screenshots

| Свойство | Значение |
|---|---|
| Роль | скриншоты интерфейса в карточках «Как это работает» |
| Размеры | ~900px wide |
| Формат | PNG |
| Контейнер | `.hows__cart` (на градиентном фоне) |

### Integration logos

| Свойство | Значение |
|---|---|
| Роль | логотипы интеграций-партнёров |
| Размеры | 154–220px (варьируются) |
| Контейнер | `.integrations__cart` |

### Marquee brand logos

| Свойство | Значение |
|---|---|
| Роль | логотипы клиентов/брендов в бегущей строке |
| Количество | 35+ |
| Container | flex, 5254px wide |
| Анимация | CSS infinite scroll |

### Templates hero image

| Свойство | Значение |
|---|---|
| Роль | hero-изображение страницы шаблонов |
| Размеры | 1025×424px |
| border-radius | `15px` |

### SVG sprite system

| Свойство | Значение |
|---|---|
| Роль | системные иконки (стрелки, чекмарки, UI-элементы) |
| Метод | hidden `<svg>` с `<symbol>`, использование через `<use>` |
| Checkmarks (pricing) | inline SVG, 10–18px |

---

## 16. Несистемности (справочно — не список улучшений)

> Зафиксированы как предупреждения: где при сборке UI kit нельзя делать поспешные обобщения. Не трактовать как задачи на нормализацию — UI kit строится as-is.

1. **Нет CSS custom properties** — все цвета, размеры, отступы захардкожены. Нет ни одной переменной в `:root`. Весь UI kit должен строиться на токенах.

2. **Два разных синих акцента**: `#001DFF` (основные страницы) и `#3072ED` (pricing-new) — разные значения, разное направление hover (светлее vs темнее), разные суффиксы классов. Параллельные системы, не алиасы.

3. **H1 не унифицирован**: 76px на главной, 64px на pricing. Либо осознанная иерархия страниц, либо несоответствие.

4. **H2 сильно расходится**: 88px, 64px, 56px, 48px при единой семантике тега. Классы `h2` переопределяются контекстуально без системы.

5. **line-height у body**: 25.2px (главная) vs 27px (pricing) vs 23.4px (faq answer).

6. **Border-radius карточек**: 15px (blog), 20px (feature, pricing, faq), 40px (hows). Нет единой шкалы.

7. **Padding секций снизу**: 40px, 90px, 100px, 102px, 118px, 120px — нет явной spacing scale.

8. **Input font-size**: 18px (/templates/) vs 16px (footer, другие контексты). Input height: 54px (основные) vs ~40px (footer).

9. **Checkbox sizes**: 4 варианта (default, simple, tiny, large), large на /templates/ заметно отличается (24px/500).

10. **Select2** в фильтрах блога и формах — сторонняя библиотека. В UI kit потребует собственный `<select>` компонент.

11. **`.btn-loader`** с анимацией выглядит изолированным решением вне основной системы кнопок.

12. **Link hover механизмы различаются**: header/dropdown используют кастомный `::before` pseudo-underline, footer использует стандартный `text-decoration: underline` + color change, content links — только color change.

---

## 17. Что обязательно должно войти в UI kit

### Tokens (первый приоритет)
- Палитра цветов с именованными ролями (primary, primaryNew, text, background, border, disabled, surface, green, overlay)
- Шкала типографики (font-size + font-weight + line-height по уровням)
- Spacing scale (для padding секций и gap-значений)
- Border-radius шкала
- Transition defaults
- Breakpoints
- Z-index layers

### Компоненты (второй приоритет)
- **Button** — все модификаторы цвета (включая `blue-new`, `tr-blue-new`) + размера + состояния (hover, disabled, loading)
- **Typography** — все уровни из таблицы, включая per-page варианты
- **Section Wrapper / Container** — с max-width и padding
- **Header** — fixed bar + nav + dropdown + mobile hamburger
- **Footer** — 5-column + subscribe form + social icons
- **Mobile Menu** — overlay + panel + dividers
- **Cookie Banner** — fixed + dual shadow + CTA
- **Accordion / FAQ** — два варианта (card с тенью / border-bottom)
- **Card** — все 6 типов без слияния (differents, hows, integrations, pricing, blog, faq)
- **Tag / Badge** — зелёный и синий варианты
- **Form elements** — input (основной + footer), select, textarea, file upload, checkbox (4 варианта), radio
- **Period Toggle** — переключатель месяц/год
- **Pricing Nav** — навигация планов + CTA
- **Pricing Table** — comparison table с active column
- **Modal** — overlay + content + close
- **Marquee** — бегущая строка логотипов
- **Social Icon** — 42x42 с radius
- **Link styles** — по контекстам (header .link, footer, content, card)
