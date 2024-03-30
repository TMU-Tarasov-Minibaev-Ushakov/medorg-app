import { prisma } from "../index";
import { AppointmentStatus } from "./types";

export async function completeAppointment(appointmentId: number) {
  return prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      status: AppointmentStatus.COMPLETED,
    },
  });
}
