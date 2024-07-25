import { Router } from 'express';

import { getAllProperties, getGuestsForProperty } from '../services/properties';

const router = Router();

router.get('/', async (req, res) => {
  const users = await getAllProperties();

  res.send(users);
});

router.get('/:id/guests', async (req, res) => {
  res.send('get guests');
});

export default router;
