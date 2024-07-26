import { Guests, Properties } from '@prisma/client';
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
export const fetchAllReservations = () => {
  return db.reservations.findMany();
};

/**
 * Store a reservation in the database.
 */
export const storeReservation = (data: CreateReservationPayload) => {
  return db.reservations.create({ data });
};

/**
 * Fetch all reservations for a property.
 */
export const fetchAllReservationsForProperty = (propertyId: number) => {
  return db.reservations.findMany({
    where: {
      propertyId,
    },
  });
};

/**
 * Fetch all reservations for a guest.
 */
export const fetchAllReservationsForGuest = (guestId: number) => {
  return db.reservations.findMany({
    where: {
      guestId,
    },
  });
};
