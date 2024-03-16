import { Request, Response } from "express";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {getUser} from "../../../db/user";

export const getMyUserInfoHandler = async (req: Request, res: Response) => {
  try {
    console.log('Get my user handler')

    const user = await getUser(req.user!.id);
    if (!user) return res.status(404);
    res.status(200).json({
      id: user.id,
      email: user.email,
      type: user.type
    });
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
};