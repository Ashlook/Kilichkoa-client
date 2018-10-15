import { ApiResponse } from './api-response.model';
import { User } from '../user.model';

export interface UsersResponse extends ApiResponse {
    users: User[];
}
