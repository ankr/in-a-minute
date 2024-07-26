import type { Guest, Property } from '@prisma/client';
import { getConnection } from '../db';

const db = getConnection();

export interface CreateMessagePayload {
  guest: Guest;
  property: Property;
  message: string;
}

/**
 * Fetch all messages from the database.
 */
export const fetchAllMessages = () => {
  return db.message.findMany();
};

/**
 * Fetch messages for a guest.
 */
export const fetchAllMessagesForGuest = (guestId: number) => {
  return db.message.findMany({
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
  return db.message.create({
    data: {
      guestId: guest.id,
      propertyId: property.id,
      message: message,
    },
  });
};
