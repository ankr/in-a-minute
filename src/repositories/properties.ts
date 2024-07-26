import { getConnection } from '../db';

const db = getConnection();

export interface CreatePropertyPayload {
  ownerId: number;
  name: string;
}

/**
 * Fetch all properties from the database.
 */
export const fetchAllProperties = async () => {
  return await db.properties.findMany();
};

/**
 * Store a new property in the database.
 */
export const storeProperty = async (data: CreatePropertyPayload) => {
  return await db.properties.create({ data });
};
