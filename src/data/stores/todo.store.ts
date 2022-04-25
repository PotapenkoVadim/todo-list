import create from 'zustand';
import { StorageKeyEnum } from '../enums';
import updateLocalStorage from '../middlewares/update-local-storage';
import { Task, Todo } from '../models';
import { LocalStorageService } from '../services';

export const useTodoStore = create<Todo>(updateLocalStorage((set, get) => new Todo({
  tasks: [],
  createTask: (newTask: Task): void => {
    const { tasks } = get();
    const updatedTasks = [newTask].concat(tasks);

    set({ tasks: updatedTasks });
  },
  updateTask: (id: string, updatedTask: Task): void => {
    const { tasks } = get();
    const updatedTasks = tasks.map((task) => (
      task.id === id ? updatedTask : task
    ));

    set({ tasks: updatedTasks });
  },
  removeTask: (id: string): void => {
    const { tasks } = get();
    const updatedTasks = tasks.filter((tasks) => tasks.id !== id);

    set({ tasks: updatedTasks });
  },
  init: (): void => {
    const tasks = LocalStorageService.get<Array<Task>>(StorageKeyEnum.TASKS);

    if (tasks) {
      set({ tasks });
    }
  }
})));
