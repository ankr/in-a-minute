import { getConnection } from '../db';

const db = getConnection();

export const fetchAllReservations = async () => {
  return await db.reservations.findMany();
};
