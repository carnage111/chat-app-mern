import {Router} from "express"
import auth from "../middleware/auth.js";
import { accessChat, fetchChats, createGroup } from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.post('/',auth,accessChat)
chatRouter.get('/',auth,fetchChats)
chatRouter.post('/',auth,createGroup)

export default chatRouter