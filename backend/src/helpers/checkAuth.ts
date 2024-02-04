import { NextFunction, Request, Response } from "express";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user)
    return res.status(403).json({
      message: "User is not authenticated",
    });

  next();
}
