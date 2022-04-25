import { Task } from './Task';

export class Todo {
  public tasks: Array<Task>;
  public createTask: (newTask: Task) => void;
  public updateTask: (id: string, updatedTask: Task) => void;
  public removeTask: (id: string) => void;
  public init: () => void;

  constructor(model: Partial<Todo> = {}) {
    Object.assign(this, model);
  }
}