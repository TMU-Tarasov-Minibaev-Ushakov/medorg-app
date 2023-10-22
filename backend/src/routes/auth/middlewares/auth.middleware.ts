import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../../auth";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  
  const token = req.headers['authorization'];

  if (!token) return next();

  req.user = verifyToken(token);
  next();

}