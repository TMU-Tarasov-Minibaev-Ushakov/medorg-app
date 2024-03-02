import {prisma} from "../index";

type GetAppointmentsByUserIdInput = {
    userId: number;
    fromDate?: Date;
    toDate?: Date;
};
export async function getAppointmentsByUserId({ userId, fromDate, toDate }: GetAppointmentsByUserIdInput) {
    return prisma.appointment.findMany({
        where: {
            patientId: userId,
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