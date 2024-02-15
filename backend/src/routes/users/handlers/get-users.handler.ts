import { Request, Response } from "express";
import {getUsers} from "../../../db/user";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";

export const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
};