import { getAll } from '../repositories/properties';

export const getAllProperties = async () => {
  return getAll();
};
