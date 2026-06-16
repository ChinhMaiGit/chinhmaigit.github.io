# Design Tokens

All values are the canonical ones from the app. In code they live as CSS custom
properties (see `tokens.css`); this doc is the human reference.

## Colour — semantic tokens

Theme is driven by a `.dark` class on `<html>`. These variables flip between
the two themes; everything else references them.

| Token | Role | Dark value | Light value |
|---|---|---|---|
| `--bg-base` | App background (on `html`) | `#020617` slate-950 | `#f1f5f9` slate-100 |
| `--bg-surface` | Solid surface | `#0f172a` slate-900 | `#ffffff` |
| `--bg-raised` | Inputs / insets | `#0f172a` | `#f8fafc` slate-50 |
| `--border` | Hairline borders | `#1e293b` slate-800 | `#e2e8f0` slate-200 |
| `--tx-1` | Primary text | `#f1f5f9` | `#0f172a` |
| `--tx-2` | Body text | `#cbd5e1` | `#475569` |
| `--tx-3` | Muted text | `#94a3b8` | `#64748b` |
| `--tx-4` | Faint text | `#64748b` | `#94a3b8` |
| `--scrollbar-thumb` | Scrollbar | `#334155` | `#cbd5e1` |
| `--card-spot` | Cursor spotlight tint | `rgba(249,115,22,0.22)` | `rgba(249,115,22,0.14)` |

## Colour — accent palette

**Orange is the only brand accent.** The others are semantic.

| Purpose | Tailwind | Hex | Notes |
|---|---|---|---|
| **Brand / primary** | `orange-500` | `#f97316` | buttons, focus rings, links, brand |
| Info / data | `sky-400` | `#38bdf8` | charts, info callouts |
| Success / positive | `emerald-400` | `#10b981` | "good" deltas, success |
| Caution | `amber-400` | `#f59e0b` | warnings, "watch out" |
| Error | `rose-400` | `#f43f5e` | errors, destructive |

Custom `navy` palette (Tailwind extension): `DEFAULT #0f172a`, `700 #1e3a5f`,
`800 #162032`, `900 #0c1525`.

### Light-mode accent darkening (WCAG AA on white)

Neon accents fail contrast on white, so light mode remaps them to darker shades
(handled by `html:not(.dark)` overrides in `tokens.css`):

| Accent | Light-mode hex | Contrast |
|---|---|---|
| orange-400 | `#ea580c` (orange-600) | 4.6:1 |
| orange-300 | `#c2410c` (orange-700) | 5.7:1 |
| emerald-300/400 | `#059669` (emerald-600) | 4.8:1 |
| amber-300/400 | `#b45309` (amber-700) | 5.2:1 |
| rose-400 | `#e11d48` (rose-600) | 4.7:1 |
| rose-300 | `#be123c` (rose-700) | 5.6:1 |

## Typography

- **Sans:** Inter (`400, 500, 600, 700`) — `--font-sans: Inter, system-ui, sans-serif`
- **Mono:** JetBrains Mono (`400, 500`) — numbers, code, data values

| Element | Style |
|---|---|
| `h1` | `text-3xl font-bold tracking-tight`, `text-wrap: balance` |
| `h2` | `text-2xl font-semibold tracking-tight`, `text-wrap: balance` |
| `h3` | `text-lg font-semibold` |
| `p` | `leading-relaxed`, `text-wrap: pretty`, justified inside cards |
| Eyebrow/label | `text-xs font-semibold uppercase tracking-widest` + accent or `text-slate-500` |
| Data value | `font-mono font-bold` (e.g. `text-3xl`) in an accent colour |

## Spacing, radius, layout

| Token | Value |
|---|---|
| Card radius | `rounded-xl` (0.75rem) |
| Button/input radius | `rounded-xl` |
| Pill / badge radius | `rounded-lg` / `rounded-full` |
| Card padding | `p-6` |
| Vertical rhythm between sections | `space-y-8` (pages), `space-y-10` (home) |
| Sidebar width | `w-56` (14rem / 224px) |
| Content max width | `max-w-5xl` (1024px), centered `mx-auto` |
| Main padding | `p-4 pt-[4.5rem]` mobile · `md:p-8` desktop |
| Responsive breakpoint | `md` (768px) — drawer ↔ fixed sidebar |

## Elevation (shadows)

- **Card (light):** `0 4px 20px -8px rgba(15,23,42,0.12)` + inner top highlight
- **Card (dark):** `0 4px 22px -8px rgba(0,0,0,0.5)` + faint inner highlight
- **Card hover (dark):** adds an orange glow `0 0 26px -8px rgba(249,115,22,0.22)`
- **Inputs:** `0 1px 2px rgba(15,23,42,0.05)` (light) / `rgba(0,0,0,0.3)` (dark)
