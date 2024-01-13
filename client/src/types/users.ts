import { User } from "./auth";

export interface UserInitialState {
    usersLoading: boolean;
    users: User[]
}

export interface UserBody {
    firstName: string;
    lastName: string;
    email: string;
}