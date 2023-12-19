import { GetUserReturn } from "./db/user/types";

declare global {
  namespace Express {
    export interface Request {
      user?: GetUserReturn;
    }
  }
}

export type RegistrationData = {
  email: string,
  password: string
}

export type UserFromJWT = {
  id: number,
  email: string
}