import type { Application } from 'express';
import request from 'supertest';
import { createApp } from '../app';
import { getConnection } from '../db';
import { createGuest } from '../../tests/fixtures';

describe('/guests', () => {
  let app: Application;
  let db = getConnection();

  /**
   * Create an app once before all tests
   */
  beforeAll(() => {
    app = createApp();
  });

  /**
   * Cleanup database after each test.
   *
   * Preferably use a transaction for this purpose
   */
  afterEach(async () => {
    await Promise.all([db.guests.deleteMany()]);
  });

  // Making sure the wiring is correct
  test('make sure app is initialized', () => {
    expect(app).toBeDefined();
  });

  describe('GET /', () => {
    test('should return a list of all guests in database', async () => {
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
    test('should create a new guest', async () => {
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
});
