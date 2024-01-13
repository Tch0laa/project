import {Request, Response, NextFunction} from 'express'
import { addToCart, decrementItem, incrementItem } from '../services/cart';
import ErrorResponse from '../utils/errorResponse';
import { StatusCodes } from 'http-status-codes';

export async function addToCartHandler(req: any, res: Response, next: NextFunction) {
    const {product}=req.body;
    if(!product) {
        return next(new ErrorResponse('No product', StatusCodes.BAD_REQUEST));
    }
    await addToCart(req.user.id,product);

    return res.status(StatusCodes.OK).json({message:'Item added to the cart', status:'ok'})
}


export async function incrementItemHandler(req: any, res: Response, next: NextFunction) {
    const {product}=req.body;
    if(!product) {
        return next(new ErrorResponse('No product', StatusCodes.BAD_REQUEST));
    }

    await incrementItem(req.user.id,product);

    return res.status(StatusCodes.OK).json({message:'Item incremented', status: 'ok'})

}

export async function decrementItemHandler(req: any, res: Response, next: NextFunction) {
   const { product } = req.body;

   if(!product) {
    return next(new ErrorResponse('No Product', StatusCodes.BAD_REQUEST))
   }

   await decrementItem(req.user.id, product);

   return res.status(200).json({message:'Item decremented', status: 'ok'})
}

