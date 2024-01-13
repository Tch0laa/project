import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import productRouter from './product';
import cartRouter from './cart';

const router = Router();

router.use('/auth',authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/cart',cartRouter);

export default router;