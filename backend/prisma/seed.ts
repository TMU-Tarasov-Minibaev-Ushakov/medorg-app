import { PrismaClient } from '@prisma/client'
import { PermissionGroup, PermissionName } from '../src/constants'
const prisma = new PrismaClient()

async function main() {

  await prisma.permissionGroup.create({
    data: {
      name: PermissionGroup.admin,
      permissions: Object.values(PermissionName)
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