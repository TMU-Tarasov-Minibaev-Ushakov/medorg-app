import { Router } from "express";
import { signUpHandler } from "./handlers/sign-up.handler";
import { signInHandler } from "./handlers/sign-in.handler";
import { createRequestValidator } from "../../helpers/createRequestValidator";
import { registerSchema } from "./schemas/register.schema";
import { loginSchema } from "./schemas/login.schema";
import { checkAuth } from "../../helpers/checkAuth";
import {createDoctorHandler} from "./handlers/create-doctor.handler";
import {createPermissionsValidator} from "../../helpers/createPermissionsValidator";
import {PermissionName} from "../../constants";

const namespace = "/auth";
export const authRouter = Router();

authRouter.post(
  `${namespace}/sign-up`,
  createRequestValidator(registerSchema),
  signUpHandler
);
authRouter.post(
  `${namespace}/sign-in`,
  createRequestValidator(loginSchema),
  signInHandler
);

authRouter.post(
  `${namespace}/create-doctor`,
  checkAuth,
  createPermissionsValidator([PermissionName.editUsers]),
  createRequestValidator(registerSchema),
  createDoctorHandler
)
