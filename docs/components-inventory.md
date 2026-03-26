# Инвентарь компонентов

Все компоненты: `src/components/ui/`. Реализация: `src/app/uikit/page.tsx`.

## Кнопки — `Button.tsx`

Две оси модификаторов:
- **Размер** (`size`): `ss` (32px), `s` (34px), `m` (54px)
- **Вариант** (`variant`): `white`, `blue`, `blueNew`, `black`, `transparentBlack`, `transparentWhite`, `transparentBlue`, `transparentBlueNew`, `green`
- **Состояния**: `disabled`, `off` (opacity 0.3), `full` (width 100%)

> `blue` и `blueNew` — разные системы. `blueNew` только для /pricing-new/.

## Типографика — `Typography.tsx`

18 уровней из аудита. Каждый page-specific вариант — отдельный level. Подробности — `docs/design-tokens.md`.

## Карточки — `Card.tsx`

6 типов, каждый — отдельная сущность:

| type | radius | shadow | border | Контекст |
|---|---|---|---|---|
| `differents` | 20px | cardSoft | нет | Feature cards |
| `hows` | 40px | нет | нет | Градиентная карточка |
| `integrations` | 20px | cardSoft | нет | Logo cards |
| `pricing` | 20px | нет | 1px solid #E1E1E1 | Тарифы |
| `blog` | 15px | нет | 1px solid #A9A9A9 | Blog |
| `faq` | 20px | hover: cardSoft | нет | FAQ |

> Нельзя объединять — различия в radius, shadow и border реальны.

## Аккордеон — `Accordion.tsx`

Два варианта:
- **faq** — карточка с hover-тенью, padding 32px 90px 32px 40px
- **pricing** — border-bottom без карточки, padding 26px 90px 26px 0

## Теги — `Tag.tsx`

- `green` — btn--tag btn--green (/templates/)
- `blue` — card__category (/blog/)

## Формы

| Компонент | Файл | Особенности |
|---|---|---|
| Text Input | `FormInput.tsx` | 54px, radius 15px, focus: border → #151515 |
| Select | `Select.tsx` | 56px, radius 15px, кастомная стрелка |
| Textarea | `Textarea.tsx` | radius 15px, высота варьируется |
| File Upload | `FileUpload.tsx` | dashed border #A9A9A9, 106px |
| Checkbox | `Checkbox.tsx` | 4 варианта: default, simple, tiny, large |
| Radio | `Radio.tsx` | checked → border #001DFF |

> Checkbox large (24px/500) — только /templates/. Не обобщать с default.

## Навигация и layout

| Компонент | Файл | Описание |
|---|---|---|
| Header | `Header.tsx` | bg #151515, 50px, logo + nav + dropdown + CTA. Реальная структура Letteros |
| Footer | `Footer.tsx` | bg #F8F8F8, 5 колонок + subscribe + social. Реальный контент |
| Mobile Menu | `MobileMenu.tsx` | Full-width overlay, открывается слева, logo + nav + social |
| Cookie Banner | `CookieBanner.tsx` | Fixed bottom, bg #F2F2F2, z-index 1000 |
| Modal | `Modal.tsx` | bg white, radius 20px, overlay + close |
| Container | `layout/Container.tsx` | max-width 1280px responsive |

## Интерактивные паттерны

| Компонент | Файл | Описание |
|---|---|---|
| Toggle | `Toggle.tsx` | Переключатель опций (месяц/год), radius 32px, active bg #F1F1F1 |
| Pricing Nav | `PricingNav.tsx` | Навигация тарифов, active → #3072ED, border-bottom |

> Toggle и Pricing Nav — **разные паттерны**. Toggle — переключатель состояний. Pricing Nav — навигация внутри таблицы. Не объединять.

## Прочее

| Компонент | Файл | Описание |
|---|---|---|
| Marquee | `Marquee.tsx` | Бегущая строка логотипов, CSS animation |
| Social Icon | `SocialIcon.tsx` | 42×42 / 32×32px, radius 10px |
| Icons | `icons.tsx` | Реальные SVG: LogoMark, LogoWordmark, TelegramIcon, VkIcon + серые варианты |
