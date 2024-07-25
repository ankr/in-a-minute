import { Router } from 'express';

import { getAllProperties, getGuestsForProperty } from '../services/properties';

const router = Router();

router.get('/', async (req, res) => {
  const users = await getAllProperties();

  res.status(200).send(users);
});

router.get('/:id/guests', async (req, res) => {
  const { id } = req.params;
  const result = await getGuestsForProperty(+id);

  res.status(200).send(result);
});

export default router;
