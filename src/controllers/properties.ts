import { Router } from 'express';

import { getAllProperties } from '../services/properties';
import { getAllGuestsForProperty } from '../services/guests';
import { getAllReservationsForProperty } from '../services/reservations';

const router = Router();

/**
 * Route for fetching all properties.
 */
router.get('/', async (req, res) => {
  const users = await getAllProperties();

  res.status(200).send(users);
});

/**
 * Route for fetching all guests for a property.
 */
router.get('/:id/guests', async (req, res) => {
  const { id } = req.params;
  const result = await getAllGuestsForProperty(+id);

  res.status(200).send(result);
});

/**
 * Route for fetching all reservations for a property.
 */
router.get('/:id/reservations', async (req, res) => {
  const { id } = req.params;
  const result = await getAllReservationsForProperty(+id);

  res.status(200).send(result);
});

export default router;
