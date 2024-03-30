import { AppointmentStatus, CreateAppointmentInput } from "./types";
import { prisma } from "../index";

export async function createAppointment(input: CreateAppointmentInput) {
  const { date, hour, doctorId, patientId } = input;

  console.log("createAppointment", input);

  return prisma.appointment.create({
    data: {
      date: new Date(date).toISOString(),
      hour,
      status: AppointmentStatus.PLANNED,
      doctor: {
        connect: {
          id: doctorId,
        },
      },
      patient: {
        connect: {
          id: patientId,
        },
      },
    },
  });
}
