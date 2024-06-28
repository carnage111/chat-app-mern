import {Router} from "express"
import auth from "../middleware/auth.js";
import { accessChat } from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.post('/',auth,accessChat)

export default chatRouter