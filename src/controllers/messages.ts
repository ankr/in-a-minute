import { Router } from 'express';

import { createMessage, getAllMessages } from '../services/messages';
import { getGuest } from '../services/guests';
import { getProperty } from '../services/properties';
import { Guest, Property } from '@prisma/client';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await getAllMessages();

  res.status(200).send(messages);
});

router.post('/send', async (req, res) => {
  const { guestId, propertyId, message } = req.body;

  // Casting using `as` keyword since I don't have time for error handling
  const guest = (await getGuest(guestId)) as Guest;
  const property = (await getProperty(propertyId)) as Property;
  const result = await createMessage(guest, property, message);

  res.status(201).send(result);
});

export default router;
