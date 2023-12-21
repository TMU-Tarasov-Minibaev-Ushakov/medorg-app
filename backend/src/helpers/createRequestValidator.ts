import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { handleErrorAndRespond } from "./handleErrorAndResponde";

export const createRequestValidator = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      handleErrorAndRespond(error, res)
    }
};