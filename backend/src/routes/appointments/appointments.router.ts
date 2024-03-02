import { Router } from "express";
import { createRequestValidator } from "../../helpers/createRequestValidator";
import { checkAuth } from "../../helpers/checkAuth";
import {createAppointmentHandler} from "./handlers/create.handler";
import {createAppointmentSchema} from "./schemas/create.schema";
import {cancelAppointmentHandler} from "./handlers/cancel.handler";
import {getMyAppointmentsHandler} from "./handlers/getMyAppointments.handler";

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
