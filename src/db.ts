import { PrismaClient } from '@prisma/client';

export const getConnection = (() => {
  let prisma: PrismaClient;

  return () => {
    if (prisma) {
      return prisma;
    }

    prisma = new PrismaClient();

    return prisma;
  };
})();
