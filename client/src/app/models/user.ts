import { Basket } from "./basket";

export interface User {
    username: string;
    password: string;
    basket?: Basket;
}