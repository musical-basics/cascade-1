# Phase 6: Inline Editing System

**Scope**: Master Plan Steps 17, 18  
**Depends on**: Phase 5 (ProjectCard renders read-only content)  
**Estimated effort**: ~35 minutes

---

## Objective

Implement the **critical "frictionless" editing** requirement from the PRD: clicking any text on a card instantly makes it editable with no modals or popups. Pressing Enter or blurring saves and returns to read-only mode.

---

## Step-by-Step Implementation

### 1. Build the InlineEdit Wrapper Component

Create `src/components/InlineEdit/InlineEdit.tsx`:

```typescript
interface InlineEditProps {
  value: string;
  onSave: (newValue: string) => void;
  element?: 'input' | 'textarea'; // default: 'input'
  placeholder?: string;
  className?: string;
}
```

**Behavior:**

- **Read mode** (default state): Render the text inside a `<span>` (or `<p>`) with `cursor: pointer`.
- **Edit mode** (after click): Swap the span for an `<input>` or `<textarea>`:
  - Auto-focus immediately via `useRef` + `useEffect`.
  - Pre-populate with the current `value`.
  - The input should be **unstyled** — transparent background, no border, same font/size as the read-mode text — so the transition feels seamless.
- Maintain an internal `isEditing` boolean state.
- Maintain an internal `draft` string state for the current edit value.

### 2. Wire Up Save Events (onBlur + onEnter)

In `InlineEdit.tsx`:

- **`onBlur`**: Save the draft value by calling `onSave(draft)`, then switch back to read mode.
- **`onKeyDown`**:
  - For `<input>`: **Enter** saves and exits edit mode.
  - For `<textarea>`: **Shift+Enter** inserts a newline (default), **Escape** cancels (reverts to original value), **Ctrl/Cmd+Enter** saves.
- If `draft` is empty / whitespace-only: revert to original value (don't save blanks for titles).

### 3. Integrate InlineEdit into ProjectCard

Update `src/components/ProjectCard/ProjectCard.tsx`:

**Title:**
```jsx
<InlineEdit
  value={project.title}
  onSave={(val) => updateProject(project.id, { title: val })}
  className="card-title"
  placeholder="Untitled project"
/>
```

**Task items:**
```jsx
{project.tasks.map((task) => (
  <li key={task.id} className="task-item">
    <span className="task-bullet">•</span>
    <InlineEdit
      value={task.text}
      onSave={(val) => updateTask(project.id, task.id, val)}
      className="task-text"
      placeholder="New task..."
    />
  </li>
))}
```

**Notes:**
```jsx
<InlineEdit
  value={project.notes}
  onSave={(val) => updateProject(project.id, { notes: val })}
  element="textarea"
  className="card-notes"
  placeholder="Add notes..."
/>
```

### 4. Style the Edit States

Create `src/components/InlineEdit/InlineEdit.css`:

```css
.inline-edit-display {
  cursor: pointer;
  border-radius: 4px;
  padding: 2px 4px;
  transition: background var(--transition-default);
}

.inline-edit-display:hover {
  background: var(--bg-surface-hover);
}

.inline-edit-input {
  background: transparent;
  border: none;
  outline: none;
  color: inherit;
  font: inherit;
  width: 100%;
  padding: 2px 4px;
  border-radius: 4px;
  caret-color: var(--lane-accent, var(--accent-phase-1));
}
```

---

## Edge Cases to Handle

| Scenario | Behavior |
|---|---|
| Click title → delete all text → blur | Revert to previous title |
| Click task → delete all text → blur | Remove the task from the array |
| Click notes → delete all text → blur | Save as empty string (notes are optional) |
| Very long single-line title | Input scrolls horizontally |
| Rapid double-click on text | Don't open two edit sessions |

---

## Acceptance Criteria

- [ ] Clicking any title, task, or note instantly swaps to an editable input.
- [ ] The input auto-focuses with the cursor at the end of the text.
- [ ] Pressing Enter (or Cmd+Enter for textarea) saves and exits edit mode.
- [ ] Pressing Escape cancels the edit and reverts to the original text.
- [ ] Clicking away (blur) saves the current value.
- [ ] The edit-mode input visually matches the read-mode text (no layout shift).
- [ ] All edits persist to LocalStorage immediately.
- [ ] No modals, popups, or separate edit screens are used anywhere.

---

## Files Created / Modified

| File | Action |
|---|---|
| `src/components/InlineEdit/InlineEdit.tsx` | Created |
| `src/components/InlineEdit/InlineEdit.css` | Created |
| `src/components/ProjectCard/ProjectCard.tsx` | Modified (use InlineEdit) |
