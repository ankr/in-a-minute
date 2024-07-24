import { getAll } from '../repositories/messages';

export const getAllMessages = async () => {
  return getAll();
};
