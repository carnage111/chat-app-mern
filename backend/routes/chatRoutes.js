import {Router} from "express"
import auth from "../middleware/auth.js";

const chatRouter = Router();

chatRouter.post('/',auth,accessChat)

export default chatRouter