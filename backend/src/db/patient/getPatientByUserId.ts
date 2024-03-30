import { prisma } from "..";

export async function getPatientByUserId(userId: number) {
  return prisma.patient.findUnique({
    where: {
      userId,
    },
  });
}
