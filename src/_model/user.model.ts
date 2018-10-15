import { Drink } from './drink.model';

export interface User {
    _id?: string;
    lastname?: string;
    firstname?: string;
    username: string;
    balance?: number;
    password?: string;
    passwordCheck?: string;
    admin?: boolean;
    active?: boolean;
    paid_drink?: Drink[];
}
