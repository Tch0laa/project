import {Router} from 'express';
import { login, register, updateProfilePictureHandler, updateUserHandler } from '../controllers/auth';
import authMiddleware from '../middlewares/authMiddleware';


const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

authRouter.use(authMiddleware);
authRouter.put('/user/update', updateUserHandler);
authRouter.put('/user/profile-picture', updateProfilePictureHandler);

export default authRouter;