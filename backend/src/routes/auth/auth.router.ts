import { Router } from "express";
import { signUpHandler } from "./handlers/sign-up/sign-up.handler";
import { signInHandler } from "./handlers/sign-in/sign-in.handler";
import { authMiddleware } from "./middlewares/auth.middleware";
import { createRequestValidator } from "../../helpers/createRequestValidator";
import { registerSchema } from "./handlers/sign-up/register.schema";
import { loginSchema } from "./handlers/sign-in/login.schema";

const namespace = '/auth';
export const authRouter = Router();

authRouter.use(authMiddleware)

authRouter.post(`${namespace}/sign-up`, createRequestValidator(registerSchema), signUpHandler);
authRouter.post(`${namespace}/sign-in`, createRequestValidator(loginSchema), signInHandler);

authRouter.post(`${namespace}/test`, (req, res) => {
  console.log(req.user)
  res.json({
    status: 'ok'
  })
});