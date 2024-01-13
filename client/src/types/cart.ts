import { Product } from "./product";

export interface CartInitialState {
    cartItems:( Product & {quantity: number}) [];
    cartInfo: any;
}