import create from 'zustand';
import { SortMode, StorageKeyEnum } from '../enums';
import { changeOrderTasks, sortArrayBy } from '../helpers';
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
  },
  sortTasks: (field: string, mode: SortMode): void => {
    const { tasks } = get();
    const sortedTasks = sortArrayBy(tasks, field, mode);

    set({ tasks: sortedTasks });
  },
  dropTask: (fromTaskID: string, toTaskID: string): void => {
    const { tasks } = get();
    const changedTask = changeOrderTasks(tasks, fromTaskID, toTaskID);

    set({ tasks: changedTask });
  },
  toggleCompleteTasks: (isComplete: boolean): void => {
    const { tasks } = get();
    const completedTasks = tasks.map((tasks) => Object.assign(tasks, { isComplete }));

    set({ tasks: completedTasks });
  }
})));
