import { Guest, Property } from '@prisma/client';
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
  return db.reservation.findMany();
};

/**
 * Store a reservation in the database.
 */
export const storeReservation = (data: CreateReservationPayload) => {
  return db.reservation.create({ data });
};

/**
 * Fetch all reservations for a property.
 */
export const fetchAllReservationsForProperty = (propertyId: number) => {
  return db.reservation.findMany({
    where: {
      propertyId,
    },
  });
};

/**
 * Fetch all reservations for a guest.
 */
export const fetchAllReservationsForGuest = (guestId: number) => {
  return db.reservation.findMany({
    where: {
      guestId,
    },
  });
};
