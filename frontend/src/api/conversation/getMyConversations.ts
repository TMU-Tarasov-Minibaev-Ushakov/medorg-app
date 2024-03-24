import {client} from "../client";

export type CreateConversationsResponse = {
  id: number,
  participants: {
    id: number,
    email: string,
  }[],
  messages:  {
    id: number,
    content: string,
    createdAt: string,
    sender: {
      id: number,
      email: string
    }
  }[]
}[];

export const getMyConversations = async () => {
  return client.get<CreateConversationsResponse>('/conversations/mine').then((res) => res.data);
};