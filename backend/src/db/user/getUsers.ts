import {prisma} from "..";

export async function getUsers() {
  return prisma.user.findMany({
    include: {
      permissionGroups: true,
    }
  });
}