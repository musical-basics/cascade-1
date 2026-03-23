# Phase 2: Data Layer & Persistence

**Scope**: Master Plan Steps 2, 3, 6  
**Depends on**: Phase 1 (project initialized)  
**Estimated effort**: ~30 minutes

---

## Objective

Define the core data model, build a reactive LocalStorage persistence hook, and seed the board with realistic dummy data so future UI phases have something to render.

---

## Step-by-Step Implementation

### 1. Define the Core Data Schema

Create `src/types.ts`:

```typescript
export interface Task {
  id: string;       // UUID
  text: string;
  completed: boolean;
}

export interface Project {
  id: string;       // UUID
  title: string;
  phase: number;    // 1–5
  tasks: Task[];
  notes: string;
}
```

### 2. Build the LocalStorage Persistence Hook

Create `src/hooks/useLocalStorage.ts`:

- Generic hook: `useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void]`
- On mount, read `localStorage.getItem(key)` → parse JSON → fall back to `initialValue`.
- The setter serializes to JSON and writes to `localStorage` before updating React state.
- Wrap reads/writes in try-catch to handle corrupt data gracefully (reset to `initialValue` on error).

### 3. Create the Projects Context

Create `src/context/ProjectsContext.tsx`:

- Use `useLocalStorage<Project[]>('cascade-projects', [])` internally.
- Expose a context with:
  - `projects: Project[]`
  - `setProjects: React.Dispatch<...>`
  - Helper functions (stubs for now, fleshed out in Phase 7):
    - `addProject()`
    - `updateProject(id, partial)`
    - `moveProject(id, direction: 'up' | 'down')`
    - `addTask(projectId)`
    - `updateTask(projectId, taskId, text)`
- Wrap `App` with `<ProjectsProvider>` in `main.tsx`.

### 4. Seed with Dummy Data

Create `src/data/seedProjects.ts`:

- Export an array of **4-5 sample projects** spread across different phases.
- Use realistic developer-style content:
  - *"Auth Refactor"* (Phase 2, 3 tasks, notes about JWT migration)
  - *"Landing Page Redesign"* (Phase 1, 2 tasks)
  - *"CI/CD Pipeline"* (Phase 4, 4 tasks, notes about GitHub Actions)
  - *"API Rate Limiter"* (Phase 3, 2 tasks)
  - *"Mobile Responsive Pass"* (Phase 5, 1 task)
- In `ProjectsContext`, if LocalStorage is empty on first load, initialize with seed data.

---

## Acceptance Criteria

- [ ] TypeScript compiles with no type errors.
- [ ] Refreshing the browser retains all project data.
- [ ] Opening DevTools → Application → LocalStorage shows the `cascade-projects` key with valid JSON.
- [ ] The seed data is only written once (subsequent loads use the persisted state).
- [ ] Context is accessible from any child component via `useProjects()` hook.

---

## Files Created / Modified

| File | Action |
|---|---|
| `src/types.ts` | Created |
| `src/hooks/useLocalStorage.ts` | Created |
| `src/context/ProjectsContext.tsx` | Created |
| `src/data/seedProjects.ts` | Created |
| `src/main.tsx` | Modified (wrap with Provider) |
