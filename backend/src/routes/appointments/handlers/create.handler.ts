import { Request, Response } from "express";
import { handleErrorAndRespond } from "../../../helpers/handleErrorAndResponde";
import {createAppointment} from "../../../db/appointment/createAppointment";

export async function createAppointmentHandler(req: Request, res: Response) {
    try {
        const patientId = req.body.patientId as number;
        const doctorId = req.body.doctorId as number;
        const dateString = req.body.date as string;
        const hour = req.body.hour as number;

        // create Date object from consts date and hour
        const date = new Date(dateString);
        date.setHours(hour, 0, 0, 0);

        // check if date is at least 2 hours in the future
        const now = new Date();
        if (date.getTime() < now.getTime() + 2 * 60 * 60 * 1000) {
            return res.status(400).json({
                message: "Appointment date must be at least 2 hours in the future"
            })
        }

        return await createAppointment({
            patientId,
            doctorId,
            date: dateString,
            hour
        })
    } catch (error) {
        handleErrorAndRespond(error, res);
    }
}
