import { prisma } from "../index";

type GetAppointmentsByDoctorIdInput = {
  doctorId: number;
  fromDate?: Date;
  toDate?: Date;
};
export async function getAppointmentsByDoctorId({
  doctorId,
  fromDate,
  toDate,
}: GetAppointmentsByDoctorIdInput) {
  return prisma.appointment.findMany({
    where: {
      doctorId,
      date: {
        gte: fromDate?.toISOString(),
        lte: toDate?.toISOString(),
      },
    },
    include: {
      doctor: {
        include: {
          user: true,
        },
      },
      patient: {
        include: {
          user: true,
        },
      },
    },
  });
}
