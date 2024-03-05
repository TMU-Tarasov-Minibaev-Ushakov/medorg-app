import { Request, Response } from "express";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {getDoctors} from "../../../db/doctor/getDoctors";

export const getDoctorsHandler = async (req: Request, res: Response) => {
  try {
    const doctors = await getDoctors();
    res.status(200).json({
      doctors
    });
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
}