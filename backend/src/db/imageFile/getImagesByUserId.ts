import {prisma} from "../index";
import {GetImagesByUserIdInput} from "./types";

export const getImagesByUserId = async ({ userId }: GetImagesByUserIdInput) => {
    return prisma.imageFile.findMany({
        where: {
            userId
        },
        select: {
            id: true,
        }
    });
}