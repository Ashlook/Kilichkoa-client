import { ApiResponse } from './api-response.model';
import { Drink } from '../drink.model';

export interface DrinksResponse extends ApiResponse {
    drinks: Drink[];
}
