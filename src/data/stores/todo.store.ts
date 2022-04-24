import create from 'zustand';
import { Task, Todo } from '../models';

export const useTodoStore = create<Todo>((set, get) => new Todo({
  tasks: [],
  createTask: (newTask: Task): void => {
    const { tasks } = get();

    set({ tasks: [newTask].concat(tasks) });
  },
  updateTask: (id: string, updatedTask: Task): void => {
    const { tasks } = get();

    set({ tasks: tasks.map((task) => (
      task.id === id ? updatedTask : task
    ))});
  },
  removeTask: (id: string): void => {
    const { tasks } = get();

    set({ tasks: tasks.filter((tasks) => tasks.id !== id) });
  },
}));
