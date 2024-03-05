import { Router } from "express";
import { createRequestValidator } from "../../helpers/createRequestValidator";
import { checkAuth } from "../../helpers/checkAuth";
import {createAppointmentHandler} from "./handlers/create.handler";
import {createAppointmentSchema} from "./schemas/create.schema";
import {cancelAppointmentHandler} from "./handlers/cancel.handler";
import {getMyAppointmentsHandler} from "./handlers/getMyAppointments.handler";
import {getDoctorsAppointmentsHandler} from "./handlers/getDoctorsAppointments.handler";

export const appointmentsRouter = Router();

appointmentsRouter.post(
    `/create`,
    checkAuth,
    createRequestValidator(createAppointmentSchema),
    createAppointmentHandler
);

appointmentsRouter.post(
    `/cancel/:id`,
    checkAuth,
    cancelAppointmentHandler
);

appointmentsRouter.get(
    `/my-appointments`,
    checkAuth,
    getMyAppointmentsHandler
);

appointmentsRouter.get(
  '/doctors-appointments',
  checkAuth,
  getDoctorsAppointmentsHandler
);
