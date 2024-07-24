import { Router } from 'express';

import { getAllMessages } from '../services/messages';

const router = Router();

router.get('/', async (req, res) => {
  const users = await getAllMessages();

  res.send(users);
});

export default router;
