import {Router} from "express"
import auth from "../middleware/auth.js";
import { accessChat, fetchChats, createGroup, renameGroup, addPerson, removePerson } from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.post('/',auth,accessChat)
chatRouter.get('/',auth,fetchChats)
chatRouter.post('/group',auth,createGroup)
chatRouter.put('/group',auth,renameGroup)
chatRouter.put('/group/add',auth,addPerson)
chatRouter.put('/group/remove',auth,removePerson)

export default chatRouter