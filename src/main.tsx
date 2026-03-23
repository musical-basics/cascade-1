import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProjectsProvider } from './context/ProjectsContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectsProvider>
      <App />
    </ProjectsProvider>
  </StrictMode>,
)
