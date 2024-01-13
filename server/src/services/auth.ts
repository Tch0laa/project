import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';

import { User } from '../models/User';
import { RegisterValues, UserBody } from '../types/auth';

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password,12);
}

export async function findUserByEmail(email: string): Promise<User | null> {
    return User.findOne({email});
}

export async function findUserById(id: string): Promise<User | null> {
    return User.findById(id).select('-password');
}

export async function createUser(body: Omit<RegisterValues,'confirmPassword'>) {
    const { firstName, lastName, email, password } = body;
  const user=await User.create({
    firstName,
    lastName,
    email,
    password
    
  });
  return user;
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string,secret: string, expiresIn: string) {
  return jwt.sign({id:userId},secret,{expiresIn});
}

export  async function updateUser(userId: string, userBody: UserBody) {
  const {firstName,lastName, email}=userBody;
  const updatedUser= await User.findByIdAndUpdate(userId,{firstName, lastName, email},{new: true})
  return { firstName: updatedUser?.firstName, lastName: updatedUser?.lastName, email: updatedUser?.email};
}

export async function updateProfilePicture(userId: string, img: any) {
    try{
      const cloudinaryImg = await cloudinary.uploader.upload(img);
      await User.findByIdAndUpdate(userId,{img: cloudinaryImg.url});
      return cloudinaryImg.url;
    }catch(err) {
       throw err;
    }
}