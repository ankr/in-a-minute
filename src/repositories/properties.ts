import { getConnection } from '../db';

const db = getConnection();

export interface CreatePropertyPayload {
  name: string;
}

export const fetchAllProperties = async () => {
  return await db.properties.findMany();
};

export const storeProperty = async (data: CreatePropertyPayload) => {
  return await db.properties.create({ data });
};
