import { prisma } from "../index";

type GetAppointmentsByUserIdInput = {
  date: Date;
  hour: number;
  doctorId: number;
};
export async function findAppointment({
  date,
  hour,
  doctorId,
}: GetAppointmentsByUserIdInput) {
  console.log("findAppointment", date, hour, doctorId);
  return prisma.appointment.findFirst({
    where: {
      date: {
        gte: date.toISOString(),
        lte: date.toISOString(),
      },
      hour,
      doctorId,
    },
  });
}
