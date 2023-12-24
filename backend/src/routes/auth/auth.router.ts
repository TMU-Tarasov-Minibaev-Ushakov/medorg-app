import { Router } from "express";
import { signUpHandler } from "./handlers/sign-up.handler";
import { signInHandler } from "./handlers/sign-in.handler";
import { createRequestValidator } from "../../helpers/createRequestValidator";
import { registerSchema } from "./schemas/register.schema";
import { loginSchema } from "./schemas/login.schema";
import { checkAuth } from "../../helpers/checkAuth";

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

authRouter.get(`${namespace}/test`, checkAuth, (req, res) => {
  console.log(req.user);
  res.json({
    status: "ok",
  });
});
