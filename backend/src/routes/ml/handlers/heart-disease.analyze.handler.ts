import { Request, Response } from "express";
import { handleErrorAndRespond } from "../../../helpers/handleErrorAndResponde";
import {downloadImage} from "../../../db/imageFile/downloadImage";
import {analyzeHeartDisease} from "../helpers/analyzeHeartDisease";
export async function heartDiseaseAnalyzeHandler(req: Request, res: Response) {

  const json = req.body;

  try {
    const imageAnalysis = await analyzeHeartDisease(json);
    res.status(200).json(imageAnalysis);

  } catch (error) {
    handleErrorAndRespond(error, res);
  }
}
