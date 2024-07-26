import { getConnection } from '../db';

const db = getConnection();

export interface CreateReservationPayload {
  guestId: number;
  propertyId: number;
  checkIn: Date;
  checkOut: Date;
}

/**
 * Fetch all reservations from the database.
 */
export const fetchAllReservations = async () => {
  return await db.reservations.findMany();
};

/**
 * Store a reservation in the database.
 */
export const storeReservation = async (data: CreateReservationPayload) => {
  return await db.reservations.create({ data });
};

/**
 * Fetch all reservations for a property.
 */
export const getReservationsForProperty = async (propertyId: number) => {
  return await db.reservations.findMany({
    where: {
      propertyId,
    },
  });
};

/**
 * Fetch all reservations for a guest.
 */
export const getReservationsForGuest = async (guestId: number) => {
  return await db.reservations.findMany({
    where: {
      guestId,
    },
  });
};
