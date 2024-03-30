import { prisma } from "../index";

type CreateMessageInput = {
  conversationId: number;
  senderId: number;
  content: string;
};

export async function createMessage(input: CreateMessageInput) {
  const { conversationId, senderId, content } = input;

  return prisma.message.create({
    data: {
      conversation: {
        connect: {
          id: conversationId,
        },
      },
      senderId: senderId,
      content: content,
      createdAt: new Date(),
    },
  });
}
