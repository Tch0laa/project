import {NextFunction, Request, Response} from 'express';
import { getProductById, getProductFiltered, searchProducts } from '../services/product';
import ErrorResponse from '../utils/errorResponse';
import { StatusCodes } from 'http-status-codes';

export async function getRecentProducts(req: Request, res: Response) {
        try{
        const products = await getProductFiltered({});
        return res.status(StatusCodes.OK).json(products);
        }catch(err: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
        }
}

export async function getHotSaleProducts(req: Request, res: Response) {
    try{
    const products = await getProductFiltered({},{price:1});
    return res.status(StatusCodes.OK).json(products);
    }catch(err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

export async function getPopularProducts(req: Request, res: Response) {
    try{
    const products = await getProductFiltered({},{'rating.rate':-1});
    return res.status(StatusCodes.OK).json(products);
    }catch(err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

export async function getProductHandler(req: Request<{productId: string}>, res: Response, next: NextFunction) {
    const { productId }=req.params;
    try{
        const product = await getProductById(productId);
        if(!product) {
            return next(new ErrorResponse('Product not found',StatusCodes.NOT_FOUND));
        }
        return res.status(StatusCodes.OK).json(product);
    }catch(err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
    }
}

export async function searchProductsHandler(req: Request<{},{},{},{search: string}>, res: Response) {
    const {search}=req.query;
     try{
      const products = await searchProducts(search);
      return res.status(StatusCodes.OK).json(products);
     }catch(err: any) {
        return res.status(500).json(err.message);
     }
}