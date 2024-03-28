import {Request, Response} from "express";
import {uploadImage} from "../../../db/imageFile/uploadImage";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {ImageFileType} from "../../../types";

export async function mriUploadHandler(req: Request, res: Response) {
    // @ts-ignore - multer adds this property to the request
    const imageFile = req.files?.image[0] as Express.Multer.File;
    try {
        const uploadedImage = await uploadImage({ buffer: imageFile.buffer, userId: req.user!.id, type: ImageFileType.mri });
        res.json({ message: 'File uploaded successfully' });
    }
    catch (error) {
        handleErrorAndRespond(error, res);
    }
}
