import { useProjects } from './context/ProjectsContext'
import { PhaseLane } from './components/PhaseLane/PhaseLane'
import { ProjectCard } from './components/ProjectCard/ProjectCard'
import './App.css'

const PHASES = [1, 2, 3, 4, 5] as const;

function App() {
  const { projects, addProject } = useProjects();

  const handleAddProject = () => {
    addProject({
      id: crypto.randomUUID(),
      title: 'Untitled Project',
      phase: 1,
      tasks: [],
      notes: '',
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Cascade</h1>
        <button className="add-project-btn" onClick={handleAddProject}>
          + New Project
        </button>
      </header>

      <main className="lanes-wrapper">
        {PHASES.map((phase) => {
          const phaseProjects = projects.filter((p) => p.phase === phase);
          return (
            <PhaseLane key={phase} phaseNumber={phase}>
              {phaseProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </PhaseLane>
          );
        })}
      </main>
    </div>
  )
}

export default App
