import { Request, Response } from "express";
import { handleErrorAndRespond } from "../../../helpers/handleErrorAndResponde";
import {cancelAppointment} from "../../../db/appointment/cancelAppointment";
import {getAppointmentsByUserId} from "../../../db/appointment/getAppointmentsByUserId";
export async function getMyAppointmentsHandler(req: Request, res: Response) {
    try {
        const userId = req.user!.id;

        let from = req.query.from;
        let to = req.query.to;

        if (Array.isArray(from)) {
            from = from[0];
        }
        if (Array.isArray(to)) {
            to = to[0];
        }
        from = from?.toString();
        to = to?.toString();

        const fromDate = from ? new Date(from) : undefined
        const toDate = to ? new Date(to) : undefined;

        const appointments = await getAppointmentsByUserId({ userId, fromDate, toDate });

        res.status(200).json({
            appointments
        });

    } catch (error) {
        handleErrorAndRespond(error, res);
    }
}
