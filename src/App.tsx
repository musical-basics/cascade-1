import { useProjects } from './context/ProjectsContext'
import { PhaseLane } from './components/PhaseLane/PhaseLane'
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
                <div
                  key={project.id}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-card)',
                    padding: '16px',
                    minWidth: '280px',
                    flexShrink: 0,
                  }}
                >
                  <strong>{project.title}</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {project.tasks.length} task{project.tasks.length !== 1 ? 's' : ''}
                  </p>
                </div>
              ))}
            </PhaseLane>
          );
        })}
      </main>
    </div>
  )
}

export default App
