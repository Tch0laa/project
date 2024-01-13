export interface AuthInitialState {
    registerLoading: boolean;
    loginLoading: boolean;
    authedUser: User | null;
    updateUserLoading: boolean;
    profilePictureLoading: boolean;
}

export interface RegisterValues {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginValues {
    email: string;
    password: string;
}

export interface User {
    id: string;
    email: string;
    firstName:string;
    lastName: string;
    role: string;
    img: string;
}