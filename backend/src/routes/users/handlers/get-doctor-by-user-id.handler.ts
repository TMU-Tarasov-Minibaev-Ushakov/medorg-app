import { Request, Response } from "express";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {getDoctorByUserId} from "../../../db/doctor/getDoctorByUserId";

export const getDoctorByUserIdHandler = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params['userId']);
    const doctor = await getDoctorByUserId(userId);
    res.status(200).json({
      doctor
    });
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
}