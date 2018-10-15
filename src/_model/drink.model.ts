import { User } from './user.model';

export interface Drink {
    _id: string;
    user: User;
    price: number;
    drinkers: User[];
    date_drink: Date;
    date_add: Date;
}
