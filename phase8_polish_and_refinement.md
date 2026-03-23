# Phase 8: Polish & Refinement

**Scope**: Master Plan Steps 25, 26, 27, 28, 29, 30  
**Depends on**: All previous phases (fully functional board)  
**Estimated effort**: ~40 minutes

---

## Objective

The final pass — transform a working board into a **polished, satisfying developer tool**. Smooth transitions, refined hover states, custom scrollbars, optimized typography, and a thorough debug pass.

---

## Step-by-Step Implementation

### 1. CSS Transitions for Phase Movement (Step 25)

When a card moves between phases, it should **not** just blink in/out. Implement smooth transitions:

- Add a `layout` animation using CSS `@keyframes`:
  ```css
  @keyframes card-enter {
    from {
      opacity: 0;
      transform: translateY(-12px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .project-card {
    animation: card-enter 0.3s ease-out;
  }
  ```
- Optionally use React's `key` prop on cards (already using `project.id`) to trigger mount animations.
- Consider using `react-flip-move` or a lightweight `useLayoutEffect`-based approach for true FLIP animations if the CSS-only approach doesn't feel smooth enough.

### 2. Style Active Inline-Edit States (Step 26)

Enhance the `InlineEdit` component's edit mode:

```css
.inline-edit-input:focus {
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 0 2px var(--lane-accent, var(--accent-phase-1)),
              0 0 12px -2px var(--lane-accent, var(--accent-phase-1));
  border-radius: 6px;
}
```

- The glow should match the card's phase accent color.
- Add a smooth transition on the glow appearing (`transition: box-shadow 0.2s ease`).
- Ensure the caret color also matches the accent: `caret-color: var(--lane-accent)`.

### 3. Hover States for Interactive Elements (Step 27)

Apply polished hover states across all interactive elements:

| Element | Hover Effect |
|---|---|
| ▲ / ▼ arrows | Scale up slightly, background lighten, accent color glow |
| "+" task button | Rotate 90°, background lighten |
| "+ New Project" | Glow intensifies, slight scale |
| Card itself | Lift shadow (already done in Phase 5, verify) |
| Phase labels | Subtle brightness boost |

```css
.card-action-btn:hover {
  background: var(--bg-surface-hover);
  color: var(--lane-accent);
  transform: scale(1.1);
}
```

### 4. Custom Scrollbars (Step 28)

Style scrollbars for both the main window and horizontal card lanes:

```css
/* Webkit (Chrome, Safari, Edge) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border-subtle);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--border-subtle) transparent;
}
```

- Also style the `<textarea>` scrollbar within the Notes InlineEdit.

### 5. Typography Optimization (Step 29)

Refine the type system for **high scannability**:

| Element | Style |
|---|---|
| App title | `1.25rem`, `font-weight: 800`, `letter-spacing: -0.02em` |
| Phase label | `0.7rem`, `font-weight: 700`, `uppercase`, `letter-spacing: 0.08em` |
| Card title | `1rem`, `font-weight: 600`, `line-height: 1.3` |
| Task text | `0.875rem`, `font-weight: 400`, `line-height: 1.5` |
| Notes text | `0.825rem`, `font-weight: 400`, `color: var(--text-secondary)`, `line-height: 1.6` |
| Buttons / labels | `0.75rem`, `font-weight: 500` |

- Ensure no text uses browser default sizes.
- Consistent `line-height` for readability.

### 6. Final Debug Pass (Step 30)

Systematically test for layout-breaking edge cases:

| Test Case | Expected Behavior |
|---|---|
| Task text is 200+ characters | Text wraps within the card, no horizontal overflow |
| Title is 80+ characters | Truncates with ellipsis |
| 20+ tasks on one card | Card grows vertically, stays within lane scroll |
| Notes with 10+ lines | Notes area caps at max-height in read mode |
| Empty board (clear LocalStorage) | Seed data re-populates |
| Rapid clicking Up/Down | No double-moves, state stays consistent |
| Editing while another edit is open | Previous edit saves on blur correctly |
| Browser resize during use | Layout reflows without breaking |

- Fix any issues found during testing.
- Verify **no console errors or warnings** in DevTools.
- Check `localStorage` data integrity after stress testing.

---

## Acceptance Criteria

- [ ] Cards animate smoothly when moving between phases (no jarring jumps).
- [ ] Inline edit inputs have a visible, phase-colored glow when focused.
- [ ] All buttons have polished hover/active states with micro-animations.
- [ ] Scrollbars are thin, dark, and custom-styled (not browser defaults).
- [ ] Typography is consistent, scannable, and uses the Inter font throughout.
- [ ] No text overflow breaks the card layout under any content length.
- [ ] Zero console errors or warnings in DevTools.
- [ ] The app feels "finished" — smooth, responsive, and visually cohesive.

---

## Files Created / Modified

| File | Action |
|---|---|
| `src/index.css` | Modified (scrollbars, typography tokens, animations) |
| `src/components/ProjectCard/ProjectCard.css` | Modified (transitions, hover states) |
| `src/components/InlineEdit/InlineEdit.css` | Modified (focus glow) |
| `src/components/PhaseLane/PhaseLane.css` | Modified (label hover) |
| `src/App.css` or `src/App.tsx` | Modified (header typography) |
