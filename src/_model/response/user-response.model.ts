import { ApiResponse } from './api-response.model';
import { User } from '../user.model';

export interface UserResponse extends ApiResponse {
    user: User;
}
