import { Request, Response } from "express";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {getConversation} from "../../../db/conversation/getConversation";
import {createConversation} from "../../../db/conversation/createConversation";

export const createConversationHandler = async (req: Request, res: Response) => {

  const secondParticipantId = parseInt(req.body.secondUserId);
  const userId = req.user!.id

  if (!secondParticipantId) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "No second participant id"
      }
    })
  }

  try {
    const createdConversation = await createConversation({
      userId: userId,
      secondUserId: secondParticipantId,
    })

    res.status(200).json(createdConversation);
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
};