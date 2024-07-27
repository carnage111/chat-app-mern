import { Router } from "express";
import { createMessage, fetchAllMessages } from "../controllers/messageController.js";
import auth from '../middleware/auth.js';

const messageRouter = Router();

messageRouter.post("/", auth, createMessage);
messageRouter.get("/:chatId", auth, fetchAllMessages);

export default messageRouter