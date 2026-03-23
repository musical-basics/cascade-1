import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { seedProjects } from '../data/seedProjects';
import type { Project, Task } from '../types';

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, partial: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  moveProject: (id: string, direction: 'up' | 'down') => void;
  addTask: (projectId: string, task: Task) => void;
  updateTask: (projectId: string, taskId: string, text: string) => void;
  deleteTask: (projectId: string, taskId: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useLocalStorage<Project[]>(
    'cascade-projects',
    seedProjects
  );

  const addProject = useCallback(
    (project: Project) => {
      setProjects((prev) => [project, ...prev]);
    },
    [setProjects]
  );

  const updateProject = useCallback(
    (id: string, partial: Partial<Project>) => {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...partial } : p))
      );
    },
    [setProjects]
  );

  const deleteProject = useCallback(
    (id: string) => {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    },
    [setProjects]
  );

  const moveProject = useCallback(
    (id: string, direction: 'up' | 'down') => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          const newPhase =
            direction === 'up'
              ? Math.max(1, p.phase - 1)
              : Math.min(5, p.phase + 1);
          return { ...p, phase: newPhase };
        })
      );
    },
    [setProjects]
  );

  const addTask = useCallback(
    (projectId: string, task: Task) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId ? { ...p, tasks: [...p.tasks, task] } : p
        )
      );
    },
    [setProjects]
  );

  const updateTask = useCallback(
    (projectId: string, taskId: string, text: string) => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p;
          // Remove the task if text is empty
          if (!text.trim()) {
            return { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) };
          }
          return {
            ...p,
            tasks: p.tasks.map((t) =>
              t.id === taskId ? { ...t, text } : t
            ),
          };
        })
      );
    },
    [setProjects]
  );

  const deleteTask = useCallback(
    (projectId: string, taskId: string) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
            : p
        )
      );
    },
    [setProjects]
  );

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        moveProject,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects(): ProjectsContextType {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}
