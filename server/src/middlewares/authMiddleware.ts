import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/errorResponse';
import { StatusCodes } from 'http-status-codes';
import { findUserById } from '../services/auth';


const authMiddleware=(req: any, res: Response, next: NextFunction)=>{
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return next(new ErrorResponse('Unauthenticated',StatusCodes.UNAUTHORIZED));
    }

    jwt.verify(token, process.env.JWT_AT_SECRET!,async(err: any, data: any)=>{
        if(err) {
            return next(new ErrorResponse('Unauthenticated', StatusCodes.UNAUTHORIZED));
        }
        if(data && data.id) {
            const user = await findUserById(data?.id);
       
            if(!user) {
                return next(new ErrorResponse('Unauthenticated',StatusCodes.UNAUTHORIZED));
            }
            req.user = user;
            next(); 
        }
        
    })

  
}

export default authMiddleware;