export class Task {
  public id: string;
  public title: string;
  public createdAt: number;
  public isComplete: boolean;

  constructor(model: Partial<Task> = {}) {
    Object.assign(this, model);
  }
}
