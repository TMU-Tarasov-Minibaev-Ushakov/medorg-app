import {prisma} from "..";

export async function createDoctor(userId: number) {

    return prisma.doctor.create({
        data: {
            userId
        }
    });
}