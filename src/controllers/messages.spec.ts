import { PrismaClient } from '@prisma/client';
import { Application } from 'express';
import request from 'supertest';

import { createApp } from '../app';
import { getConnection } from '../db';
import { fetchAllMessages } from '../repositories/messages';
import { createGuest, createProperty } from '../../tests/fixtures';

describe('Messages Controller', () => {
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

  describe('messages controller', () => {
    describe('POST /messages/send', () => {
      test('should create a new message', async () => {
        // Given
        const owner = await createGuest();
        const guest = await createGuest();
        const property = await createProperty(owner);

        const message = {
          guestId: guest.id,
          propertyId: property.id,
          message: 'Hello, World!',
        };

        // When
        const response = await request(app)
          .post('/messages/send')
          .send(message);

        // Then
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('message', message.message);
        expect(response.body).toHaveProperty('guestId', guest.id);
        expect(response.body).toHaveProperty('propertyId', property.id);

        const messages = await fetchAllMessages();
        expect(messages).toHaveLength(1);
        expect(messages[0]).toMatchObject(message);
      });
    });
  });
});
