import {Request, Response} from "express";
import {createUserWithPatient} from "../../../db/user";
import {generatePasswordHash} from "../helpers";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {UserType} from "../../../db/user/types";

export async function signUpHandler(req: Request, res: Response) {
  try {
    const createdUser = await createUserWithPatient({
      email: req.body.email,
      name: req.body.name,
      passwordHash: generatePasswordHash(req.body.password)
    });

    res.status(200).json({
      createdUser: {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
      },
    });
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
}
