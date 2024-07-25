import { fetchAllReservations } from '../repositories/reservations';

export const getAllReservations = async () => {
  return fetchAllReservations();
};
