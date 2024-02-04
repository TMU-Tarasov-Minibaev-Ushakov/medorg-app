import { getUser } from "./getUser";

export type CreateUserInput = {
  email: string,
  passwordHash: string,
  type: UserType
}

export type GetUserReturn = Awaited<ReturnType<typeof getUser>>;

export enum UserType {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}