import { PrismaClient } from '@prisma/client';
import { getConnection } from '../db';
import {
  getReservationsForGuest,
  getReservationsForProperty,
  storeReservation,
} from './reservations';
import {
  createGuest,
  createProperty,
  createReservation,
} from '../../tests/fixtures';

describe('reservations repository', () => {
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
    // Clear relations first
    await db.reservations.deleteMany();

    // Else there could be a race condition here
    await Promise.all([db.guests.deleteMany(), db.properties.deleteMany()]);
  });

  describe('getReservationsForProperty', () => {
    it('should return a list of reservations for given property', async () => {
      // Given
      const guest1 = await createGuest();
      const guest2 = await createGuest();
      const guest3 = await createGuest();
      const property = await createProperty();

      await createReservation(guest1.id, property.id);
      await createReservation(guest3.id, property.id);

      // When
      const reservations = await getReservationsForProperty(property.id);

      // Then
      expect(reservations).toHaveLength(2);
      expect(reservations[0].propertyId).toBe(property.id);
      expect(reservations[0].guestId).toBe(guest1.id);
      expect(reservations[1].propertyId).toBe(property.id);
      expect(reservations[1].guestId).toBe(guest3.id);
    });
  });

  describe('getReservationsForGuest', () => {
    it('should return a list of reservations for given guest', async () => {
      // Given
      const guest = await createGuest();
      const property1 = await createProperty();
      const property2 = await createProperty();

      await createReservation(guest.id, property1.id);
      await createReservation(guest.id, property2.id);

      // When
      const reservations = await getReservationsForGuest(guest.id);

      // Then
      expect(reservations).toHaveLength(2);
      expect(reservations[0].guestId).toBe(guest.id);
      expect(reservations[0].propertyId).toBe(property1.id);
      expect(reservations[1].guestId).toBe(guest.id);
      expect(reservations[1].propertyId).toBe(property2.id);
    });
  }
});
