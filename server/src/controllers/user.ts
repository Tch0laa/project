import { Request, Response } from 'express';
import { getAllUsers } from '../services/user';


export async function getAllUsersHandler(req: Request, res: Response) {
    const users = await getAllUsers();
    return res.status(200).json(users);
}