import { Request, Response } from "express";
import { handleErrorAndRespond } from "../../../helpers/handleErrorAndResponde";
import { analyzeXRayImageBuffer } from "../helpers/analyzeXRayImageBuffer";

export async function XRayAnalysisHandler(req: Request, res: Response) {
  if (!req.body.imageData) {
    res.status(400).json({
      error: {
        status: 400,
        message: 'No image data'
      }
    })
  }
  try {
    const imageData = Buffer.from(req.body.imageData, "base64");
    const imageAnalysis = await analyzeXRayImageBuffer(imageData);
    console.log(imageAnalysis);
    res.status(200).json(imageAnalysis);
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
}
