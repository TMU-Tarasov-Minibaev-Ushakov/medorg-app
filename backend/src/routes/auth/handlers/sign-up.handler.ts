import { Request, Response } from "express";
import { createUser } from "../../../db/user/createUser";
import { generatePasswordHash } from "../helpers";
import { handleErrorAndRespond } from "../../../helpers/handleErrorAndResponde";

export async function signUpHandler(req: Request, res: Response) {
  try {
    const createdUser = await createUser({
      email: req.body.email,
      passwordHash: generatePasswordHash(req.body.password),
    });

    res.status(200).json({
      createdUser: {
        id: createdUser.id,
        email: createdUser.email,
      },
    });
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
}
