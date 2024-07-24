import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const port = 3000;

const prisma = new PrismaClient();

app.get('/', async (req: Request, res: Response) => {
  await prisma.guest.create({
    data: {
      name: 'Alice',
      email: 'alice@wonderland.com',
    },
  });

  const guests = await prisma.guest.findMany();

  res.send(guests);
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
