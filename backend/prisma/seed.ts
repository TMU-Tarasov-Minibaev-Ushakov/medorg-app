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

  await prisma.permissionGroup.create({
    data: {
      name: PermissionGroup.doctor,
      permissions: [
        PermissionName.viewDoctorsAppointments,
        PermissionName.editAppointments,
        PermissionName.useXrayAnalysis
      ]
    }
  });

  await prisma.permissionGroup.create({
    data: {
      name: PermissionGroup.patient,
      permissions: [
        PermissionName.viewAppointments,
        PermissionName.editAppointments
      ]
    }
  });
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