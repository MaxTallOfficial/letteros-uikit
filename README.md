# Letteros UI Kit

UI kit для сайта [letteros.com](https://letteros.com), собранный as-is на основе аудита реальных DOM/CSS через Chrome DevTools MCP.

## Запуск

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000) — entrypoint с переходом в UI kit.
UI kit доступен на [http://localhost:3000/uikit](http://localhost:3000/uikit).

## Структура

```
src/
├── tokens/index.ts              # Дизайн-токены (source of truth)
├── components/
│   ├── ui/                      # UI-компоненты
│   │   ├── Button.tsx
│   │   ├── Typography.tsx
│   │   ├── Card.tsx
│   │   ├── Accordion.tsx
│   │   ├── Tag.tsx
│   │   ├── FormInput.tsx
│   │   └── Checkbox.tsx
│   └── layout/
│       └── Container.tsx
├── app/
│   ├── globals.css              # CSS-переменные Letteros + Tailwind
│   ├── page.tsx                 # Entrypoint
│   └── uikit/page.tsx           # UI Kit страница
docs/
├── design-tokens.md
├── components-inventory.md
└── decisions.md
audit.md                         # Полный аудит сайта
```

## Стек

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4

## Принципы

- Все значения из production-сайта letteros.com
- Ничего не нормализовано и не улучшено
- Если на сайте два разных значения — оба сохранены
- Компоненты и токены — source of truth для новых страниц
