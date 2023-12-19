import { getUser } from "./getUser";

export type CreateUserInput = {
  email: string,
  passwordHash: string
}

export type GetUserReturn = Awaited<ReturnType<typeof getUser>>;