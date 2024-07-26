import {
  fetchAllReservations,
  fetchAllReservationsForGuest,
  fetchAllReservationsForProperty,
} from '../repositories/reservations';

export const getAllReservations = async () => {
  return fetchAllReservations();
};

export const getAllReservationsForProperty = async (propertyId: number) => {
  return fetchAllReservationsForProperty(propertyId);
};

export const getAllReservationsForGuest = async (guestId: number) => {
  return fetchAllReservationsForGuest(guestId);
};
