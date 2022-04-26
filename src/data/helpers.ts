import { SortMode } from './enums';
import { GenerateIDType } from './types';

export const generateID: GenerateIDType = (): string => (
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
);

export const sortArrayBy = <T>(array: Array<T>, field: string, mode: SortMode): Array<T> => (
  [...array].sort((prev, next) => prev[field] > next[field] ? mode : mode * -1)
)