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
  return db.property.findMany();
};

/**
 * Fetch a single property from the database.
 */
export const fetchProperty = (propertyId: number) => {
  return db.property.findFirst({ where: { id: propertyId } });
};

/**
 * Store a new property in the database.
 */
export const storeProperty = (data: CreatePropertyPayload) => {
  return db.property.create({ data });
};
