# Components Inventory

Источник: аудит letteros.com (2026-03-26). Реализация: `src/components/`

## Реализованные компоненты

| Компонент | Файл | Props |
|---|---|---|
| Button | `ui/Button.tsx` | size: ss/s/m, variant: white/blue/blueNew/black/transparentBlack/transparentWhite/transparentBlue/green, disabled, off, full |
| Typography | `ui/Typography.tsx` | level (18 вариантов из аудита), as, color |
| Card | `ui/Card.tsx` | type: differents/hows/integrations/pricing/blog/faq |
| AccordionItem | `ui/Accordion.tsx` | variant: faq/pricing, defaultOpen |
| Tag | `ui/Tag.tsx` | variant: green/blue |
| FormInput | `ui/FormInput.tsx` | стандартные input props |
| Checkbox | `ui/Checkbox.tsx` | variant: default/simple/tiny, label |
| Container | `layout/Container.tsx` | children, className |

## Компоненты из аудита, не реализованные отдельно

Эти элементы зафиксированы в аудите, но не вынесены в отдельные компоненты,
так как они либо слишком контекстно-зависимы, либо требуют данных с CMS:

- **Header / Nav / Dropdown / Mobile Menu** — layout-компоненты, привязаны к навигационной структуре
- **Footer** — 4 колонки ссылок, зависит от контента
- **Cookie Banner** — fixed position, z-index 1000
- **Marquee / Brands strip** — требует лого партнёров
- **Modal** — выявлен через js-modal-* классы, но DOM-структура не извлечена
- **Hero Section** — контекстно уникален на каждой странице
- **Comparison Table** — pricing-специфичный layout
- **Period Toggle** — pricing-специфичный интерактив

Все стили этих элементов задокументированы в `audit.md` и токенах — их можно
собрать из существующих примитивов при необходимости.
