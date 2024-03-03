import { Request, Response } from "express";
import { handleErrorAndRespond } from "../../../helpers/handleErrorAndResponde";
import {createAppointment} from "../../../db/appointment/createAppointment";
import {findAppointment} from "../../../db/appointment/findAppointment";
import {getPatientByUserId} from "../../../db/patient/getPatientByUserId";

export async function createAppointmentHandler(req: Request, res: Response) {
    try {
        const userId = req.user!.id;
        const doctorId = parseInt(req.body.doctorId);
        const dateString = req.body.date as string;
        const hour = parseInt(req.body.hour);

        // create Date object from consts date and hour
        const date = new Date(dateString);
        date.setHours(hour, 0, 0, 0);

        // check if date is at least 2 hours in the future
        const now = new Date();
        if (date.getTime() < now.getTime() + 2 * 60 * 60 * 1000) {
            return res.status(400).json({
                error: {
                    status: 400,
                    message: "Appointment date must be at least 2 hours in the future"
                }
            })
        }

        // check if appointment with the same date and hour already exists
        const appointment = await findAppointment({ date: new Date(dateString), hour, doctorId });
        console.log('appointment', appointment)
        if (appointment) {
            return res.status(400).json({
                error: {
                    status: 400,
                    message: "Appointment with the same date and hour already exists"
                }
            })
        }

        const patient = await getPatientByUserId(userId);

        if (!patient) {
            return res.status(400).json({
                error: {
                    status: 400,
                    message: "User is not a patient"
                }
            });
        }

        const createdAppointment = await createAppointment({
            patientId: patient.id,
            doctorId,
            date: dateString,
            hour
        })
        console.log('createdAppointment', createdAppointment)

        res.status(200).json({
            createdAppointment
        });
    } catch (error) {
        handleErrorAndRespond(error, res);
    }
}
