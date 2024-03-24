import { Request, Response } from "express";
import {handleErrorAndRespond} from "../../../helpers/handleErrorAndResponde";
import {getUser} from "../../../db/user";
import {getConversationsByUserId} from "../../../db/conversation/getConversations";

export const getMyConversationsHandler = async (req: Request, res: Response) => {
  try {
    const conversations = await getConversationsByUserId({
      userId: req.user!.id
    })
    console.log(conversations)
    res.status(200).json(conversations);
  } catch (error) {
    handleErrorAndRespond(error, res);
  }
};