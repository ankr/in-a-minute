import { Router } from 'express';

import { getAllProperties } from '../services/properties';
import { getAllGuestsForProperty } from '../services/guests';
import { getAllReservationsForProperty } from '../services/reservations';

const router = Router();

router.get('/', async (req, res) => {
  const users = await getAllProperties();

  res.status(200).send(users);
});

router.get('/:id/guests', async (req, res) => {
  const { id } = req.params;
  const result = await getAllGuestsForProperty(+id);

  res.status(200).send(result);
});

router.get('/:id/reservations', async (req, res) => {
  const { id } = req.params;
  const result = await getAllReservationsForProperty(+id);

  res.status(200).send(result);
});

export default router;
