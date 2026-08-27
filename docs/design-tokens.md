# Стартовый набор токенов

Копируется в новый проект как есть. Дальше меняются значения, но не структура:
все цвета определены на голом `:root`, а в тёмных блоках переопределяются только
изменившиеся. Ни один цвет не должен существовать только внутри медиазапроса —
иначе он пропадёт там, где медиазапрос не сработал.

```css
:root {
  /* Нейтральная шкала — несёт весь интерфейс */
  --bg: #fcfcfc;          /* фон страницы */
  --bg-subtle: #f4f4f5;   /* фон вложенного блока, hover */
  --surface: #ffffff;     /* карточка, панель */
  --border: #e6e6e8;      /* обычная граница */
  --border-strong: #d3d3d7; /* граница в hover, разделитель */
  --text: #18181b;        /* основной текст */
  --text-muted: #6f6f78;  /* второстепенный текст */
  --text-faint: #9a9aa3;  /* подписи, метки */

  /* Один акцент */
  --accent: #3a5bd9;
  --accent-hover: #2c48b8;
  --accent-soft: #eaeeff;  /* фон под акцентом */

  /* Семантика — только для смысла, не для красоты */
  --danger: #d92d20;
  --success: #15803d;
  --warning: #b45309;

  /* Шрифты */
  --font-sans: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Inter',
    'Segoe UI', system-ui, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', 'JetBrains Mono', 'Menlo', monospace;

  /* Размеры — шаг 1.25, между значениями ничего нет */
  --text-xs: 0.75rem;    /* 12 — метки */
  --text-sm: 0.875rem;   /* 14 — второстепенный текст, UI */
  --text-base: 1rem;     /* 16 — основной текст */
  --text-lg: 1.125rem;   /* 18 — лид, подзаголовок */
  --text-xl: 1.375rem;   /* 22 — h2 */
  --text-2xl: 1.75rem;   /* 28 — h1 внутренней страницы */
  --text-3xl: 2.25rem;   /* 36 — h1 главной */

  /* Отступы — база 4px */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  /* Форма */
  --radius: 8px;
  --radius-lg: 14px;

  /* Размеры текстовых блоков */
  --measure: 66ch;  /* длина строки */
  --page: 44rem;    /* ширина колонки страницы */

  /* Движение */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur: 180ms;
}

:root:not([data-theme='light']) { color-scheme: light; }

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    color-scheme: dark;
    --bg: #0b0b0d;
    --bg-subtle: #131316;
    --surface: #141417;
    --border: #232327;
    --border-strong: #33333a;
    --text: #ededf0;
    --text-muted: #a0a0aa;
    --text-faint: #6d6d78;
    --accent: #8fa6ff;       /* светлее и менее насыщенный */
    --accent-hover: #aabaff;
    --accent-soft: #1a1e35;
    --danger: #ff6b60;
    --success: #4ade80;
    --warning: #fbbf24;
  }
}

:root[data-theme='dark'] {
  /* тот же блок — чтобы ручной переключатель побеждал системную тему */
  color-scheme: dark;
  --bg: #0b0b0d;
  --bg-subtle: #131316;
  --surface: #141417;
  --border: #232327;
  --border-strong: #33333a;
  --text: #ededf0;
  --text-muted: #a0a0aa;
  --text-faint: #6d6d78;
  --accent: #8fa6ff;
  --accent-hover: #aabaff;
  --accent-soft: #1a1e35;
  --danger: #ff6b60;
  --success: #4ade80;
  --warning: #fbbf24;
}
```

## Базовый слой поверх токенов

```css
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  line-height: 1.25;
  letter-spacing: -0.018em;
  font-weight: 620;
  text-wrap: balance;
}

p { max-width: var(--measure); text-wrap: pretty; }

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

img, svg, video { display: block; max-width: 100%; height: auto; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Если проект на Tailwind

Те же токены объявляются один раз в `@theme`, а в разметке используются только
имена — `bg-surface`, `text-muted`, `p-6`. Правило не меняется: произвольных
значений в квадратных скобках (`p-[13px]`, `text-[#3b3b3b]`) в коде быть не
должно. Появилось — значит, шкала неполная, и чинить надо шкалу.
