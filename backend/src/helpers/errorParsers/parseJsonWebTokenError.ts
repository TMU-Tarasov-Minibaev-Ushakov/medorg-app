import { JsonWebTokenError } from "jsonwebtoken";

export function parseJsonWebTokenError(e: JsonWebTokenError) {

  if (e.message === 'invalid signature') return {
    status: 400,
    message: 'Invalid signature of the token',
  }

}