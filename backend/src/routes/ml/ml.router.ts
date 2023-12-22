import { Router } from "express";
import { XRayAnalysisHandler } from "./handlers/XRayAnalysis.handler";

const namespace = "/ml";
export const mlRouter = Router();

mlRouter.post(`${namespace}/x-ray-analysis`, XRayAnalysisHandler);
