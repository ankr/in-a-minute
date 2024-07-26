import { getConnection } from '../db';

const db = getConnection();

export interface CreatePropertyPayload {
  ownerId: number;
  name: string;
}

/**
 * Fetch all properties from the database.
 */
export const fetchAllProperties = () => {
  return db.properties.findMany();
};

/**
 * Store a new property in the database.
 */
export const storeProperty = (data: CreatePropertyPayload) => {
  return db.properties.create({ data });
};
