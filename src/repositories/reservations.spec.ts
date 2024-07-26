import { PrismaClient } from '@prisma/client';
import { getConnection } from '../db';
import {
  fetchAllReservationsForGuest,
  fetchAllReservationsForProperty,
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
    await db.reservations.deleteMany();
    await db.properties.deleteMany();
    await db.guests.deleteMany();
  });

  describe('fetchAllReservationsForProperty', () => {
    it('should return a list of reservations for given property', async () => {
      // Given
      const owner = await createGuest();
      const guest1 = await createGuest();
      const guest2 = await createGuest();
      const guest3 = await createGuest();
      const property = await createProperty(owner);

      await createReservation(guest1, property);
      await createReservation(guest3, property);

      // When
      const reservations = await fetchAllReservationsForProperty(property.id);

      // Then
      expect(reservations).toHaveLength(2);
      expect(reservations[0].propertyId).toBe(property.id);
      expect(reservations[0].guestId).toBe(guest1.id);
      expect(reservations[1].propertyId).toBe(property.id);
      expect(reservations[1].guestId).toBe(guest3.id);
    });
  });

  describe('fetchAllReservationsForGuest', () => {
    it('should return a list of reservations for given guest', async () => {
      // Given
      const owner = await createGuest();
      const guest = await createGuest();
      const property1 = await createProperty(owner);
      const property2 = await createProperty(owner);

      await createReservation(guest, property1);
      await createReservation(guest, property2);

      // When
      const reservations = await fetchAllReservationsForGuest(guest.id);

      // Then
      expect(reservations).toHaveLength(2);
      expect(reservations[0].guestId).toBe(guest.id);
      expect(reservations[0].propertyId).toBe(property1.id);
      expect(reservations[1].guestId).toBe(guest.id);
      expect(reservations[1].propertyId).toBe(property2.id);
    });
  });

  it('should return an empty list if no reservations found', async () => {
    // Given
    const guest = await createGuest();

    // When
    const reservations = await fetchAllReservationsForGuest(guest.id);

    // Then
    expect(reservations).toHaveLength(0);
  });

  it('should return an empty list if no reservations found for property', async () => {
    // Given
    const owner = await createGuest();
    const property = await createProperty(owner);

    // When
    const reservations = await fetchAllReservationsForProperty(property.id);

    // Then
    expect(reservations).toHaveLength(0);
  });
});
