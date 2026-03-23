import type { Project } from '../../types';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      {/* Title */}
      <h3 className="card-title" data-field="title">
        {project.title || 'Untitled Project'}
      </h3>

      {/* Task List */}
      <ul className="task-list">
        {project.tasks.length > 0 ? (
          project.tasks.map((task) => (
            <li key={task.id} className="task-item" data-task-id={task.id}>
              <span className="task-bullet">•</span>
              <span className="task-text">{task.text || 'New task...'}</span>
            </li>
          ))
        ) : (
          <li className="task-item task-empty">
            <span className="task-text-muted">No tasks yet</span>
          </li>
        )}
      </ul>

      {/* Notes */}
      <div className="card-notes">
        {project.notes ? (
          <p className="notes-text">{project.notes}</p>
        ) : (
          <p className="notes-text notes-placeholder">Add notes...</p>
        )}
      </div>
    </div>
  );
}
