import {
  fetchAllMessages,
  fetchAllMessagesForGuest,
} from '../repositories/messages';

export const getAllMessages = async () => {
  return fetchAllMessages();
};

export const getAllMessagesForGuest = async (guestId: number) => {
  return fetchAllMessagesForGuest(guestId);
};
