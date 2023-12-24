import { Request, Response } from "express";
import {uploadImage} from "../../../db/imageFile/uploadImage";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {downloadImage} from "../../../db/imageFile/downloadImage";

export async function xRayDownloadHandler(req: Request, res: Response) {
    const fileId = req.params.id;
    try {
        const imageBuffer = await downloadImage({ id: parseInt(fileId) });
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
    }
    catch (error) {
        handleErrorAndRespond(error, res);
    }
}
