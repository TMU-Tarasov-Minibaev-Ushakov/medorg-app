import { ZodIssue } from "zod";
import { client } from "../client";
import { ErrorInResponse } from "../types";

export type CreateDoctorInput = { email: string; password: string };
export type CreateDoctorResponse = {
  createdUser: {
    id: string,
    email: string
  }
  error: undefined,
} | {
  createdUser: undefined,
  error: ErrorInResponse<{ errors: ZodIssue[] }>,
};

export const createDoctor = async ({ email, password }: CreateDoctorInput) => {
  return await client
    .post<CreateDoctorResponse>("/auth/create-doctor", {
      email,
      password,
    })
    .then((res) => res.data);
};
