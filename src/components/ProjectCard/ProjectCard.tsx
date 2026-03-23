import { useState } from 'react';
import type { Project } from '../../types';
import { useProjects } from '../../context/ProjectsContext';
import { InlineEdit } from '../InlineEdit/InlineEdit';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { updateProject, updateTask, addTask, deleteTask, deleteProject, moveProject } = useProjects();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleAddTask = () => {
    const newTask = {
      id: crypto.randomUUID(),
      text: '',
      completed: false,
    };
    addTask(project.id, newTask);
  };

  const handleDeleteProject = () => {
    if (confirmDelete) {
      deleteProject(project.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div className="project-card">
      {/* Card Header: Title + Delete Card */}
      <div className="card-header">
        <InlineEdit
          value={project.title}
          onSave={(val) => updateProject(project.id, { title: val })}
          className="card-title"
          placeholder="Untitled project"
        />
        <button
          className={`icon-btn delete-card-btn ${confirmDelete ? 'confirm' : ''}`}
          onClick={handleDeleteProject}
          title={confirmDelete ? 'Click again to confirm' : 'Delete project'}
        >
          {confirmDelete ? '✕' : '🗑'}
        </button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {project.tasks.map((task) => (
          <li key={task.id} className="task-item" data-task-id={task.id}>
            <span className="task-bullet">•</span>
            <InlineEdit
              value={task.text}
              onSave={(val) => updateTask(project.id, task.id, val)}
              className="task-text"
              placeholder="New task..."
              allowEmpty={true}
              autoFocus={task.text === ''}
            />
            <div className="task-actions">
              <button
                className="icon-btn task-delete-btn"
                onClick={() => deleteTask(project.id, task.id)}
                title="Delete task"
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Task Button */}
      <button
        className="card-action-btn add-task-btn"
        onClick={handleAddTask}
        title="Add task"
      >
        +
      </button>

      {/* Notes */}
      <div className="card-notes">
        <InlineEdit
          value={project.notes}
          onSave={(val) => updateProject(project.id, { notes: val })}
          element="textarea"
          className="notes-text"
          placeholder="Add notes..."
          allowEmpty={true}
        />
      </div>

      {/* Phase Navigation Arrows */}
      <div className="card-actions">
        <button
          className="card-action-btn arrow-btn"
          onClick={() => moveProject(project.id, 'up')}
          disabled={project.phase <= 1}
          title="Move to previous phase"
        >
          ▲
        </button>
        <span className="phase-badge">Phase {project.phase}</span>
        <button
          className="card-action-btn arrow-btn"
          onClick={() => moveProject(project.id, 'down')}
          disabled={project.phase >= 5}
          title="Move to next phase"
        >
          ▼
        </button>
      </div>
    </div>
  );
}
