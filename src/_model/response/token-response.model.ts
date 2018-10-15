import { ApiResponse } from './api-response.model';

export interface TokenResponse extends ApiResponse {
    token: string;
    tokenDecoded: {
        username: string,
        id: string,
        active: boolean,
        admin: boolean
    };
}
