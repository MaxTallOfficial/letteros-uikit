# Аудит интерфейсной системы Letteros.com

**Дата:** 2026-03-26
**Источник данных:** DOM, computed styles, CSS stylesheet rules через Chrome DevTools MCP
**Страницы:** главная, /pricing-new/, /templates/, /blog/

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

**Что выглядит несистемно:** — см. раздел 5.

---

## 2. Design Tokens

### Цвета

| Роль | Значение | Откуда |
|---|---|---|
| Основной текст | `rgb(21, 21, 21)` = `#151515` | computed, все страницы |
| Фон (белый) | `#ffffff` | computed |
| Фон (серый alt) | `rgb(248, 248, 248)` = `#F8F8F8` | footer, blog, секции |
| Акцент / primary CTA | `rgb(0, 29, 255)` = `#001DFF` | кнопки, ссылки категорий |
| Акцент hover | `rgb(75, 96, 255)` = `#4B60FF` | CSS :hover правило |
| Второй синий ⚠️ | `rgb(48, 114, 237)` = `#3072ED` | только /pricing-new/ |
| Граница / divider | `rgb(225, 225, 225)` = `#E1E1E1` | карточки, инпуты, toggle |
| Disabled / inactive | `rgb(169, 169, 169)` = `#A9A9A9` | кнопки disabled |
| Inactive text (pricing) | `rgb(189, 189, 189)` = `#BDBDBD` | недоступные опции тарифов |
| Active bg (toggle) | `rgb(241, 241, 241)` = `#F1F1F1` | активный период в toggle |
| Dark surface | `rgb(21, 21, 21)` = `#151515` | тёмные секции, btn--black |
| Green (tag) | `rgb(45, 137, 98)` = `#2D8962` | теги на /templates/ |

> Кастомных CSS-переменных для цветов нет. Все значения захардкожены в правилах.

---

### Типографика

**Шрифт:** Raleway (Google Fonts), загружены веса: 500, 600, 700, 800. Фактически используются: 400, 500, 600, 700.

| Уровень | font-size | font-weight | line-height | letter-spacing | Страница |
|---|---|---|---|---|---|
| H1 (hero) | `76px` | 700 | `76px` | normal | главная |
| H1 (pricing) | `64px` | 700 | `64px` | normal | pricing ⚠️ |
| H2 (sections) | `64px` | 700 | `64px` | normal | главная |
| H2 (pricing banner) | `56px` | 700 | `56px` | — | pricing ⚠️ |
| H2 (pricing section) | `48px` | 700 | `28.8px` | — | pricing ⚠️ |
| H2 (pricing FAQ) | `88px` | 700 | `88px` | — | pricing ⚠️ |
| H3 (pricing FAQ sub) | `50px` | 700 | `52.5px` | — | pricing ⚠️ |
| H4 | `28px` | 700 | `30.8px` | `-0.1px` | главная |
| H4 (pricing card) | `26px` | 700 | `31.2px` | — | pricing ⚠️ |
| Body | `18px` | 400 | `25.2px` | `-0.1px` | главная |
| Body (pricing) | `18px` | 400 | `27px` | — | pricing ⚠️ |
| Small / meta | `14px` | 400 | normal | `-0.28px` | pricing options |
| Nav / UI | `16px` | 400–700 | — | — | nav, toggle |
| Price value | `28px` | 600 | `39.2px` | — | pricing card |

> ⚠️ = значение расходится с аналогичным уровнем на главной странице.

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
| `.btn--green` | `rgb(45,137,98)` | `#ffffff` | none |

**Hover-состояния (из CSS rules):**

| Кнопка | hover background | hover color |
|---|---|---|
| `.btn--white:hover` | `rgb(21,21,21)` | `#ffffff` |
| `.btn--blue:hover` | `rgb(75,96,255)` | `#ffffff` |
| `.btn--black:hover` | `#ffffff` | `rgb(21,21,21)` |
| `.btn--tr-b:hover` | `rgb(21,21,21)` | `#ffffff` |
| `.btn--tr-w:hover` | `#ffffff` | `rgb(21,21,21)` |
| `.btn--tr-blue:hover` | `rgb(75,96,255)` + inset box-shadow | `#ffffff` |

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
| `.btn--s-m`, `.form-input` | `15px` |
| Blog card `.card` | `15px` |
| `.differents__cart`, `.integrations__cart`, `.faq__item`, pricing card | `20px` |
| `.hows__cart` (gradient card) | `40px` |
| Period toggle container | `32px` |
| Period toggle buttons | `20px` |
| Select фильтры (blog) | `12px` |
| Checkbox `::before` | `5px` |
| Category icon (blog) | `7px` |

---

### Тени

Flat-дизайн: `box-shadow: none` на большинстве элементов.

