import { ApiResponse } from './api-response.model';
import { Drink } from '../drink.model';

export interface DrinkResponse extends ApiResponse {
    drink: Drink;
}
