import create from 'zustand';
import { ConfirmationModal } from '../models';
import { ConfirmationActionType } from '../types';

export const useConfirmationModalStore = create<ConfirmationModal>((set, get) => new ConfirmationModal({
  isShow: false,
  confirmActions: null,
  openModal: (confirmActions: ConfirmationActionType) => set({ confirmActions, isShow: true }),
  closeModal: () => set({ isShow: false })
}));