import {prisma} from "..";
import {CreateUserInput, UserType} from "./types";

export async function createUser(registrationData: CreateUserInput) {
  return prisma.user.create({
    data: {
      email: registrationData.email,
      passwordHash: registrationData.passwordHash,
      type: registrationData.type || UserType.PATIENT,
    },
  });
}

export async function createUserWithPatient(registrationData: CreateUserInput) {
  return prisma.user.create({
    data: {
      email: registrationData.email,
      passwordHash: registrationData.passwordHash,
      type: UserType.PATIENT,
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
      type: UserType.DOCTOR,
      doctor: {
        create: {},
      }
    },
  });
}