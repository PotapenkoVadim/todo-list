import { Task } from './Task';

export class UpdateTaskModal {
  public isShow: boolean;
  public task?: Task;
  public closeModal: () => void;
  public openModal: (task: Task) => void;

  constructor(model: Partial<UpdateTaskModal> = {}) {
    Object.assign(this, model);
  }
}