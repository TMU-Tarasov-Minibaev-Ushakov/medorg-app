import { prisma } from "../index";

type GetConversationInput = {
  conversationId: number;
};

export async function getConversation(input: GetConversationInput) {
  const { conversationId } = input;

  return prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      participants: true,
      messages: true,
    },
  });
}
