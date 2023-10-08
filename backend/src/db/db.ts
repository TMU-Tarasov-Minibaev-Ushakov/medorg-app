import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

export const getUsers = () => {
  return prisma.user.findMany();
}

export const getUser = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id
    }
  });
}