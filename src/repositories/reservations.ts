import { getConnection } from '../db';

const db = getConnection();

export interface CreateReservationPayload {
  guestId: number;
  propertyId: number;
  checkIn: Date;
  checkOut: Date;
}

export const fetchAllReservations = async () => {
  return await db.reservations.findMany();
};

export const storeReservation = async (data: CreateReservationPayload) => {
  return await db.reservations.create({ data });
};

export const getReservationsForProperty = async (propertyId: number) => {
  return await db.reservations.findMany({
    where: {
      propertyId,
    },
  });
};

export const getReservationsForGuest = async (guestId: number) => {
  return await db.reservations.findMany({
    where: {
      guestId,
    },
  });
};
