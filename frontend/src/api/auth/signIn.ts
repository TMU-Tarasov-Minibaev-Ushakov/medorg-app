import { ZodIssue } from "zod";
import { client } from "../client";
import { ErrorInResponse } from "../types";

export type SignInInput = { email: string; password: string };
export type SignInResponse = { 
  token: string,
  error: undefined,
} | {
  token: undefined,
  error: ErrorInResponse<{ errors: ZodIssue[] }>,
};

export const signIn = async ({ email, password }: SignInInput) => {
  return await client
    .post<SignInResponse>("/auth/sign-in", {
      email,
      password,
    })
    .then((res) => res.data);
};
