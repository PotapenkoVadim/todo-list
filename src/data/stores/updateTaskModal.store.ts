import create from 'zustand';
import { Task, UpdateTaskModal } from '../models';

export const useUpdateTaskModalStore = create<UpdateTaskModal>((set, get) => new UpdateTaskModal({
  isShow: false,
  task: null,
  openModal: (task: Task) => set({ task, isShow: true }),
  closeModal: () => set({ task: null, isShow: false })
}));