import { getConnection } from '../db';

const db = getConnection();

export interface CreateGuestPayload {
  name: string;
  phone: string;
}

/**
 * Fetch all guests from the database.
 */
export const fetchAllGuests = () => {
  return db.guest.findMany();
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
