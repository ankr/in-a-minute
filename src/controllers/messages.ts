import { Router } from 'express';

import { getAllMessages } from '../services/messages';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await getAllMessages();

  res.status(200).send(messages);
});

export default router;
