import { getConnection } from '../db';

const db = getConnection();

export const fetchAllProperties = async () => {
  return await db.properties.findMany();
};
