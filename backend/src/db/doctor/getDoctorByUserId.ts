import {prisma} from "../index";

export async function getDoctorByUserId(userId: number) {
  return prisma.doctor.findUnique({
    where: {
      userId: userId
    },
    include: {
      user: true
    }
  });
};