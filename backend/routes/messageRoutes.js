import { Router } from "express";
import { createMessage, fetchAllMessages } from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.post("/", createMessage);
messageRouter.get("/:chatId", fetchAllMessages);

export default messageRouter