**Многослойная мягкая тень** — используется на `.differents__cart`, `.integrations__cart`, `.faq__item:hover`, `.faq__item.open`:
```
rgba(63,63,63,0.02) 0px 2.12px 5.3px,
rgba(63,63,63,0.03) 0px 10px 20.7px,
rgba(63,63,63,0.05) 0px 26px 65px
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

Поддержка `prefers-reduced-motion: reduce` — присутствует в stylesheet.

---

### Opacity паттерны

| Значение | Использование |
|---|---|
| `0` | Скрытые элементы (dropdown, video, form-success, checkbox input) |
| `0.3` | `.btn--off`, декоративные SVG |
| `0.35` | Disabled Swiper navigation |
| `0.5` | Полупрозрачные SVG линии |
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
| `≤ 767px` | Mobile (padding → 10px, pricing cards → 100%) |
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
| **Header** | `.header` | fixed, z-index 1040, логотип + nav + dropdown + CTA |
| **Mobile Menu** | `.menu`, `.header__menu` | fixed, z-index 100, 260px, slide-in |
| **Dropdown** | `.dropdown__list` | absolute, z-index 10, opacity 0→1 |
| **Footer** | `.footer` | 4 колонки, bg #F8F8F8 |
| **Cookie Banner** | `.cookie.cookie--banner` | fixed, z-index 1000 |

### Главная страница

| Компонент | Классы | Описание |
|---|---|---|
| **Hero Section** | `.first` | заголовок + subtext + 2 CTA + SVG иллюстрации |
| **Brands Marquee** | `.brands`, `.marquee__list` | бегущая строка, 11 логотипов |
| **Video Block** | `.video` | mp4 демо, opacity 0 по умолчанию |
| **Feature Card (Swiper)** | `.differents__cart.swiper-slide` | 6 карточек, gap 30px |
| **How-it-works Card** | `.hows__cart` | 4 шага с нумерацией |
| **Integration Card** | `.integrations__cart` | логотипы партнёров, gap 40px |
| **FAQ / Accordion** | `.faq__item.accordeon--single` | 8 вопросов |
| **CTA Section** | `.order` | заголовок + Swiper шаблонов |
| **Subscribe Form** | `.footer__subscribe-form` | email + 2 чекбокса + submit |

### Страница /pricing-new/

| Компонент | Классы | Описание |
|---|---|---|
| **Pricing Card** | `.pricing-v1-cart` | 5 планов, border 1px solid #E1E1E1, radius 20px, padding 30px 20px |
| **Period Toggle** | `.pricing-v1__periods` | border-radius 32px, активный пункт bg #F1F1F1, font-weight 700 |
| **Comparison Table** | `.pricing-v1-table` | детальное сравнение планов |
| **Pricing FAQ** | `.pricing-v1-accordeon` | отдельный экземпляр аккордеона |

### Страница /templates/

| Компонент | Классы | Описание |
|---|---|---|
| **Tag / Badge** | `.btn--tag.btn--green` | bg rgb(45,137,98), текст белый |
| **File Upload** | `.form-upload-btn.btn--outlined` | кнопка загрузки файла |
| **Order Form** | `.order-form` | форма заказа с таблицей опций |

### Страница /blog/

| Компонент | Классы | Описание |
|---|---|---|
| **Blog Card** | `.card` | bg white, `border: 1px solid #A9A9A9`, `border-radius: 15px`, `padding: 22px 20px 25px` |
| **Category Label** | `.card__category` | цвет `#001DFF`, font-size 16px, border-radius 0 |
| **Category Filter** | `.blog__filter-select` | Select2-based, border-radius 12px |

### Кнопка как система

Две оси модификаторов:
- **Размер:** `btn--s-ss` / `btn--s-s` / `btn--s-m`
- **Цвет/вариант:** `btn--white` / `btn--blue` / `btn--blue-new` / `btn--black` / `btn--tr-b` / `btn--tr-w` / `btn--tr-blue` / `btn--green` / `btn--tag`

---

## 4. States & Responsive

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
| `.btn--disabled` | — | — | `pointer-events: none`, `bg: #A9A9A9` |
| `.btn--off` | — | — | `pointer-events: none`, `opacity: 0.3` |
| `.form-submit:disabled` | — | — | `pointer-events: none`, `opacity: 0.5` |

### Состояния ссылок и навигации

| Элемент | hover |
|---|---|
| `.link` | `::before` height 0 → 1px (underline animation) |
| `.footer__nav-item` | `text-decoration: underline; color: rgb(0,29,255)` |
| `.menu__link` | `color: rgb(0,29,255)` |
| `.dropdown__item-btn` | `color: rgb(0,29,255)` |
| `.card__title` | `color: rgb(0,29,255)` |
| `.card__category` | `color: rgb(0,21,188)` (темнее акцента) |

### Состояния карточек и интерактивных блоков

| Элемент | hover / open |
|---|---|
| `.card` (blog) | `border-color: rgb(21,21,21)` |
| `.faq__item` | появляется многослойная тень |
| `.faq__item.open` | та же тень сохраняется |
| `.integration__logo` | `opacity: 1` (в покое приглушён) |
| `.swiper-pagination-bullet` | `background: rgb(0,29,255); transform: scale(1.5)` |
| `.pricing-v1__period.active` | `bg: #F1F1F1`, `font-weight: 700` |

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

