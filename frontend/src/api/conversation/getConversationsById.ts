import {client} from "../client";

export type GetConversationsByIdResponse = {
  id: number,
  participants: {
    id: number,
    email: string,
  }[],
  messages:  {
    id: number,
    content: string,
    createdAt: string,
    senderId: number,
  }[]
};

export const getConversationsById = async (conversationId: number) => {
  return client.get<GetConversationsByIdResponse>(`conversations/${conversationId}`).then((res) => res.data);
};