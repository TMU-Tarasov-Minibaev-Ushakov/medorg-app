import { Request, Response } from "express";
import {uploadImage} from "../../../db/imageFile/uploadImage";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";

export async function xRayUploadHandler(req: Request, res: Response) {
    // @ts-ignore - multer adds this property to the request
    const imageFile = req.files?.image[0] as Express.Multer.File;
    console.log(imageFile)
    try {
        const uploadedImage = await uploadImage({ buffer: imageFile.buffer, userId: req.user!.id });
        res.json({ message: 'File uploaded successfully' });
    }
    catch (error) {
        handleErrorAndRespond(error, res);
    }
}
