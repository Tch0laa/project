import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { LoginValues, RegisterValues, UserBody } from '../types/auth';
import ErrorResponse from '../utils/errorResponse';
import { comparePassword, createUser, findUserByEmail, findUserById, generateToken, hashPassword, updateProfilePicture, updateUser } from '../services/auth';
import { createCart, getCart } from '../services/cart';


export async function register(req: Request<object, object, RegisterValues>, res: Response, next: NextFunction) {
    const {firstName, lastName, email, password, confirmPassword} = req.body;
    if(!firstName || !lastName || !email || !password || !confirmPassword) {
        return next(new ErrorResponse('some fields are not provided',StatusCodes.BAD_REQUEST));
    }

    if(password !== confirmPassword) {
        return next(new ErrorResponse('Passwords dont match',StatusCodes.BAD_REQUEST));
    }
    try{
    const user = await findUserByEmail(email);
    if(user) {
        return next(new ErrorResponse('User already exists with this E-mail',StatusCodes.CONFLICT));
    }

    const hashedPassword = await hashPassword(password);
    const userCreated= await createUser({firstName, lastName,email,password: hashedPassword});
    await createCart(userCreated.id);
    return res.status(StatusCodes.CREATED).json({status:'ok', message:'User registered successfully'});
    }catch(err:any) {
        return res.status(500).json(err.message);
    }
}

export async function login(req: Request<object, object, LoginValues>, res: Response, next: NextFunction) {
    const { email,password } = req.body;
    if(!email || !password) {
        return next(new ErrorResponse('some fields are not provided',StatusCodes.BAD_REQUEST))
    }
    
    try{
    const user = await findUserByEmail(email) as any;
    if(!user) {
        return next(new ErrorResponse('Invalid credentials', StatusCodes.BAD_REQUEST));
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if(!isPasswordCorrect) {
        return next(new ErrorResponse('Invalid Credentials',StatusCodes.BAD_REQUEST));
    }

    const {password: pass, ...rest} = user._doc;
    const cart = await getCart(user.id);
    const accessToken= generateToken(user.id,process.env.JWT_AT_SECRET!,process.env.JWT_AT_SECRET_EXPIRE!); 
    return res.status(StatusCodes.OK).json({accessToken,user:rest, cart });  
    }catch(err: any) {
        return res.status(500).json(err.message);
    }
}

export async function updateUserHandler(req: any, res: Response, next: NextFunction) {
        const {firstName, lastName, email}=req.body;
        if(!firstName || !lastName || !email) {
            return next(new ErrorResponse('some fields are not provided', StatusCodes.BAD_REQUEST));
        }
        const user = await findUserById(req.user.id);

        if(!user) {
            return next(new ErrorResponse('User not found',StatusCodes.NOT_FOUND));
        }

        const updatedUser=await updateUser(user.id,{firstName, lastName, email});

        return res.status(StatusCodes.OK).json({success: true, message:'User information updated successfully', data: updatedUser});
}

export async function updateProfilePictureHandler(req: any, res: Response, next: NextFunction) {
        const {image} = req.body;
        const {id}=req.user;

        if(!image) {
            return next(new ErrorResponse('image not provided',StatusCodes.BAD_REQUEST));
        }

       const  updatedImage =  await updateProfilePicture(id,image);

       return res.status(StatusCodes.OK).json({success: true, message:'profile picture updated succesfully',data: updatedImage})
;}