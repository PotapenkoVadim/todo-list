import create from 'zustand';
import { StorageKeyEnum } from '../enums';
import { Task, Todo } from '../models';
import { LocalStorageService } from '../services';

export const useTodoStore = create<Todo>((set, get) => new Todo({
  tasks: [],
  createTask: (newTask: Task): void => {
    const { tasks } = get();
    const updatedTasks = [newTask].concat(tasks);

    LocalStorageService.save(StorageKeyEnum.TASKS, updatedTasks);

    set({ tasks: updatedTasks });
  },
  updateTask: (id: string, updatedTask: Task): void => {
    const { tasks } = get();
    const updatedTasks = tasks.map((task) => (
      task.id === id ? updatedTask : task
    ));

    LocalStorageService.save(StorageKeyEnum.TASKS, updatedTasks);

    set({ tasks: updatedTasks });
  },
  removeTask: (id: string): void => {
    const { tasks } = get();
    const updatedTasks = tasks.filter((tasks) => tasks.id !== id);

    LocalStorageService.save(StorageKeyEnum.TASKS, updatedTasks);

    set({ tasks: updatedTasks });
  },
  init: (): void => {
    const tasks = LocalStorageService.get<Array<Task>>(StorageKeyEnum.TASKS);

    if (tasks) {
      set({ tasks });
    }
  }
}));
