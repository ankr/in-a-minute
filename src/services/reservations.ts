import { getAll } from '../repositories/reservations';

export const getAllReservations = async () => {
  return getAll();
};
