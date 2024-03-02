import {prisma} from "../index";

type GetAppointmentsByUserIdInput = {
    patientId: number;
    fromDate?: Date;
    toDate?: Date;
};
export async function getAppointmentsByUserId({ patientId, fromDate, toDate }: GetAppointmentsByUserIdInput) {
    return prisma.appointment.findMany({
        where: {
            patientId,
            date: {
                gte: fromDate?.toISOString(),
                lte: toDate?.toISOString()
            }
        },
        include: {
            doctor: {
                include: {
                    user: true
                }
            }
        }
    });
}