import {prisma} from "../index";
import {GetImagesByUserIdInput} from "./types";

export const getImagesByUserId = async ({ userId, type }: GetImagesByUserIdInput) => {
    return prisma.imageFile.findMany({
        where: {
            userId,
            type
        },
        select: {
            id: true,
        }
    });
}