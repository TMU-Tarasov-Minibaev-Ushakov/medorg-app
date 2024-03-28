import {Request, Response} from "express";

import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {getImagesByUserId} from "../../../db/imageFile/getImagesByUserId";
import {ImageFileType} from "../../../types";

export async function mriMyImagesHandler(req: Request, res: Response) {
    try {
        const userId = req.user!.id;
        const images = await getImagesByUserId({ userId, type: ImageFileType.mri });
        const imagesInfo = images.map(({ id }) => ({
            id,
            url: `/ml/x-ray/images/${id}`
        }));
        res.json({ images: imagesInfo });
    }
    catch (error) {
        handleErrorAndRespond(error, res);
    }
}
