import { GenerateIDType } from './types';

export const generateID: GenerateIDType = (): string => (
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
);
