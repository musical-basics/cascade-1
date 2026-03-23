# Phase 1: Project Initialization & Theme Setup

**Scope**: Master Plan Steps 1, 4, 5  
**Depends on**: Nothing — this is the starting point  
**Estimated effort**: ~30 minutes

---

## Objective

Bootstrap the project, create the root application shell, and establish the dark-mode design system that every subsequent phase will build on.

---

## Step-by-Step Implementation

### 1. Initialize the Project

- Use **Vite + React + TypeScript** (`npx -y create-vite@latest ./ --template react-ts`).
- Install dependencies with `pnpm install`.
- Verify the dev server starts cleanly with `pnpm dev`.
- Remove boilerplate files (`App.css` demo content, default Vite logo, placeholder markup in `App.tsx`).

### 2. Create the Main Application Container

- In `src/App.tsx`, scaffold a top-level `<div className="app-container">` that will eventually hold:
  - A **header bar** (app title + "Add Project" button placeholder).
  - A **lanes wrapper** `<main className="lanes-wrapper">` (empty for now).
- Export this as the default component rendered by `main.tsx`.

### 3. Implement the Dark-Mode CSS Variables & Theme Wrapper

Create `src/index.css` with a `:root` / `[data-theme="dark"]` variable system:

| Token | Purpose | Example Value |
|---|---|---|
| `--bg-primary` | Page background | `#0d0d0d` |
| `--bg-surface` | Card / lane surface | `#1a1a2e` |
| `--bg-surface-hover` | Hover state for surfaces | `#25253e` |
| `--text-primary` | Main text | `#e0e0e0` |
| `--text-secondary` | Muted / label text | `#8888a0` |
| `--border-subtle` | Dividers, card borders | `#2a2a3e` |
| `--accent-phase-1` | Phase 1 glow | `#00e5ff` (cyan) |
| `--accent-phase-2` | Phase 2 glow | `#7c4dff` (purple) |
| `--accent-phase-3` | Phase 3 glow | `#ff6d00` (orange) |
| `--accent-phase-4` | Phase 4 glow | `#00e676` (green) |
| `--accent-phase-5` | Phase 5 glow | `#ff1744` (red-pink) |
| `--radius-card` | Card border radius | `12px` |
| `--font-main` | Primary typeface | `'Inter', sans-serif` |
| `--transition-default` | Standard ease | `0.25s ease` |

- Import **Inter** from Google Fonts in `index.html`.
- Apply `data-theme="dark"` to `<html>` by default.
- Set global resets: `box-sizing: border-box`, `margin: 0`, smooth scrolling.
- Style `body` with `--bg-primary` background, `--text-primary` color, and `--font-main`.

---

## Acceptance Criteria

- [ ] `pnpm dev` runs with zero errors/warnings.
- [ ] The browser shows a dark page with the Inter font loaded.
- [ ] All CSS variables are accessible from any component via `var(--token)`.
- [ ] No leftover Vite boilerplate is visible.

---

## Files Created / Modified

| File | Action |
|---|---|
| `vite.config.ts` | Created (scaffolded) |
| `src/main.tsx` | Modified (clean entry) |
| `src/App.tsx` | Modified (app shell) |
| `src/index.css` | Created (theme system) |
| `index.html` | Modified (Inter font, dark theme) |
