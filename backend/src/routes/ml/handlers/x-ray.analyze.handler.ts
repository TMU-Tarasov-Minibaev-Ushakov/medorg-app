import { Request, Response } from "express";
import { handleErrorAndRespond } from "../../../helpers/handleErrorAndResponde";
import { analyzeXRayImageBuffer } from "../helpers/analyzeXRayImageBuffer";
import {downloadImage} from "../../../db/imageFile/downloadImage";

export async function xRayAnalyzeHandler(req: Request, res: Response) {

  const imageId = parseInt(req.params.id);
  const imageBuffer = await downloadImage({ id: imageId });

  try {
    const imageAnalysis = await analyzeXRayImageBuffer(imageBuffer);
    res.status(200).json(imageAnalysis);

  } catch (error) {
    handleErrorAndRespond(error, res);
  }
}
