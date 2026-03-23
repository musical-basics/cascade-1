import { useProjects } from './context/ProjectsContext'
import { PhaseLane } from './components/PhaseLane/PhaseLane'
import { ProjectCard } from './components/ProjectCard/ProjectCard'
import './App.css'

const PHASES = [1, 2, 3, 4, 5] as const;

function App() {
  const { projects } = useProjects();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Cascade</h1>
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
