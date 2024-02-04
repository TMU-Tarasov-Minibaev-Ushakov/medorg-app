import {prisma} from "..";
import {CreateUserInput} from "./types";

export async function createUser(registrationData: CreateUserInput) {
  return prisma.user.create({
    data: {
      email: registrationData.email,
      passwordHash: registrationData.passwordHash,
      type: registrationData.type,
    },
  });
}

export async function createUserWithPatient(registrationData: CreateUserInput) {
  return prisma.user.create({
    data: {
      email: registrationData.email,
      passwordHash: registrationData.passwordHash,
      type: registrationData.type,
      patient: {
        create: {},
      }
    },
  });
}

export async function createUserWithDoctor(registrationData: CreateUserInput) {
  return prisma.user.create({
    data: {
      email: registrationData.email,
      passwordHash: registrationData.passwordHash,
      type: registrationData.type,
      doctor: {
        create: {},
      }
    },
  });
}