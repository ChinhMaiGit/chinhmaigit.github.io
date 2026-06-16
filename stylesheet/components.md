# Component Recipes

Reusable patterns built on `tokens.css`. Markup uses Tailwind utilities plus the
component classes defined in the CSS `@layer components`.

## Glass card — `.card`

The core surface. Translucent, blurred, with a faint top highlight, a cursor
spotlight, and a hover lift. **Always needs a backdrop behind it** (the blobs).

```tsx
<section className="card space-y-4">
  <h2>Section title</h2>
  <p>Body copy — justified automatically inside cards.</p>
</section>
```

- Nested cards don't double-lift: the hover rule uses `:not(:has(.card:hover))`.
- The cursor spotlight needs the `CardSpotlight` listener mounted once (writes
  `--mx`/`--my` per hovered card).

## Stat card

A card showing one metric. Mono value in a semantic accent.

```tsx
<div className="card flex flex-col gap-1">
  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
  <p className="text-3xl font-bold font-mono text-orange-400">{value}</p>
  {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
</div>
```

Accent options: `text-orange-400` (brand), `text-emerald-400`, `text-amber-400`,
`text-rose-400`.

## Primary button — `.btn-primary`

```tsx
<button className="btn-primary w-full" disabled={loading}>Run</button>
```

Solid orange, white text (kept white in light mode), `rounded-xl`, disabled at
50% opacity. This is the only filled button style.

## Text input — `.input-field`

```tsx
<label className="block text-xs text-slate-400 mb-1.5">Floor area (sq ft)</label>
<input type="number" className="input-field" />
```

Raised background, hairline border, orange focus ring. Native number spinners are
removed globally for a consistent look.

## Select — `.select-field`

Use a custom-styled native `<select>` with a theme-aware chevron (the chevron SVG
is baked into the CSS as a `background-image`, recoloured under `.dark`).

```tsx
<select className="select-field">{/* options */}</select>
```

## Nav pill — `.pill-nav`

Sidebar / nav links. Muted by default, filled border on hover/active.

```tsx
<a className={clsx("pill-nav block", active && "active")}>Label</a>
```

## Badge — `.badge`

```tsx
<span className="badge bg-orange-500/15 text-orange-300">New</span>
```

## Collapsible panel

A card whose body animates open/closed via `grid-template-rows: 0fr → 1fr`
(the only reliable way to animate to auto height). Content stays mounted.

```tsx
<Collapsible title="How it works">{/* explanatory content */}</Collapsible>
```

Header is a real `<button aria-expanded>`; chevron rotates 180° (300ms). Body
wrapper: `grid transition-all duration-500 ease-out` with
`gridTemplateRows: open ? "1fr" : "0fr"`, inner `overflow-hidden`,
`aria-hidden={!open}`. See the app's `components/Collapsible.tsx`.

## Layout shell

```tsx
<main className="relative z-10 ml-0 md:ml-56 min-h-screen p-4 pt-[4.5rem] md:p-8">
  <div className="mx-auto max-w-5xl">{children}</div>
</main>
```

- `md:ml-56` reserves space for the fixed 224px sidebar.
- `relative z-10` lifts content **above** the background blobs (`z-0`).
- `max-w-5xl mx-auto` caps line length for readability.
- Sidebar is `fixed left-0 top-0 h-screen w-56`, `z-50`; on mobile it slides in
  as a drawer below `md` with a backdrop.

## Loading skeletons — `.skeleton`

Theme-aware shimmer placeholder (respects reduced motion). Mirror the real
layout (header → cards) so route transitions feel intentional.

```tsx
<div className="skeleton h-9 w-2/3" />
```
