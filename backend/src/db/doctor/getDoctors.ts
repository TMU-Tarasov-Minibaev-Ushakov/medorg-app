import {prisma} from "../index";

export async function getDoctors() {
  return prisma.doctor.findMany({
    include: {
      user: true
    }
  });
};