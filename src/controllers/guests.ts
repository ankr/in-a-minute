import { Router } from 'express';

import { getAllGuests, createGuest } from '../services/guests';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { signupSchema } from '../schemas/guests';
import { getAllMessagesForGuest } from '../services/messages';
import { getAllReservationsForGuest } from '../services/reservations';

const router = Router();

/**
 * Route for fetching all guests.
 */
router.get('/', async (req, res) => {
  const guests = await getAllGuests();

  res.status(200).send(guests);
});

/**
 * Route for creating a new guest.
 */
router.post('/signup', validateRequestBody(signupSchema), async (req, res) => {
  const { name, phone } = req.body;
  const result = await createGuest({ name, phone });

  res.status(201).send(result);
});

/**
 * Route for fetching all reservations for a guest.
 */
router.get('/:id/reservations', async (req, res) => {
  const { id: guestId } = req.params;
  const reservations = await getAllReservationsForGuest(+guestId);

  res.status(200).send(reservations);
});

/**
 * Route for fetching all messages for a guest.
 */
router.get('/:id/messages', async (req, res) => {
  const { id: guestId } = req.params;
  const messages = await getAllMessagesForGuest(+guestId);

  res.status(200).send(messages);
});

export default router;
