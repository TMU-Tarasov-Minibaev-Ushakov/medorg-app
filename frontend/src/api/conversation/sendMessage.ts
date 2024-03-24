import {client} from "../client";

type SendMessageInput = {
  conversationId: number,
  message: string
}

export const sendMessage = async ({ conversationId, message }: SendMessageInput) => {
  return await client
    .post("/messages/create", {
      conversationId: conversationId,
      content: message
    })
    .then((res) => res.data);
}