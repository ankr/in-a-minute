import {
  createGuest,
  createMessage,
  createProperty,
  createReservation,
} from '../../tests/fixtures';
import { fetchAllGuestsForProperty } from './guests';
import { getConnection } from '../db';
import { PrismaClient } from '@prisma/client';
import { fetchAllMessagesForGuest } from './messages';

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
    await db.messages.deleteMany();
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
      const guestIds = guests.map((guest) => guest.id);
      expect(guestIds).toHaveLength(2);
      expect(guestIds).toContain(guest1.id);
      expect(guestIds).toContain(guest3.id);
      expect(guestIds).not.toContain(guest2.id);
    });
  });

  describe('fetchAllMessagesForGuest', () => {
    it('should return a list of messages for a given guest', async () => {
      // Given
      const owner = await createGuest();
      const guest = await createGuest();
      const property = await createProperty(owner.id);
      const message1 = await createMessage(guest, property, 'Hello world!');
      const message2 = await createMessage(guest, property, 'Hello again!');

      // When
      const messages = await fetchAllMessagesForGuest(guest.id);

      // Then
      expect(messages).toHaveLength(2);
      expect(messages).toHaveLength(2);
      expect(messages).toContainEqual(message1);
      expect(messages).toContainEqual(message2);
    });
  });
});
