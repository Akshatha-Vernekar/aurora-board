export const initialData = {
  columns: {
    todo: {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      taskIds: ['task-3'],
    },
    done: {
      id: 'done',
      title: 'Done',
      taskIds: ['task-4'],
    },
  },
  columnOrder: ['todo', 'inProgress', 'done'],
  tasks: {
    'task-1': { id: 'task-1', content: 'Design the glass card component' },
    'task-2': { id: 'task-2', content: 'Set up dnd-kit sensors' },
    'task-3': { id: 'task-3', content: 'Build the aurora background' },
    'task-4': { id: 'task-4', content: 'Install Tailwind + Vite' },
  },
}