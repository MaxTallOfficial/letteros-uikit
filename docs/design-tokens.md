# Design Tokens

Источник истины: `src/tokens/index.ts`
CSS-переменные: `src/app/globals.css` (префикс `--l-`)

## Использование

### В компонентах (TypeScript)
```tsx
import { colors, typography, radius } from "@/tokens";
// colors.accent.blue → "#001DFF"
// typography.h1Hero.fontSize → "76px"
```

### В CSS / Tailwind
```css
color: var(--l-accent-blue);
background: var(--l-bg-alt);
```

### Tailwind-классы (через @theme inline)
```html
<div class="bg-l-bg-alt text-l-accent-blue border-l-border-default">
```

## Что зафиксировано

| Категория | Кол-во токенов | Примечание |
|---|---|---|
| Colors | 14 | Два разных синих (blue, blueNew) |
| Typography | 18 уровней | H2 имеет 4 разных размера на разных страницах |
| Spacing | container + gaps + section paddings | Не нормализованы |
| Border radius | 11 значений | От 5px (checkbox) до 40px (hows card) |
| Shadows | 3 (none, cardSoft, btnInset) | |
| Motion | 13 transition-паттернов | |
| Breakpoints | 7 | |
| Z-index | 4 слоя | |
