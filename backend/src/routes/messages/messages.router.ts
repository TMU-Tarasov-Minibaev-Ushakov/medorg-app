import {Router} from "express";
import {checkAuth} from "../../helpers/checkAuth";
import {getMyConversationsHandler} from "./handlers/get-my-conversations.handler";
import {getConversationHandler} from "./handlers/get-conversation.handler";
import {createConversationHandler} from "./handlers/create-conversation.handler";
import {createMessageHandler} from "./handlers/create-message.handler";

export const messagesRouter = Router();

messagesRouter.get('/conversations/mine', checkAuth, getMyConversationsHandler);
messagesRouter.get('/conversations/:id', checkAuth, getConversationHandler);
messagesRouter.post('/conversations/create', checkAuth, createConversationHandler);

messagesRouter.get('/messages/mine', checkAuth, () => {});
messagesRouter.get('/messages/:id', checkAuth, () => {});
messagesRouter.post('/messages/create', checkAuth, createMessageHandler);