### Адаптивное поведение

| Элемент | Desktop (>1299px) | Tablet (≤991px) | Mobile (≤767px) |
|---|---|---|---|
| container | max-width 1280px | max-width 768px | padding 0 10px |
| H1 | 76px | 48px | — |
| Pricing cards | `calc(20% - 16px)` | `calc(33% - 13px)` | `100%` |
| Header nav | горизонтальный | скрыт, hamburger | скрыт, hamburger |

---

## 5. Form Elements

### `.form-input` (text input)

| Свойство | Значение |
|---|---|
| height | `54px` |
| padding | `0 18px` |
| font-size | `16px` |
| font-family | `Raleway` (явно объявлено) |
| border | `1px solid rgb(225,225,225)` |
| border-radius | `15px` |
| background | `#ffffff` |
| color | `rgb(21,21,21)` |
| transition | `0.25s` |
| :focus | `border-color: rgb(21,21,21)` |
| ::placeholder | `color: #A9A9A9`, `transition: opacity 0.3s` |
| :focus::placeholder | `opacity: 0` |

### Checkbox

Нативный `<input type="checkbox">` скрыт (`opacity: 0`, `height: 0`, `position: absolute`). Стилизован через `<label>`.

| Элемент | Свойство | Значение |
|---|---|---|
| `.checkbox-label` | padding-left | `22px` |
| `.checkbox-label` | color | `rgb(169,169,169)` = `#A9A9A9` |
| `.checkbox-label` | font-size | `14px` |
| `.checkbox-label::before` | size | `16×16px` |
| `.checkbox-label::before` | border | `1px solid #E1E1E1` |
| `.checkbox-label::before` | border-radius | `5px` |
| `.checkbox-label::before` | transition | `border-color 0.2s` |
| при `:checked` | border-color | `rgb(21,21,21)` |
| при `:checked` `::after` | opacity | `0 → 1` (чекмарк) |
| `.checkbox-label--simple` | color | `rgb(21,21,21)`, padding-left `32px` |
| `.checkbox-label--tiny` | font-size | `10px`, line-height `1.2` |

### Radio

| Элемент | при `:checked` |
|---|---|
| `.radio__indicator` | `border-color: rgb(0,29,255)` |
| `.radio__indicator::after` | `opacity: 1; transform: scale(1)` |

---

## 6. Card Patterns

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

## 7. Несистемности (справочно — не список улучшений)

> Зафиксированы как предупреждения: где при сборке UI kit нельзя делать поспешные обобщения. Не трактовать как задачи на нормализацию — UI kit строится as-is.

1. **Нет CSS custom properties** — все цвета, размеры, отступы захардкожены. Нет ни одной переменной в `:root`. Весь UI kit должен строиться на токенах.

2. **Два разных синих акцента**: `#001DFF` (основные страницы) и `#3072ED` (pricing-new) — разные значения, не алиасы. Нужно выбрать один.

3. **H1 не унифицирован**: 76px на главной, 64px на pricing. Либо осознанная иерархия страниц, либо несоответствие.

4. **H2 сильно расходится**: 88px, 64px, 56px, 48px при единой семантике тега. Классы `h2` переопределяются контекстуально без системы.

5. **line-height у body**: 25.2px (главная) vs 27px (pricing) — требует стандартизации.

6. **Border-radius карточек**: 0px (главная, блог), 20px (pricing). Нет единой шкалы для карточек.

7. **Padding секций снизу**: 40px, 90px, 100px, 102px, 118px, 120px — нет явной spacing scale.

8. **Select2** в фильтрах блога — сторонняя библиотека. В UI kit потребует собственный `<select>` компонент.

9. **`.btn-loader`** с анимацией выглядит изолированным решением вне основной системы кнопок.

---

## 8. Что обязательно должно войти в UI kit

### Tokens (первый приоритет)
- Палитра цветов с именованными ролями (primary, text, background, border, disabled, surface)
- Шкала типографики (font-size + font-weight + line-height по уровням)
- Spacing scale (для padding секций и gap-значений)
- Border-radius шкала
- Transition defaults
- Breakpoints

### Компоненты (второй приоритет)
- **Button** — все модификаторы цвета + размера + состояния (hover, disabled, loading)
- **Typography** — H1–H4, Body, Small, Caption
- **Section Wrapper** — контейнер с max-width и padding
- **Header / Nav** — с dropdown и мобильным состоянием
- **Accordion / FAQ**
- **Card** — базовый (варианты: feature, how-it-works, pricing, blog)
- **Pricing Card** — с period toggle
- **Tag / Badge** — зелёный и синий варианты
- **Form elements** — input, checkbox, file upload, select
- **Footer**
- **Marquee / Brands strip**
- **Modal** (выявлен через `js-modal-*` классы)
- **Cookie Banner**
