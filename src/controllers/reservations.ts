import { Router } from 'express';

import { getAllReservations } from '../services/reservations';

const router = Router();

router.get('/', async (req, res) => {
  const reservations = await getAllReservations();

  res.status(200).send(reservations);
});

export default router;
