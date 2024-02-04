import {AppointmentStatus, CreateAppointmentInput} from "./types";
import {prisma} from "../index";

export async function createAppointment(input: CreateAppointmentInput) {
    const {date, hour, doctorId, patientId} = input;

    return prisma.appointment.create({
        data: {
            date,
            hour,
            status: AppointmentStatus.PLANNED,
            doctor: {
                connect: {
                    id: doctorId
                }
            },
            patient: {
                connect: {
                    id: patientId
                }
            }
        }
    });
}