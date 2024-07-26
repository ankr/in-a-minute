import type { Application } from 'express';
import request from 'supertest';
import { createApp } from '../app';
import { getConnection } from '../db';
import {
  createGuest,
  createMessage,
  createProperty,
} from '../../tests/fixtures';
import { PrismaClient } from '@prisma/client';

describe('/guests', () => {
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
    await db.message.deleteMany();
    await db.property.deleteMany();
    await db.guest.deleteMany();
  });

  describe('GET /', () => {
    it('should return a list of all guests in database', async () => {
      // Given
      await createGuest();
      await createGuest();

      // When
      const response = await request(app).get('/guests');

      // Then
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe('POST /signup', () => {
    it('should create a new guest', async () => {
      // Given
      const guest = {
        name: 'John Doe',
        phone: '123 456 789',
      };

      // When
      const response = await request(app).post('/guests/signup').send(guest);

      // Then
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(guest);
    });
  });

  describe('GET /:id/messages', () => {
    describe('GET /messages', () => {
      it('should return a list of all messages in database', async () => {
        // Given
        const owner1 = await createGuest();
        const owner2 = await createGuest();

        const guest1 = await createGuest();
        const guest2 = await createGuest();
        const guest3 = await createGuest();

        const property1 = await createProperty(owner1);
        const property2 = await createProperty(owner1);
        const property3 = await createProperty(owner2);

        await createMessage(guest1, property1, 'Hello from 1 to 1!');
        await createMessage(guest2, property1, 'Hello from 2 to 1!');
        await createMessage(guest3, property1, 'Hello from 3 to 1!');

        await createMessage(guest1, property2, 'Hello from 1 to 2!');
        await createMessage(guest3, property2, 'Hello from 3 to 2!');

        await createMessage(guest1, property3, 'Hello from 1 to 3!');
        await createMessage(guest2, property3, 'Hello from 2 to 3!');
        await createMessage(guest3, property3, 'Hello from 3 to 3!');

        // When
        const response = await request(app).get(
          `/guests/${guest2.id}/messages`
        );

        // Then
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              message: 'Hello from 2 to 1!',
            }),
            expect.objectContaining({
              message: 'Hello from 2 to 3!',
            }),
          ])
        );
      });
    });
  });
});
