import {prisma} from "../index";

type GetConversationsByUserIdInput = {
  userId: number
}

export async function getConversationsByUserId(input: GetConversationsByUserIdInput) {
  const { userId } = input;

  return prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          id: userId
        }
      }
    },
    include: {
      participants: true,
      messages: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      }
    }
  });
}