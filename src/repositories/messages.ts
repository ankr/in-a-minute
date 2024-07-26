import { getConnection } from '../db';

const db = getConnection();

export interface CreateMessagePayload {
  conversationId: number;
  guestId: number;
  message: string;
}

/**
 * Fetch all messages from the database.
 */
export const fetchAllMessages = async () => {
  return await db.messages.findMany();
};

/**
 * Fetch messages for a conversation.
 */
export const fetchMessagesForConversation = (conversationId: number) => {
  return db.messages.findMany({
    where: {
      conversationId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};

/**
 * Fetch messages for a guest.
 */
export const fetchMessagesForGuest = (guestId: number) => {
  return db.messages.findMany({
    where: {
      guestId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};

/**
 * Store a message in the database.
 */
export const storeMessage = (data: CreateMessagePayload) => {
  return db.messages.create({ data });
};
