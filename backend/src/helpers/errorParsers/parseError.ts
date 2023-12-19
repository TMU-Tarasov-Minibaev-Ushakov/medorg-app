import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { parsePrismaError } from "./parsePrismaError";
import { JsonWebTokenError } from "jsonwebtoken";
import { parseJsonWebTokenError } from "./parseJsonWebTokenError";

export function parseError(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) return parsePrismaError(error);
  if (error instanceof JsonWebTokenError) return parseJsonWebTokenError(error);
}