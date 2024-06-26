import {Router} from 'express';
import {register,login, searchUsers} from '../controllers/userController.js'
import upload from '../middleware/uploadFile.js';
import auth from '../middleware/auth..js';

const userRouter = Router()

userRouter.post('/register',upload.single("photo"),register)
userRouter.post('/login',login)
userRouter.get("/",auth,searchUsers)
// userRouter.get('/logout',logout)

export default userRouter;