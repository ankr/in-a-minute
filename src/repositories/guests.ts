import { getConnection } from '../db';

const db = getConnection();

export interface CreateGuestPayload {
  name: string;
  phone: string;
}

/**
 * Fetch all guests from the database.
 */
export const fetchAllGuests = async () => {
  return await db.guests.findMany();
};

/**
 * Return all guests that has a reservations for a given property, inlcuding the reservations.
 */
export const fetchAllGuestsForProperty = (propertyId: number) => {
  return db.guests.findMany({
    where: {
      Reservations: {
        some: {
          Property: {
            id: propertyId,
          },
        },
      },
    },
    include: {
      Reservations: {
        where: {
          propertyId,
        },
      },
    },
  });
};

/**
 * Fetch all messages for a given guest.
 */
export const fetchAllMessagesForGuest = (guestId: number) => {
  return db.messages.findMany({
    where: {
      id: guestId,
    },
  });
};

/**
 * Store a guest in the database.
 */
export const storeGuest = (data: CreateGuestPayload) => {
  return db.guests.create({ data });
};
