# Phase 3: Phase Lane Components

**Scope**: Master Plan Steps 7, 8, 9  
**Depends on**: Phase 1 (theme), Phase 2 (data context)  
**Estimated effort**: ~25 minutes

---

## Objective

Build the `PhaseLane` component, render 5 stacked instances, and label them. This creates the board's visual backbone — the horizontal lanes that cards will sit inside.

---

## Step-by-Step Implementation

### 1. Create the PhaseLane Component

Create `src/components/PhaseLane/PhaseLane.tsx`:

```typescript
interface PhaseLaneProps {
  phaseNumber: number;  // 1–5
  children: React.ReactNode;
}
```

- Render a `<section className="phase-lane" data-phase={phaseNumber}>`.
- Inside, render:
  - A **lane header** with the phase label.
  - A **cards container** `<div className="lane-cards">` that holds `{children}`.
- The `data-phase` attribute will be used by CSS to apply the correct accent color.

### 2. Map Out 5 Vertical Stacked Instances

In `src/App.tsx`:

- Import `useProjects()` from context.
- Create a constant `PHASES = [1, 2, 3, 4, 5]`.
- Map over `PHASES`, rendering a `<PhaseLane>` for each.
- Filter `projects` by `project.phase === phaseNumber` and pass the filtered list into each lane.
- For now, render project titles as simple `<div>` placeholders inside each lane (cards come in Phase 5).

### 3. Hardcode the Phase Labels

- Each lane header displays: **"Phase 1"**, **"Phase 2"**, **"Phase 3"**, **"Phase 4"**, **"Phase 5"**.
- Per the PRD: do **not** use descriptive names — strictly "Phase N".
- Style the label with the lane's accent color using `var(--accent-phase-{n})`.

---

## Component Structure

```
App
├── Header (app title bar)
└── main.lanes-wrapper
    ├── PhaseLane (phase=1)
    │   └── lane-cards → [placeholder cards]
    ├── PhaseLane (phase=2)
    │   └── lane-cards → [placeholder cards]
    ├── PhaseLane (phase=3)
    │   └── lane-cards → [placeholder cards]
    ├── PhaseLane (phase=4)
    │   └── lane-cards → [placeholder cards]
    └── PhaseLane (phase=5)
        └── lane-cards → [placeholder cards]
```

---

## Acceptance Criteria

- [ ] 5 distinct lane sections are visible, stacked vertically from top to bottom.
- [ ] Each lane is labeled "Phase 1" through "Phase 5".
- [ ] Seed data projects appear as placeholder text in their correct lanes.
- [ ] Lane labels are colored with each phase's accent color.
- [ ] No horizontal overflow issues.

---

## Files Created / Modified

| File | Action |
|---|---|
| `src/components/PhaseLane/PhaseLane.tsx` | Created |
| `src/components/PhaseLane/PhaseLane.css` | Created |
| `src/App.tsx` | Modified (render lanes) |
