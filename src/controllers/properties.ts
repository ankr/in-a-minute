import { Router } from 'express';

import { getAllProperties } from '../services/properties';

const router = Router();

router.get('/', async (req, res) => {
  const users = await getAllProperties();

  res.send(users);
});

export default router;
