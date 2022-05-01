import { SortMode } from './enums';
import { Task } from './models';
import { GenerateIDType } from './types';

export const generateID: GenerateIDType = (): string => (
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
);

export const sortArrayBy = <T>(array: Array<T>, field: string, mode: SortMode): Array<T> => (
  [...array].sort((prev, next) => prev[field] > next[field] ? mode : mode * -1)
)

export const changeOrderTasks = (tasks: Array<Task>, fromItemID: string, toItemID: string): Array<Task> => {
  const fromIndex = tasks.findIndex((task) => task.id === fromItemID);
  const toIndex = tasks.findIndex((task) => task.id === toItemID);

  const updatedTasks = [...tasks];
  updatedTasks.splice(fromIndex, 1);
  updatedTasks.splice((fromIndex > toIndex) ? toIndex : toIndex, 0, tasks[fromIndex]);

  return updatedTasks;
};