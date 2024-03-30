import { prisma } from "../index";

type CreateConversationInput = {
  userId: number;
  secondUserId: number;
};

export async function createConversation(input: CreateConversationInput) {
  const { userId, secondUserId } = input;

  console.log("createAppointment", input);

  return prisma.conversation.create({
    data: {
      participants: {
        connect: [
          {
            id: userId,
          },
          {
            id: secondUserId,
          },
        ],
      },
    },
  });
}
