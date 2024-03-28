import { prisma } from "..";
import {UploadImageInput} from "./types";

export async function uploadImage({ buffer, userId, type }: UploadImageInput) {
    const createdImageFile = await prisma.imageFile.create({
        data: {
            binaryData: buffer,
            userId,
            type
        }
    });

    console.log(createdImageFile)

    return createdImageFile;
}