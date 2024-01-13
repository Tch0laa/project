export interface RegisterValues {
    firstName: string;
    lastName: string;
    email: string;
    password:string;
    confirmPassword: string;
}

export type LoginValues = Omit<RegisterValues,'confirmPassword'>;

export interface UserBody {
    firstName: string;
    lastName: string;
    email: string;
}