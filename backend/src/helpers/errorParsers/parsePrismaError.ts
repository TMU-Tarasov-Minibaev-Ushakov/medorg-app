import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function parsePrismaError(e: PrismaClientKnownRequestError) {

  if (e.code === 'P2002') return {
    status: 409,
    message: 'Object with this unique value is already exists',
  }
  
}