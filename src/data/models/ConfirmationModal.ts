import { ConfirmationActionType } from '../types';

export class ConfirmationModal {
  public isShow: boolean;
  public confirmActions: ConfirmationActionType;
  public openModal: (confirmActions: ConfirmationActionType) => void;
  public closeModal: () => void;

  constructor(model: Partial<ConfirmationModal> = {} ) {
    Object.assign(this, model);
  }
}