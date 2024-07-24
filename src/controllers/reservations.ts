import { Router } from 'express';

import { getAllReservations } from '../services/reservations';

const router = Router();

router.get('/', async (req, res) => {
  const users = await getAllReservations();

  res.send(users);
});

export default router;
