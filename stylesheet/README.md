# Design System — "Glass Report"

The shared visual language for my web apps. It was distilled from the Chicago
Energy Benchmarking app so every project can ship with the same look, feel, and
motion. Copy this folder into a new app and follow the adoption steps below.

## Design philosophy

1. **Translucent glass over a living backdrop.** Surfaces are frosted glass
   (`backdrop-filter: blur`) floating over slowly drifting colour blobs. The
   blur means cards must always have something behind them to reveal.
2. **Dark-first, fully themed.** Build in dark mode, then remap for light via a
   single `.dark` class on `<html>`. No `dark:` utility soup for base colours —
   semantic CSS variables carry the theme.
3. **One warm accent.** Orange (`#f97316`) is the single brand accent. Sky,
   emerald, amber, and rose are *semantic* only (info / success / caution /
   error), never decoration.
4. **Motion is the personality.** Continuous (drifting blobs), one-shot
   (page-entrance stagger, circle-reveal theme switch), and interactive (card
   hover lift, cursor spotlight). Always gated by `prefers-reduced-motion`.
5. **Readability first.** Capped content width, generous line-height, justified
   prose, and accent colours darkened to meet WCAG AA on white.

## What's in this folder

| File | Purpose |
|---|---|
| `README.md` | This overview + adoption steps |
| `design-tokens.md` | Colour, type, spacing, radius, breakpoint reference |
| `components.md` | Reusable component recipes (card, button, input, nav…) |
| `motion.md` | The signature animations + exact timings/easings |
| `tokens.css` | **Copy-ready** CSS: variables, base, component layer, motion |
| `tailwind.config.js` | **Copy-ready** Tailwind theme extension |

## Stack these standards assume

- **Next.js (App Router) + React 18 + TypeScript**
- **Tailwind CSS 3.4** with `darkMode: "class"`
- **`clsx`** for conditional class names
- Fonts: **Inter** (sans) + **JetBrains Mono** (mono), loaded from Google Fonts

> The tokens are plain CSS, so they also work without Tailwind — you just lose
> the utility classes used in the component markup.

## Adopting in a new app

1. Copy `tokens.css` into your global stylesheet (e.g. `app/globals.css`),
   keeping the `@tailwind` directives at the top if you use Tailwind.
2. Merge `tailwind.config.js` into your config (`darkMode: "class"`, fonts,
   `navy` palette).
3. Import the fonts (top of the CSS, already in `tokens.css`).
4. Add the anti-FOUC theme script to `<head>` (see `motion.md` → Theming) so the
   stored theme and reduced-motion preference apply before first paint.
5. Wrap the app in the providers and drop in `BackgroundBlobs` (see `motion.md`).
6. Build pages out of the component recipes in `components.md`.

Keep this folder as the single source of truth: when a standard changes, change
it here first, then propagate.
