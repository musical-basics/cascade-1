# Phase 4: Lane Styling & Layout

**Scope**: Master Plan Steps 10, 11, 12  
**Depends on**: Phase 3 (PhaseLane component exists)  
**Estimated effort**: ~25 minutes

---

## Objective

Apply the glowing accent colors, build out the responsive Flexbox/Grid layout, and ensure smooth vertical scrolling. This phase transforms the plain lane structure into the polished visual hierarchy.

---

## Step-by-Step Implementation

### 1. Apply Glowing Accent Colors per Lane

In `src/components/PhaseLane/PhaseLane.css`:

- Use `[data-phase]` attribute selectors to apply phase-specific styling:

```css
.phase-lane[data-phase="1"] { --lane-accent: var(--accent-phase-1); }
.phase-lane[data-phase="2"] { --lane-accent: var(--accent-phase-2); }
/* ... etc */
```

- Apply a subtle **left border glow** using `--lane-accent`:
  - `border-left: 3px solid var(--lane-accent)`
  - `box-shadow: inset 4px 0 12px -4px var(--lane-accent)`
- Apply a faint background tint: `background: color-mix(in srgb, var(--lane-accent) 4%, var(--bg-surface))`.
- Style the lane header label: `color: var(--lane-accent)`, `font-weight: 700`, `letter-spacing: 0.05em`, `text-transform: uppercase`, `font-size: 0.75rem`.

### 2. Implement Flexbox/CSS Grid Layout

**Lanes wrapper** (`src/index.css` or `src/App.css`):

```css
.lanes-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 24px;
  min-height: 100vh;
}
```

**Lane cards container** (horizontal scroll for cards within each lane):

```css
.lane-cards {
  display: flex;
  flex-direction: row;
  gap: 16px;
  overflow-x: auto;
  padding: 12px 0;
  scroll-snap-type: x proximity;
}
```

- Each lane spans the **full viewport width**.
- Cards scroll horizontally within each lane (per the PRD: "cards flow horizontally within them").
- The lane itself has `min-height: 120px` so empty lanes still look intentional.

### 3. Ensure Smooth Vertical Scrolling

- Set `html { scroll-behavior: smooth; }` (already in Phase 1, verify).
- Add momentum scrolling for the cards container:
  ```css
  .lane-cards {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }
  ```
- Ensure `body` / `.app-container` does **not** have `overflow: hidden` that would break page scroll.
- Test at different viewport heights (small laptop, desktop) — all 5 lanes should be accessible by scrolling.

---

## Visual Reference

```
┌──────────────────────────────────────────────────────────┐
│  PHASE 1  ▌ [Card] [Card] [Card] →→→ (horizontal scroll)│
│──────────────────────────────────────────────────────────│
│  PHASE 2  ▌ [Card] [Card] →→→                           │
│──────────────────────────────────────────────────────────│
│  PHASE 3  ▌ [Card] →→→                                  │
│──────────────────────────────────────────────────────────│
│  PHASE 4  ▌ [Card] [Card] [Card] [Card] →→→             │
│──────────────────────────────────────────────────────────│
│  PHASE 5  ▌ [Card] →→→                                  │
└──────────────────────────────────────────────────────────┘
        ↕ (vertical page scroll if viewport is small)
```

---

## Acceptance Criteria

- [ ] Each lane has a visually distinct accent glow/border matching its phase color.
- [ ] Lanes stretch full viewport width.
- [ ] Cards inside a lane scroll horizontally without breaking the overall layout.
- [ ] The page scrolls vertically when all 5 lanes exceed viewport height.
- [ ] Empty lanes render gracefully with a minimum height (no visual collapse).
- [ ] The layout is responsive on both laptop (~768px) and desktop (~1440px) widths.

---

## Files Created / Modified

| File | Action |
|---|---|
| `src/components/PhaseLane/PhaseLane.css` | Modified (accent colors, glow, layout) |
| `src/index.css` | Modified (lanes-wrapper layout, scrolling) |
