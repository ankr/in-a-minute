import { getConnection } from '../db';

const db = getConnection();

export const fetchAllMessages = async () => {
  return await db.messages.findMany();
};
