import { Request, Response } from "express";
import { handleErrorAndRespond } from "../../../helpers/handleErrorAndResponde";
import {cancelAppointment} from "../../../db/appointment/cancelAppointment";

export async function cancelAppointmentHandler(req: Request, res: Response) {
    try {
        const appointmentId = req.params.id;

        // check if appointmentid is a number
        if (isNaN(parseInt(appointmentId))) {
            return res.status(400).json({
                message: "Appointment id must be a number"
            })
        }

        await cancelAppointment(parseInt(appointmentId));

        res.status(200).json({
            message: "Appointment cancelled"
        });
    } catch (error) {
        handleErrorAndRespond(error, res);
    }
}
