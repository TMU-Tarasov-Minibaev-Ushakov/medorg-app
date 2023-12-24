import {Router} from "express";
import multer from 'multer';
import {xRayUploadHandler} from "./handlers/x-ray-upload.handler";
import {checkAuth} from "../../helpers/checkAuth";
import {xRayDownloadHandler} from "./handlers/x-ray-download.handler";
import {xRayMyImagesHandler} from "./handlers/x-ray-my-images.handler";
import {xRayAnalyzeHandler} from "./handlers/x-ray.analyze.handler";
import {xRayDeleteHandler} from "./handlers/x-ray-delete.handler";

const memStorage = multer.memoryStorage();
const upload = multer({storage: memStorage});
const fileUpload = upload.fields([{name: 'image', maxCount: 1}]);

const namespace = "/ml";
export const mlRouter = Router();

mlRouter.get(`${namespace}/x-ray/images/:id`, xRayDownloadHandler);
mlRouter.post(`${namespace}/x-ray/images`, checkAuth, fileUpload, xRayUploadHandler);
mlRouter.delete(`${namespace}/x-ray/images/:id`, checkAuth, xRayDeleteHandler);

mlRouter.get(`${namespace}/x-ray/my-images`, checkAuth, xRayMyImagesHandler);

mlRouter.get(`${namespace}/x-ray/analyze/:id`, checkAuth, xRayAnalyzeHandler);
