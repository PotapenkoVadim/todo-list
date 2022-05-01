import { SortMode } from '../enums';
import { Task } from './Task';

export class Todo {
  public tasks: Array<Task>;
  public createTask: (newTask: Task) => void;
  public updateTask: (id: string, updatedTask: Task) => void;
  public removeTask: (id: string) => void;
  public sortTasks: (field: string, mode: SortMode) => void;
  public dropTask: (fromTaskID: string, toTaskID: string) => void;
  public toggleCompleteTasks: (isComplete: boolean) => void;
  public deleteTasks: () => void;
  public init: () => void;

  constructor(model: Partial<Todo> = {}) {
    Object.assign(this, model);
  }
}