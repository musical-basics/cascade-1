**Project**: Build a lightweight, local-only project management tracker. 
**Goal**: Create a frictionless, vertical-flow Kanban alternative for a solo developer juggling 10+ repos.

**Core Architecture & Layout**:
* The UI must consist of 5 stacked, horizontal lanes running from top to bottom.
* Name the lanes strictly: "Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5". Do not use descriptive names.
* Project cards live inside these lanes and flow horizontally within them.

**Card Functionality (The "Frictionless" Requirement)**:
* Each card needs: A Title, a Bulleted Task List, and a Notes section.
* **CRITICAL**: Editing must be 100% inline and seamless. Clicking any text (title, task, note) instantly makes it editable. No modal popups, no separate "edit screens", no rigid form submissions.
* Include simple "Up" and "Down" arrow buttons on each card to shift it between the Phase lanes. 
* Include a simple "+" button on the card to append a new task.

**State Management**:
* Since this doesn't connect to external repos, simply use LocalStorage to persist the board state so I don't lose my data on refresh.

**Vibe & Aesthetic**:
* Dark mode. Sleek, minimal, developer-focused. 
* Use distinct, glowing accent colors for each of the 5 phases so the vertical hierarchy is instantly recognizable.
* Add smooth, satisfying transitions when a card moves up or down a phase. 
* Surprise me with the exact styling—keep it modern and highly scannable.