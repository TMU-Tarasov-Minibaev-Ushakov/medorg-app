import { prisma } from "..";
import { CreateUserInput } from "./types";

export async function createUser(registrationData: CreateUserInput) {

  const createdUser = await prisma.user.create({
    data: {
      email: registrationData.email,
      passwordHash: registrationData.passwordHash
    }
  })

  console.log(createdUser)

  return createdUser;
}