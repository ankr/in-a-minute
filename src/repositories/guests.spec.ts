import {
  createGuest,
  createMessage,
  createProperty,
  createReservation,
} from '../../tests/fixtures';
import { fetchAllGuestsForProperty, fetchAllMessagesForGuest } from './guests';
import { getConnection } from '../db';
import { PrismaClient } from '@prisma/client';

describe('guests repository', () => {
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
    await db.reservations.deleteMany();
    await db.properties.deleteMany();
    await db.guests.deleteMany();
  });

  describe('fetchAllGuestsForProperty', () => {
    it('should return a list of guests that has any reservations for given property', async () => {
      // Given
      const owner = await createGuest();
      const guest1 = await createGuest();
      const guest2 = await createGuest(); // Has no reservations
      const guest3 = await createGuest();
      const property = await createProperty(owner.id);

      await createReservation(guest1.id, property.id);
      await createReservation(guest3.id, property.id);

      // When
      const guests = await fetchAllGuestsForProperty(property.id);

      // Then
      expect(guests).toHaveLength(2);
      expect(guests).toContainEqual(guest1);
      expect(guests).not.toContainEqual(guest2);
      expect(guests).toContainEqual(guest3);
    });
  });

  describe('fetchAllMessagesForGuest', () => {
    it('should return a list of messages for a given guest', async () => {
      // Given
      const guest = await createGuest();
      const message1 = await createMessage(guest.id);
      const message2 = await createMessage(guest.id);

      // When
      const messages = await fetchAllMessagesForGuest(guest.id);

      // Then
      expect(messages).toHaveLength(2);
      expect(messages).toContainEqual(message1);
      expect(messages).toContainEqual(message2);
    });
  });
});
