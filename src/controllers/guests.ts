import { Router } from 'express';

import { getAllGuests, signupGuest } from '../services/guests';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { signupSchema } from '../schemas/guests';

const router = Router();

router.get('/', async (req, res) => {
  const users = await getAllGuests();

  res.send(users);
});

router.post('/signup', validateRequestBody(signupSchema), async (req, res) => {
  const { name, phone } = req.body;
  const result = await signupGuest({ name, phone });

  res.status(201).send(result);
});

export default router;
