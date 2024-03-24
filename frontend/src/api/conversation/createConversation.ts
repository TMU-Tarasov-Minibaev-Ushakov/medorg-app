import {client} from "../client";

type CreateConversationInput = {
  secondUserId: number,
}

export const createConversation = async ({ secondUserId }: CreateConversationInput) => {
  return client.post('conversations/create', {
    secondUserId
  }).then((res) => res.data);
}