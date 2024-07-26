import {
  fetchAllReservations,
  fetchAllReservationsForProperty,
} from '../repositories/reservations';

export const getAllReservations = async () => {
  return fetchAllReservations();
};

export const getReservationsForProperty = async (propertyId: number) => {
  return fetchAllReservationsForProperty(propertyId);
};
