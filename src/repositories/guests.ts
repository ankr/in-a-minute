import { Guest } from '@prisma/client';
import { getConnection } from '../db';

const db = getConnection();

export type CreateGuestPayload = Pick<Guest, 'name' | 'phone'>;

/**
 * Fetch all guests from the database.
 */
export const fetchAllGuests = () => {
  return db.guest.findMany();
};

export const fetchGuest = (guestId: number) => {
  return db.guest.findFirst({ where: { id: guestId } });
};

/**
 * Return all guests that has a reservations for a given property, inlcuding the reservations.
 */
export const fetchAllGuestsForProperty = (propertyId: number) => {
  return db.guest.findMany({
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
 * Store a guest in the database.
 */
export const storeGuest = (data: CreateGuestPayload) => {
  return db.guest.create({ data });
};
