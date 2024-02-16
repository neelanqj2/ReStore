import { Basket } from "./basket";

export interface User {
    email: string;
    password: string;
    token: string;
    basket?: Basket;
}