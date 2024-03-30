import { prisma } from "..";

export async function createPatient(patientId: number) {
  return prisma.patient.create({
    data: {
      userId: patientId,
    },
  });
}
