import { Router } from "express";
import { createRequestValidator } from "../../helpers/createRequestValidator";
import { checkAuth } from "../../helpers/checkAuth";
import {createAppointmentHandler} from "./handlers/create.handler";
import {createAppointmentSchema} from "./schemas/create.schema";

const namespace = "/appointments";
export const appointmentsRouter = Router();

appointmentsRouter.post(
    `${namespace}/create`,
    checkAuth,
    createRequestValidator(createAppointmentSchema),
    createAppointmentHandler
);
