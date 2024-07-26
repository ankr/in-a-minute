import { createGuest, createProperty } from '../../tests/fixtures';
import { PrismaClient } from '@prisma/client';
import { getConnection } from '../db';

describe('messages repository', () => {
  let db: PrismaClient;

  /**
   * Create an app once before all tests
   */
  beforeAll(() => {
    db = getConnection();
  });

  /**
   * Cleanup database after each test.
   *
   * Preferably use a transaction for this purpose
   */
  afterEach(async () => {
    await db.messages.deleteMany();
    await db.properties.deleteMany();
    await db.guests.deleteMany();
  });

  describe('getAllMessages', () => {
    it('returns a list of all messages', async () => {
      const owner = await createGuest();
      const guest1 = await createGuest();
      const property = await createProperty(owner);
    });
  });
});
