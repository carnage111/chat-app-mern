import {Router} from 'express';
import {register} from '../controllers/userController.js'
import upload from '../middleware/uploadFile.js';

const userRouter = Router()

userRouter.post('/register',upload.single("photo"),register)
// userRouter.post('/login',login)
// userRouter.get('/logout',logout)

export default userRouter;