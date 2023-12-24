import { prisma } from "..";
import {UploadImageInput} from "./types";

export async function uploadImage({ buffer, userId }: UploadImageInput) {

    const createdImageFile = await prisma.imageFile.create({
        data: {
            binaryData: buffer,
            userId
        }
    });

    console.log(createdImageFile)

    return createdImageFile;
}