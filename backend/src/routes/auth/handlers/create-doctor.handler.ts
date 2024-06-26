import {Request, Response} from "express";
import {createUserWithDoctor} from "../../../db/user";
import {generatePasswordHash} from "../helpers";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";

export async function createDoctorHandler(req: Request, res: Response) {
  try {
    console.log(req.body.email)
    const createdUser = await createUserWithDoctor({
      email: req.body.email,
      name: req.body.name,
      passwordHash: generatePasswordHash(req.body.password)
    });

    res.status(200).json({
      createdUser: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    });
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
}
