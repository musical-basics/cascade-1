# Phase 7: Mutations & Interactions

**Scope**: Master Plan Steps 19, 20, 21, 22, 23, 24  
**Depends on**: Phase 6 (editing works, context helpers stubbed)  
**Estimated effort**: ~35 minutes

---

## Objective

Make the board fully functional: add new projects, add tasks to cards, move cards between phases with arrow buttons, and ensure every mutation instantly syncs to LocalStorage.

---

## Step-by-Step Implementation

### 1. "Add New Project" Button

In `src/App.tsx` header or as a separate `src/components/AddProjectButton/AddProjectButton.tsx`:

- Render a prominent **"+ New Project"** button at the top of the dashboard.
- On click:
  ```typescript
  addProject({
    id: crypto.randomUUID(),
    title: 'Untitled Project',
    phase: 1,        // always defaults to Phase 1
    tasks: [],
    notes: '',
  });
  ```
- The new card appears in Phase 1 and the title is immediately in edit mode (auto-focus).
- Style: pill-shaped button with a subtle glow, using `--accent-phase-1` color.

### 2. "+" Button to Append a Task

In `src/components/ProjectCard/ProjectCard.tsx`:

- Add a small **"+"** button below the task list.
- On click:
  ```typescript
  addTask(project.id, {
    id: crypto.randomUUID(),
    text: '',
    completed: false,
  });
  ```
- The new task is appended at the bottom of the list.
- The new task's `InlineEdit` should auto-focus into edit mode immediately.
- Style: small, circular, muted button that lights up on hover.

### 3. "Up" and "Down" Arrow Buttons

In `src/components/ProjectCard/ProjectCard.tsx`:

- Add **▲ (Up)** and **▼ (Down)** arrow buttons to the card.
- Position: along the left or right edge of the card, or in a small footer bar.
- The Up arrow is **disabled / hidden** when the project is already in Phase 1.
- The Down arrow is **disabled / hidden** when the project is already in Phase 5.

### 4. Mutation Logic — Move Up

In `src/context/ProjectsContext.tsx`, implement `moveProject()`:

```typescript
const moveProject = (id: string, direction: 'up' | 'down') => {
  setProjects(prev => prev.map(p => {
    if (p.id !== id) return p;
    const newPhase = direction === 'up'
      ? Math.max(1, p.phase - 1)
      : Math.min(5, p.phase + 1);
    return { ...p, phase: newPhase };
  }));
};
```

### 5. Mutation Logic — Move Down

- Same function as above — the `direction` param handles both cases.
- The card visually moves to the new lane on the next render.

### 6. Ensure Instant LocalStorage Sync

- The `useLocalStorage` hook (Phase 2) already handles this: every call to `setProjects` writes to `localStorage` synchronously.
- Verify with DevTools that the JSON updates **immediately** after:
  - Adding a project
  - Adding a task
  - Editing text (already working from Phase 6)
  - Moving a card up/down
- Add a `useEffect` in the context that logs `projects.length` in dev mode for debugging.

### 7. Implement Remaining Context Helpers

Flesh out all stubs in `ProjectsContext.tsx`:

| Function | Behavior |
|---|---|
| `addProject(project)` | Prepend to array |
| `updateProject(id, partial)` | Merge partial into matching project |
| `deleteProject(id)` | Remove from array |
| `moveProject(id, direction)` | Adjust phase ±1, clamped to 1–5 |
| `addTask(projectId)` | Append empty task to project's tasks array |
| `updateTask(projectId, taskId, text)` | Update task text; remove task if text is empty |
| `deleteTask(projectId, taskId)` | Remove task from array |

---

## Acceptance Criteria

- [ ] Clicking "+ New Project" creates a new card in Phase 1 with the title in edit mode.
- [ ] Clicking "+" on a card appends a new task and auto-focuses it for editing.
- [ ] Clicking ▲ moves the card to the phase above (Phase 3 → Phase 2).
- [ ] Clicking ▼ moves the card to the phase below (Phase 2 → Phase 3).
- [ ] Up arrow is disabled/hidden on Phase 1 cards; Down arrow on Phase 5 cards.
- [ ] Every mutation is reflected in LocalStorage immediately (verify in DevTools).
- [ ] Refreshing the browser after mutations preserves the new state.
- [ ] No duplicate IDs are generated.

---

## Files Created / Modified

| File | Action |
|---|---|
| `src/context/ProjectsContext.tsx` | Modified (implement all mutation helpers) |
| `src/components/ProjectCard/ProjectCard.tsx` | Modified (add +, ▲, ▼ buttons) |
| `src/components/ProjectCard/ProjectCard.css` | Modified (button styles) |
| `src/components/AddProjectButton/AddProjectButton.tsx` | Created (optional) |
| `src/App.tsx` | Modified (add button in header) |
