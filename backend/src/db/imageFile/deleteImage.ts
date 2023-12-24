import {prisma} from "..";
import {DeleteImageInput} from "./types";

export async function deleteImage({ imageId }: DeleteImageInput) {

    return prisma.imageFile.delete({
        where: {
            id: imageId
        }
    });
}