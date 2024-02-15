import { Request, Response } from "express";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {getUser} from "../../../db/user";

export const getUserHandler = async (req: Request, res: Response) => {
  try {
    console.log('Get user handler')
    const user = await getUser(Number.parseInt(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
};