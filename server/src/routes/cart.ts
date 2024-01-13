import {Router} from 'express';
import { addToCartHandler, decrementItemHandler, incrementItemHandler } from '../controllers/cart';
import authMiddleware from '../middlewares/authMiddleware';


const cartRouter = Router();

cartRouter.use(authMiddleware);
cartRouter.put('/add', addToCartHandler);
cartRouter.put('/increment', incrementItemHandler);
cartRouter.put('/decrement', decrementItemHandler);

export default cartRouter;  