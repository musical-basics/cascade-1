export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  phase: number; // 1–5
  tasks: Task[];
  notes: string;
}
