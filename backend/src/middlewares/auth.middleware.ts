import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../routes/auth/helpers";
import { getUser } from "../db/user";
import { handleErrorAndRespond } from "../helpers/handleErrorAndResponde";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];

  if (!token) {
    return next();
  }

  try {
    const user = verifyToken(token);
    const userFromDb = await getUser(user.id);

    if (userFromDb) {
      req.user = userFromDb;
    }

    next();
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
}
