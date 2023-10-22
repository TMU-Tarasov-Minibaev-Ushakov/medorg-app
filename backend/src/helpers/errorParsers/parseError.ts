import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { parsePrismaError } from "./parsePrismaError";

export function parseError(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) return parsePrismaError(error);
}