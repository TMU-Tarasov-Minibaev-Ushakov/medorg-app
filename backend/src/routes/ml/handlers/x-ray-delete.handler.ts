import { Request, Response } from "express";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {deleteImage} from "../../../db/imageFile/deleteImage";

export async function xRayDeleteHandler(req: Request, res: Response) {
    const imageId = parseInt(req.params.id);
    try {
        const deletedImage = await deleteImage({ imageId });
        res.json({ message: 'File deleted successfully', deletedImage});
    }
    catch (error) {
        handleErrorAndRespond(error, res);
    }
}
