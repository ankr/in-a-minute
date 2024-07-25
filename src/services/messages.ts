import { fetchAllMessages } from '../repositories/messages';

export const getAllMessages = async () => {
  return fetchAllMessages();
};
