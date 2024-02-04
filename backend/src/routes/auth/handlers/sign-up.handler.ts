import {Request, Response} from "express";
import {createUserWithPatient} from "../../../db/user";
import {generatePasswordHash} from "../helpers";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {UserType} from "../../../db/user/types";

export async function signUpHandler(req: Request, res: Response) {
  try {
    console.log(req.body.email)
    const createdUser = await createUserWithPatient({
      email: req.body.email,
      passwordHash: generatePasswordHash(req.body.password),
      type: UserType.PATIENT
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
