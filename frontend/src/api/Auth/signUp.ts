import { ZodIssue } from "zod";
import { client } from "../client";
import { ErrorInResponse } from "../types";

export type SignUpInput = { email: string; password: string };
export type SignUpResponse = { 
  createdUser: {
    id: string,
    email: string
  }
  error: undefined,
} | {
  createdUser: undefined,
  error: ErrorInResponse<{ errors: ZodIssue[] }>,
};

export const signUp = async ({ email, password }: SignUpInput) => {
  return await client
    .post<SignUpResponse>("/auth/sign-up", {
      email,
      password,
    })
    .then((res) => res.data);
};
