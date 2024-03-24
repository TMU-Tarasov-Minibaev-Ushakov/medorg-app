import { Request, Response } from "express";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {getConversation} from "../../../db/conversation/getConversation";

export const getConversationHandler = async (req: Request, res: Response) => {

  const conversationId = Number.parseInt(req.params.id);

  try {
    const conversation = await getConversation({
      conversationId: conversationId
    })
    res.status(200).json(conversation);
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
};