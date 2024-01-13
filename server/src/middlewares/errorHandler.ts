import {Request, Response, NextFunction} from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandler=(err:any,req: Request, res: Response, next: NextFunction)=>  {
        const errors={...err};
        errors.message = err.message;

        return res.status(errors.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message: errors.message || 'Something went wrong'
        })
}   

export default errorHandler;