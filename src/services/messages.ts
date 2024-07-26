import { Guest, Property } from '@prisma/client';
import {
  fetchAllMessages,
  fetchAllMessagesForGuest,
  storeMessage,
} from '../repositories/messages';

export const getAllMessages = async () => {
  return fetchAllMessages();
};

export const getAllMessagesForGuest = async (guestId: number) => {
  return fetchAllMessagesForGuest(guestId);
};

export const createMessage = async (
  guest: Guest,
  property: Property,
  message: string
) => {
  return storeMessage({ guest, property, message });
};
