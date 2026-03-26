# Letteros UI Kit

Дизайн-система сайта [letteros.com](https://letteros.com), собранная as-is на основе аудита реального production-сайта.

## Быстрый старт

```bash
npm install
npm run dev
```

UI kit: [http://localhost:3000/uikit](http://localhost:3000/uikit)

## Структура проекта

```
src/
├── tokens/index.ts          # Дизайн-токены (source of truth)
├── components/ui/           # UI-компоненты (21 файл)
├── components/layout/       # Layout-компоненты (Container)
├── app/
│   ├── globals.css          # CSS-переменные --l-* + Tailwind
│   ├── page.tsx             # Entrypoint
│   └── uikit/page.tsx       # UI Kit страница
docs/                        # Проектная документация
audit.md                     # Полный аудит сайта
CLAUDE.md                    # Инструкции для AI-агента
```

## Документация

| Файл | Назначение |
|---|---|
| `CLAUDE.md` | Главный инструктивный файл для Claude |
| `docs/project-context.md` | Что это за проект и зачем |
| `docs/design-tokens.md` | Все токены системы |
| `docs/components-inventory.md` | Инвентарь компонентов |
| `docs/composition-rules.md` | Правила композиции |
| `docs/page-creation-workflow.md` | Workflow создания страниц |
| `docs/decisions.md` | Зафиксированные решения |
| `docs/open-questions.md` | Открытые вопросы |
| `audit.md` | Полный аудит letteros.com |

## Стек

Next.js 16 / React 19 / TypeScript 5 / Tailwind CSS 4

## Принципы

- Все значения из production-сайта letteros.com
- Ничего не нормализовано и не улучшено
- Если на сайте два разных значения — оба сохранены
- UI kit — source of truth для новых страниц Letteros
