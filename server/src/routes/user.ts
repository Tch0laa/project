import { Router } from 'express'
import { getAllUsersHandler } from '../controllers/user';

const userRouter = Router();

userRouter.get('/',getAllUsersHandler);


export default userRouter;

