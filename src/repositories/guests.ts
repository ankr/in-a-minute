import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreatePayload {
  name: string;
  phone: string;
}

export const getAll = async () => {
  return await prisma.guests.findMany();
};

export const create = async ({ name, phone }: CreatePayload) => {
  return prisma.guests.create({
    data: {
      name,
      phone,
    },
  });
};
