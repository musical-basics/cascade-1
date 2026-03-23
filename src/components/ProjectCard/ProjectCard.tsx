import type { Project } from '../../types';
import { useProjects } from '../../context/ProjectsContext';
import { InlineEdit } from '../InlineEdit/InlineEdit';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { updateProject, updateTask } = useProjects();

  return (
    <div className="project-card">
      {/* Title */}
      <InlineEdit
        value={project.title}
        onSave={(val) => updateProject(project.id, { title: val })}
        className="card-title"
        placeholder="Untitled project"
      />

      {/* Task List */}
      <ul className="task-list">
        {project.tasks.length > 0 ? (
          project.tasks.map((task) => (
            <li key={task.id} className="task-item" data-task-id={task.id}>
              <span className="task-bullet">•</span>
              <InlineEdit
                value={task.text}
                onSave={(val) => updateTask(project.id, task.id, val)}
                className="task-text"
                placeholder="New task..."
                allowEmpty={true}
              />
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
        <InlineEdit
          value={project.notes}
          onSave={(val) => updateProject(project.id, { notes: val })}
          element="textarea"
          className="notes-text"
          placeholder="Add notes..."
          allowEmpty={true}
        />
      </div>
    </div>
  );
}
