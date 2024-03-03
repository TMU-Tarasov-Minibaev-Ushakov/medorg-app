import { Request, Response } from "express";
import { handleErrorAndRespond } from "../../../helpers/handleErrorAndResponde";
import {getAppointmentsByDoctorId} from "../../../db/appointment/getAppointmentsByDoctorId";
export async function getDoctorsAppointmentsHandler(req: Request, res: Response) {
    try {

        let doctorId = req.query.doctorId;
        let from = req.query.from;
        let to = req.query.to;

        if (Array.isArray(doctorId)) {
            doctorId = doctorId[0];
        }
        if (Array.isArray(from)) {
            from = from[0];
        }
        if (Array.isArray(to)) {
            to = to[0];
        }

        from = from?.toString();
        to = to?.toString();
        doctorId = doctorId?.toString();

        if (!doctorId) {
            return res.status(400).json({
                message: "Doctor id is required"
            })
        }

        if (isNaN(parseInt(doctorId))) {
            return res.status(400).json({
                message: "Doctor id must be a number"
            })
        }

        const fromDate = from ? new Date(from) : undefined
        const toDate = to ? new Date(to) : undefined;

        const appointments = await getAppointmentsByDoctorId({ doctorId: parseInt(doctorId), fromDate, toDate });

        res.status(200).json({
            appointments
        });

    } catch (error) {
        handleErrorAndRespond(error, res);
    }
}
