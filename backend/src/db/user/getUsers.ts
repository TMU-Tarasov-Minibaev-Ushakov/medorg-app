import { prisma } from "..";

export async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      permissionGroups: {
        include: {
          permissions: true
        }
      },
      permissions: true
    }
  });
  return users;
}