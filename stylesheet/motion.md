# Motion & Effects

The animations that give the system its personality. Three categories:
**continuous** (always running), **one-shot** (on load / on action), and
**interactive** (on hover/pointer). Every one is disabled under
`prefers-reduced-motion: reduce`.

## 1. Drifting gradient blobs (continuous)

A living backdrop of three blurred colour blobs that slowly roam. The glass
cards' `backdrop-filter` samples them, so surfaces subtly shift hue.

**Key implementation facts (learned the hard way):**

- Render as **fixed elements**, not `body` gradients — a `background-image`
  radial-gradient can't be animated by position the way transforms can.
- **Stacking:** blobs at `z-index: 0`, page content lifted to `z-index: 10`.
  Do **not** use `z-index: -1` — an opaque `body` background paints over it.
  Put the base colour on `html`, make `body` transparent.
- Colours: orange `0.45`, sky `0.40`, emerald `0.34` alpha; `filter: blur(40px)`.
- Motion: `translate` in `vw/vh` (scales to viewport) + a `scale` pulse;
  durations **13s / 17s / 15s**, `ease-in-out infinite alternate`. Different
  durations keep them from ever syncing.

```tsx
// BackgroundBlobs.tsx — render once near the top of the tree
<div className="bg-blobs" aria-hidden="true">
  <span className="bg-blob bg-blob--orange" />
  <span className="bg-blob bg-blob--sky" />
  <span className="bg-blob bg-blob--emerald" />
</div>
```

CSS lives in `tokens.css` (`.bg-blobs`, `.bg-blob*`, `@keyframes blob-drift-*`).

## 2. Circle-reveal theme switch (one-shot)

Switching dark/light grows a circle from the toggle button. Two paths:

- **Preferred — View Transitions API:** snapshot the page, apply the theme, then
  animate `clip-path: circle(0) → circle(maxRadius)` over the **new** snapshot.
  Real new-themed content is revealed inside the circle, old content stays
  outside. The CSS disables the default cross-fade and stacks new above old.
- **Fallback (e.g. Firefox):** grow an opaque circle of the next theme's base
  colour, swap the theme underneath at the end, then remove the overlay.

```ts
const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
// duration 700ms, ease-in-out, pseudoElement: "::view-transition-new(root)"
```

Pass the click coordinates (`e.clientX/clientY`) so the circle starts at the
button. Reveal duration **700ms**. See the app's `ThemeProvider.tsx`.

## 3. Page-entrance stagger (one-shot)

On every route change the page remounts (a `PageTransition` wrapper keyed by
pathname) and its sections fade + slide up in sequence.

- Keyframe `fadeInUp`: `opacity 0 → 1`, `translateY(22px) → 0`.
- Per element: **0.85s**, easing `cubic-bezier(0.22, 1, 0.36, 1)` (soft ease-out).
- Stagger: `0.12s` step via `:nth-child` delays, capped after the 12th child.

## 4. Card hover lift (interactive)

- Lift: `translateY(-4px)` + orange border + glow.
- Transition: **0.4s** `cubic-bezier(0.22, 1, 0.36, 1)`.
- `:not(:has(.card:hover))` keeps a parent card still when a nested card is the
  one hovered.

## 5. Cursor spotlight (interactive)

A soft radial glow that follows the cursor inside the hovered card. A single
global `pointermove` listener (`CardSpotlight`) writes `--mx`/`--my` (cursor
position relative to the card) into the hovered `.card`; `.card::before` paints
a `radial-gradient` at those coords, behind the content (`z-index: -1` within
the card's isolated context).

## Theming setup

- Toggle the `.dark` class on `<html>`; persist theme in `localStorage`.
- **Anti-FOUC:** an inline `<head>` script applies the stored theme (and any
  reduced-motion class) before first paint:

```html
<script>try{var t=localStorage.getItem('theme')||'dark';
document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}</script>
```

## Accessibility — reduced motion

A single media query neutralises all of the above:

```css
@media (prefers-reduced-motion: reduce) {
  .page-enter > * > * { opacity: 1; animation: none; }
  .card { transition: none; }
  .card:hover:not(:has(.card:hover)) { transform: none; }
  .card::before { transition: none; }
  .bg-blob { animation: none; }   /* blobs stay, just stationary */
}
```

> Note: a continuously animated, blurred backdrop is GPU work. It's fine on
> modern hardware for simple content sites; if a build is heavy or targets
> low-end mobile, slow the blob drift or reduce the blur below `md`.
