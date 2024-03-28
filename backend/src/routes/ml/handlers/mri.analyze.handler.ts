import { Request, Response } from "express";
import { handleErrorAndRespond } from "../../../helpers/handleErrorAndResponde";
import {downloadImage} from "../../../db/imageFile/downloadImage";
import {analyzeMRIImageBuffer} from "../helpers/analyzeMRIImageBuffer";

export async function mriAnalyzeHandler(req: Request, res: Response) {

  const imageId = parseInt(req.params.id);
  const imageBuffer = await downloadImage({ id: imageId });

  try {
    const imageAnalysis = await analyzeMRIImageBuffer(imageBuffer);
    res.status(200).json(imageAnalysis);

  } catch (error) {
    handleErrorAndRespond(error, res);
  }
}
