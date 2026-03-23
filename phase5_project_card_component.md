# Phase 5: Project Card Component

**Scope**: Master Plan Steps 13, 14, 15, 16  
**Depends on**: Phase 3 & 4 (lanes exist and are styled)  
**Estimated effort**: ~30 minutes

---

## Objective

Build the visual shell of the `ProjectCard` component — the title, bulleted task list, and notes section — all in **read-only mode** for now. Inline editing is wired up in Phase 6.

---

## Step-by-Step Implementation

### 1. Create the ProjectCard Component

Create `src/components/ProjectCard/ProjectCard.tsx`:

```typescript
interface ProjectCardProps {
  project: Project;
}
```

- Render inside a `<div className="project-card">`.
- Accept a full `Project` object as a prop.

### 2. Render the Project Title

- Display `project.title` in a `<h3 className="card-title">` element.
- Truncate long titles with `text-overflow: ellipsis` / `overflow: hidden` / `white-space: nowrap`.
- Add a `data-field="title"` attribute for the inline-edit system (Phase 6).

### 3. Render the Bulleted Task List

- Map over `project.tasks` and render each as:
  ```html
  <li className="task-item" data-task-id={task.id}>
    <span className="task-bullet">•</span>
    <span className="task-text">{task.text}</span>
  </li>
  ```
- Wrap the list in `<ul className="task-list">`.
- Style bullets with the lane's accent color: `color: var(--lane-accent)`.
- If `tasks` array is empty, show a muted placeholder: *"No tasks yet"*.

### 4. Render the Notes Text Block

- Display `project.notes` in a `<p className="card-notes">`.
- Limit visible height with `max-height: 80px` and `overflow: hidden` (full notes visible in edit mode).
- If notes are empty, show muted placeholder text: *"Add notes..."*.
- Style with smaller font size (`0.85rem`) and `--text-secondary` color.

### 5. Card Styling

Create `src/components/ProjectCard/ProjectCard.css`:

```css
.project-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  padding: 16px;
  min-width: 280px;
  max-width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform var(--transition-default),
              box-shadow var(--transition-default);
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
```

### 6. Wire Cards into PhaseLane

In `src/App.tsx`:

- Replace placeholder `<div>` elements with `<ProjectCard project={proj} />` for each filtered project.

---

## Acceptance Criteria

- [ ] Each seed project renders as a styled card inside the correct phase lane.
- [ ] Title, task list, and notes are all visible on the card.
- [ ] Cards have a hover lift effect.
- [ ] Empty tasks/notes show appropriate placeholder text.
- [ ] Cards don't stretch beyond `320px` width and maintain consistent sizing.
- [ ] Long titles truncate with ellipsis rather than breaking layout.

---

## Files Created / Modified

| File | Action |
|---|---|
| `src/components/ProjectCard/ProjectCard.tsx` | Created |
| `src/components/ProjectCard/ProjectCard.css` | Created |
| `src/App.tsx` | Modified (render ProjectCards) |
