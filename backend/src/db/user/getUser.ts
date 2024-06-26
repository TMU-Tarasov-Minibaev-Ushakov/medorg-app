import { prisma } from "..";

export const getUser = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      permissionGroups: {
        select: {
          name: true,
          permissions: true,
        },
      },
    },
  });
};
