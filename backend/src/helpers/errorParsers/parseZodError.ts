import { ZodError } from "zod";

export function parseZodError(error: ZodError) {
  return {
    status: 400,
    message: 'Validation error',
    data: {
      errors: error.issues
    }
  }
}