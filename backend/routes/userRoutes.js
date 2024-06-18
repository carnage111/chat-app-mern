import {Router} from 'express';
import {register} from '../controllers/userController.js'

const userRouter = Router()

userRouter.post('/register',register)
// userRouter.post('/login',login)
// userRouter.get('/logout',logout)

export default userRouter;