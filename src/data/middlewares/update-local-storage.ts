import { StateCreator, State, SetState, GetState, StoreApi } from 'zustand';
import { StorageKeyEnum } from '../enums';
import { LocalStorageService } from '../services';

export default function updateLocalStorage<T extends State>(config): StateCreator<T> {
  return (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) => {
    return config((args) => {
      LocalStorageService.save(StorageKeyEnum.TASKS, args.tasks);

      set(args);
    }, get, api);
  }
}