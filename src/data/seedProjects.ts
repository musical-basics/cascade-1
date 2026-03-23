import type { Project } from '../types';

export const seedProjects: Project[] = [
  {
    id: 'seed-1',
    title: 'Auth Refactor',
    phase: 2,
    tasks: [
      { id: 'seed-1-t1', text: 'Migrate from sessions to JWT', completed: false },
      { id: 'seed-1-t2', text: 'Update middleware guards', completed: false },
      { id: 'seed-1-t3', text: 'Write integration tests', completed: false },
    ],
    notes: 'Need to coordinate with the API team on token format. Consider refresh token rotation.',
  },
  {
    id: 'seed-2',
    title: 'Landing Page Redesign',
    phase: 1,
    tasks: [
      { id: 'seed-2-t1', text: 'Design hero section mockup', completed: false },
      { id: 'seed-2-t2', text: 'Choose color palette', completed: false },
    ],
    notes: 'Look at competitor sites for inspiration. Focus on conversion rate.',
  },
  {
    id: 'seed-3',
    title: 'CI/CD Pipeline',
    phase: 4,
    tasks: [
      { id: 'seed-3-t1', text: 'Set up GitHub Actions workflow', completed: false },
      { id: 'seed-3-t2', text: 'Add Docker build step', completed: false },
      { id: 'seed-3-t3', text: 'Configure staging deploy', completed: false },
      { id: 'seed-3-t4', text: 'Add Slack notifications', completed: false },
    ],
    notes: 'Use matrix builds for Node 18 and 20. Cache node_modules between runs.',
  },
  {
    id: 'seed-4',
    title: 'API Rate Limiter',
    phase: 3,
    tasks: [
      { id: 'seed-4-t1', text: 'Implement sliding window algorithm', completed: false },
      { id: 'seed-4-t2', text: 'Add Redis backing store', completed: false },
    ],
    notes: 'Start with 100 req/min per API key. Need to expose headers for rate limit info.',
  },
  {
    id: 'seed-5',
    title: 'Mobile Responsive Pass',
    phase: 5,
    tasks: [
      { id: 'seed-5-t1', text: 'Audit all breakpoints', completed: false },
    ],
    notes: 'Priority: dashboard, settings, and profile pages.',
  },
];
