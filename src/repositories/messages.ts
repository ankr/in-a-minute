import type { Guests, Properties } from '@prisma/client';
import { getConnection } from '../db';

const db = getConnection();

export interface CreateMessagePayload {
  guest: Guests;
  property: Properties;
  message: string;
}

/**
 * Fetch all messages from the database.
 */
export const fetchAllMessages = () => {
  return db.messages.findMany();
};

/**
 * Fetch messages for a guest.
 */
export const fetchAllMessagesForGuest = (guestId: number) => {
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
export const storeMessage = ({
  guest,
  property,
  message,
}: CreateMessagePayload) => {
  return db.messages.create({
    data: {
      guestId: guest.id,
      propertyId: property.id,
      message: message,
    },
  });
};
