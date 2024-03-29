import {prisma} from "..";
import {CreateUserInput, UserType} from "./types";

export async function createUser(registrationData: CreateUserInput) {
  return prisma.user.create({
    data: {
      email: registrationData.email,
      name: registrationData.name,
      passwordHash: registrationData.passwordHash,
      type: registrationData.type || UserType.PATIENT,
    },
  });
}

export async function createUserWithPatient(registrationData: CreateUserInput) {
  return prisma.user.create({
    data: {
      email: registrationData.email,
      name: registrationData.name,
      passwordHash: registrationData.passwordHash,
      type: UserType.PATIENT,
      permissionGroups: {
        connect: [
          { name: 'patient' }
        ]
      },
      patient: {
        create: {},
      }
    },
  });
}

export async function createUserWithDoctor(registrationData: CreateUserInput) {
  console.log(registrationData);
  return prisma.user.create({
    data: {
      email: registrationData.email,
      name: registrationData.name,
      passwordHash: registrationData.passwordHash,
      type: UserType.DOCTOR,
      permissionGroups: {
        connect: [
          { name: 'doctor' }
        ]
      },
      doctor: {
        create: {},
      }
    },
  });
}