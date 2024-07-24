import { Router } from 'express';

import { getAllGuests, signup } from '../services/guests';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { signupSchema } from '../schemas/guests';

const router = Router();

router.get('/', async (req, res) => {
  const users = await getAllGuests();

  res.send(users);
});

router.post('/signup', validateRequestBody(signupSchema), async (req, res) => {
  const { name, phone } = req.body;
  const result = await signup({ name, phone });

  res.send(result);
});

export default router;
