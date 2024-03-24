import { Request, Response } from "express";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {getConversation} from "../../../db/conversation/getConversation";
import {createConversation} from "../../../db/conversation/createConversation";
import {createMessage} from "../../../db/conversation/createMessage";

export const createMessageHandler = async (req: Request, res: Response) => {

  const userId = req.user!.id;
  const conversationId = parseInt(req.body.conversationId);
  const content = req.body.content;

  try {
    const createdMessage = createMessage({
      conversationId: conversationId,
      content: content,
      senderId: userId
    });
    res.status(200).json(createdMessage);
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
};