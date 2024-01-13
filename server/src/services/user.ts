import {User} from '../models/User';


export async function getAllUsers() {
    return User.find({}).select('-password');
}

