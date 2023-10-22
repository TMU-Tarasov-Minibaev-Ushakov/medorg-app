import { Request, Response } from "express";
import { createUser } from "../../../../db/user/createUser";
import { generatePasswordHash } from "../../../../auth";
import { handleErrorAndRespond } from "../../../../helpers/handleErrorAndResponde";

export async function signUpHandler(req: Request, res: Response) {
  try {

    const createdUser = await createUser({
      email: req.body.email,
      passwordHash: generatePasswordHash(req.body.password)
    })
    
    res.status(200).json({
      createdUser
    }) 

  } catch (error) {
    handleErrorAndRespond(error, res);
  }
}