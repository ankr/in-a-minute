import type { Application } from 'express';
import request from 'supertest';
import { createApp } from '../app';
import { getConnection } from '../db';
import {
  createGuest,
  createProperty,
  createReservation,
} from '../../tests/fixtures';
import { PrismaClient } from '@prisma/client';

describe('/properties', () => {
  let app: Application;
  let db: PrismaClient;

  /**
   * Create an app once before all tests
   */
  beforeAll(() => {
    app = createApp();
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

  describe('GET /:id/guests', () => {
    test('should return a list of guest that has any reservations for given property', async () => {
      // Given
      const guest1 = await createGuest();
      const guest2 = await createGuest(); // Has no reservations
      const guest3 = await createGuest();
      const property = await createProperty();

      await createReservation(guest1.id, property.id);
      await createReservation(guest3.id, property.id);

      const r = await request(app).get(`/reservations`);

      // When
      const response = await request(app).get(
        `/properties/${property.id}/guests`
      );

      // Then
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: guest1.name,
          }),
        ])
      );

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: guest3.name,
          }),
        ])
      );

      expect(response.body).toEqual(
        // see `.not`
        expect.not.arrayContaining([
          expect.objectContaining({
            name: guest2.name,
          }),
        ])
      );
    });
  });
});
