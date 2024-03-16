import { GetUserReturn } from "./db/user/types";

declare global {
  namespace Express {
    export interface Request {
      user?: GetUserReturn;
    }
  }
}

export type UserFromJWT = {
  id: number,
  email: string
}