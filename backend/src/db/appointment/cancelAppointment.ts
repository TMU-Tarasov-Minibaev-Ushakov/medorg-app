import {prisma} from "../index";
import {AppointmentStatus} from "./types";

export async function cancelAppointment(appointmentId: number) {
    return prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status: AppointmentStatus.CANCELLED
        }
    });
}