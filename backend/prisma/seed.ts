import { PrismaClient } from '@prisma/client'
import { PermissionGroup, PermissionName } from '../src/constants'
const prisma = new PrismaClient()

async function main() {
  await prisma.permission.createMany({
    data: Object.values(PermissionName).map(permissionName => ({
      name: permissionName
    }))
  })

  await prisma.permissionGroup.create({
    data: {
      name: PermissionGroup.admin,
      permissions: {
        connect: Object.values(PermissionName).map(permissionName => ({
          name: permissionName
        }))
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })